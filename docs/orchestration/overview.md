# Orchestration Layer — Guide

> **Orchestration is the connective tissue of AI systems.** It's what turns a collection of AI calls into a pipeline, a workflow, or an autonomous system.

---

## What Is Orchestration?

Orchestration answers the question: **in what order do things run, and what happens when they fail?**

A single AI call is not orchestration. Orchestration is:
- Calling Firecrawl, then Claude, then Supabase — in sequence
- Calling research, scoring, and outreach agents in order
- Running 10 prospect scorings in parallel with rate limiting
- Retrying a failed video generation with a fallback provider
- Waiting for a human to approve before the next step runs

Without orchestration, you have a pile of useful functions. With orchestration, you have a system.

---

## Current Orchestration: Route Handlers as Pipelines

In the current system, orchestration happens inside Next.js API route handlers. The developer writes the sequence explicitly.

```typescript
// /api/analyze/route.ts — orchestration in a route handler

// STEP 1: Crawl
const crawlResult = await crawlUrl(url);        // Tool call

// STEP 2: Quick heuristic analysis
const quick = quickAnalysis(crawlResult);       // Pure function

// STEP 3: AI deep analysis
const prompt = buildPrompt(crawlResult, quick); // Orchestration logic
const raw = await callClaude({                  // AI call
  messages: [{ role: "user", content: prompt }],
  maxTokens: 600,
  tag: "analyze",
});

// STEP 4: Parse and validate
const parsed = JSON.parse(raw);                 // Output processing

// STEP 5: Store (optional)
if (leadId) {
  await supabase.from("real_estate_leads").update({ ... });  // Tool call
}
```

This is a **5-step synchronous pipeline**. Each step depends on the previous. It's simple, readable, and debuggable.

**Limitation:** It's all synchronous and blocking. If Firecrawl takes 8 seconds, the HTTP request waits 8 seconds. If the user closes the browser, the request may be cancelled.

---

## The Async Job Pattern

For long-running operations, the synchronous pipeline breaks down. The solution is the **async job pattern**:

```
STEP 1: User clicks "Generate B-Roll"
    ↓
STEP 2: Route handler creates a job, returns jobId IMMEDIATELY
    ↓ (returns < 100ms)
STEP 3: Client receives { jobId: "runway:abc123" }
    ↓
STEP 4: Background job runs (video generation, 60-120 seconds)
    ↓
STEP 5: Client polls GET /api/broll/status?jobId=runway:abc123
    ↓ (every 3 seconds)
STEP 6: Status changes from "pending" → "completed"
    ↓
STEP 7: Client receives video URL
```

This is implemented in the B-roll pipeline. The client never waits — it polls. The server never blocks.

```typescript
// /api/broll/generate/route.ts
export async function POST(req: NextRequest) {
  // Start generation (returns immediately with job ID)
  const jobId = await tryHiggsfield(prompt, duration, apiKey);
  return NextResponse.json({ jobId: `higgsfield:${jobId}`, provider: "higgsfield" });
  // Client now polls /api/broll/status?jobId=higgsfield:xxx
}
```

**GH-600 relevance:** The async job pattern is a core infrastructure topic. Any AI call that could take more than a few seconds should use this pattern.

---

## Orchestration Engines

As systems grow beyond a few routes, manual pipeline code becomes hard to maintain. Orchestration engines provide structure, retries, monitoring, and parallelism.

### n8n (Planned — Phase 3)

**What it is:** A visual workflow automation tool. You connect nodes (API calls, database queries, conditions, AI calls) with lines. The visual editor shows the workflow as a diagram.

**Use cases in this system:**
- Automated lead research: every new prospect → crawl → score → notify
- Content pipeline: YouTube video saved → transcribe → B-roll plan → content draft
- Follow-up sequences: prospect contacted 5 days ago → no reply → generate follow-up

```
[Webhook: New Prospect Added]
    ↓
[Crawl Website] ——(failure)——→ [Log failure, notify]
    ↓ (success)
[AI Score Prospect]
    ↓
[IF score > 7]
    ├── YES: [Generate Outreach Drafts] → [Notify Sales Rep]
    └── NO:  [Tag as "Low Priority"]
```

**GH-600 relevance:** n8n is a DAG-based workflow orchestrator. Know the concept of directed acyclic graphs (DAGs) for workflow design. A DAG ensures no circular dependencies — step 3 can never feed back into step 1.

### LangGraph (Future — Phase 3+)

**What it is:** A framework from LangChain for building multi-agent systems as stateful graphs. Each node is an agent or tool. Edges define the flow. State is shared across nodes.

**When to use over n8n:**
- When the workflow is AI-driven (agents deciding which path to take)
- When you need complex branching based on AI reasoning
- When agents need shared state
- When you need fine-grained control over the agent loop

**n8n vs. LangGraph:**
| | n8n | LangGraph |
|---|---|---|
| Control | Developer defines flow | AI can influence flow |
| Use case | Deterministic automation | Agentic, variable workflows |
| Complexity | Low-medium | Medium-high |
| Visual editing | Yes | No (code only) |

### GitHub Actions (Current — CI/CD)

Not typically thought of as AI orchestration, but GitHub Actions can trigger AI workflows:
- On PR merge → run AI code review
- On schedule → run weekly prospect scoring
- On new file in repo → trigger content analysis

Used for automation that's git-event-driven.

---

## Workflow Design Patterns

### Pattern 1: Sequential Pipeline
```
Step A → Step B → Step C → Done
```
Each step depends on the previous. Simple. Current system default.

### Pattern 2: Parallel Fan-Out
```
         ┌─→ Step B ─┐
Step A ──┤             ├──→ Step D
         └─→ Step C ─┘
```
Multiple steps run simultaneously. Results merged in Step D. Use when steps are independent.

Example: Score 100 prospects — run 10 in parallel, merge results.

### Pattern 3: Conditional Branch
```
         ┌─→ Step B (if score > 7) ─┐
Step A ──┤                           ├──→ Step D
         └─→ Step C (if score ≤ 7) ─┘
```
Different paths based on the result of Step A. Used in the n8n workflow design above.

### Pattern 4: Retry with Backoff
```
Step A → FAIL → Wait 1s → Retry → FAIL → Wait 2s → Retry → SUCCESS
```
For unreliable external services (third-party APIs). Always implement for AI calls in production — APIs have transient failures.

### Pattern 5: Dead Letter Queue
```
Step A → FAIL → Retry (3x) → Still FAIL → Dead Letter Queue
```
After exhausting retries, failed jobs go to a separate queue for manual review. Never silently drop failures.

---

## Current vs. Future Orchestration

| Feature | Today | Phase 3 |
|---|---|---|
| Workflow definition | Route handler code | n8n visual workflows |
| Long-running jobs | Async job + polling | n8n background execution |
| Multi-agent coordination | Single route | LangGraph agent graph |
| Error handling | try/catch in routes | n8n retry nodes + dead letter |
| Monitoring | Vercel logs + Helicone | n8n execution history + Helicone |
| Scheduling | None | n8n cron triggers |
