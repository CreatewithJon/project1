@AGENTS.md

---

# Digital Wealth Transfer — Master Operating Document

> This is the internal operating system for the Digital Wealth Transfer ecosystem.
> Every product, design decision, engineering choice, and word of copy produced in this codebase should align with the mission, brand, and standards defined below.
> Claude Code should treat this document as the authoritative source of truth for all work across this project.

---

## 01 — MISSION

**Core Mission:**
> "Helping everyday people and businesses leverage AI, automation, and emerging technology to create more freedom, ownership, and opportunity."

Everything built under this ecosystem exists to bridge the gap between advanced technology and real-world implementation — for regular people, small businesses, entrepreneurs, and communities that have historically been left behind by technological change.

**The ecosystem should always feel:**
- Futuristic but grounded
- Empowering, not overwhelming
- Intelligent, not exclusive
- Accessible, not dumbed-down
- Premium, not corporate
- Optimistic about what technology makes possible

---

## 02 — FOUNDER

**Jonathan Cardona** — Las Vegas, Nevada

Background: sales, banking, customer support, crypto education, entrepreneurial business development. Growing expertise in software, AI, cybersecurity, and digital assets.

**What drives this work:** Building income-generating digital businesses, products around Bitcoin/AI/automation/wealth, and making advanced technology accessible to people who aren't engineers.

**Builder constraints Claude must respect:**
- Jonathan is an emerging builder — favor clarity and momentum over architectural elegance
- Optimize for rapid visual feedback and low-friction iteration
- Prefer simple, working solutions over complex, theoretically better ones
- Never overengineer. Never add features that weren't asked for.
- Favor deployment speed and real-world usability over perfection
- Every session should produce something real, visible, and testable

---

## 03 — ECOSYSTEM OVERVIEW

Digital Wealth Transfer is evolving from a single marketplace into a **technology opportunity platform** — a connected ecosystem of products, services, content, and infrastructure built around one mission.

**What it is not:**
- A generic AI agency
- A corporate consulting firm
- A crypto hype brand
- A subscription SaaS with hidden fees

**What it is becoming:**
- An AI implementation and automation services business
- A directory and marketplace connecting businesses with vetted tech providers
- A content-driven authority brand educating people on AI, Bitcoin, and digital systems
- A software ecosystem of personal tools, dashboards, and infrastructure
- A trusted guide for people navigating the AI-powered digital era

**Three-Layer Business Model:**

| Layer | Focus | Purpose |
|---|---|---|
| Layer 1 — Cash Flow | AI systems & automation services ($500–$1,500+) | Revenue now |
| Layer 2 — Authority | Content: AI, Bitcoin, automation, digital business | Trust + audience |
| Layer 3 — Scale | DWT directory, marketplace, SaaS products | Long-term leverage |

---

## 04 — BRAND & POSITIONING

### Personal Brand

Jonathan's positioning is: **a relatable technology guide and builder helping people navigate the AI-powered digital era.**

**This brand is NOT:**
- A generic AI influencer
- A corporate consultant
- A crypto scam or hype brand
- A fake luxury entrepreneur

**Core themes:**
AI implementation · automation · digital freedom · Bitcoin · decentralized systems · education · accessibility · future technology · ownership · sovereignty · practical implementation · empowering regular people through technology

### Communication Style

- Approachable and intelligent — never condescending
- Practical and grounded — not theoretical or abstract
- Optimistic — genuinely believes in what technology makes possible
- Curious — openly exploring alongside the audience
- Visionary without sounding delusional
- Educational without overwhelming people
- Non-corporate — real voice, not polished PR

### Copy Tone Examples

```
"Own your tools. Own your workflow."
"Built for clarity, sovereignty, and momentum."
"No subscription. No clutter. Just signal."
"Turn complexity into leverage."
"You don't need to be an engineer to build with AI."
"Most businesses don't need more traffic. They need a better system."
```

---

## 05 — TARGET AUDIENCE

**Primary:**
- Entrepreneurs and small business owners
- Creators and independent workers
- People intimidated by or curious about AI
- Forward-thinking individuals ready to adapt
- Minorities and underrepresented communities entering tech

**Secondary:**
- Local service businesses (med spas, real estate, home services, insurance, legal, fitness, solar, roofing)
- Web3/AI service providers
- People building digital income streams
- Anyone who wants more freedom through better tools and systems

**UX Principle:** Every product and interface must reduce overwhelm, simplify complexity, and make the user feel capable. The path through every product is: **Confusion → Understanding → Implementation → Opportunity.**

---

## 06 — DESIGN SYSTEM

### Visual Identity

**Aesthetic direction:** Cinematic dark mode. Premium. Minimal. Intentional.

Inspirations: Stripe, Linear, OpenAI, Palantir, modern crypto infrastructure companies, cinematic sci-fi interfaces.

**Core principles:**
- Premium dark backgrounds (near-black, not pure black)
- Soft contrast — text opacity hierarchy (`/90`, `/60`, `/35`, `/20`)
- Restrained ambient glow — subtle, not garish
- Glassmorphism influences where structurally appropriate
- Rounded cards, intelligent spacing, clear type hierarchy
- Cinematic section pacing — sections breathe, nothing is cramped
- Motion is subtle and purposeful, never decorative

**Accent colors by product context:**
- Gold/amber (`#f59e0b`, `#fbbf24`) — Bitcoin, wealth, signal
- Rose/red (`#ef4444`, `#dc2626`) — Content engine, AI systems, energy
- Violet (`#8b5cf6`) — AI planner, intelligence, cognition
- Blue (`#3b82f6`) — Trust, LinkedIn, professional systems
- Emerald (`#10b981`) — Positive performance, streaks, success states

**Typography hierarchy:**
- Label/eyebrow: `text-[10px] font-semibold uppercase tracking-[0.2em+]` — subdued accent color
- Headline: large, bold, tight tracking (`tracking-[-0.02em]`), gradient fill on hero text
- Body: `text-sm` or `text-xs`, `text-white/60`, relaxed line height
- Metadata: `text-[10px]`, `text-white/25–35`

**Avoid at all times:**
- Clutter or visual noise
- Cheap gradients or neon glow
- Spammy marketing aesthetics
- Generic agency or bootstrap templates
- Overly corporate design
- Low-quality stock imagery
- Decorative elements that don't carry meaning

### UI Quality Bar

A screen is only acceptable when it:
1. Looks intentional — every element has a reason to exist
2. Feels premium — could plausibly be a funded startup's product
3. Has clear visual hierarchy — eye knows exactly where to go
4. Is not cluttered — white space is used as a design tool
5. Is screenshot-worthy — founder would want to share it
6. Reflects the brand themes above

**Do not declare UI complete just because it works. If it feels merely functional, keep improving.**

### Operating Loop for Frontend Work

`implement → run locally → check for errors → critique (hierarchy, rhythm, aesthetic, brand alignment, usability) → improve → repeat`

Never do one-shot implementations and move on.

---

## 07 — ENGINEERING STANDARDS

### Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js (see version-specific rules below) |
| Language | TypeScript — strict, no `any` |
| Styling | Tailwind CSS v4 |
| Database | Supabase (Postgres) |
| Deployment | Vercel (auto-deploy from `main`) |
| AI | Anthropic Claude API (Haiku for speed/cost, Sonnet/Opus for quality) |
| External APIs | YouTube Data API v3, CoinGecko, OpenAI (Whisper) |

### Engineering Philosophy

- **Scalable and modular** — components should be reusable across products
- **Production-grade** — write code that could ship to real users
- **Mobile-first** — design and test for mobile before desktop
- **Performance-conscious** — avoid unnecessary re-renders, heavy dependencies
- **Clean folder structures** — group by feature, not by file type where it matters
- **No overengineering** — the right abstraction is the simplest one that works
- **No speculative architecture** — build for what's needed now, not hypothetical future requirements

### Critical: Next.js 16 Patterns (this repo — `my-sample-proj`)

This project runs **Next.js 16.2.2**. These patterns differ from older versions:

- `params` and `searchParams` are **Promises** — always `await` them:
  ```ts
  export default async function Page(props: PageProps<"/blog/[slug]">) {
    const { slug } = await props.params;
  }
  ```
- `PageProps<'/path/[param]'>` and `RouteContext` are **globally available** — no import needed
- Route Handlers: `export async function GET/POST(request: NextRequest) {}`
- Tailwind v4: use `@import "tailwindcss"` in CSS — not `@tailwind` directives

### Supabase Pattern (Critical)

Always initialize the client **inside** the handler function — never at module level — or the build crashes when env vars are absent:

```ts
function getSupabase() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
}
```

Never expose `SUPABASE_URL` or `SUPABASE_ANON_KEY` to the browser. Always use server-side route handlers.

### Commands

```bash
npm run dev       # Start dev server (Turbopack) — http://localhost:3000
npm run build     # Production build
npm run lint      # ESLint
npx tsc --noEmit  # Type-check — run this before committing
```

No test suite exists. `npx tsc --noEmit` is the primary correctness check.

### Deployment

Push to `main` → Vercel auto-deploys to `digitalwealthtransfer.com`.

Environment variables must be set via CLI — not dashboard UI:
```bash
npx vercel env add SUPABASE_URL
npx vercel env add SUPABASE_ANON_KEY
```

---

## 08 — PRODUCT MAP

### Product 1: digitalwealthtransfer.com (`my-sample-proj`)

A marketplace and service platform connecting Las Vegas businesses with AI/blockchain/fintech providers, and marketing Jonathan's AI systems services.

**Route Map:**

| Route | Purpose |
|---|---|
| `/` | Homepage — hero, two-path CTAs, How It Works, trust section, two lead forms |
| `/ai-systems` | Primary offer page — AI Revenue Systems for local businesses |
| `/directory` | Filterable company directory (server-rendered, `searchParams`-driven) |
| `/companies/[slug]` | Company profile with intro request form |
| `/blog` | Blog index |
| `/blog/[slug]` | Individual blog post |
| `/api/leads` | POST: store lead in Supabase. GET: return all leads |
| `/api/ai-leads` | POST: store AI systems inquiry in Supabase |
| `/api/debug` | Returns SET/MISSING status for env vars |

**Data Layer:**

All directory and blog content is static mock data — no database reads:
- `lib/data/companies.ts` — 6 curated companies; `filterCompanies()`, `getCompanyBySlug()`
- `lib/data/articles.ts` — 8 mock articles; `getArticleBySlug()`, `getFeaturedArticles()`
- `lib/types.ts` — shared types: `Company`, `Article`, `ContentBlock`, `Category`, `LasVegasArea`

Live database: **Supabase `leads` table** (written to by `/api/leads`) and **`ai_leads` table** (written to by `/api/ai-leads`).

**Lead Forms:**

| Component | Location | `lead_type` |
|---|---|---|
| `BusinessLeadForm` | `#business-form` on `/` | `"business_request"` |
| `ProviderLeadForm` | `#provider-form` on `/` | `"provider_application"` |
| `LeadForm` | `/companies/[slug]` | _(none)_ |
| AI Systems form | `/ai-systems` | `"ai_systems"` |

**Supabase Tables:**

```sql
-- General leads
leads (id, name, email, service, lead_type, created_at)

-- AI Systems inquiries
ai_leads (
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

**`lead_type` column note:** May need to be added manually: `ALTER TABLE leads ADD COLUMN lead_type text;` — API falls back gracefully if missing.

**Company Website Guard:** The `example.com` guard exists in `CompanyCard.tsx` and `app/companies/[slug]/page.tsx`. All 6 current companies have real URLs — guard passes for all.

---

### Product 2: Signal Dashboard (`signal-dashboard`)

A personal operating system / digital command center. Part trading terminal, part focus dashboard, part AI sidekick, part identity object.

**Core promise:** Own your tools. Own your data. No subscription.

**Stack:** Next.js 15.2.6, TypeScript, Tailwind v4, Anthropic API, CoinGecko API, YouTube Data API v3, localStorage for persistence.

**Current feature set:**

| Route | Feature |
|---|---|
| `/` | Overview — BTC panel, Productivity/Pomodoro, Habits, AI assistant |
| `/planner` | Life Planner — Daily/Weekly/Monthly plans, 1yr/3yr/5yr vision, AI planning assistant, review questions, projected outcomes |
| `/content` | Content Engine — YouTube channel search, outlier video ranking, Claude analysis (Hook/Framework/Keywords/Why/Script), LinkedIn post generator, Teleprompter |
| `/teleprompter` | Full-screen teleprompter — auto-scroll, speed/size controls |

**Planned next features:**
- B-roll pipeline (requires Higgsfield account, FFmpeg, OpenAI Whisper)
- Deeper Bitcoin portfolio tracking
- Automation workflow builder

---

### /ai-systems — Primary Offer Page

**Headline:** "Turn Your Business Into a Lead-Generating Machine With AI"
**Subheadline:** "I build AI-powered systems that help you capture, qualify, and convert more customers — using automation, chatbots, funnels, websites, CRM workflows, and content systems."

**Core Offer Stack:**

| Offer | Price | Outcome |
|---|---|---|
| AI Lead Capture System | $500–$1,000 | Landing page, lead form, CRM, email follow-up, analytics |
| AI Appointment Setter | $750–$1,000 | AI chatbot/SMS bot, lead qualification, calendar booking |
| AI Website + Funnel | $1,000+ | Website, conversion copy, lead form, SEO basics |
| AI Content + Growth System | $500/month | Scripts, captions, blog repurposing, monthly optimization |

**Page structure:** Hero → Problem → Solution (Capture → Engage → Qualify → Convert → Track) → Offer Stack → How It Works (Audit → Build → Launch → Optimize) → Final CTA

**Primary CTA:** "DM me 'AI' and I'll show you what I'd build for your business."

**Target customers:** Med spas, real estate agents, home service businesses, roofers, solar companies, insurance agents, law firms, fitness coaches, consultants, Web3/AI service providers.

---

## 09 — CONTENT STRATEGY

**Content pillars:**
1. AI practical use cases — show, don't just tell
2. AI automation for businesses — specific, tactical, implementable
3. Bitcoin and digital ownership — education-first, non-hype
4. Future technology trends — curated, grounded takes
5. Digital freedom and entrepreneurship — personal, inspiring
6. Faith-driven optimism — grounded hope for the future
7. Building in public — documenting the journey honestly
8. Educational breakdowns — complex topics made simple

**Guiding principle:** Make advanced technology feel understandable and attainable for people who aren't engineers. The goal is always to move someone from confusion to understanding to action.

**Content-to-product funnel:**
Blog posts and social content → `/ai-systems` CTA → Lead form → Service engagement → Long-term relationship → Future product adoption

---

## 10 — LONG-TERM VISION

The long-term goal is a **trusted, connected future-technology ecosystem** that includes:

- AI implementation services and automation systems
- Educational content platform (YouTube, blog, social)
- Personal productivity and intelligence dashboard (Signal)
- Business directory and marketplace (DWT)
- Community for people building with AI and digital assets
- Future SaaS products built on proven demand
- Decentralized opportunity systems as the infrastructure matures

**The north star:** Every product and piece of content should help someone move from where they are today — confused, overwhelmed, or left out of the technology revolution — to a place where they have the tools, knowledge, and systems to build real freedom.

The ecosystem is not built to impress other developers. It is built to empower regular people.

---

*Last updated: 2026-05-07*
