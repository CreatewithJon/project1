# LLMs vs. AI Agents — The Foundational Distinction

> **This is the most important concept in GH-600.** If you don't understand the difference between a language model and an agent, nothing else will make sense.

---

## Start Here: What is a Language Model?

A language model (LLM) is a **function**. It takes text in, it returns text out.

```
INPUT:  "What is the capital of France?"
OUTPUT: "The capital of France is Paris."
```

That's it. The model has no memory of asking this before. It has no ability to look anything up. It can't take any action in the world. It simply predicts what text should come next, based on patterns learned during training.

This is not a limitation to be ashamed of — it's a design property. LLMs are extraordinarily powerful prediction machines. But prediction is not the same as agency.

---

## What Makes Something an Agent?

An agent is a system that:

1. **Perceives** its environment (gets input from the world)
2. **Reasons** about what to do (uses an LLM to think)
3. **Acts** on the world (calls tools, writes to databases, sends requests)
4. **Loops** — repeating this cycle until the task is complete

The critical additions over a plain LLM call:
- **Tools** (functions the agent can invoke)
- **Memory** (state that persists across steps)
- **A loop** (the ability to take multiple actions)

```
PLAIN LLM:   Input ──→ Model ──→ Output
             (one call, no tools, no loop)

AGENT:       Input ──→ [Observe → Think → Act] ──→ [Observe → Think → Act] ──→ Output
             (multiple calls, with tools, with loop)
```

---

## A Concrete Comparison

**Task:** "Research Acme Plumbing in Las Vegas and tell me if we should pitch them our AI Lead System."

**Plain LLM approach:**
You paste everything you know about Acme Plumbing into the prompt. The model responds based only on what you gave it. If their website has changed, you won't know. If they have 50 Google reviews you didn't copy in, the model doesn't know either.

**Agent approach:**
1. OBSERVE: Receive the task and company URL
2. THINK: "I need to research this company. I'll use the website crawl tool."
3. ACT: Call Firecrawl with the URL → receive 3,000 words of website content
4. OBSERVE: Read the website content
5. THINK: "They have no online lead form, no live chat, a dated website. Good lead."
6. ACT: Call Claude to score: `{ score: 8, reason: "...", recommended_offer: "AI Lead System" }`
7. OBSERVE: Receive score JSON
8. ACT: Write score to Supabase
9. DONE: Return result

The agent **did research** that a plain LLM call cannot do. It used real-world tools to gather information that wasn't in the original prompt.

**This is exactly the `/api/analyze` + `/api/lead-engine` pipeline in this system.**

---

## The Tool Use Pattern

Tools are what give agents their power. A tool is simply a function that the agent can call.

In this system, tools include:
- `crawlUrl()` — Firecrawl website crawler
- `supabase.from().select()` — database read
- `supabase.from().update()` — database write
- `callClaude()` — AI reasoning call
- Higgsfield API — video generation
- Runway ML API — video generation fallback

The agent doesn't "use" these tools autonomously in the way a future AI might. In the current implementation, the tools are explicitly orchestrated by the route handler code. But the pattern is identical — observe, think (call Claude), act (call a tool), loop.

**In a more advanced system (Phase 3 roadmap):**

```typescript
// Future: Claude would select tools autonomously
const tools = [
  {
    name: "crawl_website",
    description: "Crawl a business website and return its content",
    input_schema: { type: "object", properties: { url: { type: "string" } } }
  },
  {
    name: "score_prospect",
    description: "Score a prospect's fit for our AI services",
    input_schema: { ... }
  }
];

// Claude decides which tool to call based on the task
const response = await callClaude({
  messages: [{ role: "user", content: "Research and score Acme Plumbing" }],
  tools,  // ← Claude can now choose to call these
});
```

This is the **function calling** or **tool use** API — where the model itself decides which tool to invoke. GH-600 tests this heavily.

---

## Agents in This System: Current vs. Future

**Current (explicit orchestration):**
The route handler code manually sequences the steps. Claude is called for reasoning, but doesn't decide the flow. The developer hardcodes: first crawl, then score, then store.

**Future (agentic orchestration):**
Claude receives the task, a set of available tools, and autonomously decides the sequence. "To score this prospect, I'll first crawl their website, then check their social presence, then score — unless the website is missing, in which case I'll score on available signals only."

This distinction — **explicit orchestration vs. autonomous tool selection** — is a core GH-600 concept. Know when each is appropriate.

---

## GH-600 Question Types on This Topic

**Conceptual:**
> "What is the key difference between an LLM and an AI agent?"

Answer: An agent has tools (can act on the world), memory (persistent state), and a loop (takes multiple steps). An LLM is a stateless prediction function.

**Scenario:**
> "A developer builds a system where Claude generates a customer email and immediately sends it. What architectural principle is violated?"

Answer: Human-in-the-loop (HITL). Autonomous external actions without human review violate responsible AI deployment principles. The correct design is: Claude drafts, human reviews and approves, system sends.

**Design:**
> "You need an agent that can answer customer questions about product inventory. The inventory updates daily. What memory type does this require?"

Answer: The agent needs access to external memory (episodic or semantic) — the inventory database. It cannot rely on working memory alone (the inventory isn't in its context) or procedural memory (can't hardcode inventory in a system prompt). RAG from a database is the correct pattern.

---

## Summary Table

| Property | LLM Call | Agent |
|---|---|---|
| Memory | None (stateless) | Working + Episodic + Semantic |
| Tools | None | Any callable function |
| Steps | 1 | Multiple |
| Loop | No | Yes |
| External actions | No | Yes (with governance) |
| Cost | Predictable | Variable (depends on loops) |
| Debugging | Simple | Requires tracing |
| GH-600 weight | Background knowledge | Core exam domain |
