# AGENTIC_SYSTEMS_PROJECT_STATE.md — Aigentic Systems
> Scope boundary document for the Aigentic Systems company.
> This file exists in the DWT repo ONLY to establish what Aigentic Systems is
> and to prevent Claude from mixing it into DWT work.
> Last updated: 2026-06-12.

---

## Purpose

This document defines the scope of Aigentic Systems and establishes a clear separation boundary between it and Digital Wealth Transfer.

**The most important thing Claude must know about this document:**
Aigentic Systems is a **separate company**. It has no codebase in this repo. It has no routes on `digitalwealthtransfer.com`. It is not a product within the DWT ecosystem. It is a different business entirely.

---

## What Aigentic Systems Is

**Aigentic Systems** is an AI implementation and automation services company. It builds done-for-you AI systems for local businesses and organizations.

**Services include:**
- AI lead capture systems
- Automated follow-up and appointment-setting workflows
- AI-powered chatbots and SMS bots
- CRM setup and lead tracking
- AI-optimized websites and funnels
- Content and growth systems
- Custom AI automation for specific business processes

**Price range:** $500–$1,500+ per project; $500/month for ongoing optimization

**Target customers:** Med spas, real estate agents, solar/roofing companies, home service contractors, insurance agents, law firms, fitness coaches, consultants, Web3/AI service providers

**Operator:** Jonathan Cardona
**Geographic focus:** Las Vegas + nationwide

---

## Ownership

**Founder/Operator:** Jonathan Cardona
**Brand:** Aigentic Systems (separate from Digital Wealth Transfer)
**Repo:** None in this ecosystem — separate deployment

---

## What Aigentic Systems Is NOT

- It is not a content/media platform
- It is not a directory or marketplace
- It is not a DWT product line
- It is not Sovereign OS
- It is not Crypto Mondays

---

## Separation Rules — What Claude Must Never Do

When working in `my-sample-proj` (the DWT repo):

1. **Do not add service offer pages for Aigentic Systems to DWT**
   - No "AI Lead Machine for $750" pages
   - No "Done for you in 7 days" offers
   - No pricing cards for implementation services

2. **Do not add Aigentic Systems lead forms to DWT**
   - DWT may have a newsletter signup and a general contact form
   - It does not have AI systems inquiry forms
   - `AILeadForm`, `OfferLeadForm`, and `ai_leads` Supabase table are legacy artifacts — audit their continued relevance

3. **Do not cross-promote Aigentic Systems on DWT pages**
   - DWT may editorially *mention* that Jonathan builds AI systems
   - DWT may not function as the Aigentic Systems website or lead funnel

4. **Do not give Aigentic Systems a route on `digitalwealthtransfer.com`**
   - `/ai-systems`, `/ai-leads`, `/ai-content`, `/ai-strategy`, `/solutions` were all deleted in the 2026-06-12 pivot
   - Do not recreate them

---

## What IS Permitted

- DWT articles may discuss AI systems, automation, and implementation as **editorial topics**
- DWT portfolio page may reference Jonathan's AI systems work as **proof of capability**
- Jonathan's bio and About sections may mention that he builds AI systems as part of his story
- DWT newsletter may mention Aigentic Systems as a resource if contextually appropriate
- The `/portfolio` page documents Jonathan's built work — this is a credibility layer, not a services page

---

## Included Assets (Aigentic Systems Only)

None in this repo. Aigentic Systems has its own:
- Domain (separate)
- Deployment (separate)
- Lead forms and Supabase tables (separate)
- Brand and copy (separate)

---

## Excluded Assets (Do Not Import into DWT)

- Service pricing pages
- Done-for-you offer stacks
- Client onboarding flows
- Implementation service lead forms
- Agency-style "How It Works" sections tied to service delivery

---

## Related Projects

| Project | Relationship |
|---|---|
| Digital Wealth Transfer | Separate brand — Jonathan is the founder of both, but they are distinct companies |
| Sovereign OS | No direct relationship — both are Jonathan's products but different categories |
| Crypto Mondays | Separate — no relationship |

---

## Future Direction

Aigentic Systems may eventually:
- Get its own domain and Vercel deployment
- Have its own repo in Jonathan's GitHub
- Be mentioned or linked from DWT as a related resource
- Build a client portal or CRM separate from the DWT infrastructure

When that happens, create a proper `AGENTIC_SYSTEMS_PROJECT_STATE.md` in that repo with full technical and strategic state.

---

*This document is a scope boundary — not a full project state. It lives in the DWT repo only to keep Claude oriented.*
*If Aigentic Systems ever gets its own repo, this document can be deleted from the DWT repo.*
