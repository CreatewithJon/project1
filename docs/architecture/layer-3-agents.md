# Layer 3 — Agent Layer

> **The one-sentence version:** Agents are AI processes that use tools to complete multi-step tasks by reasoning through a loop of observation, thinking, and action.

---

## Beginner Explanation

Imagine you ask an assistant to "research this company and tell me if we should pitch them."

A simple AI just answers based on what it already knows. An **agent** actually does the work:

1. It searches the web for the company (uses a tool)
2. It reads their website (uses another tool)
3. It checks their social presence (another tool)
4. It thinks about what it found
5. It writes you a scoring report

That sequence — use a tool, observe the result, think, use another tool, think again, deliver output — is an **agent loop**. The key difference from a single LLM call is that the agent's output at each step feeds back into its input for the next step.

---

## Technical Explanation

An agent in this system is defined by three things:

**1. A system prompt (its identity and rules)**
**2. Access to tools (functions it can call)**
**3. A loop (it keeps going until a stop condition is met)**

In code, the simplest agent looks like this:

```typescript
// From /api/lead-engine/prospects/[id]/score/route.ts

// TOOL 1: Fetch prospect data from database
const { data: prospect } = await supabase
  .from("prospects")
  .select("*")
  .eq("id", id)
  .single();

// ORCHESTRATE: Build the prompt with context injected
const prompt = buildScoringPrompt(prospect);

// AGENT: Call Claude with the context
const raw = await callClaude({
  messages: [{ role: "user", content: prompt }],
  maxTokens: 512,
  tag: "lead-score",
});

// TOOL 2: Store the result back to database
const parsed = JSON.parse(raw);
await supabase
  .from("prospects")
  .update({ ai_score: parsed.score, ai_score_reason: parsed.reason })
  .eq("id", id);
```

This is a **single-pass agent** — one tool in (database read), one AI call, one tool out (database write). It's the simplest possible agent pattern.

---

## The ReAct Pattern (GH-600 Core Topic)

**ReAct** stands for **Reason + Act**. It's the foundational pattern for all agentic behavior.

The loop:

```
OBSERVE ──→ THINK ──→ ACT ──→ OBSERVE ──→ THINK ──→ ACT ──→ ... ──→ DONE
```

**OBSERVE:** The agent receives information (user input, tool output, database record, API response).

**THINK:** The agent reasons about what it observed. In practice, this is the LLM generating its next output.

**ACT:** The agent calls a tool, writes to a database, sends a message, or returns a final answer.

The loop continues until one of:
- A stop condition is met (the task is done)
- A maximum iteration count is hit (prevents infinite loops)
- A human-in-the-loop gate fires (requires approval to continue)

### ReAct in This System: The Lead Engine

```
OBSERVE:  User clicks "Score Prospect" → prospect record loaded from Supabase
THINK:    Claude analyzes: industry fit? problem signals? budget indicators?
ACT:      Supabase UPDATE with score + reason + recommended offer
OBSERVE:  User clicks "Generate Outreach" → scored prospect record loaded
THINK:    Claude generates 6 message variants tailored to the prospect
ACT:      Supabase UPDATE with outreach_drafts JSON
          [HITL GATE] → Human reviews, selects, sends manually
OBSERVE:  User marks prospect "Contacted"
THINK:    [Future] Follow-up scheduling agent evaluates reply time
ACT:      [Future] Reminder queued in n8n
```

This is a **multi-step ReAct pipeline**. Each step builds on the previous. The human gates are explicit — the agent never sends a message without review.

---

## The B-Roll Pipeline Agent (Multi-Tool Chain)

This is the most complex agent in the current system. It chains multiple tools with a fallback.

```
INPUT: Video transcript

STEP 1 — THINK (Claude)
  callClaude({ tag: "broll-plan" })
  Claude identifies 6-8 moments needing B-roll
  Returns: JSON array of { timestamp, duration, prompt, quote }

STEP 2 — ACT (Video Generation Tool 1: Higgsfield)
  POST to Higgsfield API with prompt
  IF timeout (15s AbortSignal) → TOOL FAILURE

STEP 3 — ACT (Video Generation Tool 2: Runway ML — fallback)
  IF Higgsfield failed → POST to Runway API
  Returns: { jobId: "runway:xxx", provider: "runway" }

STEP 4 — OBSERVE (Status Polling Loop)
  GET /api/broll/status?jobId=runway:xxx
  Parse provider prefix → route to correct status endpoint
  LOOP until status === "completed" or "failed"

STEP 5 — DELIVER
  Return video URL to UI
```

**GH-600 concepts demonstrated:**
- Tool chaining (multiple tools in sequence)
- Graceful degradation (fallback to secondary tool)
- Provider abstraction (prefix system hides which tool ran)
- Polling loop (async job completion pattern)
- HITL implicit (human reviews video before publishing)

---

## Agents in This System: Inventory

| Agent | Route | Tools Used | Type |
|---|---|---|---|
| Lead Scorer | `/api/lead-engine/prospects/[id]/score` | Supabase read, Claude, Supabase write | Single-pass |
| Outreach Generator | `/api/lead-engine/prospects/[id]/outreach` | Supabase read, Claude, Supabase write | Single-pass |
| Website Analyzer | `/api/analyze` | Firecrawl, Claude, Supabase write | Multi-tool |
| B-Roll Planner | `/api/broll/plan` | Claude | Single-pass |
| B-Roll Generator | `/api/broll/generate` | Higgsfield OR Runway | Fallback chain |
| Dealership Chat | `/api/dealership-chat` | Claude (with history) | Conversational |
| Planner Chat | `/api/planner-chat` | Claude (with system persona) | Conversational |
| Content Analyzer | `/api/content/analyze` | Claude | Single-pass |
| LinkedIn Generator | `/api/content/linkedin` | Claude | Single-pass |
| Content Drafter | `/api/content/draft` | Claude | Single-pass |

---

## What Makes an Agent Different from a Plain API Call

| Plain API Call | Agent |
|---|---|
| One input → one output | Can have multiple steps |
| Stateless | Can carry context between steps |
| No tools | Can call external systems |
| Deterministic flow | Can branch based on results |
| No memory | Can read/write persistent state |

A plain call says: "Write me a LinkedIn post about this topic."
An agent says: "Research this company, identify their pain points, write a personalized outreach message, score it against our ICP criteria, and if the score is above 7, store it for review."

---

## GH-600 Agent Design Principles

**1. Agents should have a single clear objective.** The lead scoring agent scores leads. It doesn't send messages. It doesn't update the company record. Scope creep in agents is dangerous.

**2. Agents should be bounded.** Always set `maxTokens`. Always set a maximum iteration count on loops. An unbounded agent is a cost sink and a reliability risk.

**3. Tools should be idempotent where possible.** If you call the Supabase update twice, it should produce the same result. Agents can and do retry. Non-idempotent tools cause duplicate sends, double charges, corrupted state.

**4. Failures should be explicit.** The B-roll agent uses `try/catch` at each step. When Higgsfield fails, it doesn't silently skip — it catches the error and triggers the fallback. When Runway fails, it surfaces the error to the UI.

**5. Never trust agent output without validation.** Claude is instructed to return JSON. It almost always does. But `JSON.parse()` can still throw. Always wrap in try/catch. Always have a fallback value.

---

## Common GH-600 Exam Scenarios (Agent Layer)

**Scenario A:**
> "Your agent is scoring leads but occasionally returns malformed JSON, causing 500 errors. How do you fix this?"

Answer: Add explicit JSON extraction with regex (`raw.replace(/\`\`\`json\n?|\n?\`\`\`/g, "").trim()`), wrap parse in try/catch, return a safe default object on parse failure.

**Scenario B:**
> "Your B-roll generation agent is making API calls to a third-party service that sometimes times out for 30 seconds, blocking your UI. What's the architectural solution?"

Answer: Move the call to an async background job. Return a `jobId` immediately. Let the client poll `/status`. This is the **async job pattern** — critical for any external API call with variable latency.

**Scenario C:**
> "You want your outreach agent to automatically send messages to prospects when the AI score is above 8. What governance concern does this raise?"

Answer: Autonomous external action without HITL. The agent could send messages to people who haven't consented, at inappropriate times, with wrong information. Add a human approval gate before any external send.
