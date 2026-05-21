# Digital Wealth Transfer — AI Operating System Documentation

> **Mission:** Build a modular, production-grade AI operating system that generates leads, automates content, orchestrates agents, and scales into a client-deliverable SaaS platform — while serving as a live learning artifact for enterprise AI architecture and GH-600 certification preparation.

---

## How to Use This Documentation

This is not a typical README. It is a **living knowledge base** — part internal wiki, part engineering handbook, part certification study guide. Read it in order if you are new. Jump to specific sections if you know what you need.

**If you are a founder:** Start with `onboarding/founder.md`
**If you are a developer:** Start with `developer-guide/overview.md`
**If you are studying for GH-600:** Start with `gh600-study-guide/overview.md`
**If you are onboarding a client:** Start with `onboarding/client.md`
**If you want to understand the architecture:** Start with `architecture/overview.md`

---

## Documentation Map

```
docs/
│
├── README.md                          ← You are here (master map)
│
├── architecture/
│   ├── overview.md                    ← Full system architecture
│   ├── layer-1-interface.md           ← Interface Layer deep dive
│   ├── layer-2-orchestration.md       ← Orchestration Layer deep dive
│   ├── layer-3-agents.md              ← Agent Layer deep dive
│   ├── layer-4-memory.md              ← Memory Layer deep dive
│   ├── layer-5-governance.md          ← Governance Layer deep dive
│   └── system-topology.md             ← How products connect
│
├── education/
│   ├── llm-vs-agents.md               ← Foundation: what is an AI agent?
│   ├── tool-calling.md                ← How agents use tools
│   ├── react-pattern.md               ← The ReAct reasoning loop
│   ├── memory-types.md                ← 4 types of AI memory
│   ├── rag-retrieval.md               ← Retrieval-Augmented Generation
│   └── multi-agent.md                 ← Multi-agent coordination
│
├── gh600-study-guide/
│   ├── overview.md                    ← GH-600 exam breakdown
│   ├── domain-1-prompt-engineering.md ← Domain 1 study guide
│   ├── domain-2-agentic-systems.md    ← Domain 2 study guide (heaviest)
│   ├── domain-3-memory.md             ← Domain 3 study guide
│   ├── domain-4-infrastructure.md     ← Domain 4 study guide
│   ├── domain-5-governance.md         ← Domain 5 study guide
│   └── practice-scenarios.md          ← Scenario drills
│
├── agents/
│   └── overview.md                    ← Agent inventory and specs
│
├── orchestration/
│   └── overview.md                    ← Workflow orchestration guide
│
├── memory/
│   └── overview.md                    ← Memory and retrieval guide
│
├── governance/
│   └── overview.md                    ← Observability and governance
│
├── onboarding/
│   ├── founder.md                     ← Founder setup guide
│   ├── developer.md                   ← Developer setup guide
│   └── client.md                      ← Client onboarding guide
│
├── developer-guide/
│   └── overview.md                    ← Developer standards and conventions
│
├── roadmap/
│   └── overview.md                    ← Phase-gated build roadmap
│
└── operations/
    └── overview.md                    ← SOPs and operational procedures
```

---

## Platform Overview

**Digital Wealth Transfer AI OS** is a two-product, five-layer AI operating system:

| Product | URL | Purpose |
|---|---|---|
| DWT Platform | digitalwealthtransfer.com | Lead gen, marketplace, AI services delivery |
| Signal Dashboard | Private | Founder OS — productivity, content, intelligence |

**Current AI surface area:** 10 live API routes, 2 deployed products, Helicone observability, Supabase persistence, Firecrawl web intelligence.

---

## GH-600 Topic Map

Every major GH-600 exam topic is implemented in this codebase:

| GH-600 Topic | Where to Learn It | Where It's Implemented |
|---|---|---|
| Prompt Engineering | `education/`, `gh600/domain-1` | Every `SYSTEM_PROMPT` in API routes |
| ReAct Agent Pattern | `education/react-pattern.md` | `/api/lead-engine` pipeline |
| Tool Use | `education/tool-calling.md` | Firecrawl + Claude + Supabase chain |
| Memory Architecture | `education/memory-types.md` | Conversation history, localStorage, pgvector |
| RAG / Retrieval | `education/rag-retrieval.md` | Prospect notes, vector search (Phase 2) |
| AI Observability | `governance/overview.md` | Helicone proxy, feature tags |
| HITL Gates | `education/multi-agent.md` | Outreach drafts require human approval |
| Multi-Agent | `education/multi-agent.md` | B-roll pipeline (multi-tool chain) |
| Governance | `governance/overview.md` | Auth middleware, API key guards |
| Infrastructure | `developer-guide/overview.md` | Next.js, Supabase, Vercel, callClaude() |

---

## Architecture Philosophy

This system was built on four principles:

**1. Layers are explicit.** Every component belongs to one of five layers. If you can't say which layer a component lives in, it's probably doing too much.

**2. Tools are modular.** AI agents don't do everything themselves. They call tools. Tools are functions. Functions are testable. This keeps agents small and debuggable.

**3. Humans stay in the loop.** The system generates, drafts, and recommends. Humans approve, send, and decide. No autonomous external action without a gate.

**4. Observable by default.** Every AI call is tagged, logged, and traceable. You can't debug what you can't see.

---

*Last updated: 2026-05-20 | Maintained by Jonathan Cardona*
