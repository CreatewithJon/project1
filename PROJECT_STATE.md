# PROJECT_STATE.md — Digital Wealth Transfer
> Handoff document. Last updated: 2026-06-12.

---

## Architecture

**Framework:** Next.js 16.2.2 (App Router, React 19.2.4)  
**Language:** TypeScript strict  
**Styling:** Tailwind CSS v4 (`@import "tailwindcss"` — no `@tailwind` directives)  
**Database:** Supabase (Postgres + Storage)  
**AI:** Anthropic Claude API via `lib/ai.ts` (`callClaude()` — defaults to Haiku 4.5, optional Helicone proxy)  
**Deployment:** Vercel → `digitalwealthtransfer.com` (auto-deploy from `main`)  
**Scraping:** Apify (`lib/apify.ts`) + Firecrawl (`lib/firecrawl.ts`)

### Multi-Tenant Routing

`middleware.ts` handles two concerns:
1. **Domain rewriting** — `shafiknsons.com` → `/dealership-demo/*` (and `/admin` → `/dealership-admin`)
2. **Cookie-based auth guards** — `/gh600`, `/docs`, `/leads-admin`, `/dealership-admin` each require a password cookie, redirect to `/[section]/login` if absent

### Data Layer

| Source | Content |
|---|---|
| `lib/data/articles.ts` | 50+ static blog articles in 4 categories |
| `lib/data/companies.ts` | 50+ Las Vegas AI/blockchain/fintech companies |
| `lib/data/vehicles.ts` | Dealership vehicle catalog (static seed reference) |
| Supabase `leads` | Form submissions from all lead forms |
| Supabase `ai_leads` | AI systems inquiry submissions |
| Supabase `vehicles` | Live dealership inventory (managed via `/dealership-admin`) |
| Supabase `prospects` (implied) | Lead Engine prospect records |

### Key Patterns

- `params` and `searchParams` are Promises — always `await` them (Next.js 16 breaking change)
- `PageProps<'/path/[param]'>` and `RouteContext` are globally available — no import needed
- Supabase client initialized **inside** handler functions via `getSupabase()` — never at module level (build crashes otherwise)
- Route Handlers: `export async function GET/POST(request: NextRequest) {}`

---

## Product Map

| Product | Entry Point | Auth | Notes |
|---|---|---|---|
| DWT main site | `/` | Public | Services, directory, blog |
| AI Systems portfolio | `/portfolio` | Public | Credential showcase |
| Personal dashboard | `/dashboard` | Public | BTC price, productivity, AI panels |
| Blog | `/blog`, `/blog/[slug]` | Public | Static mock data |
| Company directory | `/directory`, `/companies/[slug]` | Public | Static mock data |
| Leads admin | `/leads-admin` | `LEADS_ADMIN_PASSWORD` cookie | View Supabase leads |
| Lead Engine | `/lead-engine` | (implied auth) | Apify scraping + AI prospect scoring |
| GH-600 study system | `/gh600` | `GH600_PASSWORD=gh600dwt` | 7-domain cert study dashboard |
| Docs viewer | `/docs` | `DOCS_PASSWORD=dwt2026` | Password-protected knowledge base |
| Dealership site | `/dealership-demo/*` | Public | Also served at `shafiknsons.com` |
| Dealership admin | `/dealership-admin` | `DEALERSHIP_ADMIN_PASSWORD` | Inventory + lead CRM |
| Lumbre demo | `/lumbre-demo` | Public | Luxury order form demo |
| Links hub | `/links` | Public | Biolink page |

---

## Key Decisions

| Decision | Rationale |
|---|---|
| Static mock data for directory & blog | No CMS needed at current scale; avoids DB dependency for read-only content |
| Multi-tenant via middleware rewrite | One Vercel deployment serves both `digitalwealthtransfer.com` and `shafiknsons.com` — no separate project needed |
| Cookie-based auth (no NextAuth) | Minimal surface area; internal-only tools don't need full auth system |
| Supabase client inside handler (not module level) | Build crashes if env vars absent at module evaluation time |
| Claude Haiku as default | Speed + cost; Sonnet/Opus available for quality-sensitive calls |
| Apify for Google Maps scraping | Managed scraping infrastructure; no headless browser to maintain |
| No test suite | `npx tsc --noEmit` is primary correctness check; ship velocity prioritized |
| No `.env.example` | All env vars in `.env.local` (git-ignored); Vercel vars set via CLI |

---

## Completed Issues

1. **shafiknsons.com domain routing** — Middleware host-based rewrite; `/admin` redirect; static asset exemptions
2. **Double-rewrite 404 on internal navigation** — Already-rewritten paths exempted from second rewrite pass
3. **Static assets blocked by middleware** — Video, images exempted from domain rewrite logic
4. **Dealership CRM admin dashboard** — Drag-and-drop inventory, lead management, Supabase-backed
5. **Unified business dashboard** — Leads + Inventory tabs
6. **Docs system** — Password-protected viewer at `/docs` with nested route support
7. **GH-600 study system** — Full cert prep environment at `/gh600` (7 domains, flashcards, practice exam)
8. **Leads admin dashboard** — Password-protected view of Supabase `leads` table
9. **AI systems portfolio** — `/portfolio` page with credential/project showcase
10. **Demo branding removed** — Dealership site cleaned for business owner use
11. **Inventory → website connection** — `/dealership-demo` reads live from Supabase vehicles table

---

## Deferred Issues / Known Gaps

1. **Email notifications on lead submission** — `TODO` at `app/api/leads/route.ts:110`; Resend, SendGrid, or Supabase webhook not yet wired
2. **`lead_type` column** — May need manual migration: `ALTER TABLE leads ADD COLUMN lead_type text;` — API has graceful fallback
3. **GH-600 dashboard refactor uncommitted** — `app/gh600/GH600Dashboard.tsx` and `gh600-lab/` are untracked; need to commit
4. **Helicone observability** — `HELICONE_API_KEY` is in env but commented out in `lib/ai.ts`; not active
5. **Lead Engine auth** — Route appears to exist but auth integration unclear; needs audit before exposing
6. **Blog + directory are static** — No admin UI to add/edit companies or articles; must edit source files
7. **Signal Dashboard** — Listed in product map (CLAUDE.md) but not present in this repo; lives in separate `signal-dashboard` project
8. **`/api/debug`** — Minimal stub implementation; not production-useful
9. **B-roll pipeline** — Planned (requires Higgsfield, FFmpeg, OpenAI Whisper); not started
10. **Mobile-first audit** — Design system specifies mobile-first but no explicit mobile QA pass documented

---

## Phase 1 Status — COMPLETE

Phase 1 goal: Establish the full DWT + dealership infrastructure as a single deployable unit.

- [x] Main DWT landing page with lead capture
- [x] Company directory (static data)
- [x] Blog (static data)
- [x] AI Systems offer page
- [x] Supabase leads integration
- [x] Dealership demo site (shafiknsons.com)
- [x] Dealership inventory (Supabase-backed, admin UI)
- [x] Multi-tenant middleware routing
- [x] Password-protected internal tools (leads admin, docs, dealership admin)
- [x] GH-600 study system
- [x] Portfolio page
- [x] Lead Engine (Apify scraping + AI scoring + outreach)

---

## Phase 2 Roadmap

### Immediate (next session)
- [ ] Commit `GH600Dashboard.tsx` + `gh600-lab/` 
- [ ] Wire email notification on `/api/leads` (Resend recommended)
- [ ] Audit Lead Engine auth — confirm route is protected

### Short-term
- [ ] Add Signal Dashboard integration or embed link from `/dashboard`
- [ ] Populate real DWT directory entries (replace mock data or build admin UI)
- [ ] Add real blog posts (replace mock articles or add markdown file support)
- [ ] Mobile QA pass on all public-facing pages
- [ ] Add Helicone observability for AI API usage tracking

### Medium-term
- [ ] Dynamic blog via Supabase or markdown files
- [ ] Dynamic company directory via Supabase
- [ ] Public-facing `/ai-systems` inquiry flow → Supabase + email notification
- [ ] Content-to-product funnel: blog → `/ai-systems` CTA tracking
- [ ] B-roll pipeline (Higgsfield + FFmpeg + Whisper)
- [ ] Bitcoin portfolio tracking in dashboard

### Long-term
- [ ] Community layer
- [ ] SaaS product(s) built on proven demand signals from Lead Engine data
- [ ] Decentralized infrastructure experiments

---

## Current Design Direction

**Aesthetic:** Cinematic dark mode. Premium. Minimal. Intentional.

**Inspirations:** Stripe, Linear, OpenAI, Palantir, modern crypto infrastructure.

**Core rules:**
- Near-black backgrounds (not pure black)
- Text opacity hierarchy: `/90` body, `/60` secondary, `/35` metadata, `/20` faint
- Restrained ambient glow — subtle, not garish
- Glassmorphism influences where structurally appropriate
- Rounded cards, intelligent spacing, clear type hierarchy

**Accent color system:**
| Color | Hex | Context |
|---|---|---|
| Gold/amber | `#f59e0b`, `#fbbf24` | Bitcoin, wealth, signal |
| Rose/red | `#ef4444`, `#dc2626` | Content engine, AI systems, energy |
| Violet | `#8b5cf6` | AI planner, intelligence |
| Blue | `#3b82f6` | Trust, LinkedIn, professional |
| Emerald | `#10b981` | Positive performance, success states |

**Typography:**
- Eyebrow labels: `text-[10px] font-semibold uppercase tracking-[0.2em]` in subdued accent color
- Headlines: large, bold, tight tracking (`tracking-[-0.02em]`), gradient fill on hero text
- Body: `text-sm` / `text-xs`, `text-white/60`, relaxed line height
- Metadata: `text-[10px]`, `text-white/25–35`

**UI quality bar:** A screen is only acceptable when it looks intentional, feels premium, has clear visual hierarchy, is not cluttered, and is screenshot-worthy.

---

## Current Motion Philosophy

**Principle:** Motion is subtle and purposeful — never decorative.

- `FadeIn` wrapper component (`components/FadeIn.tsx`) uses Framer Motion for entrance animations
- Section pacing is cinematic — sections breathe, nothing cramped
- Scroll-triggered video hero used on dealership site (`ScrollVideoHero`)
- No gratuitous animations; every motion should carry meaning or direct attention

**Avoid:** Bouncing, spinning, rapid transitions, anything that feels like a template.

---

## Known Bugs

| Bug | Location | Severity | Status |
|---|---|---|---|
| Email notification missing on lead submit | `app/api/leads/route.ts:110` | Medium | Deferred (TODO in code) |
| `lead_type` column may be absent in Supabase | `app/api/leads/route.ts` | Low | Has graceful fallback |
| Static assets can be blocked if middleware matcher is too broad | `middleware.ts` | Low | Fixed once before; watch if new asset types added |
| No auth on `/lead-engine` page | `app/lead-engine/` | Medium | Needs audit |
| `GH600Dashboard.tsx` references untracked component | `app/gh600/page.tsx` | Low | Works locally; breaks fresh clone until committed |

---

## Next Recommended Steps

1. **Commit GH-600 work** — Stage and commit `app/gh600/GH600Dashboard.tsx` and `gh600-lab/` before any branch changes
2. **Wire email on lead submit** — Add Resend (or Supabase webhook) at `app/api/leads/route.ts:110`; this is the most impactful missing production feature
3. **Audit Lead Engine auth** — Confirm `/lead-engine` is behind a password guard before it handles real prospect data
4. **Activate Helicone** — Uncomment in `lib/ai.ts` to get visibility into Claude API usage and costs
5. **Mobile QA sweep** — Walk every public page on mobile; document any layout breaks
6. **Replace mock directory data** — Either build a simple Supabase-backed admin UI or convert `lib/data/companies.ts` to real entries
7. **Add `lead_type` migration** — Run `ALTER TABLE leads ADD COLUMN lead_type text;` in Supabase if not already present

---

*Generated from codebase snapshot on 2026-06-12.*
