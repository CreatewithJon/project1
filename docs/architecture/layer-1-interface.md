# Layer 1 — Interface Layer

> **The one-sentence version:** The interface layer is everything the user touches — and every decision you make here shapes how much trust they give your AI system before it ever makes a single call.

---

## Why Interface Design Matters for AI Systems

Traditional UI design is about clarity and efficiency. AI interface design adds a third dimension: **managing expectations**.

Users bring assumptions to AI systems:
- "It knows everything"
- "It's always right"
- "It will do exactly what I say"

None of these are true. The interface is your chance to set accurate expectations before the first message, handle errors gracefully when the AI is wrong, and build trust through transparency.

GH-600 tests this. Expect questions about AI disclosure, error handling in interfaces, and how to design interactions that maintain user trust across both good and bad AI outputs.

---

## The DWT Interface Inventory

### Customer-Facing Interfaces

**Homepage (`/`)**
Two-sided lead capture. Business owners and service providers see different CTAs and value propositions. The AI isn't visible here — it's in the backend scoring the leads that come in.

Key interface decisions:
- No AI disclosure needed (AI processes leads server-side, not in real-time with user)
- Trust signals (stats, social proof) positioned before the form
- Two distinct forms at the same URL — segmented by user type

**AI Systems Page (`/ai-systems`)**
Offer page for Jonathan's AI services. Heavy trust work: FAQ section, "No X" promises, clear pricing. The interface job is to reduce anxiety before the user considers reaching out.

**Dealership Chat Widget**
Embedded conversational AI. This is the most complex interface in the system.

Interface requirements for AI chat:
1. **Disclosure** — User should know they're talking to an AI (not legally required everywhere, but ethically correct and reduces disappointment)
2. **Loading states** — User needs to know the AI is thinking
3. **Error states** — If Claude returns 503, show a human message: "Our AI assistant is temporarily unavailable. Call us at..."
4. **Conversation limits** — The `.slice(-10)` history limit means the AI will forget old messages. This should be surfaced if relevant.

### Founder-Facing Interfaces

**Signal Dashboard** (`/`)
Personal OS. BTC panel, Pomodoro timer, habit tracker, AI chat. The interface philosophy here is different from customer-facing: no conversion optimization, maximum information density, premium dark aesthetic.

Interface principle: **reduce friction to the point of zero** for the one user who uses this daily. Every click saved matters.

**Lead Engine** (`/lead-engine`)
The most powerful internal interface. Displays prospect list, scoring, outreach drafts. The HITL gate is built into the UI — outreach drafts are shown for review, not auto-sent.

Interface design for HITL:
```
Prospect scored: 8/10 ✓
Recommended: AI Lead System ✓
Outreach drafts generated ✓

[IG DM — 78 words]
"Came across your med spa — noticed you don't have an automated..."
[Copy] [Edit]

[LinkedIn DM — 65 words]
"Looked at your practice — no automated follow-up for missed calls..."
[Copy] [Edit]

→ I'll review and send these manually.
```

The "I'll review and send manually" is explicit — it's part of the UI communicating the HITL design.

---

## Interface Patterns for AI Systems

### Pattern 1: Progressive Disclosure

Don't show the AI's uncertainty upfront. Show confident output, with the ability to dig deeper.

```
Lead Score: 8/10  [Why?]
                    ↓ (on click)
"Strong fit. Med spa with no online booking, 
no lead form, active Instagram but no automated 
follow-up. Exact ICP match."
```

The score is immediately visible. The reasoning is one click away. This respects the user's time while preserving detail.

### Pattern 2: Confidence Indicators

When AI output has variable quality, show confidence signals.

```
Outreach Draft: ██████████ High Confidence (prospect has detailed notes)
Outreach Draft: ████░░░░░░ Low Confidence  (prospect has minimal data)
```

A low-confidence draft should be labeled as such — the human reviewer knows to spend more time on it.

### Pattern 3: Graceful Degradation

When the AI is unavailable, the interface should never be broken — just limited.

```typescript
// Route handler returns 503
if (!process.env.ANTHROPIC_API_KEY) {
  return NextResponse.json({ error: "Service temporarily unavailable." }, { status: 503 });
}

// Interface shows graceful fallback
{error && (
  <p className="text-amber-400 text-sm">
    AI scoring is temporarily unavailable. You can still add this prospect manually.
  </p>
)}
```

The user can still use the system. They just can't use the AI feature right now. This is far better than a broken page or a cryptic error code.

### Pattern 4: Explicit Loading States

Every AI call takes 1-5 seconds. The UI must communicate that the system is working.

```typescript
const [loading, setLoading] = useState(false);

async function handleScore() {
  setLoading(true);
  try {
    const result = await scoreProspect(id);
    setScore(result);
  } finally {
    setLoading(false);
  }
}

// In the JSX:
<button disabled={loading} onClick={handleScore}>
  {loading ? "Scoring..." : "Score with AI"}
</button>
```

The `disabled` state prevents double-clicks (double API calls). The text change tells the user exactly what's happening.

---

## The Trust Architecture

Trust in an AI interface is built through four things:

1. **Accuracy** — The AI is right most of the time. This is the AI quality problem, solved in the Orchestration and Agent layers.

2. **Transparency** — The user knows what the AI is doing and why. Achieved through labels, reasoning displays, and honest error messages.

3. **Control** — The user can override, edit, or reject AI output. Achieved through copy buttons, edit states, and explicit "send manually" patterns.

4. **Consistency** — The AI behaves predictably. Achieved through strong system prompts and output validation.

The DWT interface is designed around all four. The HITL pattern for outreach is fundamentally a trust architecture decision — users trust the system more because they know they're in control.

---

## GH-600 Interface Exam Topics

**AI disclosure:** When and how must users be told they're interacting with AI? Know regional regulations (EU AI Act requires disclosure) and best practices (always disclose in customer-facing systems).

**Error messaging:** Never surface raw API errors to users. "Claude 429: rate limit exceeded" should become "AI is temporarily busy. Try again in a moment."

**Loading and skeleton states:** Long AI calls need loading indicators. A UI that appears frozen for 3 seconds will lose users.

**Accessibility in AI interfaces:** If your AI chat widget isn't keyboard navigable and screen-reader compatible, it fails enterprise accessibility requirements.

**Trust calibration:** Overconfident AI interfaces (no caveats, no uncertainty) create complacency and set up worse failures when the AI is wrong. Well-calibrated interfaces communicate confidence levels and invite human judgment.
