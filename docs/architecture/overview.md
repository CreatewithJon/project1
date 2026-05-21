# System Architecture Overview

> **The one-sentence version:** This is a five-layer AI operating system where every user action flows through an interface, gets orchestrated into a prompt, is processed by an agent using tools, retrieves context from memory, and is monitored by a governance layer — all in a loop.

---

## Why Architecture Matters

Most AI projects start with a prompt and end with a mess. A single ChatGPT call becomes five. Five becomes a route file with 400 lines. The route file becomes three route files with duplicated logic. Nobody knows what calls what. When something breaks, it's impossible to debug.

**Architecture is the discipline of making systems legible** — to yourself, to future developers, and to the AI agents that will eventually build on top of it.

For GH-600, architecture is not abstract theory. It's the exam. Questions are almost always structured as: "Given this system design, what's wrong with it?" or "Which architectural pattern solves this problem?"

---

## The Five-Layer Model

```
┌─────────────────────────────────────────────────────────────┐
│                    LAYER 1: INTERFACE                        │
│         Web UI · Forms · Chat Widgets · Dashboards           │
│         (What users see and touch)                           │
├─────────────────────────────────────────────────────────────┤
│                  LAYER 2: ORCHESTRATION                      │
│       Prompt Construction · Model Routing · API Gateway      │
│       (What happens before the AI call)                      │
├─────────────────────────────────────────────────────────────┤
│                    LAYER 3: AGENTS                           │
│       Tool Use · ReAct Loop · Multi-Step Reasoning           │
│       (The AI doing the work)                                │
├─────────────────────────────────────────────────────────────┤
│                    LAYER 4: MEMORY                           │
│       Working · Episodic · Semantic · Procedural             │
│       (What the AI knows and remembers)                      │
├─────────────────────────────────────────────────────────────┤
│                   LAYER 5: GOVERNANCE                        │
│       Observability · Auth · Audit Logs · Safety Gates       │
│       (How the system stays safe and debuggable)             │
└─────────────────────────────────────────────────────────────┘
```

Each layer has a single responsibility. Each layer talks to adjacent layers, not across layers. This is the **separation of concerns** principle applied to AI systems.

---

## Data Flow: End-to-End Example

Let's trace a single request through the system — a user submitting a lead on the DWT homepage:

```
USER ACTION
    │
    ▼
[LAYER 1 — INTERFACE]
BusinessLeadForm.tsx submits POST to /api/leads
    │
    ▼
[LAYER 2 — ORCHESTRATION]
route.ts validates input, initializes Supabase client,
constructs insert payload
    │
    ▼
[LAYER 3 — AGENTS]  ← (Not used here — simple form, no AI needed)
N/A for basic lead capture
    │
    ▼
[LAYER 4 — MEMORY]
Supabase INSERT into leads table
Lead stored with name, email, service, lead_type, created_at
    │
    ▼
[LAYER 5 — GOVERNANCE]
Helicone not involved (no AI call)
Vercel logs capture the request
    │
    ▼
RESPONSE: { success: true }
```

Now let's trace a more complex request — scoring a prospect with AI:

```
USER ACTION
    │
    ▼
[LAYER 1 — INTERFACE]
Lead Engine dashboard: "Score Prospect" button clicked
POST /api/lead-engine/prospects/[id]/score
    │
    ▼
[LAYER 2 — ORCHESTRATION]
route.ts fetches prospect from Supabase
Constructs scoring prompt with prospect data injected
Sets model: haiku, maxTokens: 512, tag: "lead-score"
    │
    ▼
[LAYER 3 — AGENTS]
callClaude() called via lib/ai.ts
Claude receives: prospect profile + scoring rubric
Claude reasons about fit, returns JSON: { score, reason, offer }
    │
    ▼
[LAYER 4 — MEMORY]
JSON parsed, Supabase UPDATE on prospects table:
ai_score, ai_score_reason, recommended_offer, status
    │
    ▼
[LAYER 5 — GOVERNANCE]
Helicone logs the call: tokens, latency, model, feature tag
Auth middleware verified session before route was reached
    │
    ▼
RESPONSE: { prospect: updatedRecord }
```

This is GH-600 in action. Every layer fires. Every layer has a job.

---

## The Two Products

### Product 1: DWT Platform (`my-sample-proj`)

The customer-facing platform. Lead capture, AI services delivery, company directory, blog, dealership AI demo, lead engine.

**Architecture profile:**
- Heavy on Layer 1 (public web pages)
- Heavy on Layer 4 (Supabase reads/writes)
- Moderate Layer 3 (AI scoring, outreach, chat)
- Layer 5 via Helicone + Vercel logs

### Product 2: Signal Dashboard (`signal-dashboard`)

The founder's personal AI operating system. Private, password-protected. AI assistants, content engine, B-roll pipeline, BTC market panel.

**Architecture profile:**
- Heavy on Layer 3 (6 AI routes)
- Layer 1 is intentionally minimal (single user, no conversion optimization needed)
- Layer 2 has the richest system prompts (planner, content strategist, YouTube analyst)
- Full Layer 5: middleware auth + Helicone

---

## Technology Stack Mapped to Layers

| Layer | Technology | Role |
|---|---|---|
| Interface | Next.js App Router, Tailwind | Render UI, handle user input |
| Orchestration | `lib/ai.ts`, route handlers | Build prompts, route to models |
| Agents | Anthropic Claude API, Firecrawl | Execute intelligence, use tools |
| Memory | Supabase Postgres, pgvector, localStorage | Persist and retrieve context |
| Governance | Helicone, Next.js middleware, Vercel | Observe, protect, audit |

---

## Key Architectural Decisions

### Decision 1: Raw fetch over SDK
All Claude calls use raw `fetch()` to the Anthropic API, not the `@anthropic-ai/sdk` package. This was intentional — it keeps the dependency surface small and makes it trivial to swap the base URL (which is exactly how Helicone proxying works).

**GH-600 relevance:** SDK vs. direct API is a common exam topic. The tradeoff is: SDK gives you type safety and retry logic; direct fetch gives you full control over headers (required for proxy patterns).

### Decision 2: Shared `callClaude()` helper
Instead of duplicating headers and fetch logic across 10 routes, a single `lib/ai.ts` function handles all calls. This is the **single source of truth** pattern.

**GH-600 relevance:** Modular tool abstraction. Agents should call tools, not embed infrastructure.

### Decision 3: Supabase client initialized inside handlers
The Supabase client is never initialized at module level. It's always created inside the function body. This prevents build-time crashes when env vars aren't set.

**GH-600 relevance:** Environment isolation and fail-safe initialization. Production systems must not crash at startup due to missing config.

### Decision 4: No autonomous external actions
AI agents in this system never send emails, post content, or contact prospects directly. They draft, score, and recommend. Humans execute. This is the **HITL (Human-in-the-Loop)** principle.

**GH-600 relevance:** A primary governance pattern. Exam will ask when HITL is required.

---

## What's Coming (Architecture Roadmap)

| Phase | Addition | Layer |
|---|---|---|
| Phase 2 | pgvector semantic search | Memory |
| Phase 2 | Execution log table | Governance |
| Phase 2 | Prompt versioning in `lib/prompts/` | Orchestration |
| Phase 3 | n8n workflow automation | Orchestration |
| Phase 3 | Multi-agent lead research pipeline | Agents |
| Phase 3 | Turborepo monorepo | All |

---

*See individual layer documents for deep dives: `layer-1-interface.md` through `layer-5-governance.md`*
