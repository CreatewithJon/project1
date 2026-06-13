# PORTFOLIO_ARCHITECTURE.md
> Master index for the Jonathan Cardona project ecosystem.
> Every Claude session should read this file first to orient correctly before touching any code or document.
> Last updated: 2026-06-12.

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
│   └── Internal tools: Lead Engine, GH-600, Leads Admin, Docs
│
├── Sovereign OS  ─────────────────────────────── FUTURE PRODUCT
│   ├── Personal intelligence operating system
│   ├── Teased from DWT (waitlist at /sovereign-os)
│   ├── Currently: no separate repo
│   └── Prototype: /dashboard in my-sample-proj
│
├── Aigentic Systems  ─────────────────────────── SEPARATE COMPANY
│   ├── AI implementation and automation services
│   ├── NOT in the DWT repo
│   ├── NOT in DWT's navigation or content
│   └── Separate domain, separate brand
│
└── Crypto Mondays  ────────────────────────────── SEPARATE GLOBAL BRAND
    ├── Community chapter brand
    ├── NOT in the DWT repo
    ├── Lead ownership: chapter operator (not DWT)
    └── Separate domain, separate brand
```

---

## Project Files Index

| Document | Project | Purpose |
|---|---|---|
| `PORTFOLIO_ARCHITECTURE.md` | All | This file. Master orientation index. |
| `DWT_PROJECT_STATE.md` | Digital Wealth Transfer | Full technical + strategic state of the DWT repo |
| `SOVEREIGN_OS_PROJECT_STATE.md` | Sovereign OS | Product vision, current state, what exists |
| `AGENTIC_SYSTEMS_PROJECT_STATE.md` | Aigentic Systems | Scope boundary — what it is and what not to import into DWT |
| `GH600_PROJECT_STATE.md` | GH-600 Study System | Internal cert prep tool living inside the DWT repo |
| `PROJECT_STATE.md` | DWT (legacy) | Superseded — contains pre-pivot state. Do not use as source of truth. |
| `STRATEGIC_PIVOT.md` | DWT | Audit of the marketplace-to-media pivot. One-time reference document. |

---

## Separation Rules — What Never Crosses Boundaries

These rules exist because Jonathan runs multiple distinct businesses. Conflating them creates brand, legal, and strategic problems.

### Aigentic Systems content NEVER appears on DWT
- No service offer pages on DWT ("I'll build you an AI system for $750")
- No pricing, no lead forms for AI implementation services
- No "Done for you" service language on DWT
- DWT may *editorially discuss* AI systems as a topic — it may not *sell* them

### Crypto Mondays content NEVER appears on DWT
- No chapter listings, no event promotion, no lead capture for CM
- DWT may reference Bitcoin/crypto as a topic — it may not act as a CM platform
- Lead ownership for any CM-adjacent activity belongs to the chapter operator

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
| `~/my-sample-proj` | Digital Wealth Transfer + GH-600 + client demos | Yes |
| `~/signal-dashboard` | Sovereign OS prototype | Yes (separate repo) |
| _(not yet created)_ | Aigentic Systems | No repo in this ecosystem |
| _(not yet created)_ | Crypto Mondays | No repo in this ecosystem |

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
| Aigentic Systems | Service, results-oriented | Local businesses, SMBs | Direct, confident, implementation-focused |
| Crypto Mondays | Community, education | Bitcoin curious, chapter members | Welcoming, educational, decentralized |

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
