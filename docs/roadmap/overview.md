# Build Roadmap — Phase-Gated Implementation

> **The anti-fragmentation rule:** No new infrastructure until the current phase goal is achieved. Building Phase 3 while Phase 1 revenue is $0 is architectural debt masquerading as ambition.

---

## Phase 0 — Foundation (COMPLETE)

**Goal:** Two live, deployed products with AI functionality and observability.

**Completed:**
- [x] DWT Platform deployed to Vercel (digitalwealthtransfer.com)
- [x] Signal Dashboard deployed (private, password-protected)
- [x] 10 AI-powered API routes across both products
- [x] Shared `callClaude()` helper with Helicone proxy support
- [x] Lead capture forms → Supabase (leads, ai_leads tables)
- [x] Lead Engine: prospect scoring + outreach generation
- [x] Website analyzer (Firecrawl + Claude)
- [x] B-roll pipeline (Higgsfield primary, Runway fallback)
- [x] Middleware auth on Signal Dashboard
- [x] GH600 presentation page (password-protected)
- [x] Full documentation ecosystem (you are reading this)

**Architecture:** 5 layers operational. All AI calls observable. HITL enforced on outreach.

---

## Phase 1 — Revenue Foundation (NOW — until $5K/month)

**Business goal:** First 3 AI systems clients. $750 × 3 = $2,250. Then retainers.

**Technical work (only what serves revenue):**

### P1.1: Prompt Extraction (Week 1)
Extract all system prompts from route files into `lib/prompts/`:

```
lib/prompts/
├── dealership-chat.ts
├── lead-scoring.ts
├── outreach-generation.ts
├── content-draft.ts
├── content-analyze.ts
├── linkedin-generator.ts
├── broll-planner.ts
├── planner-assistant.ts
└── signal-chat.ts
```

Each prompt file exports a versioned constant. Routes import from `lib/prompts/`. This makes prompts:
- Easy to find and edit
- Version-trackable via git
- Testable independently

```typescript
// lib/prompts/lead-scoring.ts
export const LEAD_SCORING_PROMPT_V2 = `You are a sales analyst...`;
export const LEAD_SCORING_PROMPT = LEAD_SCORING_PROMPT_V2;  // Active version
```

### P1.2: Execution Log Table (Week 1)
```sql
CREATE TABLE ai_executions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  route text NOT NULL,
  tag text,
  model text NOT NULL,
  prompt_tokens int,
  completion_tokens int,
  latency_ms int,
  success boolean NOT NULL,
  error_message text,
  created_at timestamptz DEFAULT now()
);
```

Log every AI call. Build a simple dashboard to see daily costs per feature.

### P1.3: Zod Output Validation (Week 2)
Add Zod validation to the 5 routes that parse JSON from Claude:
- lead-engine/score
- lead-engine/outreach
- analyze
- broll/plan
- content/analyze (sections)

If the schema fails, retry once. If the second attempt fails, return a safe fallback.

### P1.4: Client Delivery Template (Week 2)
Build a reusable AI lead system template (landing page + form + CRM + email confirmation) that can be deployed for clients in < 4 hours. This is the product you're selling.

---

## Phase 2 — Scale Foundation ($5K–$10K/month)

**Business goal:** 10+ clients, standardized delivery, first retainers active.

### P2.1: pgvector + Semantic Prospect Search
```sql
CREATE EXTENSION IF NOT EXISTS vector;
ALTER TABLE prospects ADD COLUMN notes_embedding vector(1536);
```

Enable semantic search across prospect notes. Surface similar past prospects when evaluating new leads.

### P2.2: n8n Workflow Automation
Deploy n8n (self-hosted on Railway or Render):
- **Workflow 1:** New DWT lead → score → notify (Slack or email)
- **Workflow 2:** Prospect added → auto-crawl + auto-score
- **Workflow 3:** Content pipeline: YouTube URL saved → transcript → B-roll plan → content drafts

### P2.3: Evaluation System
LLM-as-judge for lead scoring quality. Weekly report on scoring accuracy. Used to improve the scoring prompt over time.

### P2.4: Rate Limiting
Add rate limiting middleware for public AI endpoints:
- Max 10 AI requests per IP per minute
- Hard block after 3x threshold exceeded
- Log all rate limit violations

---

## Phase 3 — Platform ($10K+/month)

**Business goal:** SaaS launch, white-label, partner delivery.

### P3.1: Turborepo Monorepo Migration
Consolidate both products into a single monorepo:

```
dwt-os/
├── apps/
│   ├── platform/        # DWT website
│   └── signal/          # Signal Dashboard
├── packages/
│   ├── ai/              # Shared callClaude(), lib/ai.ts
│   ├── db/              # Shared Supabase client + types
│   ├── prompts/         # Shared prompt library
│   └── ui/              # Shared component library
└── turbo.json
```

One deployment pipeline. Shared code between products. Versioned packages.

### P3.2: Autonomous Tool Use
Migrate lead research pipeline to autonomous function calling:

```typescript
const tools = [
  crawlWebsiteTool,
  searchProspectDatabaseTool,
  scoreProspectTool,
  draftOutreachTool,
];

// Agent decides the sequence based on what it finds
const result = await runAgent({
  task: `Research and score: ${businessName} at ${website}`,
  tools,
  maxIterations: 10,
});
```

### P3.3: Multi-Agent Orchestration with LangGraph
The lead research pipeline becomes a proper multi-agent system:
- **Orchestrator** (coordinates the pipeline)
- **Research Agent** (Firecrawl + web search)
- **Scoring Agent** (Claude with rubric)
- **Outreach Agent** (Claude with brand voice)

### P3.4: White-Label Client Platform
DWT platform becomes deployable for clients:
- Client-branded versions of the AI lead system
- Managed Supabase per client
- Client dashboard for viewing leads
- Automated reporting

---

## Technology Sequencing

```
Phase 1          Phase 2          Phase 3
──────────       ──────────       ──────────
lib/prompts/     pgvector         Turborepo
Zod validation   n8n              LangGraph
Execution log    Eval system      Autonomous tools
Client template  Rate limiting    Multi-agent
                 Semantic search  White-label
```

**The rule:** Each phase's technical additions exist to serve that phase's business goal. Infrastructure that doesn't serve the current business goal gets deferred.

---

## Technical Debt Register

| Debt Item | Impact | Phase to Address |
|---|---|---|
| System prompts in route files | Hard to find, version, test | Phase 1 |
| No Zod validation on JSON output | Occasional parse errors | Phase 1 |
| No execution log | Can't attribute costs precisely | Phase 1 |
| No rate limiting on public AI routes | Abuse risk | Phase 2 |
| No evaluation system | Can't measure quality | Phase 2 |
| Two separate repos | Code duplication | Phase 3 |
| Explicit orchestration only | Limited agent capability | Phase 3 |
| localStorage for planner data | Not cross-device | Phase 2 |
