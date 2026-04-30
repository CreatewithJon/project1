# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # Start dev server (Turbopack) — http://localhost:3000
npm run build     # Production build
npm run lint      # ESLint
npx tsc --noEmit  # Type-check without emitting — run this before committing
```

No test suite exists. `npx tsc --noEmit` is the primary correctness check.

## Deployment

Push to `main` on GitHub → Vercel auto-deploys to `digitalwealthtransfer.com`. Environment variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) must be set in Vercel via CLI (`npx vercel env add`), not the dashboard UI, to ensure they propagate correctly.

## Next.js 16 Patterns (Critical)

This is Next.js **16.2.2**. These patterns differ from older versions and will cause bugs if ignored:

- `params` and `searchParams` are **Promises** — always `await` them:
  ```ts
  export default async function Page(props: PageProps<"/blog/[slug]">) {
    const { slug } = await props.params;
  }
  ```
- `PageProps<'/path/[param]'>` and `RouteContext` are **globally available** — no import needed.
- Route Handlers: `export async function GET/POST(request: NextRequest) {}`
- Tailwind v4 uses `@import "tailwindcss"` in CSS, not `@tailwind` directives.

## Architecture

**DigitalWealthTransfer.com** is a two-sided marketplace connecting Las Vegas businesses with AI/blockchain/fintech service providers. The homepage is the primary conversion surface; the directory is a secondary discovery layer.

### Route Map

| Route | Purpose |
|---|---|
| `/` | Homepage — hero with two CTAs, two-path cards, How It Works, trust section, two lead forms |
| `/directory` | Filterable company directory (server-rendered, `searchParams`-driven) |
| `/companies/[slug]` | Company profile with intro request form |
| `/blog` | Blog index |
| `/blog/[slug]` | Individual blog post |
| `/landing` | Redirects to `/` |
| `/api/leads` | POST: store lead in Supabase. GET: return all leads |
| `/api/debug` | Returns SET/MISSING status for env vars |

### Data Layer

All directory and blog content is **static mock data** — no database reads:
- `lib/data/companies.ts` — 6 real curated companies; `filterCompanies()`, `getCompanyBySlug()`
- `lib/data/articles.ts` — 8 mock articles; `getArticleBySlug()`, `getFeaturedArticles()`
- `lib/types.ts` — shared types: `Company`, `Article`, `ContentBlock`, `Category`, `LasVegasArea`

The only live database is the **Supabase `leads` table**, written to by `/api/leads`.

### Lead Forms

Three client components post to `/api/leads`:

| Component | Anchor | `lead_type` | `companySlug` |
|---|---|---|---|
| `BusinessLeadForm` | `#business-form` on `/` | `"business_request"` | `"business-request"` |
| `ProviderLeadForm` | `#provider-form` on `/` | `"provider_application"` | `"provider-application"` |
| `LeadForm` | `/companies/[slug]` | _(none)_ | company's slug |

`BusinessLeadForm` and `ProviderLeadForm` serialize all their fields into the `service` text column. The `lead_type` column may need to be added to Supabase: `ALTER TABLE leads ADD COLUMN lead_type text;` — the API falls back gracefully if it's missing.

### Supabase Client Pattern

Always initialize inside the handler function — **never at module level** — or the build crashes when env vars are absent:

```ts
function getSupabase() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
}
```

### Company Website Guard

The `example.com` guard is still present in `CompanyCard.tsx` and `app/companies/[slug]/page.tsx` as a safety net. All 6 current companies have real URLs so the guard passes for all of them.

---

## Founder Context

**Jonathan Cardona**, Las Vegas, Nevada. Background in sales, banking, customer support, crypto education, and entrepreneurial business development. Growing expertise in software, AI, cybersecurity, and digital assets.

Motivated by: building income-generating digital businesses, products around Bitcoin/crypto/AI/wealth, making technology easier to adopt.

**Builder constraints to respect:** Jonathan is still developing as a builder. Optimize for rapid visual feedback, low-friction iteration, clear architecture, simple deployment, and minimal unnecessary complexity. Favor momentum and clarity over overengineering.

---

## Product Vision: Digital Wealth Transfer Ecosystem

Digital Wealth Transfer is the umbrella brand. The marketplace at `digitalwealthtransfer.com` is the first product. Future products should reinforce the same themes: wealth, technology, leverage, ownership, intelligence, trust, next-generation tools.

**Positioning:** We connect AI and digital asset companies with high-intent clients.

A planned second product is a **software-first personal dashboard** — a digital command center covering:
- Bitcoin / digital wealth visibility (BTC price, chart, DCA placeholder)
- Productivity (focus sessions, tasks, habit tracking, notes)
- AI assistant panel (prompt + response, starter prompts, local AI placeholder)
- Identity and atmosphere (premium feel, screenshot-worthy, ownership-oriented)

This dashboard should feel like: part trading terminal, part focus dashboard, part AI sidekick, part identity object.

**Core promise:** Pay once. Use it. Own it. (No subscription model.)

**Aesthetic direction:** Dark UI, soft contrast, restrained glow, rounded cards, clean typography hierarchy, elegant spacing. Avoid cheap crypto widget feel, cluttered SaaS admin dashboards, or generic bootstrap templates.

### Dashboard Build Sequence (when building the second product)

1. Foundation — shell layout, theme, reusable card/typography system
2. Hero dashboard — identity, key metrics, summary cards
3. Bitcoin panel — price, chart, DCA placeholder
4. Productivity panel — focus session, priorities, notes
5. AI panel — prompt interface, starter prompts, local AI framing
6. Refinement — microcopy, spacing, responsiveness, ambient background
7. Integration readiness — hooks for Digital Wealth Transfer tie-ins

### What can be real vs placeholder in dashboard MVP

**Real:** live BTC price, chart from lightweight API, local notes persistence, focus timer, basic AI via API.
**Placeholder:** full portfolio logic, local AI inference, deep analytics, provider marketplace panel.

### UI Quality Bar

Do not declare UI complete just because it works. A screen is acceptable only when it: looks intentional, feels premium, has clear visual hierarchy, is not cluttered, is screenshot-worthy, and reflects the founder's themes. If it feels merely functional, keep improving.

### Operating Loop for Frontend Work

For each UI milestone: implement → run locally → check for errors → capture screenshots → critique (hierarchy, rhythm, aesthetic, founder alignment, usability) → improve → repeat. Do not do one-shot implementations and move on.

### Tone for UI Copy

Clear, sharp, modern, confident. Not hypey, not overly corporate. Slightly premium, slightly visionary.

Example messages: "Own your tools. Own your workflow." / "Built for clarity, sovereignty, and momentum." / "No subscription. No clutter. Just signal."

---

## Digital Wealth Transfer — Final Strategy

### Core Positioning

Digital Wealth Transfer is evolving into an AI systems and revenue infrastructure business for local businesses, service providers, and tech-forward companies.

**Main positioning:** "I build AI-powered systems that help businesses capture, qualify, and convert more leads."

Digital Wealth Transfer is a hybrid of:
- AI service provider
- Local business automation consultant
- Lead generation partner
- Marketplace/directory for AI, blockchain, fintech, and tech service providers
- Content-driven authority brand around AI, Bitcoin, automation, and digital business

### Primary Offer Page

The main offer page lives at `/ai-systems`. It markets all core offers as one unified solution:

**AI Revenue Systems for Local Businesses**

- **Headline:** "Turn Your Business Into a Lead-Generating Machine With AI"
- **Subheadline:** "I build AI-powered systems that help you capture, qualify, and convert more customers — using automation, chatbots, funnels, websites, CRM workflows, and content systems."
- **CTAs:** Get My System / Book Free Audit / DM "AI"

### Core Offer Stack

| Offer | Price | Purpose |
|---|---|---|
| AI Lead Capture System | $500–$1,000 | Landing page, lead form, CRM setup, email follow-up, lead notifications, analytics |
| AI Appointment Setter System | $750–$1,000 | AI chatbot/SMS bot, lead qualification, calendar booking, CRM handoff |
| AI Website + Funnel | $1,000+ | Website/landing page, conversion copy, lead form, CTA sections, basic SEO |
| AI Content + Growth System | $500/month | Content ideas, video scripts, social captions, blog repurposing, monthly optimization |

**Outcome focus:** More leads. Faster response. Better follow-up. More booked calls. Better systems.

### /ai-systems Page Structure

1. **Hero** — Headline, subheadline, CTA buttons
2. **Problem** — Businesses miss leads, slow response times, weak websites, no follow-up, leads not tracked
3. **Solution** — AI Revenue Systems. Flow: Capture → Engage → Qualify → Convert → Track
4. **Offer Stack** — Four cards with pricing, bullets, and outcome
5. **How It Works** — Audit → Build → Launch → Optimize
6. **Final CTA** — "Want more leads without hiring more staff? Let's build your AI system."

### /ai-systems Lead Form

Form posts to `/api/ai-leads` → Supabase `ai_leads` table.

Captures: name, email, business name, website, industry, service need (Landing Page / AI Chatbot / CRM Setup / Automated Follow-Up / Content System / Not Sure Yet), budget ($500 / $1,000 / $1,500+ / Not sure), message.

**Supabase table:**
```sql
create table ai_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  business_name text,
  website text,
  industry text,
  service_need text,
  budget text,
  message text,
  created_at timestamptz default now()
);
```

Use lazy Supabase initialization inside the route handler (never at module level). Use `SUPABASE_URL` / `SUPABASE_ANON_KEY` — do not expose to the browser.

### Marketing Strategy

**Core message:** "Most businesses don't need more traffic first. They need a better system to capture, qualify, and follow up with the leads they already get."

**Primary CTA:** "DM me 'AI' and I'll show you what I'd build for your business."

**Target customers:** Med spas, real estate agents, home service businesses, roofers, solar companies, insurance agents, law firms, fitness coaches, business consultants, Web3/AI service providers, local service businesses.

### Business Strategy — Three Layers

- **Layer 1 — Cash Flow:** Sell AI systems and automation services for $500–$1,000+
- **Layer 2 — Authority:** Content around AI, Bitcoin, automation, websites, funnels, local business growth
- **Layer 3 — Scale:** DWT directory and marketplace refers clients to vetted AI, blockchain, fintech, and tech providers

### Development Priorities

1. Build `/ai-systems` landing page
2. Build `/api/ai-leads` route
3. Create Supabase `ai_leads` table
4. Add lead form with success/error handling
5. Link `/ai-systems` from homepage nav and footer
6. Add CTA from blog posts pointing to `/ai-systems`
7. Ensure mobile responsiveness
8. Run `npm run build` and fix all errors
9. Deploy to Vercel
10. Test live form submission
