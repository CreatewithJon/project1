# Domain 4 — Evaluation, Error Analysis & Tuning (15–20%)

---

## What This Domain Tests

- Reading agent execution logs and identifying failure modes
- Root cause analysis (prompt vs. model vs. tool vs. data)
- The evaluation loop: measure → diagnose → adjust → re-test
- Adjustment levers: prompt tuning, model switching, tool changes
- Observability tooling and what metrics matter

---

## The Evaluation Loop

```
Define success criteria
        ↓
Run agent / collect output
        ↓
Measure: does output meet criteria?
        ↓
    Yes → ship    No → diagnose
                        ↓
              What caused the failure?
              1. Prompt issue?
              2. Model capability?
              3. Tool malfunction?
              4. Bad input data?
                        ↓
              Apply targeted fix
                        ↓
              Re-run and measure again
```

This is an infinite loop in production. You don't "finish" evaluation — you maintain it.

---

## Root Cause Framework

When agent output is wrong, go through this checklist:

### 1. Is it a prompt issue?
Signs: output is in wrong format, agent ignores constraints, off-topic responses, inconsistent behavior.

Fix: strengthen system prompt with more explicit instructions, add examples, add negative examples ("never do X").

**Try prompt fixes FIRST — cheapest and fastest.**

### 2. Is it a model capability issue?
Signs: reasoning errors on complex tasks, hallucinations on specific domains, context window exceeded.

Fix: upgrade model (Haiku → Sonnet → Opus), reduce context, break task into smaller steps.

**Try this AFTER prompt tuning fails.**

### 3. Is it a tool issue?
Signs: agent reports tool unavailable, tool returns unexpected format, rate limits hit.

Fix: add error handling, add retries with backoff, switch to fallback tool.

### 4. Is it a data issue?
Signs: agent makes decisions based on outdated or incomplete information, scores/outputs vary wildly.

Fix: improve data quality before ingestion, add validation, add "uncertainty" signals to agent.

---

## Observability: What You Need to Log

Every AI call in production should log:

```typescript
// What Helicone captures automatically for you
{
  requestId: "req_abc123",
  model: "claude-haiku-4-5",
  feature: "lead-score",           // your custom tag
  inputTokens: 1247,
  outputTokens: 89,
  latencyMs: 1834,
  cost: 0.00023,
  timestamp: "2026-05-26T14:23:11Z",
  // Full request and response stored
}
```

**Key metrics to watch:**
- **Latency p95** — are 95% of calls completing in acceptable time?
- **Error rate** — what % of calls fail?
- **Cost per feature** — which feature is the most expensive?
- **Token usage trends** — is context growing over time?

---

## Your Observability Setup (lib/ai.ts)

```typescript
// Your callClaude() with Helicone proxy
export async function callClaude({
  system,
  messages,
  model = "claude-haiku-4-5-20251001",
  maxTokens = 1000,
  feature = "unknown",   // ← this is the key — tag every call
}: CallClaudeOptions) {
  const heliconeKey = process.env.HELICONE_API_KEY;
  
  // Route through Helicone if available — graceful degradation
  const baseURL = heliconeKey
    ? "https://anthropic.helicone.ai/v1"
    : "https://api.anthropic.com/v1";

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-api-key": process.env.ANTHROPIC_API_KEY!,
    "anthropic-version": "2023-06-01",
  };

  if (heliconeKey) {
    headers["Helicone-Auth"] = `Bearer ${heliconeKey}`;
    headers["Helicone-Property-Feature"] = feature;  // ← enables filtering by feature
  }
  
  // ... rest of call
}
```

**Why feature tagging matters:** In Helicone, you can filter all calls by feature = "lead-score" and see: how many calls, what's the avg latency, what's the cost, which ones failed. This is exactly what enterprise observability looks like.

---

## Structured Output Validation (Your Lead Scoring Route)

```typescript
// The evaluation pattern for structured output
let scored: LeadScore;
try {
  // Step 1: Get model output
  const raw = await callClaude({...});
  
  // Step 2: Strip markdown fences (model often wraps JSON in ```)
  const cleaned = raw.replace(/```json\n?|\n?```/g, "").trim();
  
  // Step 3: Parse
  const parsed = JSON.parse(cleaned);
  
  // Step 4: Validate against expected schema
  if (typeof parsed.score !== "number" || parsed.score < 1 || parsed.score > 10) {
    throw new Error("Score out of expected range");
  }
  
  scored = parsed;
} catch (err) {
  // Step 5: Log the failure for evaluation
  console.error("Lead score parse failed:", err, { raw });
  
  // Step 6: Graceful degradation — don't crash, return a null score
  scored = { score: null, reason: "Parsing failed — needs manual review" };
}
```

This pattern = evaluation at the output level. Every parse failure is a signal that something needs tuning.

---

## Exam Practice Questions

**Q1:** Your agent's lead scoring output is inconsistent — sometimes returns JSON, sometimes markdown, sometimes plain text. What kind of issue is this and what's the fix?

> **A:** Prompt issue. The system prompt isn't enforcing output format strictly enough. Fix: add explicit output format instructions with an example, add "ALWAYS return valid JSON. NEVER include markdown formatting."

**Q2:** You've tuned the prompt 5 times and the model still makes reasoning errors on complex multi-step scoring tasks. What's the next adjustment lever?

> **A:** Model upgrade. Switch from Haiku to Sonnet (or Sonnet to Opus) for tasks requiring deeper reasoning. Haiku is fast/cheap but less capable on complex reasoning chains.

**Q3:** What's the difference between testing and evaluation?

> **A:** Testing = pre-deployment checks against expected inputs/outputs (like unit tests). Evaluation = continuous monitoring of live production output against quality criteria. Evaluation never stops.

**Q4:** Your Helicone dashboard shows lead-score calls have 40% higher latency than last week. What's your investigation process?

> **A:** 1) Check if prompt length increased (more tokens = more latency). 2) Check if model changed. 3) Check if Helicone proxy is having issues (test direct API call latency). 4) Check input data — are prospects being sent with more context than before?

---

## Your Build Task for Day 4

1. Set up Helicone: `npm install helicone` (or use HTTP proxy pattern already in your lib/ai.ts)
2. Add `HELICONE_API_KEY` to `.env.local`
3. Add feature tags to every `callClaude()` call in both projects
4. After 10 calls, look at Helicone dashboard and answer:
   - Which feature costs the most per call?
   - Which feature has the highest latency?
   - Are there any errors?
5. Pick one prompt that returned unexpected output — improve it
