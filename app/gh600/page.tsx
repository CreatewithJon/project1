import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GH-600 AI Architecture — Live Case Study | Digital Wealth Transfer",
  description:
    "A real, deployed AI system mapped to every GH-600 exam domain. Built by Jonathan Cardona as proof of concept for an enterprise AI certification training course.",
};

const LAYERS = [
  {
    number: "01",
    name: "Interface Layer",
    color: "blue",
    hex: "#3b82f6",
    glow: "rgba(59,130,246,0.15)",
    border: "rgba(59,130,246,0.25)",
    gh600: "Human-AI Interaction Design",
    what: "The front-end surfaces users interact with — web pages, forms, chat widgets, dashboards.",
    exam: "GH-600 tests how AI interfaces handle ambiguous input, error states, and user trust signals. Examiners look for progressive disclosure, clear AI disclosure, and graceful fallback copy.",
    proof: [
      { label: "DWT Homepage", detail: "Dual-path lead forms — business vs. provider — routing users by intent before any AI call is made" },
      { label: "AI Systems page", detail: "Tiered offer stack with trust signals, FAQ, and explicit 'no BS' promises — reduces friction before the AI lead capture fires" },
      { label: "Signal Dashboard", detail: "Password-protected personal OS with AI chat, planner, and content engine — complete human-in-the-loop design" },
      { label: "Dealership Chat Widget", detail: "Embedded AI sales assistant with conversation history, inventory context injection, and graceful 503 fallback" },
    ],
  },
  {
    number: "02",
    name: "Orchestration Layer",
    color: "violet",
    hex: "#8b5cf6",
    glow: "rgba(139,92,246,0.15)",
    border: "rgba(139,92,246,0.25)",
    gh600: "Prompt Engineering & Model Routing",
    what: "The logic that decides which model to call, what context to inject, and how to format the request.",
    exam: "GH-600 covers system prompt design, context window management, model selection criteria (speed vs. quality vs. cost), and structured output enforcement. A core exam topic is preventing prompt injection.",
    proof: [
      { label: "lib/ai.ts (callClaude helper)", detail: "Single abstraction across 10 routes — model, maxTokens, system prompt, and Helicone tag all configurable per call" },
      { label: "Feature tags", detail: "Every call tagged: 'lead-score', 'content-draft', 'dealership-chat' — enables model-level routing in future" },
      { label: "System prompts per feature", detail: "Each route has a purpose-built system prompt — planner has a coaching persona, dealership has inventory context, lead scorer has scoring rubric" },
      { label: "JSON enforcement", detail: "Lead scoring and outreach routes force structured JSON output with regex cleanup — matches GH-600's 'output validation' domain" },
    ],
  },
  {
    number: "03",
    name: "Agent Layer",
    color: "amber",
    hex: "#f59e0b",
    glow: "rgba(245,158,11,0.15)",
    border: "rgba(245,158,11,0.25)",
    gh600: "Agentic Systems & Tool Use (ReAct Pattern)",
    what: "Autonomous AI processes that observe, reason, act, and loop — using tools to complete multi-step tasks.",
    exam: "GH-600's heaviest domain. Tests the ReAct loop (Observe → Think → Act), tool use patterns, agent chain design, when to use HITL gates, and how to prevent runaway agents. Expect scenario-based questions.",
    proof: [
      { label: "Lead Engine: /api/lead-engine", detail: "Full ReAct pipeline: Firecrawl tool (observe) → Claude analysis (think) → Supabase update (act) → prospect scoring (loop)" },
      { label: "B-Roll Pipeline", detail: "Agent loop: transcript input → Claude identifies moments (think) → Higgsfield/Runway video generation (act) → status polling (observe) → fallback to Runway on failure" },
      { label: "Provider fallback pattern", detail: "Higgsfield → timeout → Runway — demonstrates tool chaining with graceful degradation, a core GH-600 agent design pattern" },
      { label: "Outreach drafts", detail: "Prospect data in → 6 message variants out (IG DM, LinkedIn, email, 2 follow-ups, breakup) — single-agent, multi-output tool use" },
    ],
  },
  {
    number: "04",
    name: "Memory Layer",
    color: "emerald",
    hex: "#10b981",
    glow: "rgba(16,185,129,0.15)",
    border: "rgba(16,185,129,0.25)",
    gh600: "AI Memory Architecture (4 Types)",
    what: "How AI systems store, retrieve, and use information across calls, sessions, and time.",
    exam: "GH-600 defines 4 memory types: Working (in-context), Episodic (session history), Semantic (vector search), Procedural (system prompts / fine-tuning). Questions test when to use each and how they interact.",
    proof: [
      { label: "Working memory", detail: "Dealership chat sends last 10 messages as conversation history on every call — the AI 'remembers' what was said this session via in-context injection" },
      { label: "Episodic memory", detail: "Signal Planner stores daily/weekly/monthly/yearly plans in localStorage — retrieved and sent as context on each planner chat call" },
      { label: "Semantic memory (roadmap)", detail: "Supabase + pgvector schema designed for prospect notes and content embeddings — the next phase of the lead engine" },
      { label: "Procedural memory", detail: "Every system prompt IS procedural memory — the AI's 'how to behave' knowledge encoded at the orchestration layer, not re-explained per call" },
    ],
  },
  {
    number: "05",
    name: "Governance Layer",
    color: "rose",
    hex: "#ef4444",
    glow: "rgba(239,68,68,0.15)",
    border: "rgba(239,68,68,0.25)",
    gh600: "Observability, Safety & Responsible AI",
    what: "The infrastructure that monitors, audits, controls, and ensures AI systems behave as intended.",
    exam: "GH-600 tests observability tooling, cost controls, PII handling, rate limiting, human oversight gates, and responsible AI principles. A growing exam domain given enterprise deployment requirements.",
    proof: [
      { label: "Helicone observability proxy", detail: "All 10 Claude calls routed through Helicone — full request/response logs, latency, token counts, cost per feature, error rates" },
      { label: "Authentication gate (Signal)", detail: "Middleware-based password protection with httpOnly cookies — AI tools are not publicly accessible, only authorized users reach them" },
      { label: "API key guard pattern", detail: "Every route checks ANTHROPIC_API_KEY before any AI call — fails loudly with 503, never silently" },
      { label: "Graceful degradation", detail: "callClaude() works with or without Helicone key — system never breaks due to missing observability config" },
    ],
  },
];

const EXAM_DOMAINS = [
  { domain: "Prompt Engineering", weight: "~20%", covered: "System prompts, structured output, context injection" },
  { domain: "Agentic Systems & Tool Use", weight: "~25%", covered: "ReAct loop, tool chaining, fallback patterns, HITL" },
  { domain: "Memory Architecture", weight: "~15%", covered: "All 4 types: working, episodic, semantic, procedural" },
  { domain: "AI Infrastructure", weight: "~15%", covered: "Proxy pattern, middleware, model routing, API design" },
  { domain: "Observability & Governance", weight: "~15%", covered: "Helicone, auth gates, cost control, error handling" },
  { domain: "Human-AI Interaction", weight: "~10%", covered: "Interface design, trust signals, fallback UX" },
];

const COURSE_MODULES = [
  { num: "01", title: "Anatomy of a Production AI System", description: "Use the DWT codebase to show every layer live. Students see real code, not slides." },
  { num: "02", title: "Prompt Engineering in the Wild", description: "Dissect 10 real system prompts from the project. Identify what works and why." },
  { num: "03", title: "Building the ReAct Agent Loop", description: "Walk through the lead engine pipeline step by step. Build a mini-version from scratch." },
  { num: "04", title: "Memory Design Patterns", description: "Implement all 4 memory types using the existing Supabase infrastructure." },
  { num: "05", title: "Observability & Governance", description: "Set up Helicone from zero. Read dashboards. Set cost alerts. Design auth gates." },
  { num: "06", title: "Exam Simulation & Scenario Drills", description: "GH-600 scenario questions mapped to each system component. Pass rate drills." },
];

export default function GH600Page() {
  return (
    <div className="min-h-screen bg-[#080C16] font-sans text-[#F9FAFB]">

      {/* Ambient */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[400px] bg-violet-600/4 rounded-full blur-[140px] pointer-events-none" />

      {/* ── HERO ── */}
      <section className="relative max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-blue-400/70 mb-5">
          GH-600 AI Implementation Certification · Live Case Study
        </p>
        <h1 className="text-4xl sm:text-6xl font-black tracking-[-0.03em] leading-[1.05] mb-6"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.45) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
          Every GH-600 Concept,<br />Deployed in Production
        </h1>
        <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed mb-4">
          This is a real AI system — not a demo, not slides — built by Jonathan Cardona across two live products.
          Every concept tested on the GH-600 exam is implemented, running, and mappable to specific lines of code.
        </p>
        <p className="text-sm text-white/30 max-w-xl mx-auto leading-relaxed">
          The proposal: use this system as the backbone of a GH-600 certification training course.
          Students learn from working infrastructure, not hypothetical architectures.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {[
            { n: "2", label: "Live deployed products" },
            { n: "10", label: "AI-powered API routes" },
            { n: "5", label: "Architecture layers" },
            { n: "6", label: "GH-600 exam domains covered" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center px-6 py-4 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <span className="text-3xl font-black text-white">{s.n}</span>
              <span className="text-xs text-white/35 mt-1 text-center max-w-[100px]">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT IS GH-600 ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="rounded-3xl p-8 sm:p-10" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-3">Context</p>
          <h2 className="text-2xl font-bold text-white mb-4">What is GH-600?</h2>
          <p className="text-white/55 leading-relaxed mb-4">
            GH-600 is an enterprise AI implementation certification focused on practical deployment —
            not theory. It tests whether a candidate can design, build, and govern production AI systems
            across five architectural layers. It&apos;s the certification companies look for when hiring
            AI engineers, implementation consultants, and AI product leads.
          </p>
          <p className="text-white/40 leading-relaxed">
            The exam is scenario-heavy. It asks: given this system, what&apos;s wrong with it? Given this
            requirement, which pattern solves it? Most candidates fail because they&apos;ve studied concepts
            but never touched a real system. A training course built around a live codebase solves that gap directly.
          </p>
        </div>
      </section>

      {/* ── SYSTEM OVERVIEW ── */}
      <section className="max-w-5xl mx-auto px-6 py-6">
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/25 mb-3 text-center">System Architecture</p>
        <h2 className="text-3xl font-bold text-white text-center mb-3">The 5-Layer AI OS</h2>
        <p className="text-white/40 text-center text-sm mb-12 max-w-xl mx-auto">
          The same 5-layer model GH-600 uses to structure its exam domains — implemented across two live products.
        </p>

        {/* Architecture diagram */}
        <div className="relative flex flex-col gap-0 max-w-2xl mx-auto mb-6">
          {LAYERS.map((layer, i) => (
            <div key={layer.number} className="relative">
              <div
                className="rounded-2xl px-6 py-4 flex items-center gap-4"
                style={{
                  background: layer.glow,
                  border: `1px solid ${layer.border}`,
                  marginTop: i === 0 ? 0 : "-1px",
                  borderRadius: i === 0 ? "16px 16px 8px 8px" : i === LAYERS.length - 1 ? "8px 8px 16px 16px" : "8px",
                }}
              >
                <span className="text-xs font-black tracking-widest" style={{ color: layer.hex }}>{layer.number}</span>
                <div className="flex-1">
                  <span className="text-white font-bold text-sm">{layer.name}</span>
                  <span className="text-white/30 text-xs ml-3">{layer.gh600}</span>
                </div>
                <div className="w-2 h-2 rounded-full" style={{ background: layer.hex, boxShadow: `0 0 8px ${layer.hex}` }} />
              </div>
              {i < LAYERS.length - 1 && (
                <div className="flex justify-center py-0.5">
                  <div className="w-px h-3" style={{ background: `linear-gradient(to bottom, ${layer.hex}40, ${LAYERS[i+1].hex}40)` }} />
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-white/20 mt-4">
          DWT (digitalwealthtransfer.com) · Signal Dashboard (signal.dwt.app) · Both deployed on Vercel
        </p>
      </section>

      {/* ── LAYER BREAKDOWNS ── */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/25 mb-3 text-center">Deep Dive</p>
        <h2 className="text-3xl font-bold text-white text-center mb-12">Layer-by-Layer Proof</h2>

        <div className="flex flex-col gap-8">
          {LAYERS.map((layer) => (
            <div key={layer.number} className="rounded-3xl overflow-hidden"
              style={{ border: `1px solid ${layer.border}`, background: "rgba(255,255,255,0.015)" }}>

              {/* Header */}
              <div className="px-7 py-5 flex items-center gap-4" style={{ background: layer.glow, borderBottom: `1px solid ${layer.border}` }}>
                <span className="text-2xl font-black" style={{ color: layer.hex }}>{layer.number}</span>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">{layer.name}</h3>
                  <p className="text-xs font-semibold tracking-wider uppercase mt-0.5" style={{ color: layer.hex, opacity: 0.7 }}>
                    GH-600: {layer.gh600}
                  </p>
                </div>
              </div>

              <div className="px-7 py-6 grid sm:grid-cols-2 gap-6">
                {/* What it is */}
                <div>
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/25 mb-2">What It Is</p>
                  <p className="text-white/60 text-sm leading-relaxed">{layer.what}</p>
                </div>

                {/* Exam relevance */}
                <div>
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/25 mb-2">Why It&apos;s on the Exam</p>
                  <p className="text-white/60 text-sm leading-relaxed">{layer.exam}</p>
                </div>
              </div>

              {/* Proof points */}
              <div className="px-7 pb-7">
                <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/25 mb-3">Live Implementation</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {layer.proof.map((p) => (
                    <div key={p.label} className="rounded-xl px-4 py-3"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <p className="text-white text-xs font-semibold mb-1" style={{ color: layer.hex }}>{p.label}</p>
                      <p className="text-white/40 text-xs leading-relaxed">{p.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EXAM DOMAIN COVERAGE ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/25 mb-3 text-center">Exam Alignment</p>
        <h2 className="text-3xl font-bold text-white text-center mb-3">GH-600 Domain Coverage</h2>
        <p className="text-white/35 text-center text-sm mb-10 max-w-lg mx-auto">
          Every tested domain is covered by at least one deployed component.
        </p>

        <div className="rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="grid grid-cols-3 gap-0 px-6 py-3" style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30">Exam Domain</p>
            <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 text-center">Est. Weight</p>
            <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30">Covered By</p>
          </div>
          {EXAM_DOMAINS.map((d, i) => (
            <div key={d.domain}
              className="grid grid-cols-3 gap-0 px-6 py-4 items-start"
              style={{ borderBottom: i < EXAM_DOMAINS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <p className="text-white text-sm font-medium">{d.domain}</p>
              <p className="text-center text-sm font-bold text-emerald-400">{d.weight}</p>
              <p className="text-white/40 text-xs leading-relaxed">{d.covered}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE PROOF (two products) ── */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/25 mb-3 text-center">The Products</p>
        <h2 className="text-3xl font-bold text-white text-center mb-10">Two Live Systems, One Unified Architecture</h2>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* DWT */}
          <div className="rounded-3xl p-7" style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.15)" }}>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-400/60 mb-3">Product 01</p>
            <h3 className="text-white font-bold text-xl mb-1">Digital Wealth Transfer</h3>
            <p className="text-blue-400/60 text-xs mb-4">digitalwealthtransfer.com</p>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              A two-sided marketplace and AI services platform. Lead capture, company directory, blog, AI chatbot, lead scoring engine, outreach generator, and website analyzer — all live.
            </p>
            <div className="flex flex-col gap-2">
              {["Next.js 16 · TypeScript · Tailwind v4", "Supabase Postgres (leads + prospects)", "Firecrawl website crawler", "10 API routes, 4 using Claude AI", "Helicone observability on all AI calls"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-blue-400/50 shrink-0" />
                  <p className="text-white/35 text-xs">{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Signal */}
          <div className="rounded-3xl p-7" style={{ background: "rgba(139,92,246,0.04)", border: "1px solid rgba(139,92,246,0.15)" }}>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-violet-400/60 mb-3">Product 02</p>
            <h3 className="text-white font-bold text-xl mb-1">Signal Dashboard</h3>
            <p className="text-violet-400/60 text-xs mb-4">Private · Password Protected</p>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              A personal AI operating system. BTC market data, Pomodoro focus timer, habit tracker, life planner with AI assistant, content engine with YouTube outlier analysis, and B-roll pipeline.
            </p>
            <div className="flex flex-col gap-2">
              {["Next.js 15 · TypeScript · Tailwind v4", "Middleware auth (httpOnly cookies)", "YouTube Data API + CoinGecko", "6 Claude routes: chat, planner, content (3), broll", "Higgsfield + Runway ML with fallback logic"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-violet-400/50 shrink-0" />
                  <p className="text-white/35 text-xs">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY PATTERNS ── */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/25 mb-3 text-center">Exam Patterns</p>
        <h2 className="text-3xl font-bold text-white text-center mb-10">GH-600 Patterns Implemented</h2>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              title: "ReAct Loop",
              color: "#f59e0b",
              steps: ["OBSERVE: Firecrawl scrapes website", "THINK: Claude scores + summarizes", "ACT: Supabase updated with score", "LOOP: Next prospect queued"],
            },
            {
              title: "Tool Chaining + Fallback",
              color: "#8b5cf6",
              steps: ["Tool 1: Higgsfield video gen", "Timeout → graceful failure", "Tool 2: Runway ML fallback", "Provider prefix tracks which ran"],
            },
            {
              title: "Memory Injection",
              color: "#3b82f6",
              steps: ["Procedural: system prompt", "Working: last 10 messages", "Episodic: stored plans", "Semantic: pgvector (roadmap)"],
            },
            {
              title: "Structured Output",
              color: "#10b981",
              steps: ["Prompt demands JSON only", "Model returns JSON block", "Regex strips markdown fences", "JSON.parse with fallback"],
            },
            {
              title: "Observability Proxy",
              color: "#ef4444",
              steps: ["callClaude() checks env key", "Routes through Helicone proxy", "Adds Auth + Feature tag headers", "Degrades gracefully if key missing"],
            },
            {
              title: "HITL Gate",
              color: "#f97316",
              steps: ["AI drafts 6 outreach messages", "Human reviews in dashboard", "Human selects + sends manually", "AI never sends autonomously"],
            },
          ].map((p) => (
            <div key={p.title} className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-sm font-bold mb-3" style={{ color: p.color }}>{p.title}</p>
              <div className="flex flex-col gap-1.5">
                {p.steps.map((s, i) => (
                  <div key={s} className="flex items-start gap-2">
                    <span className="text-[9px] font-bold mt-0.5 shrink-0" style={{ color: p.color, opacity: 0.5 }}>{i + 1}</span>
                    <p className="text-white/40 text-xs leading-relaxed">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COURSE PROPOSAL ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="rounded-3xl p-8 sm:p-12" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/25 mb-3">The Proposal</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">A GH-600 Training Course Built on Real Infrastructure</h2>
          <p className="text-white/50 leading-relaxed mb-10 max-w-2xl">
            Most GH-600 prep materials are slide decks and flashcards. This course would be different:
            every module uses this live codebase as the teaching artifact. Students see how the concepts
            actually appear in production — not in a diagram, in deployable TypeScript.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COURSE_MODULES.map((m) => (
              <div key={m.num} className="rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="text-[10px] font-black tracking-[0.2em] uppercase text-blue-400/50 mb-2">Module {m.num}</p>
                <p className="text-white font-semibold text-sm mb-2">{m.title}</p>
                <p className="text-white/40 text-xs leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY THIS WORKS ── */}
      <section className="max-w-5xl mx-auto px-6 py-6">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              title: "It's not hypothetical",
              body: "Every pattern is deployed to production and handling real traffic. Students can read the actual code, not a recreation.",
              color: "#3b82f6",
            },
            {
              title: "It covers all 5 layers",
              body: "The architecture was intentionally designed to mirror the GH-600 domain structure. Nothing is missing.",
              color: "#8b5cf6",
            },
            {
              title: "It grows with the course",
              body: "The system is actively being built. Phase 2 adds pgvector, multi-agent orchestration, and an execution log — more exam material as it ships.",
              color: "#10b981",
            },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${c.color}20` }}>
              <div className="w-8 h-8 rounded-xl mb-4 flex items-center justify-center" style={{ background: `${c.color}15` }}>
                <div className="w-3 h-3 rounded-full" style={{ background: c.color }} />
              </div>
              <h3 className="text-white font-bold text-sm mb-2">{c.title}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-5xl mx-auto px-6 pt-14 pb-24 text-center">
        <div className="rounded-3xl p-10 sm:p-14"
          style={{
            background: "radial-gradient(ellipse at top, rgba(59,130,246,0.08) 0%, transparent 70%), rgba(255,255,255,0.02)",
            border: "1px solid rgba(59,130,246,0.15)",
          }}>
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-blue-400/60 mb-4">Next Step</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.02em] text-white mb-4">
            Let&apos;s Build the Course
          </h2>
          <p className="text-white/45 max-w-xl mx-auto leading-relaxed mb-8">
            Jonathan Cardona — Las Vegas. I built this system from scratch, deployed it to production,
            and mapped every component to the GH-600 exam. I can teach what I built.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://www.linkedin.com/in/jonathan-cardona-1089291b9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all"
              style={{ background: "rgba(59,130,246,0.9)" }}
            >
              Connect on LinkedIn
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="/ai-systems"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white/60 transition-all"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              See What I Build for Clients
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-6">
        <p className="text-center text-[11px] text-white/15">
          © 2026 Digital Wealth Transfer · Jonathan Cardona · Las Vegas
        </p>
      </footer>
    </div>
  );
}
