# GH-600 Agentic AI Developer Certification — Study Guide Overview

> This study guide uses the Digital Wealth Transfer AI OS as the primary real-world reference for every exam topic. Every concept you need to know is implemented somewhere in this codebase.

---

## What Is GH-600?

The GH-600 Agentic AI Developer Certification tests whether you can design, build, and deploy production AI systems — not whether you can describe AI in the abstract.

The exam is **scenario-based and architectural**. You will be given a system description and asked:
- "What's wrong with this design?"
- "Which pattern solves this problem?"
- "How would you implement X?"
- "What are the risks of Y?"

Understanding concepts matters. But candidates who fail almost always do so because they can explain what RAG is but can't tell you when it's the wrong choice, or what happens to the system when the vector database is unavailable.

---

## Exam Domain Breakdown

| Domain | Estimated Weight | Core Concepts |
|---|---|---|
| 1. Prompt Engineering & LLM Fundamentals | ~18% | System prompts, context windows, structured output, prompt injection |
| 2. Agentic Systems & Tool Use | ~25% | ReAct loop, tool calling, function calling, MCP, agent design |
| 3. Memory Architecture | ~15% | Working, episodic, semantic, procedural memory; RAG; vector databases |
| 4. AI Infrastructure & Orchestration | ~17% | API design, model routing, orchestration engines, async patterns |
| 5. Governance, Observability & Safety | ~15% | Helicone/tracing, HITL, audit logs, prompt injection defense, RBAC |
| 6. Human-AI Interaction Design | ~10% | Interface patterns, trust, fallback UX, responsible disclosure |

---

## How to Use This Study Guide

Each domain has its own document in `gh600-study-guide/`:

```
domain-1-prompt-engineering.md
domain-2-agentic-systems.md
domain-3-memory.md
domain-4-infrastructure.md
domain-5-governance.md
practice-scenarios.md
```

Every domain document follows the same structure for each topic:

1. **Concept explanation** — what it is, in plain English
2. **Technical breakdown** — how it works under the hood
3. **Enterprise context** — why it matters at scale
4. **This system** — where it's implemented in this codebase
5. **Exam scenarios** — likely question types
6. **Review questions** — self-test
7. **Practical exercise** — hands-on reinforcement

---

## The DWT AI OS as Your Study Artifact

You don't need to memorize abstract definitions. You have a live system. For every concept on this exam, you can open a real file and see it working.

| When the exam asks about... | Open this file |
|---|---|
| System prompts | `signal-dashboard/app/api/content/draft/route.ts` |
| Structured JSON output | `app/api/lead-engine/prospects/[id]/score/route.ts` |
| ReAct agent loop | `app/api/analyze/route.ts` |
| Tool chaining with fallback | `signal-dashboard/app/api/broll/generate/route.ts` |
| Working memory (conversation history) | `app/api/dealership-chat/route.ts` |
| Procedural memory | Any route with a `SYSTEM_PROMPT` constant |
| Observability proxy | `lib/ai.ts` (both projects) |
| Auth middleware | `signal-dashboard/middleware.ts` |
| HITL gate | Lead Engine UI — drafts require human review |
| Graceful degradation | `lib/ai.ts` — Helicone fallback logic |
| Input validation | Every route's request body parsing |
| pgvector (roadmap) | `docs/architecture/layer-4-memory.md` |

---

## Learning Path

### Week 1: Foundations
- `education/llm-vs-agents.md`
- `education/tool-calling.md`
- `gh600-study-guide/domain-1-prompt-engineering.md`
- Exercise: Read every `SYSTEM_PROMPT` in both projects. Identify: persona, rules, output format instructions, constraints.

### Week 2: Agents & Memory
- `architecture/layer-3-agents.md`
- `architecture/layer-4-memory.md`
- `education/memory-types.md`
- `education/rag-retrieval.md`
- `gh600-study-guide/domain-2-agentic-systems.md`
- `gh600-study-guide/domain-3-memory.md`
- Exercise: Trace the complete data flow of the lead engine pipeline from button click to database update.

### Week 3: Infrastructure & Governance
- `architecture/layer-2-orchestration.md`
- `architecture/layer-5-governance.md`
- `orchestration/overview.md`
- `governance/overview.md`
- `gh600-study-guide/domain-4-infrastructure.md`
- `gh600-study-guide/domain-5-governance.md`
- Exercise: Set up Helicone. Make 3 different AI calls. Find them in the dashboard. Filter by feature tag.

### Week 4: Scenarios & Review
- `gh600-study-guide/practice-scenarios.md`
- Re-read all architecture documents
- Self-test with review questions at the end of each domain guide

---

## Key Vocabulary (Quick Reference)

| Term | Definition |
|---|---|
| **Agent** | AI system with tools, memory, and a loop |
| **ReAct** | Reason + Act — the observe-think-act loop |
| **Tool Use** | Agent calling an external function |
| **Function Calling** | Model autonomously selecting which tool to invoke |
| **MCP** | Model Context Protocol — standard for AI-tool connections |
| **RAG** | Retrieval-Augmented Generation — inject retrieved context before generation |
| **Embedding** | Vector representation of text meaning |
| **pgvector** | Postgres extension for vector similarity search |
| **Working Memory** | Everything currently in the context window |
| **Episodic Memory** | Stored records of past events, retrieved when needed |
| **Semantic Memory** | Knowledge stored as embeddings, retrieved by meaning |
| **Procedural Memory** | Behavioral knowledge encoded in system prompts |
| **HITL** | Human-in-the-Loop — requiring human approval before action |
| **Observability** | The ability to see what your system is doing |
| **Helicone** | AI observability proxy — logs all model calls |
| **Prompt Injection** | Attack that hijacks AI behavior via malicious input |
| **Graceful Degradation** | System continues working when a dependency fails |
| **Idempotent** | Running an operation twice produces the same result |
| **Context Window** | Maximum tokens the model can process in one call |

---

## Before the Exam: Final Checklist

- [ ] Can explain all 5 layers of the AI OS architecture
- [ ] Can trace a request from UI to AI to database and back
- [ ] Can explain all 4 memory types with examples
- [ ] Can describe the ReAct loop with a real scenario
- [ ] Can explain RAG end-to-end (chunk → embed → store → query → retrieve → augment → generate)
- [ ] Can describe 3 prompt injection defenses
- [ ] Can explain what Helicone is and why it matters
- [ ] Can describe what HITL is and give 2 examples of when it's required
- [ ] Can explain graceful degradation with the Higgsfield → Runway fallback
- [ ] Can design a simple agent system from a scenario description
