# SOVEREIGN_OS_PROJECT_STATE.md — Sovereign OS
> Current state of the Sovereign OS product initiative.
> Last updated: 2026-06-12.

---

## Purpose

Sovereign OS is a **personal intelligence operating system** for the AI era. A command center for how an individual thinks, works, plans, tracks, and builds — without giving ownership of that data or workflow to any subscription platform.

**Core promise:** Own your tools. Own your data. Own your workflow.

It is built for the same audience as DWT — regular people who want the leverage that advanced technology creates, without needing a technical pedigree to use it.

---

## Ownership

**Founder:** Jonathan Cardona
**Role:** Product designer, builder, primary user
**Status:** In development — no public launch date set

---

## Audience

**Primary:** Self-directed builders, entrepreneurs, creators, and forward-thinking individuals who want a personal operating system that isn't rented from a platform.

**Characteristics:**
- Already follows DWT content — this is the product conversion from reader to user
- Frustrated by fragmented tools, subscription bloat, and lack of data ownership
- Interested in AI, Bitcoin, automation, and personal leverage
- Does not need a technical background to use the product

---

## Current Status

**Phase:** Prototype — living inside `my-sample-proj` at `/dashboard`

The dashboard at `/dashboard` is publicly accessible and represents the earliest working prototype. It is not marketed as a product yet — it is framed as a preview / build log artifact.

**What exists today (prototype at `/dashboard`):**
- Bitcoin price panel (live CoinGecko data)
- Productivity / Pomodoro timer
- Habit tracking
- AI assistant panel (Claude-powered)

**What has been scoped but not yet built:**
- Life Planner — daily/weekly/monthly goals, 1/3/5-year vision, AI planning assistant
- Content Engine — YouTube channel analysis, outlier video detection, LinkedIn post generator, Teleprompter
- Bitcoin portfolio tracking — holdings, cost basis, P&L
- Automation workflow builder
- B-roll pipeline (Higgsfield + FFmpeg + OpenAI Whisper)

**Note on `signal-dashboard` repo:** A separate repo (`~/signal-dashboard`) exists with a more developed version of some of these features (Next.js 15.2.6, Anthropic API, CoinGecko, YouTube Data API, localStorage persistence). That repo is the Sovereign OS prototype codebase. The `/dashboard` route in `my-sample-proj` is a lighter reference version.

---

## Included Assets

### In `my-sample-proj`
- `/dashboard` — Prototype preview, publicly accessible
- `/sovereign-os` — Planned waitlist/teaser route (not yet built)
- Sovereign OS teaser section on homepage (`app/page.tsx`) — live as of 2026-06-12

### In `signal-dashboard` repo (separate)
- Full prototype with planner, content engine, teleprompter routes
- CoinGecko integration
- YouTube Data API v3 integration
- Claude API integration via Anthropic SDK
- localStorage persistence

---

## Excluded Assets

- Sovereign OS does not live on the DWT domain as a shipped product
- Sovereign OS does not include Aigentic Systems service flows
- Sovereign OS does not include Crypto Mondays community features
- Sovereign OS is NOT a SaaS dashboard rented to businesses — it is a personal tool

---

## Relationship to DWT

DWT is the **audience funnel** for Sovereign OS. The relationship:

```
DWT reader → trust built through content → newsletter subscriber
  → Sovereign OS waitlist → product user
```

DWT content documents the build of Sovereign OS in real time ("build in public"). The `/dashboard` prototype is visible to DWT visitors as evidence that the product is real.

When Sovereign OS launches, it gets its own domain and brand. DWT continues as the media layer that drove awareness.

---

## Related Projects

| Project | Relationship |
|---|---|
| Digital Wealth Transfer | Audience funnel and build-log documentation platform |
| Aigentic Systems | Separate — no overlap in product or tooling |
| Crypto Mondays | Separate — no overlap |

---

## Design Direction

Sovereign OS has its own visual identity within the shared Jonathan Cardona design DNA:

**Primary accent:** Violet (`#8b5cf6`) — intelligence, cognition, AI
**Secondary:** Gold/amber (`#f59e0b`) — Bitcoin, signal, wealth
**Aesthetic:** Minimal. Precision. Purposeful. A tool, not a dashboard.

Every screen should feel like something a serious builder would want on their screen permanently — not something that announces itself.

**Inspirations:** Linear, Raycast, Arc browser, Palantir Foundry, personal Bloomberg Terminal energy.

---

## Future Direction

1. **Waitlist** — `/sovereign-os` on DWT domain captures early interest before launch
2. **Build log** — documented via DWT articles and social content
3. **Private beta** — DWT newsletter subscribers first
4. **Domain** — dedicated domain at launch (e.g., `sovereignos.com`)
5. **Monetization** — one-time purchase or small annual fee — no recurring subscription model
6. **Long-term** — potential for decentralized data layer, Bitcoin-native payment

---

## Open Questions

- Does Sovereign OS launch as a web app, desktop app (Electron/Tauri), or both?
- What is the minimum feature set for a private beta?
- One-time purchase vs. small annual fee — which signals sovereignty better?
- How tightly does it integrate with Bitcoin-native tools (wallets, Lightning, Nostr)?

---

*This document tracks Sovereign OS as a product initiative. For the DWT media platform that promotes it, see `DWT_PROJECT_STATE.md`.*
