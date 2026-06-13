# PORTFOLIO_ARCHITECTURE.md
> Master index for the Jonathan Cardona project ecosystem.
> Every Claude session should read this file first to orient correctly before touching any code or document.
> Last updated: 2026-06-12 (rev 2 — GH-600 dual-category clarification, Crypto Mondays LV moved under Agentic Systems).

---

## The Non-Negotiable Rule for Claude Sessions

**Before writing a single line of code or copy, identify which project you are in.**

Read the active repo path, the domain context, or the task description. Cross-reference it against the project map below. If there is any ambiguity, ask. Mixing projects is the most expensive mistake in this ecosystem.

---

## Founder

**Jonathan Cardona** — Las Vegas, Nevada
First-gen, self-taught. Background: sales, banking, customer support, crypto education, Tesla. Building expertise in AI, automation, cybersecurity, digital assets, and software.

**What he is building:** An interconnected ecosystem of media, tools, and services that makes advanced technology accessible to regular people — with a specific focus on the AI-powered transition happening right now.

---

## Project Map

```
Jonathan Cardona
│
├── Digital Wealth Transfer  ──────────────────── PRIMARY ACTIVE PROJECT
│   ├── Media platform (articles, research, education, commentary)
│   ├── Repo: my-sample-proj
│   ├── Domain: digitalwealthtransfer.com
│   ├── Multi-tenant: shafiknsons.com (client work, co-deployed)
│   └── Internal tools: Lead Engine, Leads Admin, Docs
│       Note: /gh600 route also lives here — see GH-600 note below
│
├── Sovereign OS  ─────────────────────────────── FUTURE PRODUCT
│   ├── Personal intelligence operating system
│   ├── Teased from DWT (waitlist at /sovereign-os)
│   ├── Currently: no separate repo
│   └── Prototype: /dashboard in my-sample-proj
│
├── Agentic Systems  ──────────────────────────── SEPARATE COMPANY
│   ├── AI implementation, automation, and education services
│   ├── Big Money Realty — client project + GH-600/UNLV case study
│   ├── GH-600 / UNLV Course Initiative — curriculum & workforce dev
│   ├── Crypto Mondays Las Vegas — chapter operated by Agentic Systems
│   ├── Other client projects
│   ├── NOT in the DWT repo (except Category B assets in gh600-lab/)
│   └── Separate domain, separate brand
│
└── GH-600 Ecosystem (dual-category — read carefully)
    ├── Category A: Personal certification prep
    │   ├── Owner: Jonathan Cardona (personal)
    │   └── Purpose: Passing the GH-600 exam
    └── Category B: Educational & workforce development
        ├── Owner: Agentic Systems
        └── Purpose: UNLV course proof-of-concept, curriculum IP
```

---

## Project Files Index

| Document | Project | Purpose |
|---|---|---|
| `PORTFOLIO_ARCHITECTURE.md` | All | This file. Master orientation index. |
| `DWT_PROJECT_STATE.md` | Digital Wealth Transfer | Full technical + strategic state of the DWT repo |
| `SOVEREIGN_OS_PROJECT_STATE.md` | Sovereign OS | Product vision, current state, what exists |
| `AGENTIC_SYSTEMS_PROJECT_STATE.md` | Aigentic Systems | Scope boundary — what it is and what not to import into DWT |
| `GH600_PROJECT_STATE.md` | GH-600 Ecosystem | Dual-category: Category A = personal cert prep (Jonathan); Category B = Agentic Systems curriculum IP |
| `PROJECT_STATE.md` | DWT (legacy) | Superseded — contains pre-pivot state. Do not use as source of truth. |
| `STRATEGIC_PIVOT.md` | DWT | Audit of the marketplace-to-media pivot. One-time reference document. |

---

## Separation Rules — What Never Crosses Boundaries

These rules exist because Jonathan runs multiple distinct businesses. Conflating them creates brand, legal, and strategic problems.

### Agentic Systems content NEVER appears on DWT as a service offering
- No service offer pages ("I'll build you an AI system for $750")
- No pricing, no lead forms for AI implementation services
- No "Done for you" service language
- DWT may *editorially discuss* AI systems as a topic — it may not *sell* them
- DWT may reference Agentic Systems projects as portfolio examples **with attribution only**

### Agentic Systems projects require attribution when referenced on DWT
Standard language: *"[Project] is an Agentic Systems project, referenced here as a portfolio example. Digital Wealth Transfer is not the owner, operator, sponsor, or creator of this project."*

### GH-600 Category B materials are Agentic Systems IP — not DWT content
- DWT may reference Jonathan's certification in editorial content
- DWT may not republish curriculum materials as DWT educational content without attribution
- Big Money Realty is "an Agentic Systems client project and educational case study used within the GH-600 / UNLV initiative" — use this exact language

### Crypto Mondays Las Vegas is an Agentic Systems chapter — not a DWT initiative
- No chapter listings, event promotion, or lead capture on DWT
- DWT may reference Bitcoin/crypto as editorial topics — not as CM promotion
- Lead ownership for any CM LV activity belongs to Agentic Systems as chapter operator

### Sovereign OS is a separate product, not a DWT feature
- `/dashboard` in the DWT repo is a prototype/preview — not a shipped product
- Sovereign OS gets its own identity, its own domain when launched
- DWT drives awareness and waitlist signups — it does not host the product

### DWT does not run a provider directory
- No company listings
- No service-provider discovery
- No "get listed" or "claim your listing" flows
- Research and editorial coverage of companies is permitted — marketplace mechanics are not

---

## Working Directory Reference

| Repo / Path | Project | Active? |
|---|---|---|
| `~/my-sample-proj` | Digital Wealth Transfer + GH-600 (both categories) + client demos | Yes |
| `~/signal-dashboard` | Sovereign OS prototype | Yes (separate repo) |
| _(not yet created)_ | Agentic Systems | No repo in this ecosystem yet |

---

## Domain Reference

| Domain | Routes to | Project |
|---|---|---|
| `digitalwealthtransfer.com` | `my-sample-proj` (Vercel) | DWT |
| `shafiknsons.com` | `my-sample-proj/app/dealership-demo/*` (middleware rewrite) | Client work |
| _(future)_ `sovereignos.com` or `sovereign.dwt.com` | Sovereign OS repo | Sovereign OS |
| _(separate)_ Aigentic Systems domain | Separate deployment | Aigentic Systems |

---

## Brand Voice by Project

| Project | Voice | Audience | Tone |
|---|---|---|---|
| DWT | Editorial, educational, curious | Regular people navigating AI transition | Approachable, intelligent, non-corporate |
| Sovereign OS | Product, precision, sovereignty | Builders, self-directed people | Minimal, intentional, premium |
| Agentic Systems | Service + education, results-oriented | Local businesses, institutions, workforce programs | Direct, confident, implementation-focused |
| Crypto Mondays LV | Community, education (chapter under Agentic Systems) | Bitcoin curious, chapter members | Welcoming, educational, decentralized |

---

## Design System — Shared Foundation

All Jonathan Cardona projects share a common visual DNA:

- **Background:** Near-black (`#0B0F1A`, `#0D1117`, `#111827`) — never pure black
- **Text hierarchy:** `/90` body · `/60` secondary · `/35` metadata · `/20` faint
- **Motion:** Subtle and purposeful. Never decorative.
- **Typography:** Tight tracking on headlines (`tracking-[-0.02em]`), generous line height on body
- **Feel:** Cinematic dark mode. Premium but not corporate.

**Accent colors by project context:**
| Color | Hex | Used for |
|---|---|---|
| Blue | `#3b82f6` | DWT primary, trust, professional |
| Violet | `#8b5cf6` | Sovereign OS, intelligence, AI |
| Gold/amber | `#f59e0b` | Bitcoin, wealth, signal |
| Rose/red | `#ef4444` | Energy, urgency, Aigentic Systems |
| Emerald | `#10b981` | Success states, positive performance |

---

## Session Startup Protocol for Claude

When starting a new session on any project in this ecosystem:

1. **Read `PORTFOLIO_ARCHITECTURE.md`** — identify which project this session covers
2. **Read the relevant `*_PROJECT_STATE.md`** — understand current state and open issues
3. **Check git status** — understand what's committed, what's in progress
4. **Do not import context from other projects** — treat each as a separate brand and company
5. **If the session touches the boundary between projects** — stop and clarify with Jonathan before proceeding

---

*This document is the authoritative navigation layer for the Jonathan Cardona project ecosystem.*
*Update it when a new project is created, a project changes scope, or a boundary rule changes.*
