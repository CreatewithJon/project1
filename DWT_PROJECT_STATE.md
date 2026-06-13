# DWT_PROJECT_STATE.md — Digital Wealth Transfer
> Current state of the Digital Wealth Transfer media platform.
> Supersedes PROJECT_STATE.md (legacy, pre-pivot).
> Last updated: 2026-06-12.

---

## Purpose

Digital Wealth Transfer is a **media, education, and research platform** documenting the transition into the AI-powered digital economy.

It is not a directory, marketplace, service-provider network, or lead generation platform. Those identities were deprecated in the 2026-06-12 strategic pivot.

---

## Ownership

**Founder:** Jonathan Cardona
**Role:** Author, editor, builder, brand owner
**Location:** Las Vegas, Nevada

---

## Audience

- Regular people navigating AI, Bitcoin, and digital business — not engineers, not institutions
- Entrepreneurs and small business owners curious about the technology transition
- Self-directed learners who aren't waiting for someone to hand them access
- Minorities and underrepresented communities entering the digital economy
- People building income, ownership, and freedom through technology

---

## Current Status

**Phase:** Post-pivot infrastructure. Media platform foundation in place. Content layer needs population with real articles.

**Live at:** `digitalwealthtransfer.com` (Vercel auto-deploy from `main`)

**Strategic pivot completed:** 2026-06-12
- Deprecated: directory, marketplace, company listings, provider discovery, service offer pages
- Current model: media, education, research, commentary

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16.2.2 (App Router) |
| Language | TypeScript strict — no `any` |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"` — not `@tailwind` directives) |
| Database | Supabase (Postgres + Storage) |
| AI | Anthropic Claude API — `lib/ai.ts` (`callClaude()`, defaults to Haiku 4.5) |
| Deployment | Vercel → `digitalwealthtransfer.com` |
| Scraping | Apify (`lib/apify.ts`), Firecrawl (`lib/firecrawl.ts`) |

### Critical Next.js 16 Patterns
- `params` and `searchParams` are Promises — always `await` them
- `PageProps<'/path/[param]'>` is globally available — no import needed
- Supabase client initialized **inside** handlers via `getSupabase()` — never at module level
- Tailwind v4: `@import "tailwindcss"` in CSS — no `@tailwind` directives

---

## Information Architecture (Post-Pivot)

### Public Routes

| Route | Purpose | Status |
|---|---|---|
| `/` | Homepage — editorial mission, featured articles, newsletter CTA, about, Sovereign OS teaser | Rewritten (2026-06-12) |
| `/blog` | Article index — all content | Active (static data) |
| `/blog/[slug]` | Individual article pages | Active (static data) |
| `/ai-economy` | Topic category — AI economy | Active |
| `/digital-assets` | Topic category — Bitcoin, digital ownership | Active |
| `/financial-shift` | Topic category — economic transition | Active |
| `/opportunities` | Topic category — positioning, digital business | Active |
| `/portfolio` | Jonathan's built work — credibility layer | Active |
| `/dashboard` | Sovereign OS prototype preview | Active (public, prototype) |
| `/links` | Biolink / link hub page | Needs copy update |
| `/landing` | Alternate landing page variant | Review needed |

### Internal / Protected Routes (Not DWT Media Content)

| Route | Purpose | Auth |
|---|---|---|
| `/leads-admin` | View Supabase lead submissions | `LEADS_ADMIN_PASSWORD` cookie |
| `/leads-admin/login` | Auth for leads admin | — |
| `/lead-engine` | Apify scraping + AI prospect scoring | Needs auth audit |
| `/docs` | Internal knowledge base | `DOCS_PASSWORD` cookie |
| `/gh600` | GH-600 cert study system | `GH600_PASSWORD` cookie |

### Client Work (Co-deployed, Separate Brand)

| Route | Domain | Purpose |
|---|---|---|
| `/dealership-demo/*` | `shafiknsons.com` | Shafik N Sons luxury dealership |
| `/dealership-admin` | Internal | Dealership CRM + inventory |
| `/lumbre-demo` | `digitalwealthtransfer.com` | Luxury order form demo |

---

## Deprecated Routes (Removed 2026-06-12)

These routes were deleted as part of the strategic pivot. Do not recreate them.

| Route | Why Removed |
|---|---|
| `/directory` | Service-provider discovery — old business model |
| `/companies/[slug]` | Company listing pages — marketplace mechanic |
| `/ai-leads` | Service offer page — belongs to Aigentic Systems |
| `/partners` | Provider referral network — old model |
| `/solutions` | Agency services overview — old model |
| `/ai-content` | Service offer page — belongs to Aigentic Systems |
| `/ai-strategy` | Consulting offer page — belongs to Aigentic Systems |

---

## Deprecated Components (Removed 2026-06-12)

| Component | Reason |
|---|---|
| `CompanyCard` | Directory listing card |
| `FilterPanel` | Directory search/filter UI |
| `ProviderLeadForm` | Provider application form |
| `BusinessLeadForm` | Marketplace business matching form |
| `LandingLeadForm` | Provider connection form |

---

## Deprecated Data (Removed 2026-06-12)

| File | Reason |
|---|---|
| `lib/data/companies.ts` | 6 mock companies powering the directory |
| `app/api/companies/route.ts` | Companies API endpoint |

---

## Active Components

| Component | Purpose |
|---|---|
| `ArticleCard` | Blog article preview — default and large size |
| `CategoryPage` | Category index page template |
| `Header` | Site navigation (needs update to match new IA) |
| `NewsletterForm` | Email subscription form (light-mode styled — needs dark mode pass) |
| `LeadForm` | Generic lead/inquiry form |
| `AILeadForm` | AI inquiry form |
| `OfferLeadForm` | Service offer inquiry variant |
| `OrderForm` | Order/inquiry form |

---

## Data Layer

| Source | Content | Notes |
|---|---|---|
| `lib/data/articles.ts` | 50+ static articles in 4 categories | Mock data — needs replacement with real content |
| `lib/types.ts` | Article types, ContentBlock | Also contains legacy Company/Category types — audit needed |
| Supabase `leads` | All form submissions | Still in use for newsletter + contact |
| Supabase `ai_leads` | AI systems inquiries | Review relevance post-pivot |
| Supabase `vehicles` | Dealership inventory | Client work only |

---

## Multi-Tenant Routing

`middleware.ts` handles:
1. **Domain rewriting** — `shafiknsons.com` → `/dealership-demo/*`
2. **Auth guards** — cookie-based password protection for internal routes

---

## Open Issues

### Must Fix
- [ ] Wire email notification on lead submission — `app/api/leads/route.ts:110` has a TODO
- [ ] Audit `/lead-engine` auth — confirm it's behind a password guard
- [ ] Replace mock articles with real content — 50+ placeholders are not publishable
- [ ] Mobile QA pass on all public pages — no documented pass exists
- [ ] Remove or restrict `/api/debug` — exposes env var status publicly

### Should Fix
- [ ] Update `components/Header.tsx` — nav still reflects old IA (Services, Directory, Blog)
- [ ] Update `app/links/page.tsx` — still references /partners and /directory
- [ ] Update `components/CategoryPage.tsx` — has a Directory link in the header
- [ ] Update `components/NewsletterForm.tsx` — uses light-mode styling, needs dark mode
- [ ] Add OG image and social metadata to root layout and key pages
- [ ] Add analytics (Vercel Analytics or Plausible)
- [ ] Add `lead_type` Supabase migration: `ALTER TABLE leads ADD COLUMN lead_type text;`

### Deferred
- [ ] Activate Helicone observability — key is in `.env`, commented out in `lib/ai.ts`
- [ ] Dynamic blog via markdown files or Supabase
- [ ] Newsletter infrastructure (Resend or ConvertKit)
- [ ] `/sovereign-os` waitlist route
- [ ] SEO fundamentals (sitemap.xml, robots.txt, structured data)
- [ ] Error monitoring (Sentry or Vercel error tracking)
- [ ] Commit `app/gh600/GH600Dashboard.tsx` and `gh600-lab/`

---

## Completed (History)

- [x] shafiknsons.com domain routing via middleware
- [x] Dealership CRM admin with drag-and-drop inventory
- [x] Dealership inventory → website connection (Supabase-backed)
- [x] Password-protected internal tools (leads admin, docs, dealership admin, GH-600)
- [x] GH-600 cert study system
- [x] Portfolio page
- [x] Lead Engine (Apify scraping + AI scoring)
- [x] **Strategic pivot executed** — directory/marketplace routes, components, and data removed
- [x] Homepage rewritten as media platform editorial statement

---

## Design System

**Aesthetic:** Cinematic dark mode. Premium. Minimal. Intentional.
**Primary accent:** Blue (`#3b82f6`) for DWT

**Background scale:** `#0B0F1A` → `#0D1117` → `#111827` → `#151B2D`
**Text opacity:** `/90` body · `/60` secondary · `/35` metadata · `/20` faint

**Typography:**
- Eyebrow: `text-[10px] font-semibold uppercase tracking-[0.2em]`
- Headline: large bold, `tracking-[-0.02em]`, gradient fill on hero
- Body: `text-sm`, `text-white/60`, relaxed leading
- Meta: `text-[10px]`, `text-white/25–35`

**Motion:** Purposeful only. `FadeIn` wrapper via Framer Motion. No decorative animation.

---

## Excluded Assets

The following do not belong in this repo or in DWT content:

- Aigentic Systems service offers, pricing, or lead capture
- Crypto Mondays chapter listings, events, or community tools
- Sovereign OS as a shipped product (preview/teaser only)
- Any provider directory or company listing mechanics

---

## Related Projects

| Project | Relationship | Document |
|---|---|---|
| Sovereign OS | Future product teased from DWT | `SOVEREIGN_OS_PROJECT_STATE.md` |
| GH-600 | Internal tool living inside this repo | `GH600_PROJECT_STATE.md` |
| Aigentic Systems | Separate company — do not mix | `AGENTIC_SYSTEMS_PROJECT_STATE.md` |
| Crypto Mondays | Separate brand — do not mix | `PORTFOLIO_ARCHITECTURE.md` |
| shafiknsons.com | Client work co-deployed in this repo | No separate state doc |

---

## Future Direction

1. **Content first** — populate real articles across all 4 topic categories
2. **Newsletter as primary conversion** — Resend integration, welcome sequence
3. **`/sovereign-os` waitlist** — teaser page capturing early interest
4. **Dynamic content** — markdown-based blog, Supabase-backed if needed
5. **SEO compounding** — sitemap, structured data, real meta descriptions
6. **Community signal** — events, podcast, video content linked from the platform
7. **Sovereign OS launch** — DWT audience converts to product users

---

*Commands:*
```bash
npm run dev       # http://localhost:3000
npm run build     # Production build
npx tsc --noEmit  # Type check before committing
```
