# GH600_PROJECT_STATE.md — GH-600 Agentic AI Developer Certification Study System
> Current state of the GH-600 study tool.
> This is an internal tool that lives inside the DWT repo — it is not a DWT product.
> Last updated: 2026-06-12.

---

## Purpose

The GH-600 system is a **personal certification study environment** for Jonathan Cardona's preparation for the GH-600 Agentic AI Developer certification exam.

It is:
- An internal tool
- Password-protected
- Not marketed, not linked from the public DWT site
- Not a product — it is a personal learning environment

It lives inside `my-sample-proj` because it was convenient to co-deploy with the existing infrastructure. It has no relationship to DWT's media mission.

---

## Ownership

**Owner:** Jonathan Cardona (sole user)
**Purpose:** Exam preparation
**Audience:** Jonathan only — no public users, no sharing intended

---

## Audience

**One person: Jonathan Cardona.**

There is no reader, subscriber, customer, or user for this tool beyond its creator. Treat it as a private notebook with a UI.

---

## Current Status

**Phase:** Active study environment — committed but untracked changes pending.

**Access:** Password-protected at `/gh600` via middleware cookie guard. Password: `GH600_PASSWORD=gh600dwt` (stored in `.env.local`).

**Exam domains covered (6 total):**
1. Prepare Agent Architecture & SDLC (15–20%)
2. Implement Tool Use & Environment (20–25%)
3. Manage Memory, State & Execution (10–15%)
4. Evaluation, Error Analysis & Tuning (15–20%)
5. Orchestrate Multi-Agent Coordination (15–20%)
6. Implement Guardrails & Accountability (10–15%)

---

## Included Assets

### Routes
| Route | Purpose |
|---|---|
| `/gh600` | Main study dashboard — `GH600Dashboard` component |
| `/gh600/login` | Password entry — sets auth cookie |

### Components
| File | Purpose |
|---|---|
| `app/gh600/page.tsx` | Page wrapper — imports `GH600Dashboard` |
| `app/gh600/GH600Dashboard.tsx` | Full interactive dashboard — **currently untracked, needs commit** |

### Lab Directory
`gh600-lab/` — 18 subdirectories of study materials (currently untracked)

| Subdirectory | Content |
|---|---|
| `domains/` | Deep-dive study guides per exam domain |
| `examples/` | Real artifact files (agent YAML, hooks, Actions) |
| `agents/` | Agent definition examples |
| `mcp/` | MCP configuration patterns |
| `actions/` | GitHub Actions workflow examples |
| `multi-agent/` | Orchestration patterns |
| `security/` | Guardrails and security patterns |
| `evaluation/` | Eval loops and observability patterns |
| `memory-systems/` | All 4 memory types implemented |
| `practice-exams/` | 30-question practice exam |
| `flashcards/` | Quick-review flashcards |
| `diagrams/` | ASCII/Mermaid architecture diagrams |
| `notes/` | Personal study notes |
| `projects/` | Maps exam topics to live DWT project code |
| `copilot/` | GitHub Copilot patterns |
| `security/` | Security and accountability patterns |

### API
| Route | Purpose |
|---|---|
| `app/api/gh600-auth/route.ts` | Validates password, sets cookie, redirects to `/gh600` |

---

## Excluded Assets

The GH-600 system has no relationship to:
- DWT's media content or editorial mission
- Sovereign OS product development
- Aigentic Systems services
- Crypto Mondays
- Any public-facing DWT page or navigation

---

## Open Issues

| Issue | Priority | Status |
|---|---|---|
| `app/gh600/GH600Dashboard.tsx` is untracked | High | Needs commit — breaks fresh clone |
| `gh600-lab/` directory is untracked | High | Needs commit |

---

## Known Bugs

| Bug | Notes |
|---|---|
| Untracked `GH600Dashboard.tsx` | Page imports the component — works locally but breaks on fresh clone or new machine |

---

## Completed

- [x] Password-protected route via middleware cookie guard
- [x] Login page at `/gh600/login`
- [x] Auth API at `/api/gh600-auth`
- [x] 7-domain study dashboard UI (component refactored to `GH600Dashboard.tsx`)
- [x] Full `gh600-lab/` study environment created (18 subdirectories)
- [x] Practice exam, flashcards, domain guides

---

## Related Projects

| Project | Relationship |
|---|---|
| Digital Wealth Transfer | Co-deployed in the DWT repo — no content relationship |
| `gh600-lab/projects/` | Maps exam topics to actual DWT code for contextual learning |

---

## Future Direction

Once the GH-600 exam is completed:
- The `/gh600` route and `gh600-lab/` directory can be archived or removed
- The study materials have no long-term purpose in the DWT repo
- If any GH-600 content becomes useful as DWT educational articles, extract it — don't link to the internal tool

**The GH-600 system is time-bounded.** It exists for one purpose: pass the exam. After that, it is overhead.

---

## Session Note for Claude

If a session is opened in `my-sample-proj` and the task involves `/gh600` or `gh600-lab/`:
- This is a personal study tool, not a DWT product
- Do not add it to DWT's navigation or public content
- Do not style it to match DWT's media platform aesthetic (it's internal — it just needs to work)
- The only user is Jonathan — optimize for his study needs, not for any audience

---

*This tool lives in the DWT repo by convenience, not by design.*
*It should not be treated as a DWT feature, a product, or a public-facing asset.*
