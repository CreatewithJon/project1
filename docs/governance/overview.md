# Governance, Observability & Safety Guide

> If you can't see what your AI is doing, you can't fix it. If you can't control what it does, you can't trust it.

---

## Why Enterprise AI Needs Governance

A language model will say what seems most likely to be correct. It won't tell you when it's wrong. It won't tell you when it's expensive. It won't alert you when someone is trying to manipulate it. It won't stop itself from taking a destructive action.

All of that is your job. Governance is the infrastructure that keeps AI systems safe, observable, and auditable in production.

For GH-600, governance is not a theoretical concept. Enterprise hiring managers ask candidates: "How would you monitor this AI in production?" If you don't have a concrete answer involving real tools and patterns, you're not ready.

---

## The Governance Stack

```
┌─────────────────────────────────────────────┐
│              GOVERNANCE LAYER                │
│                                              │
│  OBSERVABILITY    AUTHENTICATION    SAFETY   │
│  ─────────────    ──────────────    ──────   │
│  Helicone         Middleware auth   HITL     │
│  Feature tags     httpOnly cookies  MaxTokens│
│  Cost tracking    RBAC (roadmap)    Input val│
│  Error rates      Secret rotation   Injection│
│                                              │
│  AUDIT LOGS       COST CONTROL    EVALUATION │
│  ────────────     ────────────    ──────────  │
│  Vercel logs      Token limits    (roadmap)  │
│  Helicone logs    Rate limits     QA scoring │
│  ai_executions    Cost alerts     Regression │
│  (roadmap)        (Helicone)      testing    │
└─────────────────────────────────────────────┘
```

---

## Observability Deep Dive

### What You Need to Observe

For every AI call in production, you should know:

| Metric | Why It Matters |
|---|---|
| Which route/feature called | Cost attribution, debugging |
| Which model was used | Performance vs. cost tradeoffs |
| Input token count | Most of your AI cost |
| Output token count | Variable based on maxTokens |
| Latency | User experience, SLA compliance |
| Success/failure | Reliability metrics |
| Request content | Debugging failed calls |
| Response content | Quality monitoring |

### Helicone Setup

Helicone is a **proxy** — it sits between your app and the Anthropic API:

```
Your App → Helicone (logs everything) → Anthropic → Helicone → Your App
```

**Activation:**
1. Sign up at helicone.ai
2. Get your API key
3. Add to `.env.local`: `HELICONE_API_KEY=sk-helicone-...`
4. `lib/ai.ts` automatically routes through Helicone when this key is set

**In the Helicone dashboard you can:**
- Filter calls by feature tag (`"lead-score"`, `"content-draft"`, etc.)
- See cost per feature per day
- Set cost alerts (email when daily spend > $10)
- Search request history
- View full prompts and responses

### Feature Tags: The Key to Useful Observability

Without tags, all your AI calls look the same in the dashboard — you can't tell which feature is expensive, which is failing, which is slow.

With tags:
```typescript
// Lead scoring: $0.003 avg, 1.2s avg, 0.1% error rate
await callClaude({ tag: "lead-score", ... });

// Content drafting: $0.018 avg (larger), 3.1s avg, 0.0% error rate
await callClaude({ tag: "content-draft", ... });

// B-roll planning: $0.004 avg, 1.8s avg
await callClaude({ tag: "broll-plan", ... });
```

The tags let you answer: "Why is my AI bill $200 this month?" → Filter by tag → "Content drafting is 80% of cost."

---

## Authentication Architecture

### Signal Dashboard: Full Middleware Auth

```typescript
// middleware.ts — runs before every request
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip: login page, auth API, static files
  if (isAllowed(pathname)) return NextResponse.next();

  // Check cookie
  const auth = req.cookies.get("signal-auth")?.value;
  if (auth !== process.env.DASHBOARD_PASSWORD) {
    return NextResponse.redirect(`/login?from=${pathname}`);
  }

  return NextResponse.next();
}
```

**Why middleware and not page-level auth?**
Middleware runs on the Edge — before the page or API route handler executes. If you put auth checks inside a page component, the page still renders partially before the check. Middleware is the only reliable way to guarantee a route is never reachable without auth.

### Cookie Security Properties

```typescript
res.cookies.set("signal-auth", password, {
  httpOnly: true,    // JS can't read it — prevents XSS token theft
  secure: prod,      // HTTPS only in production — prevents network interception
  sameSite: "lax",   // CSRF protection — cookie not sent on cross-site requests
  maxAge: 2592000,   // 30 days — persistent login
  path: "/",         // Available across all paths
});
```

**GH-600:** Know all four security properties and what attack each one prevents.

---

## Input Validation Pattern

Every API route in this system validates input before any AI call. This serves two purposes:
1. Returns clear error messages to legitimate users
2. Prevents garbage input from reaching the AI

```typescript
// Standard validation pattern used across all routes
let body: { message?: string };
try {
  body = await req.json();
} catch {
  return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
}

const message = body?.message?.trim();
if (!message) {
  return NextResponse.json({ error: "Message is required." }, { status: 400 });
}
if (message.length > 10000) {
  return NextResponse.json({ error: "Message too long." }, { status: 400 });
}
```

The length limit (`> 10000`) is both a prompt injection defense (long inputs are often injection attempts) and a cost control (very long inputs are expensive to process).

---

## HITL (Human-in-the-Loop) Implementation

### The Pattern

```
AI GENERATES → [DATA STORED, NOT ACTED ON] → HUMAN REVIEWS → HUMAN ACTS
```

In this system:

**Outreach generation:**
```typescript
// Agent generates 6 message variants
const drafts = JSON.parse(await callClaude({ tag: "lead-outreach", ... }));

// Stored in database — NOT sent
await supabase.from("prospects")
  .update({ outreach_drafts: drafts, status: "Message Drafted" })
  .eq("id", id);

// Human sees drafts in Lead Engine UI
// Human clicks "Copy" and sends manually
// AI never touches LinkedIn/email/SMS
```

**Why this matters:**
If the AI sends a message and it's wrong — wrong tone, wrong information, inappropriate timing — there's no undo. The human review step costs 30 seconds and prevents irreversible mistakes.

### When to Skip HITL

HITL adds latency and friction. Skip it for:
- Internal database updates (scoring, tagging)
- Informational responses (chat answers, summaries)
- Draft generation where human will review anyway
- Reversible actions where undo is easy

Add HITL for:
- External communications (email, SMS, social)
- Financial actions (charges, refunds)
- Permanent deletes
- Publishing to public channels
- Anything that creates a legal or reputational obligation

---

## Evaluation & Quality Monitoring (Roadmap)

Current system: no formal evaluation. Quality is assessed manually — you read outputs and judge.

Phase 2 roadmap: LLM-as-judge evaluation.

```typescript
// Evaluate scoring quality
async function evaluateScoringQuality(
  prospect: Prospect,
  score: ScoringResult
): Promise<{ quality: "good" | "questionable" | "bad"; reason: string }> {
  const evalPrompt = `
    You are a QA evaluator. A sales AI scored this prospect:
    
    Prospect: ${JSON.stringify(prospect)}
    Score: ${JSON.stringify(score)}
    
    Is this score reasonable? Return JSON:
    { "quality": "good|questionable|bad", "reason": "..." }
  `;
  
  const result = await callClaude({
    messages: [{ role: "user", content: evalPrompt }],
    tag: "eval-scoring",
    maxTokens: 200,
  });
  
  return JSON.parse(result);
}
```

When quality is "questionable" or "bad", log it, flag for human review, and use it to improve the scoring prompt.

This is the **eval loop** — a continuous improvement cycle for AI quality.

---

## Governance Checklist

### Observability
- [ ] All AI calls routed through Helicone
- [ ] Meaningful feature tag on every call
- [ ] Cost alert configured in Helicone
- [ ] Error monitoring in place (Vercel + Helicone)

### Authentication
- [ ] Private routes protected by middleware
- [ ] httpOnly cookies for session auth
- [ ] Separate passwords per product/environment

### Safety
- [ ] `maxTokens` set on every AI call
- [ ] Input length limits on all user-facing AI endpoints
- [ ] HITL gates before external actions
- [ ] System prompts include injection resistance instructions

### Audit
- [ ] Helicone logging active (all AI calls)
- [ ] Vercel request logging (all HTTP calls)
- [ ] ai_executions table (roadmap Phase 2)

### Quality
- [ ] Structured output validation (roadmap Phase 2)
- [ ] LLM-as-judge evaluation (roadmap Phase 2)
- [ ] Prompt version control in lib/prompts/ (roadmap Phase 2)
