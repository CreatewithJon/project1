# GH600_PROJECT_STATE.md — GH-600 Ecosystem
> The GH-600 ecosystem contains two distinct categories of assets with different owners and purposes.
> Do not treat the entire ecosystem as personal OR as entirely Agentic Systems.
> Last updated: 2026-06-12.

---

## Critical Distinction — Two Categories

The GH-600 ecosystem is not a single project. It is two separate categories of work that happen to share infrastructure.

```
GH-600 Ecosystem
│
├── CATEGORY A — Personal Certification Materials
│   ├── Owner: Jonathan Cardona (personal)
│   ├── Purpose: Exam preparation for the GH-600 Agentic AI Developer certification
│   └── Not an Agentic Systems asset. Not a DWT asset.
│
└── CATEGORY B — Educational & Workforce Development Materials
    ├── Owner: Agentic Systems
    ├── Purpose: Curriculum development, UNLV course proof-of-concept, workforce development
    └── Not a DWT asset. DWT may reference only as portfolio example with attribution.
```

**Neither category belongs to Digital Wealth Transfer.**

---

## CATEGORY A — Personal Certification Materials

**Owner:** Jonathan Cardona
**Purpose:** Personal preparation for the GH-600 Agentic AI Developer certification exam
**Audience:** Jonathan Cardona only

### What's Included

| Asset | Description |
|---|---|
| `app/gh600/` | Study dashboard and login — personal exam prep UI |
| `app/gh600/GH600Dashboard.tsx` | Interactive study dashboard |
| `app/gh600/login/` | Password entry for the dashboard |
| `app/api/gh600-auth/` | Auth API — cookie-based access control |
| `gh600-lab/domains/` | Deep-dive study guides per exam domain |
| `gh600-lab/flashcards/` | Quick-review flashcards |
| `gh600-lab/practice-exams/` | 30-question practice exam |
| `gh600-lab/notes/` | Personal study notes |
| `gh600-lab/diagrams/` | Architecture diagrams for exam concepts |

### What This Is Not

- Not an Agentic Systems deliverable
- Not a DWT product or feature
- Not shareable curriculum — it is personal exam prep
- Not intended for any audience beyond Jonathan

### Access

Password-protected at `/gh600` via middleware cookie guard.
Password: `GH600_PASSWORD=gh600dwt` (stored in `.env.local`).

### Open Issues

| Issue | Priority |
|---|---|
| `app/gh600/GH600Dashboard.tsx` is untracked — breaks fresh clone | High |
| `gh600-lab/` directory is untracked | High |

---

## CATEGORY B — Educational & Workforce Development Materials

**Owner:** Agentic Systems
**Purpose:** Curriculum development for the GH-600 / UNLV course proof-of-concept and workforce development programs
**Audience:** Eventual course participants; instructors; institutional partners (UNLV and others)

These are **Agentic Systems intellectual property**. They are developed in Jonathan's working environment but belong to Agentic Systems as a business deliverable.

### What's Included

| Asset | Description |
|---|---|
| `gh600-lab/projects/` | Maps certification concepts to real-world case studies |
| `gh600-lab/examples/` | Real artifact files usable as course teaching materials |
| `gh600-lab/agents/` | Agent definition examples for student instruction |
| `gh600-lab/mcp/` | MCP configuration patterns for course exercises |
| `gh600-lab/actions/` | GitHub Actions workflow examples for student labs |
| `gh600-lab/multi-agent/` | Orchestration patterns for advanced curriculum |
| `gh600-lab/security/` | Guardrails and accountability content for course delivery |
| `gh600-lab/evaluation/` | Eval loop patterns for student exercises |
| `gh600-lab/memory-systems/` | Memory type implementations for curriculum reference |
| `gh600-lab/copilot/` | GitHub Copilot patterns for course tooling |
| Big Money Realty case study | Agentic Systems client project used as an educational case study within this curriculum |

### Big Money Realty Classification

Big Money Realty is:
- An **Agentic Systems client project** — built and delivered through Agentic Systems
- An **educational case study** used within the GH-600 / UNLV curriculum
- **Not** a Jonathan Cardona personal project
- **Not** a DWT project
- DWT may reference it only as a portfolio example with full Agentic Systems attribution

Correct classification when referenced anywhere:
> *"An Agentic Systems client project and educational case study used within the GH-600 / UNLV initiative."*

### UNLV Course Proof-of-Concept

The UNLV course initiative is an Agentic Systems project to develop and potentially deliver a formal AI curriculum in partnership with institutional education. The Category B materials in `gh600-lab/` are the working drafts of that curriculum.

Contributors: Jonathan Cardona (Chief AI Officer), Alberto (CEO), Dr. Kenneth A. Cottrell (CBO).

When referencing the UNLV initiative or course curriculum, use:
> *"Developed by the Agentic Systems team as part of the GH-600 / UNLV course proof-of-concept."*

Do not attribute curriculum to Jonathan alone if the team contributed.

---

## What DWT May and May Not Do

| Action | Permitted? |
|---|---|
| Reference Jonathan's GH-600 certification in editorial content | Yes — with attribution to Agentic Systems context |
| Publish articles about agentic AI concepts drawn from study | Yes — as original editorial content |
| Link to or display the `/gh600` dashboard as a DWT feature | No |
| Reference Big Money Realty in DWT articles | Yes — as "an Agentic Systems client project and educational case study" |
| Claim ownership of Category B curriculum | No |
| Use Category B materials as DWT educational content without attribution | No |

---

## Infrastructure Note

Both categories live inside `my-sample-proj` for development convenience. Co-location does not imply shared ownership. The repo host (DWT) is not the owner of either category's content.

The `/gh600` route on `digitalwealthtransfer.com` is password-protected and not linked from any public DWT page. It should remain invisible to DWT readers.

---

## Future Direction

### Category A (Personal)
Once the GH-600 certification is complete, the personal study materials can be archived or removed from the repo. They have no long-term purpose here.

### Category B (Agentic Systems)
Category B materials should eventually be migrated to Agentic Systems infrastructure when that repo and deployment exist. Until then, they are maintained here. They are **not disposable** — they are curriculum IP with potential institutional delivery value.

---

## Session Note for Claude

When a session involves `/gh600` or `gh600-lab/`:

1. **Determine which category the task involves** — personal cert prep (Category A) or curriculum/educational materials (Category B)
2. **Do not add either category to DWT's navigation or public content**
3. **Do not attribute Category B work to Jonathan alone** — it is an Agentic Systems team deliverable
4. **Do not treat Category B as disposable** — it is Agentic Systems IP
5. **If unsure which category a file belongs to** — ask before making changes
