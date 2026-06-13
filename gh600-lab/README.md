# GH-600 Lab — Jonathan Cardona

> Your personal study environment for the GH-600 Agentic AI Developer Certification.
> Exam date: **June 2, 2026** — 7 days from May 26.

---

## What GH-600 Actually Tests

The exam is **scenario-based and artifact-reading heavy**. You will be shown:
- GitHub Actions YAML files → identify patterns, find bugs
- Agent definition files → identify missing permissions or misconfiguration
- Hooks JSON → determine what will happen when tool fires
- Audit logs → trace what an agent did and why
- Architecture diagrams → evaluate design choices

You don't need to write code from scratch. You need to **read, reason, and evaluate**.

---

## 6 Official Exam Domains

| # | Domain | Weight | Your Lab File |
|---|--------|--------|---------------|
| 1 | Prepare Agent Architecture & SDLC | 15–20% | [domain-1-architecture.md](domains/domain-1-architecture.md) |
| 2 | Implement Tool Use & Environment | 20–25% | [domain-2-tool-use.md](domains/domain-2-tool-use.md) |
| 3 | Manage Memory, State & Execution | 10–15% | [domain-3-memory.md](domains/domain-3-memory.md) |
| 4 | Evaluation, Error Analysis & Tuning | 15–20% | [domain-4-evaluation.md](domains/domain-4-evaluation.md) |
| 5 | Orchestrate Multi-Agent Coordination | 15–20% | [domain-5-multi-agent.md](domains/domain-5-multi-agent.md) |
| 6 | Implement Guardrails & Accountability | 10–15% | [domain-6-guardrails.md](domains/domain-6-guardrails.md) |

---

## Directory Structure

```
gh600-lab/
├── domains/          ← Deep-dive study guides per domain
├── examples/         ← Real artifact files (agent YAML, hooks, Actions)
├── agents/           ← Agent definition examples
├── mcp/              ← MCP configuration examples
├── actions/          ← GitHub Actions workflow examples
├── multi-agent/      ← Orchestration patterns
├── security/         ← Guardrails and security patterns
├── evaluation/       ← Eval loops and observability
├── memory-systems/   ← All 4 memory types implemented
├── practice-exams/   ← 30-question practice exam
├── flashcards/       ← Quick-review flashcards
├── diagrams/         ← Architecture diagrams in ASCII/Mermaid
├── notes/            ← Your personal notes
└── projects/         ← Project-specific mappings
```

---

## Your Competitive Advantage

Most GH-600 candidates study from slides. You have **live deployed systems** that implement every exam concept:

| Exam Topic | Where It Lives in Your Code |
|---|---|
| System prompts (procedural memory) | Every `SYSTEM_PROMPT` constant in your route files |
| ReAct agent loop | `app/api/lead-engine/` |
| Tool chaining + fallback | `signal-dashboard/app/api/broll/` |
| Working memory | `app/api/dealership-chat/route.ts` (last 10 messages) |
| Episodic memory | Signal Planner localStorage plans |
| Observability proxy | `lib/ai.ts` Helicone integration |
| HITL gate | Lead engine outreach review flow |
| Graceful degradation | `callClaude()` Helicone fallback |
| Auth middleware | `signal-dashboard/middleware.ts` |
| Structured output | Lead scoring JSON enforcement |

When an exam question describes a pattern, you've already built it. That's the difference.

---

## 7-Day Sprint

See the interactive roadmap at `/gh600` → "7-Day Roadmap" tab.

Quick version:
- **Day 1**: Architecture & SDLC — write your first agent YAML
- **Day 2**: Tool Use & MCP — map your APIs to MCP patterns
- **Day 3**: Memory — identify all 4 types in your codebase
- **Day 4**: Evaluation — set up Helicone, read logs
- **Day 5**: Multi-Agent — write a GitHub Actions workflow
- **Day 6**: Guardrails — write hooks, audit your auth
- **Day 7**: Simulation — full practice exam
