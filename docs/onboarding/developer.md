# Developer Onboarding Guide

> Welcome. This guide gets you from zero to a running local environment and explains the architectural decisions you'll need to understand to contribute effectively.

---

## Prerequisites

- Node.js 20+
- Git
- A Supabase account (free tier works)
- An Anthropic API key

---

## Repository Setup

```bash
# DWT Platform
git clone https://github.com/CreatewithJon/project1.git my-sample-proj
cd my-sample-proj
npm install

# Signal Dashboard
git clone https://github.com/CreatewithJon/signal-dashboard.git
cd signal-dashboard
npm install
```

---

## Environment Variables

Create `.env.local` in each project root.

### my-sample-proj/.env.local
```bash
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
FIRECRAWL_API_KEY=fc-...
APIFY_API_TOKEN=apify_api_...
GH600_PASSWORD=your-password-here
# HELICONE_API_KEY=sk-helicone-...  # Uncomment to enable observability
```

### signal-dashboard/.env.local
```bash
ANTHROPIC_API_KEY=sk-ant-...
YOUTUBE_API_KEY=AIza...
HIGGSFIELD_API_KEY=...
RUNWAY_API_KEY=key_...
DASHBOARD_PASSWORD=your-password-here
# HELICONE_API_KEY=sk-helicone-...
```

---

## Running Locally

```bash
npm run dev         # Start dev server at localhost:3000
npm run build       # Production build (run before deploying)
npm run lint        # ESLint
npx tsc --noEmit    # Type check — always run before committing
```

Always run `npx tsc --noEmit` before pushing. There is no test suite — TypeScript is the correctness check.

---

## Project Structure (DWT Platform)

```
my-sample-proj/
├── app/                    # Next.js App Router pages and API routes
│   ├── page.tsx            # Homepage
│   ├── ai-systems/         # AI services offer page
│   ├── api/                # All backend logic lives here
│   │   ├── leads/          # Lead capture (no AI)
│   │   ├── ai-leads/       # AI inquiry capture
│   │   ├── analyze/        # Website analysis (Firecrawl + Claude)
│   │   ├── dealership-chat/# AI chat with inventory context
│   │   ├── lead-engine/    # Prospect scoring and outreach
│   │   └── gh600-auth/     # GH600 page auth
│   ├── blog/               # Blog index and posts
│   ├── companies/          # Directory company pages
│   ├── directory/          # Filterable directory
│   ├── gh600/              # GH600 presentation (password protected)
│   └── links/              # Links page (Linktree-style)
├── components/             # Reusable React components
├── lib/
│   ├── ai.ts               # ← CENTRAL AI HELPER — read this first
│   ├── data/               # Static mock data (companies, articles)
│   ├── firecrawl.ts        # Firecrawl client and analysis helpers
│   └── types.ts            # Shared TypeScript types
├── docs/                   # ← You are reading this
├── middleware.ts            # Route protection for /gh600
└── public/                 # Static assets
```

---

## The Most Important File: `lib/ai.ts`

Before touching any API route, read `lib/ai.ts`. This is the single function that every AI call in the codebase goes through.

```typescript
export async function callClaude({
  model = "claude-haiku-4-5-20251001",
  messages,
  system,
  maxTokens = 1024,
  tag = "general",
}: CallClaudeOptions): Promise<string>
```

**If you're adding a new AI route:**
1. Import `callClaude` from `@/lib/ai`
2. Pass a meaningful `tag` parameter (for Helicone filtering)
3. Never write a direct `fetch("https://api.anthropic.com/...")` call

---

## How to Add a New AI Route

1. **Create the route file:**
   ```
   app/api/my-feature/route.ts
   ```

2. **Follow this template:**
   ```typescript
   import { NextRequest, NextResponse } from "next/server";
   import { callClaude } from "@/lib/ai";

   const SYSTEM_PROMPT = `Your persona and rules here.`;

   export async function POST(req: NextRequest) {
     if (!process.env.ANTHROPIC_API_KEY) {
       return NextResponse.json({ error: "Service unavailable." }, { status: 503 });
     }

     let body: { input?: string };
     try {
       body = await req.json();
     } catch {
       return NextResponse.json({ error: "Invalid request." }, { status: 400 });
     }

     const { input } = body;
     if (!input) {
       return NextResponse.json({ error: "input is required." }, { status: 400 });
     }

     try {
       const result = await callClaude({
         messages: [{ role: "user", content: input }],
         system: SYSTEM_PROMPT,
         maxTokens: 512,
         tag: "my-feature",  // ← Always set a tag
       });
       return NextResponse.json({ result });
     } catch (err) {
       console.error("my-feature error:", err);
       return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
     }
   }
   ```

3. **Run type check:** `npx tsc --noEmit`

---

## How to Add a New Supabase Table

1. Create the migration in Supabase dashboard SQL editor
2. Never initialize Supabase at module level — always inside the handler:
   ```typescript
   function getSupabase() {
     return createClient(
       process.env.NEXT_PUBLIC_SUPABASE_URL!,
       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
     );
   }
   export async function POST(req: NextRequest) {
     const supabase = getSupabase();  // ← Inside handler, not outside
     ...
   }
   ```
3. Never expose `SUPABASE_URL` or `SUPABASE_ANON_KEY` via browser — use server-side routes only

---

## Architectural Rules (Non-Negotiable)

| Rule | Why |
|---|---|
| All AI calls via `callClaude()` | Centralized observability, no duplicated headers |
| Supabase client inside handler | Prevents build-time crash on missing env vars |
| `maxTokens` on every call | Cost control — no unbounded AI calls |
| `tag` on every call | Helicone filtering and cost attribution |
| No autonomous external actions | HITL principle — AI drafts, humans approve |
| `npx tsc --noEmit` before commit | Type safety is the test suite |

---

## Common Mistakes (And How to Avoid Them)

**Mistake:** Writing `fetch("https://api.anthropic.com/...")` directly in a route.
**Fix:** Use `callClaude()` from `@/lib/ai`. If you need a feature not in `callClaude()`, extend the helper.

**Mistake:** Creating a Supabase client at the top of a route file.
**Fix:** Always create it inside the handler function body.

**Mistake:** Returning AI output directly without validating it.
**Fix:** If you expect JSON, use `JSON.parse()` inside try/catch. If you need specific fields, validate with Zod or manual checks.

**Mistake:** Using a generic `tag: "general"` for every call.
**Fix:** Use a specific tag that identifies the feature: `"lead-score"`, `"content-draft"`, `"broll-plan"`. This is how you analyze costs per feature in Helicone.
