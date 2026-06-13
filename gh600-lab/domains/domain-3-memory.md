# Domain 3 — Manage Memory, State & Execution (10–15%)

---

## What This Domain Tests

- The 4 memory types and when to use each
- Context drift and how to prevent it
- Durable artifacts as state bridges between agent steps
- Session persistence patterns

---

## The 4 Memory Types — Master This Table

| Type | Where It Lives | Duration | How It Works | Your Code |
|---|---|---|---|---|
| **Working** | Context window | This call only | Everything currently in the model's context | Last 10 messages in dealership-chat |
| **Episodic** | External storage (DB, localStorage) | Session → long-term | Retrieved and injected as context when relevant | Signal Planner localStorage plans |
| **Semantic** | Vector database (pgvector) | Permanent | Embeddings searched by meaning, not exact match | Supabase + pgvector (your roadmap) |
| **Procedural** | System prompts / fine-tuning | Permanent | Behavioral knowledge encoded before any user message | Every `SYSTEM_PROMPT` constant in your routes |

---

## Deep Dive: Working Memory

Working memory = everything in the context window right now.

```typescript
// This is working memory — the last 10 messages
const history = conversationHistory.slice(-10);

const response = await callClaude({
  system: SYSTEM_PROMPT,
  messages: [
    ...history,           // ← working memory: what we talked about this session
    { role: "user", content: userMessage }
  ]
});
```

**Critical properties:**
- Lost when the context window closes (no persistence)
- Limited by model's context window (128k tokens for Claude)
- The cheapest form of memory (no retrieval cost)
- Context drift happens here — model "forgets" early parts of long conversations

**Exam trap:** A long-running agent with only working memory will lose context on earlier instructions. Solution: write checkpoints to durable artifacts.

---

## Deep Dive: Episodic Memory

Episodic memory = records of what happened, stored externally, retrieved when needed.

```typescript
// Episodic memory pattern — Signal Planner
const storedPlans = localStorage.getItem('weekly-plan'); // retrieve

const response = await callClaude({
  system: SYSTEM_PROMPT,
  messages: [
    { 
      role: "user", 
      content: `My current weekly plan: ${storedPlans}\n\nUser: ${userMessage}` 
      // ↑ inject stored history as context
    }
  ]
});

// After getting response, save updated plan
localStorage.setItem('weekly-plan', updatedPlan); // store
```

**Use episodic memory when:**
- You need to remember what happened across sessions
- The data is structured (dates, decisions, events)
- You need to show users their history

---

## Deep Dive: Semantic Memory

Semantic memory = knowledge stored as vector embeddings, retrieved by meaning similarity.

```sql
-- Enable pgvector in Supabase
CREATE EXTENSION IF NOT EXISTS vector;

-- Store prospect notes as embeddings
CREATE TABLE prospect_memory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id uuid REFERENCES prospects(id),
  content text,
  embedding vector(1536),  -- OpenAI ada-002 dimensions
  created_at timestamptz DEFAULT now()
);

-- Search by semantic similarity
SELECT content, 1 - (embedding <=> $1) AS similarity
FROM prospect_memory
WHERE prospect_id = $2
ORDER BY similarity DESC
LIMIT 5;
```

**Use semantic memory when:**
- You have large amounts of unstructured text
- You need "find me things related to X" not "find me record with ID = X"
- Powering RAG (Retrieval-Augmented Generation)

**This is your roadmap item** — prospect notes embeddings for the lead engine.

---

## Deep Dive: Procedural Memory

Procedural memory = how the agent knows to behave. Encoded in system prompts or fine-tuning.

```typescript
// This IS procedural memory — behavioral knowledge baked in
const SYSTEM_PROMPT = `
You are an AI lead scoring agent for Digital Wealth Transfer.
ALWAYS return valid JSON. NEVER fabricate scores. 
If data is insufficient, return score: null with reason.
You score prospects on fit with local Las Vegas businesses.
`;

// This system prompt is loaded ONCE at module level
// The AI "knows" how to behave without being told every call
```

**Why it matters on the exam:**
- System prompt changes = procedural memory updates
- Fine-tuning = the most expensive form of procedural memory
- For most applications, system prompts are sufficient

---

## Context Drift — What It Is and How to Prevent It

**Context drift** = an agent's task execution diverges from the original intent over multiple steps.

**How it happens:**
1. Agent starts task with clear instructions
2. Over 10+ steps, early context compresses/truncates
3. Agent begins interpreting ambiguous situations incorrectly
4. Output diverges from original goal

**Prevention patterns:**

```typescript
// Pattern 1: Anchor re-injection
// Periodically inject original task summary back into context
const anchorMessage = `
[TASK ANCHOR - Step ${stepNumber}]
Original task: ${originalTask}
Success criteria: ${successCriteria}
Current status: ${currentStatus}
`;

// Pattern 2: Durable artifacts as checkpoints
// Write state to file/DB after each major step
await supabase.from('agent_checkpoints').insert({
  run_id: runId,
  step: stepNumber,
  state: JSON.stringify(currentState),
  original_task: originalTask,
});

// Pattern 3: Structured output validation
// After each step, validate output matches expected schema
const result = OutputSchema.safeParse(agentOutput);
if (!result.success) {
  // Re-prompt with original context
}
```

---

## Exam Practice Questions

**Q1:** What memory type is lost when a context window closes?

> **A:** Working memory — it exists only within the current context window and is not persisted.

**Q2:** Your agent runs a 20-step research task. At step 15, it starts ignoring constraints set at step 1. What's happening and how do you fix it?

> **A:** Context drift — early instructions are compressing or being deprioritized. Fix: inject a task anchor (summary of original constraints) every N steps, and write checkpoints to durable artifacts.

**Q3:** You need your agent to "remember" insights about a prospect across multiple sessions. Which memory type and what technology?

> **A:** Episodic memory (structured notes) or Semantic memory (embeddings for similarity search). Technology: Supabase table for episodic, pgvector for semantic.

**Q4:** What's the difference between episodic and semantic memory?

> **A:** Episodic = structured records of events, retrieved by ID/date/category. Semantic = unstructured text stored as embeddings, retrieved by meaning similarity. Episodic = "what happened on June 1", Semantic = "find me things related to cash flow problems".

---

## Your Build Task for Day 3

Identify every memory type in your codebase and document them:

```
Working memory:
- app/api/dealership-chat/route.ts: last 10 messages in history array
- signal-dashboard/app/api/content/draft: message history sent per call

Episodic memory:
- signal-dashboard/app/planner: plans stored in localStorage
- signal-dashboard/app/api/broll: job status stored for polling

Procedural memory:
- Every SYSTEM_PROMPT constant across all routes
- Count them: how many system prompts exist? What do they have in common?

Semantic memory (MISSING — roadmap):
- Prospect notes could be stored as embeddings in Supabase
- Blog content could be embedded for internal search
```

This exercise = real GH-600 exam practice.
