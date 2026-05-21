# Domain 2 — Agentic Systems & Tool Use (~25% of Exam)

> This is the heaviest domain. Master it and you're most of the way to passing.

---

## Topic 2.1: The ReAct Pattern

### Concept
ReAct (Reason + Act) is the foundational loop for all agentic behavior. The agent alternates between reasoning about its situation and taking actions in the world.

```
OBSERVE → THINK → ACT → OBSERVE → THINK → ACT → ... → DONE
```

### Why It Matters
Without a loop, AI is just question-answering. The loop is what makes AI *agentic* — capable of completing multi-step tasks, handling unexpected results, and adapting its plan based on what it finds.

### Enterprise Context
Every enterprise AI deployment of consequence uses the ReAct pattern or a variant of it. Customer support agents that look up order status, then check inventory, then generate a resolution — that's ReAct. Code generation agents that write code, run tests, read error output, fix the code — that's ReAct.

### In This System
The lead engine pipeline:
```
OBSERVE:  Prospect record loaded from Supabase
THINK:    Claude reasons about fit, score, recommended offer
ACT:      Supabase UPDATE with score
OBSERVE:  Scored prospect available for outreach
THINK:    Claude generates 6 personalized message variants
ACT:      Supabase UPDATE with outreach_drafts
[GATE]:   Human reviews and selects messages
```

The B-roll pipeline:
```
OBSERVE:  Video transcript received
THINK:    Claude identifies 6-8 moments needing B-roll
ACT:      Higgsfield API call for video generation
OBSERVE:  Higgsfield timeout (failure signal)
THINK:    Primary tool failed, activate fallback
ACT:      Runway ML API call
OBSERVE:  Job ID received
THINK:    Poll for completion
ACT:      Return video URL
```

### Exam Scenarios

**Q:** "Your agent is stuck in a loop — it keeps calling the same tool with the same parameters and never terminates. What safeguard is missing?"
**A:** Maximum iteration count. Every ReAct loop must have a stop condition beyond task completion. Use a counter: if iterations > N, break and return what you have or surface an error.

**Q:** "How does the ReAct pattern prevent agents from hallucinating facts?"
**A:** By grounding each THINK step in real observations. The agent's reasoning is anchored to actual tool outputs — real website content, real database records, real API responses — not fabricated information.

### Review Questions
1. What does ReAct stand for and what are the three phases of the loop?
2. What happens if a ReAct loop has no maximum iteration limit?
3. Give an example of an observation that would cause an agent to change its plan mid-task.
4. How is the B-roll pipeline in this system an example of ReAct with fallback?

---

## Topic 2.2: Tool Use vs. Function Calling

### Concept

**Tool Use (explicit):** The developer decides when to call which tool. The AI is used only for reasoning.

**Function Calling (autonomous):** The AI decides which tool to call based on the task description and available tool definitions.

### Technical Breakdown

**Explicit tool use** (current system):
```typescript
// Developer sequences the steps
const crawlResult = await crawlUrl(url);       // Developer calls tool
const analysis = await callClaude({ ... });    // Developer calls AI
await supabase.from("leads").update({ ... });  // Developer calls tool
```

**Function calling** (future system):
```typescript
// AI sequences the steps
const tools = [
  { name: "crawl_website", description: "...", input_schema: { ... } },
  { name: "update_lead_score", description: "...", input_schema: { ... } },
];

const response = await callClaude({ tools, messages });
// Response may contain: { type: "tool_use", name: "crawl_website", input: { url } }
// Developer executes the tool, feeds result back
// AI continues until done
```

### Enterprise Context
Startups and internal tools often use explicit orchestration (simpler, more predictable). Enterprise deployments with complex, variable workflows move toward function calling to handle the long tail of edge cases without hardcoding every path.

### In This System
All current agents use explicit orchestration. The codebase is structured to migrate to function calling in Phase 3 — the `callClaude()` helper in `lib/ai.ts` will accept a `tools` parameter.

### Exam Scenarios

**Q:** "When should you use explicit orchestration over autonomous function calling?"
**A:** When the workflow is deterministic (always the same steps), when you need maximum predictability and debuggability, when the risk of unexpected tool calls is high (e.g., tools that send emails or charge cards). Explicit orchestration is safer; function calling is more flexible.

**Q:** "A model is given 12 tools. How does it decide which to call?"
**A:** It reads the tool descriptions. The description is not just documentation — it's the model's decision criteria. Poor descriptions lead to wrong tool selections or no tool calls at all.

---

## Topic 2.3: Agent Memory in the Loop

### Concept
Agents need to remember what they've done in the current task to avoid repeating steps, resolve contradictions, and build on previous findings.

### In This System: The Conversation Pattern

```typescript
// Conversation history IS the agent's task memory
const messages = [
  { role: "user", content: "Research Acme Plumbing" },
  { role: "assistant", content: "I found their website. They have no lead form..." },
  // Tool result injected as user message:
  { role: "user", content: "[crawl_result]: Acme Plumbing website content..." },
  { role: "assistant", content: "Based on the content, I'll score them 7/10 because..." },
];
```

The message history is the agent's short-term task memory. Each step adds to it.

### Exam Scenarios

**Q:** "Your agent is completing a 5-step research task but loses context of step 1's findings by step 5. What's likely happening?"
**A:** Context window overflow or improper message management. Either the total token count has exceeded the model's context window, or previous observations aren't being properly included in subsequent calls. Solution: summarize early findings into a compact "working notes" string that's included in later steps.

---

## Topic 2.4: Multi-Agent Systems

### Concept
Instead of one agent doing everything, complex tasks are split across multiple specialized agents that communicate results to each other.

```
ORCHESTRATOR AGENT
  │
  ├──→ RESEARCH AGENT (Firecrawl + Google search)
  │         │ returns: { companyProfile, websiteAnalysis }
  │
  ├──→ SCORING AGENT (Claude with scoring rubric)
  │         │ returns: { score, reason, recommendedOffer }
  │
  └──→ OUTREACH AGENT (Claude with brand voice persona)
            │ returns: { 6 message variants }
```

### Why Multi-Agent?
- **Parallelism:** Multiple agents can work simultaneously
- **Specialization:** Each agent has a focused system prompt optimized for one task
- **Modularity:** You can replace or upgrade one agent without touching others
- **Cost optimization:** Simple tasks can use cheaper models (Haiku); complex reasoning uses better models (Sonnet/Opus)

### In This System
The lead engine pipeline is a sequential multi-agent-style system running in a single route. Phase 3 will decompose this into proper isolated agents with an orchestrator.

### Exam Scenarios

**Q:** "Your research agent and scoring agent are combined into one route. What are the risks of this design?"
**A:** Single point of failure (if either step fails, all fails), lack of modularity (hard to update scoring logic without touching research logic), no parallelism, and no ability to reuse research results for other purposes (e.g., content generation).

**Q:** "How does a multi-agent system communicate results between agents?"
**A:** Via shared state (database), message queues, or direct API calls. The orchestrator typically coordinates, passing outputs from one agent as inputs to the next. Supabase is the state store in this system.

---

## Topic 2.5: Human-in-the-Loop (HITL)

### Concept
HITL is an architectural pattern where human approval is required before an agent takes certain actions — specifically, irreversible or externally-visible actions.

### The HITL Spectrum

```
FULLY AUTONOMOUS          ADVISORY              FULLY MANUAL
(no human in loop)     (human can override)  (human does everything)
        │                    │                      │
        ▼                    ▼                      ▼
  High risk            Balanced                Safe but slow
  Fast                 Most enterprise AI      No AI value
  Hard to govern       default                 
```

Most production enterprise AI systems sit in the advisory zone.

### In This System

```
AI DRAFTS outreach messages (autonomous)
    │
    ▼
[HITL GATE] — Human reviews 6 message variants in the dashboard
    │
    ▼
Human selects and SENDS the message (manual)
```

The AI does the hard work (generating 6 personalized variants). The human makes the judgment call (which one to send). Neither could do this as well alone.

### When HITL Is Required (Exam Checklist)
- [ ] Sending external communications (email, SMS, social)
- [ ] Financial transactions
- [ ] Deleting or overwriting important records
- [ ] Making commitments on behalf of a person or company
- [ ] Publishing content publicly
- [ ] Any action that cannot be easily reversed

### Exam Scenarios

**Q:** "An AI outreach agent is configured to automatically send LinkedIn messages when a prospect scores 8+. What's the governance risk?"
**A:** Autonomous external communication without human review. The agent may contact someone at the wrong time, with wrong information, or someone who has explicitly asked not to be contacted. Regulatory exposure (GDPR, CAN-SPAM), reputational risk, and loss of quality control. Add a HITL gate before any send action.

**Q:** "When is HITL NOT appropriate?"
**A:** For internal, reversible, low-stakes actions. Automatically scoring a lead (internal DB update), generating a draft for review (no external action), or summarizing a document (informational only) don't require HITL. Over-gating slows the system without adding safety.

---

## Domain 2 Practice Questions

1. Draw the ReAct loop for an agent that researches a competitor company and writes a competitive analysis.

2. You're building an agent that manages customer refunds. List which steps require HITL and which can be autonomous.

3. Your function-calling agent has a tool called `send_message`. The description reads: "Send a message." What's wrong, and how do you fix it?

4. An agent in a loop is calling an external API that costs $0.10 per call. It runs 500 iterations before terminating. What governance control should have prevented this?

5. Compare explicit orchestration vs. autonomous function calling for: (a) a lead scoring pipeline with fixed steps, (b) a customer support agent that must handle 50 different inquiry types.
