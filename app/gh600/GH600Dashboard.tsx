"use client";

import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const EXAM_DATE = new Date("2026-06-02T09:00:00");

const DOMAINS = [
  {
    id: "d1",
    num: "01",
    title: "Prepare Agent Architecture & SDLC",
    weight: "15–20%",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.25)",
    emoji: "🏗️",
    what: "Defining suitable agent tasks, autonomy levels, GitHub-native review workflows, and integrating agents into the software development lifecycle.",
    keyArtifacts: [
      ".github/agents/*.agent.md — agent definition files",
      "YAML frontmatter: name, description, tools, mcp-servers",
      "PR-based review workflows for agent output",
      "Autonomy levels: supervised → semi-autonomous → fully autonomous",
    ],
    examTraps: [
      "Agents should NOT be given more tool permissions than needed (least privilege)",
      "PR workflow = human reviews agent's proposed changes before merge",
      "SDLC = agents work in ALL phases, not just coding",
      "Agent YAML lives in .github/agents/, NOT .github/workflows/",
    ],
    inYourProjects: [
      "Lead Engine: supervised agent — human reviews AI-scored prospects before outreach",
      "B-Roll Pipeline: semi-autonomous — AI generates, human approves final video",
      "AI Chat Widget: fully autonomous — responds without human review",
      "Outreach drafts: HITL gate — AI writes 6 variants, human selects one",
    ],
    questions: [
      { q: "Where do custom agent definition files live in a GitHub repo?", a: ".github/agents/*.agent.md" },
      { q: "What's the highest agent autonomy level?", a: "Fully autonomous — acts without human confirmation" },
      { q: "Why use PR-based workflows for agent output?", a: "Human review gate before changes merge — auditability + safety" },
    ],
  },
  {
    id: "d2",
    num: "02",
    title: "Implement Tool Use & Environment",
    weight: "20–25%",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.12)",
    border: "rgba(139,92,246,0.25)",
    emoji: "🔧",
    what: "Custom agents, MCP server configuration, Copilot CLI usage, cloud environment setup, and tool permission scoping.",
    keyArtifacts: [
      "Agent tools: read, search, edit, execute, agent",
      "mcp-servers in agent YAML vs mcpServers in JSON config",
      "Transport: local/stdio (subprocess), http (remote), sse (legacy)",
      "CLI: -p (prompt), --no-ask-user (CI mode), /delegate, /fleet",
    ],
    examTraps: [
      "mcp-servers (YAML, agent file) ≠ mcpServers (JSON, global config)",
      "stdio transport = local subprocess — for tools on same machine",
      "http transport = remote MCP server — for cloud tools",
      "--no-ask-user is required in CI — agents can't wait for user input",
      "/fleet = parallel decomposition across multiple agents",
    ],
    inYourProjects: [
      "callClaude() helper in lib/ai.ts = custom tool orchestration layer",
      "Firecrawl in lead engine = external tool via HTTP (like MCP http transport)",
      "CoinGecko + YouTube API in Signal = read-only external tools",
      "Supabase writes = 'execute' category tool (highest privilege, use carefully)",
    ],
    questions: [
      { q: "What are the 5 tool capability levels for a GitHub agent?", a: "read, search, edit, execute, agent" },
      { q: "What CLI flag makes Copilot work in CI without user prompts?", a: "--no-ask-user" },
      { q: "What's the difference between /delegate and /fleet?", a: "/delegate = hand off to cloud agent; /fleet = parallelize across multiple agents" },
      { q: "What MCP transport type runs a local subprocess?", a: "local / stdio" },
    ],
  },
  {
    id: "d3",
    num: "03",
    title: "Manage Memory, State & Execution",
    weight: "10–15%",
    color: "#10b981",
    glow: "rgba(16,185,129,0.12)",
    border: "rgba(16,185,129,0.25)",
    emoji: "🧠",
    what: "Session persistence, context drift prevention, durable artifacts, and the 4 memory architecture types.",
    keyArtifacts: [
      "Working memory: current context window content",
      "Episodic memory: stored session history (retrieved per call)",
      "Semantic memory: vector embeddings (retrieved by meaning)",
      "Procedural memory: system prompts / baked-in behavior",
    ],
    examTraps: [
      "Context drift = agent diverges from original task intent over multiple steps",
      "Artifacts (files, JSON) = the durable state bridge between agent steps",
      "Working memory is LOST when context window closes — not persistent",
      "pgvector = Postgres extension for semantic/vector memory",
    ],
    inYourProjects: [
      "Dealership chat: last 10 messages injected per call = working memory",
      "Signal Planner: plans stored in localStorage, injected as context = episodic memory",
      "Every SYSTEM_PROMPT in your routes = procedural memory",
      "Supabase + pgvector (roadmap) = semantic memory for prospect notes",
    ],
    questions: [
      { q: "What memory type is encoded in a system prompt?", a: "Procedural memory — behavioral knowledge baked in at orchestration time" },
      { q: "What does 'context drift' mean?", a: "Agent's understanding diverges from original task intent over multiple steps" },
      { q: "What enables durable state between agent execution steps?", a: "Artifacts — files, JSON outputs written to disk or storage" },
    ],
  },
  {
    id: "d4",
    num: "04",
    title: "Evaluation, Error Analysis & Tuning",
    weight: "15–20%",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.25)",
    emoji: "📊",
    what: "Reading agent logs, identifying failure modes, root cause analysis, and adjusting prompts, tools, or models to improve output quality.",
    keyArtifacts: [
      "Helicone / observability proxy: full request/response logs",
      "Feature tags on AI calls: identify which feature is failing",
      "Evaluation loops: run → check → compare → adjust → repeat",
      "GitHub Actions: workflow run logs for CI-based agent evaluation",
    ],
    examTraps: [
      "Evaluation ≠ testing — it's continuous monitoring in production",
      "Root cause: prompt issue vs model issue vs tool issue vs data issue",
      "You tune prompts BEFORE switching models (cheaper, faster)",
      "Structured output validation = catch model hallucinations early",
    ],
    inYourProjects: [
      "lib/ai.ts Helicone proxy: every Claude call logged with feature tag",
      "Lead scoring: JSON.parse with regex cleanup = output validation",
      "callClaude() graceful degradation: system keeps working if Helicone missing",
      "B-roll fallback: Higgsfield → Runway = evaluation + automatic recovery",
    ],
    questions: [
      { q: "What's the first thing to tune when agent output quality degrades?", a: "The system prompt — before switching models or tools" },
      { q: "What tool does this codebase use for AI observability?", a: "Helicone — proxies all Claude calls with full logging + feature tags" },
      { q: "What's an evaluation loop?", a: "Run → check output against criteria → compare to expected → adjust → repeat" },
    ],
  },
  {
    id: "d5",
    num: "05",
    title: "Orchestrate Multi-Agent Coordination",
    weight: "15–20%",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.25)",
    emoji: "🕸️",
    what: "Parallel agent execution, artifact handoffs between agents, concurrency control, and GitHub Actions orchestration patterns.",
    keyArtifacts: [
      "GitHub Actions: needs (dependencies), strategy.matrix (parallel)",
      "concurrency: group + cancel-in-progress: true (overlap control)",
      "upload-artifact / download-artifact (inter-job state)",
      "Hooks: preToolUse + postToolUse for inter-agent coordination",
    ],
    examTraps: [
      "strategy.matrix = parallel agents on different configs, not just OS variants",
      "needs: [job1, job2] = job3 waits for BOTH to complete",
      "cancel-in-progress: true = new run kills old run (prevents queue buildup)",
      "Artifacts expire — set retention-days explicitly for long pipelines",
    ],
    inYourProjects: [
      "Lead Engine pipeline: scrape → score → update — sequential needs chain",
      "B-roll pipeline: transcript → moments (think) → generate (act) — multi-step agent",
      "Outreach generator: 6 variants in one call — could parallelize with matrix",
      "Helicone: acts as coordination observer across all agent calls",
    ],
    questions: [
      { q: "What GitHub Actions key makes a job wait for another to finish?", a: "needs: [job-name]" },
      { q: "How do you pass data between GitHub Actions jobs?", a: "Workflow artifacts: upload-artifact then download-artifact" },
      { q: "What prevents two concurrent workflow runs from conflicting?", a: "concurrency: group + cancel-in-progress: true" },
    ],
  },
  {
    id: "d6",
    num: "06",
    title: "Implement Guardrails & Accountability",
    weight: "10–15%",
    color: "#f97316",
    glow: "rgba(249,115,22,0.12)",
    border: "rgba(249,115,22,0.25)",
    emoji: "🛡️",
    what: "Least-privilege tools, hooks for input/output filtering, audit logs, branch protections, and recovery procedures.",
    keyArtifacts: [
      ".github/hooks/*.json — preToolUse/postToolUse interceptors",
      "Hook decisions: allow | deny | ask",
      "Branch protection rules: require PR review, status checks",
      "Audit log: who ran what agent, when, with what result",
    ],
    examTraps: [
      "preToolUse fires BEFORE execution — can block dangerous actions",
      "postToolUse fires AFTER — for logging and output filtering, can't undo",
      "deny = block tool call; ask = prompt human; allow = proceed",
      "RBAC: different agents get different tool sets based on role",
    ],
    inYourProjects: [
      "Signal middleware: httpOnly cookie auth = access guardrail for all AI routes",
      "API key guard: every route checks ANTHROPIC_API_KEY before any AI call",
      "HITL in lead engine: outreach drafts require human selection = accountability",
      "Helicone: full audit trail of every model call = accountability layer",
    ],
    questions: [
      { q: "What hook event fires before a tool executes and can block it?", a: "preToolUse with decision: deny" },
      { q: "Where do GitHub Copilot hooks live?", a: ".github/hooks/*.json" },
      { q: "What's the principle of least privilege in agent design?", a: "Grant agents only the minimum tool permissions needed — no execute if read suffices" },
    ],
  },
];

const ROADMAP = [
  {
    day: 1,
    date: "May 26",
    focus: "Architecture & SDLC",
    domain: "Domain 1",
    color: "#3b82f6",
    tasks: [
      "Read Domain 1 in gh600-lab/domains/domain-1-architecture.md",
      "Write your first .github/agents/planner.agent.md file",
      "Map agent autonomy levels to your 3 real products",
      "Understand PR-based workflows vs direct commits",
      "Quiz yourself on Domain 1 flashcards",
    ],
    build: "Create a planner agent YAML for your lead engine",
    keyFact: "Agent YAML lives at .github/agents/*.agent.md — not in workflows/",
  },
  {
    day: 2,
    date: "May 27",
    focus: "Tool Use & MCP",
    domain: "Domain 2",
    color: "#8b5cf6",
    tasks: [
      "Read Domain 2 in gh600-lab/domains/domain-2-tool-use.md",
      "Study MCP transport types: stdio vs http vs sse",
      "Try Copilot CLI: gh copilot suggest + gh copilot explain",
      "Map your Firecrawl + YouTube API calls to MCP patterns",
      "Write a mock MCP config for your lead engine tools",
    ],
    build: "Write mcp-servers config connecting Supabase and Firecrawl",
    keyFact: "mcp-servers in agent YAML ≠ mcpServers in JSON config — different scope",
  },
  {
    day: 3,
    date: "May 28",
    focus: "Memory & State",
    domain: "Domain 3",
    color: "#10b981",
    tasks: [
      "Read Domain 3 — all 4 memory types cold",
      "Identify each memory type in your DWT codebase (be specific: file + line)",
      "Understand context drift and how artifacts prevent it",
      "Design a semantic memory schema for lead engine prospects",
      "Create a memory architecture diagram",
    ],
    build: "Add pgvector schema to your Supabase leads table design",
    keyFact: "System prompts = procedural memory. Context window = working memory.",
  },
  {
    day: 4,
    date: "May 29",
    focus: "Evaluation & Tuning",
    domain: "Domain 4",
    color: "#f59e0b",
    tasks: [
      "Set up Helicone if not already configured — visit helicone.ai",
      "Tag all Claude calls with feature labels in lib/ai.ts",
      "Read 10 real logs from Helicone dashboard",
      "Identify a prompt you can improve — improve it",
      "Build an evaluation checklist for your lead scoring output",
    ],
    build: "Add structured output validation to your lead score route",
    keyFact: "Tune prompts first. Switch models only when prompts fail repeatedly.",
  },
  {
    day: 5,
    date: "May 30",
    focus: "Multi-Agent Orchestration",
    domain: "Domain 5",
    color: "#ef4444",
    tasks: [
      "Study GitHub Actions: needs, matrix, concurrency, artifacts",
      "Write a multi-job workflow for your lead engine",
      "Understand /fleet vs /delegate vs sequential execution",
      "Map your B-roll pipeline to a multi-agent workflow diagram",
      "Practice reading workflow YAML and identifying patterns",
    ],
    build: "Write a .github/workflows/lead-engine.yml with 3 sequential jobs",
    keyFact: "strategy.matrix = parallel. needs: [] = sequential. artifacts = state handoff.",
  },
  {
    day: 6,
    date: "May 31",
    focus: "Guardrails & Security",
    domain: "Domain 6",
    color: "#f97316",
    tasks: [
      "Study hooks: preToolUse vs postToolUse, allow/deny/ask",
      "Audit your projects: which routes have no auth guard?",
      "Write a hooks.json that blocks file deletion for your agent",
      "Map branch protection rules for your main branch",
      "Review RBAC patterns for multi-user agent access",
    ],
    build: "Add .github/hooks/safety.json blocking dangerous tool calls",
    keyFact: "preToolUse can DENY. postToolUse can only log — action already happened.",
  },
  {
    day: 7,
    date: "June 1",
    focus: "Full Exam Simulation",
    domain: "All Domains",
    color: "#a855f7",
    tasks: [
      "Complete all 30 practice questions in practice-exams/",
      "Review any domain scoring below 80%",
      "Re-read all key artifacts tables in each domain guide",
      "Run through all flashcards without looking at answers",
      "Rest — you've built real systems, you know this material",
    ],
    build: "Write a 1-page architecture summary of your DWT AI OS from memory",
    keyFact: "The exam is scenario-based. Think: 'What would break? What's the risk?'",
  },
];

const FLASHCARDS: { q: string; a: string; domain: string; color: string }[] = [
  { q: "Where do GitHub Copilot custom agent definition files live?", a: ".github/agents/*.agent.md", domain: "D1", color: "#3b82f6" },
  { q: "What are the 5 tool capabilities an agent can be granted?", a: "read · search · edit · execute · agent", domain: "D2", color: "#8b5cf6" },
  { q: "What CLI flag is required for CI environments?", a: "--no-ask-user (disables interactive prompts)", domain: "D2", color: "#8b5cf6" },
  { q: "What does /fleet do in Copilot CLI?", a: "Decomposes a task and executes it in parallel across multiple agents", domain: "D2", color: "#8b5cf6" },
  { q: "What does /delegate do in Copilot CLI?", a: "Hands off long-running work to a cloud agent", domain: "D2", color: "#8b5cf6" },
  { q: "What are the 3 MCP transport types?", a: "local/stdio (subprocess) · http (remote) · sse (legacy streaming)", domain: "D2", color: "#8b5cf6" },
  { q: "What memory type is encoded in a system prompt?", a: "Procedural memory — behavioral instructions baked in before any user message", domain: "D3", color: "#10b981" },
  { q: "What memory type is injected conversation history?", a: "Working memory (ephemeral, lost when context closes)", domain: "D3", color: "#10b981" },
  { q: "What is context drift?", a: "Agent's understanding diverges from original task intent over multiple execution steps", domain: "D3", color: "#10b981" },
  { q: "What bridges durable state between agent steps?", a: "Artifacts — files or JSON outputs written to storage and passed forward", domain: "D3", color: "#10b981" },
  { q: "What Postgres extension enables semantic/vector memory?", a: "pgvector — stores and queries vector embeddings for similarity search", domain: "D3", color: "#10b981" },
  { q: "What should you tune FIRST when agent output degrades?", a: "The system prompt — cheaper and faster than switching models", domain: "D4", color: "#f59e0b" },
  { q: "What's the difference between testing and evaluation?", a: "Testing = pre-deployment checks. Evaluation = continuous monitoring in production.", domain: "D4", color: "#f59e0b" },
  { q: "What GitHub Actions key creates job dependencies?", a: "needs: [job-name] — job waits for listed jobs to complete", domain: "D5", color: "#ef4444" },
  { q: "How do you pass data between GitHub Actions jobs?", a: "upload-artifact (write) + download-artifact (read) — workflow artifacts", domain: "D5", color: "#ef4444" },
  { q: "What prevents concurrent workflow runs from conflicting?", a: "concurrency: group: 'name' + cancel-in-progress: true", domain: "D5", color: "#ef4444" },
  { q: "What does strategy.matrix enable?", a: "Parallel job execution across multiple configurations (agents, environments, inputs)", domain: "D5", color: "#ef4444" },
  { q: "Which hook event can block a tool from executing?", a: "preToolUse with decision: 'deny'", domain: "D6", color: "#f97316" },
  { q: "Where do GitHub Copilot hooks live?", a: ".github/hooks/*.json", domain: "D6", color: "#f97316" },
  { q: "What are the 3 possible hook decisions?", a: "allow · deny · ask", domain: "D6", color: "#f97316" },
  { q: "What is the principle of least privilege in agent design?", a: "Grant only the minimum tool permissions needed — no execute if read suffices", domain: "D6", color: "#f97316" },
  { q: "What's a PR-based review workflow?", a: "Agent submits changes as a pull request — human reviews and approves before merge", domain: "D1", color: "#3b82f6" },
  { q: "What's the difference between mcp-servers and mcpServers?", a: "mcp-servers: YAML in agent file (agent-scoped) vs mcpServers: JSON in global config (all agents)", domain: "D2", color: "#8b5cf6" },
  { q: "What's an evaluation loop?", a: "Run agent → compare output to criteria → identify gap → adjust prompt/tool/model → repeat", domain: "D4", color: "#f59e0b" },
  { q: "What is HITL and when is it required?", a: "Human-in-the-Loop — required before irreversible actions (send email, deploy, delete data)", domain: "D1", color: "#3b82f6" },
];

const LAYERS = [
  { num: "01", name: "Interface Layer", color: "#3b82f6", glow: "rgba(59,130,246,0.15)", border: "rgba(59,130,246,0.25)", domain: "Human-AI Interaction Design", what: "The front-end surfaces users interact with — web pages, forms, chat widgets, dashboards.", proof: [{ label: "DWT Homepage", detail: "Dual-path lead forms routing users by intent before any AI call is made" }, { label: "Signal Dashboard", detail: "Password-protected personal OS — complete human-in-the-loop design" }, { label: "Dealership Chat", detail: "Embedded AI assistant with conversation history and graceful 503 fallback" }, { label: "AI Systems Page", detail: "Tiered offer stack with trust signals — reduces friction before lead capture fires" }] },
  { num: "02", name: "Orchestration Layer", color: "#8b5cf6", glow: "rgba(139,92,246,0.15)", border: "rgba(139,92,246,0.25)", domain: "Prompt Engineering & Model Routing", what: "The logic that decides which model to call, what context to inject, and how to format the request.", proof: [{ label: "lib/ai.ts callClaude()", detail: "Single abstraction — model, maxTokens, system prompt, Helicone tag all configurable" }, { label: "Feature tags", detail: "Every call tagged: lead-score, content-draft, dealership-chat — enables model routing" }, { label: "System prompts per feature", detail: "Each route has a purpose-built system prompt — planner, dealership, lead scorer" }, { label: "JSON enforcement", detail: "Lead scoring forces structured JSON output with regex cleanup — output validation" }] },
  { num: "03", name: "Agent Layer", color: "#f59e0b", glow: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.25)", domain: "Agentic Systems & Tool Use (ReAct)", what: "Autonomous AI processes that observe, reason, act, and loop — using tools to complete multi-step tasks.", proof: [{ label: "Lead Engine /api/lead-engine", detail: "Full ReAct: Firecrawl (observe) → Claude analysis (think) → Supabase update (act)" }, { label: "B-Roll Pipeline", detail: "Transcript → Claude identifies moments → Higgsfield/Runway → status poll → fallback" }, { label: "Outreach drafts", detail: "Prospect data in → 6 message variants out — single-agent, multi-output" }, { label: "HITL gate", detail: "Outreach drafts require human selection — agent never sends autonomously" }] },
  { num: "04", name: "Memory Layer", color: "#10b981", glow: "rgba(16,185,129,0.15)", border: "rgba(16,185,129,0.25)", domain: "AI Memory Architecture (4 Types)", what: "How AI systems store, retrieve, and use information across calls, sessions, and time.", proof: [{ label: "Working memory", detail: "Dealership chat sends last 10 messages per call — in-context injection" }, { label: "Episodic memory", detail: "Signal Planner stores plans in localStorage — retrieved as context per call" }, { label: "Procedural memory", detail: "Every SYSTEM_PROMPT constant = procedural memory — behavioral knowledge encoded at build time" }, { label: "Semantic (roadmap)", detail: "Supabase + pgvector schema for prospect notes — next phase of lead engine" }] },
  { num: "05", name: "Governance Layer", color: "#ef4444", glow: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.25)", domain: "Observability, Safety & Responsible AI", what: "The infrastructure that monitors, audits, controls, and ensures AI systems behave as intended.", proof: [{ label: "Helicone proxy", detail: "All Claude calls routed through Helicone — full logs, latency, token counts, cost per feature" }, { label: "Auth middleware (Signal)", detail: "httpOnly cookie gate — AI tools not publicly accessible, only authorized users" }, { label: "API key guard", detail: "Every route checks ANTHROPIC_API_KEY before AI call — fails loudly with 503" }, { label: "Graceful degradation", detail: "callClaude() works with or without Helicone key — system never breaks due to observability config" }] },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function getDaysUntilExam() {
  const now = new Date();
  const diff = EXAM_DATE.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return Math.max(0, days);
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function ExamCountdown() {
  const days = getDaysUntilExam();
  const urgency = days <= 2 ? "#ef4444" : days <= 4 ? "#f59e0b" : "#10b981";
  return (
    <div className="flex items-center gap-3 px-5 py-2.5 rounded-xl" style={{ background: `${urgency}10`, border: `1px solid ${urgency}30` }}>
      <div className="text-2xl font-black" style={{ color: urgency }}>{days}</div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: urgency }}>days to exam</p>
        <p className="text-white/30 text-[9px]">GH-600 · June 2, 2026</p>
      </div>
    </div>
  );
}

function DomainProgress({ completed }: { completed: Set<string> }) {
  const pct = Math.round((completed.size / DOMAINS.length) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1.5">
        {DOMAINS.map((d) => (
          <div
            key={d.id}
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            title={d.title}
            style={{ background: completed.has(d.id) ? d.color : "rgba(255,255,255,0.1)" }}
          />
        ))}
      </div>
      <span className="font-sans text-[10px] text-white/30">{pct}% reviewed</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TABS
// ─────────────────────────────────────────────────────────────────────────────

function ArchitectureTab({ completedDomains, onToggleDomain }: { completedDomains: Set<string>; onToggleDomain: (id: string) => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div>
      {/* System stack */}
      <div className="mb-12">
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/25 mb-2 text-center">Your 5-Layer AI OS — Every Layer Maps to a GH-600 Domain</p>
        <div className="max-w-2xl mx-auto flex flex-col gap-0 mt-6">
          {LAYERS.map((layer, i) => {
            const isOpen = expanded === layer.num;
            return (
              <div key={layer.num}>
                <button
                  className="w-full text-left"
                  onClick={() => setExpanded(isOpen ? null : layer.num)}
                >
                  <div
                    className="px-6 py-4 flex items-center gap-4 transition-all"
                    style={{
                      background: isOpen ? layer.glow : "rgba(255,255,255,0.02)",
                      border: `1px solid ${isOpen ? layer.border : "rgba(255,255,255,0.06)"}`,
                      borderRadius: i === 0 ? "12px 12px 4px 4px" : i === LAYERS.length - 1 ? "4px 4px 12px 12px" : "4px",
                      marginTop: i === 0 ? 0 : -1,
                    }}
                  >
                    <span className="text-xs font-black tracking-widest flex-shrink-0" style={{ color: layer.color }}>{layer.num}</span>
                    <div className="flex-1 text-left">
                      <span className="text-white font-bold text-sm">{layer.name}</span>
                      <span className="text-white/30 text-xs ml-3 hidden sm:inline">{layer.domain}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ background: layer.color, boxShadow: `0 0 8px ${layer.color}` }} />
                      <span className="text-white/25 text-xs">{isOpen ? "▲" : "▼"}</span>
                    </div>
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 py-5 rounded-b-xl mb-1" style={{ background: "rgba(255,255,255,0.015)", border: `1px solid ${layer.border}`, borderTop: "none" }}>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">{layer.what}</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {layer.proof.map((p) => (
                        <div key={p.label} className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                          <p className="text-xs font-semibold mb-1" style={{ color: layer.color }}>{p.label}</p>
                          <p className="text-white/40 text-xs leading-relaxed">{p.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {i < LAYERS.length - 1 && !isOpen && (
                  <div className="flex justify-center">
                    <div className="w-px h-3" style={{ background: `linear-gradient(to bottom, ${layer.color}30, ${LAYERS[i + 1].color}30)` }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Exam domain table */}
      <div className="max-w-3xl mx-auto">
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/25 mb-4 text-center">GH-600 Official Exam Domains</p>
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-5 py-3" style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {["", "Domain", "Weight", "Done"].map((h) => (
              <p key={h} className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/30">{h}</p>
            ))}
          </div>
          {DOMAINS.map((d, i) => (
            <div
              key={d.id}
              className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-5 py-4 items-center"
              style={{ borderBottom: i < DOMAINS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
            >
              <span className="text-xs font-black" style={{ color: d.color }}>{d.num}</span>
              <p className="text-white/70 text-sm">{d.title}</p>
              <span className="text-xs font-bold" style={{ color: d.color }}>{d.weight}</span>
              <button
                onClick={() => onToggleDomain(d.id)}
                className="w-5 h-5 rounded flex items-center justify-center transition-all"
                style={{
                  background: completedDomains.has(d.id) ? d.color : "transparent",
                  border: `1.5px solid ${completedDomains.has(d.id) ? d.color : "rgba(255,255,255,0.2)"}`,
                }}
              >
                {completedDomains.has(d.id) && (
                  <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M1.5 5l2.5 2.5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RoadmapTab() {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try { return new Set(JSON.parse(localStorage.getItem("gh600-tasks") ?? "[]")); } catch { return new Set(); }
  });

  function toggleTask(key: string) {
    setCompletedTasks((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      localStorage.setItem("gh600-tasks", JSON.stringify([...next]));
      return next;
    });
  }

  const today = new Date();
  const examStart = new Date("2026-05-26");
  const todayDay = Math.min(7, Math.max(1, Math.ceil((today.getTime() - examStart.getTime()) / (1000 * 60 * 60 * 24)) + 1));

  return (
    <div className="flex flex-col gap-5">
      <p className="text-center text-white/30 text-sm mb-2">7-day sprint to GH-600 certification · May 26 – June 1</p>
      {ROADMAP.map((day) => {
        const isToday = day.day === todayDay;
        const isPast = day.day < todayDay;
        const tasksDone = day.tasks.filter((_, i) => completedTasks.has(`d${day.day}-t${i}`)).length;
        const pct = Math.round((tasksDone / day.tasks.length) * 100);

        return (
          <div
            key={day.day}
            className="rounded-2xl overflow-hidden transition-all"
            style={{
              border: `1px solid ${isToday ? day.color + "50" : "rgba(255,255,255,0.07)"}`,
              background: isToday ? `${day.color}08` : "rgba(255,255,255,0.015)",
              opacity: isPast && pct < 100 ? 0.65 : 1,
            }}
          >
            {/* Day header */}
            <div className="px-6 py-4 flex items-center gap-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0"
                style={{ background: isToday ? day.color : `${day.color}20`, color: isToday ? "white" : day.color }}>
                {day.day}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-white font-bold text-sm">{day.focus}</p>
                  {isToday && <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded" style={{ background: day.color, color: "white" }}>Today</span>}
                </div>
                <p className="text-white/30 text-xs">{day.date} · {day.domain}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold" style={{ color: pct === 100 ? "#10b981" : day.color }}>{pct}%</p>
                <p className="text-white/25 text-[10px]">{tasksDone}/{day.tasks.length}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-0.5 bg-white/5">
              <div className="h-full transition-all duration-500" style={{ width: `${pct}%`, background: pct === 100 ? "#10b981" : day.color }} />
            </div>

            {/* Tasks */}
            <div className="px-6 py-4">
              <div className="flex flex-col gap-2 mb-4">
                {day.tasks.map((task, i) => {
                  const key = `d${day.day}-t${i}`;
                  const done = completedTasks.has(key);
                  return (
                    <button key={key} className="flex items-start gap-3 text-left group" onClick={() => toggleTask(key)}>
                      <div className="w-4 h-4 rounded mt-0.5 flex-shrink-0 flex items-center justify-center transition-all"
                        style={{ background: done ? day.color : "transparent", border: `1.5px solid ${done ? day.color : "rgba(255,255,255,0.2)"}` }}>
                        {done && <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none" stroke="white" strokeWidth="1.5"><path d="M1.5 5l2.5 2.5 5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </div>
                      <span className="text-sm leading-relaxed" style={{ color: done ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.65)", textDecoration: done ? "line-through" : "none" }}>{task}</span>
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex-1 rounded-xl px-4 py-3" style={{ background: `${day.color}10`, border: `1px solid ${day.color}20` }}>
                  <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: day.color }}>Build</p>
                  <p className="text-white/50 text-xs leading-relaxed">{day.build}</p>
                </div>
                <div className="flex-1 rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/25 mb-1">Key Fact</p>
                  <p className="text-white/50 text-xs leading-relaxed">{day.keyFact}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DomainsTab({ completedDomains, onToggleDomain }: { completedDomains: Set<string>; onToggleDomain: (id: string) => void }) {
  const [expanded, setExpanded] = useState<string | null>(DOMAINS[0].id);

  return (
    <div className="flex flex-col gap-4">
      {DOMAINS.map((d) => {
        const isOpen = expanded === d.id;
        const done = completedDomains.has(d.id);
        return (
          <div key={d.id} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${isOpen ? d.border : "rgba(255,255,255,0.07)"}`, background: isOpen ? d.glow : "rgba(255,255,255,0.015)" }}>
            <button className="w-full" onClick={() => setExpanded(isOpen ? null : d.id)}>
              <div className="px-6 py-5 flex items-center gap-4">
                <span className="text-2xl">{d.emoji}</span>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: d.color }}>Domain {d.num}</span>
                    <span className="text-[10px] text-white/25">{d.weight}</span>
                  </div>
                  <p className="text-white font-bold text-sm mt-0.5">{d.title}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); onToggleDomain(d.id); }}
                    className="w-6 h-6 rounded-lg flex items-center justify-center transition-all"
                    style={{ background: done ? d.color : "transparent", border: `1.5px solid ${done ? d.color : "rgba(255,255,255,0.2)"}` }}
                    title={done ? "Mark incomplete" : "Mark complete"}
                  >
                    {done && <svg viewBox="0 0 10 10" className="w-3 h-3" fill="none" stroke="white" strokeWidth="1.5"><path d="M1.5 5l2.5 2.5 5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </button>
                  <span className="text-white/25 text-xs">{isOpen ? "▲" : "▼"}</span>
                </div>
              </div>
            </button>

            {isOpen && (
              <div className="px-6 pb-6">
                <p className="text-white/55 text-sm leading-relaxed mb-5">{d.what}</p>

                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  {/* Key Artifacts */}
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest mb-3" style={{ color: d.color }}>Key Artifacts to Recognize</p>
                    <div className="flex flex-col gap-2">
                      {d.keyArtifacts.map((a) => (
                        <div key={a} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: d.color }} />
                          <p className="text-white/50 text-xs leading-relaxed font-mono">{a}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* In Your Projects */}
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/25 mb-3">In Your Real Projects</p>
                    <div className="flex flex-col gap-2">
                      {d.inYourProjects.map((p) => (
                        <div key={p} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0 bg-white/20" />
                          <p className="text-white/45 text-xs leading-relaxed">{p}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Exam Traps */}
                <div className="rounded-xl px-4 py-4 mb-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/25 mb-3">Common Exam Traps</p>
                  <div className="flex flex-col gap-2">
                    {d.examTraps.map((t) => (
                      <div key={t} className="flex items-start gap-2">
                        <span className="text-yellow-400/60 text-xs flex-shrink-0 mt-0.5">⚠</span>
                        <p className="text-white/45 text-xs leading-relaxed">{t}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick questions */}
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/25 mb-3">Quick Review Questions</p>
                  <div className="flex flex-col gap-2">
                    {d.questions.map((q, i) => (
                      <QuickQuestion key={i} question={q.q} answer={q.a} color={d.color} />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onToggleDomain(d.id)}
                  className="mt-4 w-full py-3 rounded-xl text-sm font-bold transition-all"
                  style={{ background: done ? "rgba(16,185,129,0.15)" : d.color, color: done ? "#10b981" : "white", border: done ? "1px solid rgba(16,185,129,0.3)" : "none" }}
                >
                  {done ? "✓ Marked as Reviewed" : "Mark Domain Reviewed"}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function QuickQuestion({ question, answer, color }: { question: string; answer: string; color: string }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <button className="text-left rounded-xl px-4 py-3 transition-all w-full" style={{ background: revealed ? `${color}10` : "rgba(255,255,255,0.02)", border: `1px solid ${revealed ? color + "30" : "rgba(255,255,255,0.05)"}` }} onClick={() => setRevealed((r) => !r)}>
      <p className="text-white/60 text-xs leading-relaxed mb-1">{question}</p>
      {revealed ? (
        <p className="text-xs font-medium leading-relaxed mt-2" style={{ color }}>{answer}</p>
      ) : (
        <p className="text-white/20 text-[10px]">Tap to reveal answer</p>
      )}
    </button>
  );
}

function PracticeTab() {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [scores, setScores] = useState<{ knew: number; missed: number }>(() => {
    if (typeof window === "undefined") return { knew: 0, missed: 0 };
    try { return JSON.parse(localStorage.getItem("gh600-scores") ?? '{"knew":0,"missed":0}'); } catch { return { knew: 0, missed: 0 }; }
  });
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? FLASHCARDS : FLASHCARDS.filter((c) => c.domain === filter);
  const card = filtered[idx % filtered.length];
  const total = scores.knew + scores.missed;
  const accuracy = total > 0 ? Math.round((scores.knew / total) * 100) : 0;

  function next(knew: boolean) {
    const next = { ...scores, [knew ? "knew" : "missed"]: scores[knew ? "knew" : "missed"] + 1 };
    setScores(next);
    localStorage.setItem("gh600-scores", JSON.stringify(next));
    setFlipped(false);
    setTimeout(() => setIdx((i) => (i + 1) % filtered.length), 150);
  }

  function reset() {
    const cleared = { knew: 0, missed: 0 };
    setScores(cleared);
    localStorage.setItem("gh600-scores", JSON.stringify(cleared));
    setIdx(0);
    setFlipped(false);
  }

  const domainFilters = ["all", "D1", "D2", "D3", "D4", "D5", "D6"];
  const domainColors: Record<string, string> = { D1: "#3b82f6", D2: "#8b5cf6", D3: "#10b981", D4: "#f59e0b", D5: "#ef4444", D6: "#f97316" };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Score bar */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex gap-4">
          <div className="text-center">
            <p className="text-2xl font-black text-emerald-400">{scores.knew}</p>
            <p className="text-[9px] uppercase tracking-widest text-white/25">Knew It</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-red-400">{scores.missed}</p>
            <p className="text-[9px] uppercase tracking-widest text-white/25">Study More</p>
          </div>
          {total > 0 && (
            <div className="text-center">
              <p className="text-2xl font-black" style={{ color: accuracy >= 80 ? "#10b981" : accuracy >= 60 ? "#f59e0b" : "#ef4444" }}>{accuracy}%</p>
              <p className="text-[9px] uppercase tracking-widest text-white/25">Accuracy</p>
            </div>
          )}
        </div>
        <button onClick={reset} className="text-white/25 text-xs hover:text-white/50 transition-colors">Reset</button>
      </div>

      {/* Domain filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {domainFilters.map((f) => (
          <button
            key={f}
            onClick={() => { setFilter(f); setIdx(0); setFlipped(false); }}
            className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all"
            style={{
              background: filter === f ? (f === "all" ? "rgba(255,255,255,0.15)" : domainColors[f]) : "rgba(255,255,255,0.05)",
              color: filter === f ? "white" : "rgba(255,255,255,0.4)",
              border: `1px solid ${filter === f ? "transparent" : "rgba(255,255,255,0.08)"}`,
            }}
          >
            {f === "all" ? "All" : f}
          </button>
        ))}
        <span className="ml-auto text-xs text-white/25 self-center">{filtered.length} cards</span>
      </div>

      {/* Card */}
      <div
        className="rounded-2xl cursor-pointer select-none transition-all duration-200 hover:scale-[1.01]"
        style={{
          border: `1px solid ${flipped ? card.color + "40" : "rgba(255,255,255,0.1)"}`,
          background: flipped ? `${card.color}08` : "rgba(255,255,255,0.03)",
          minHeight: 220,
        }}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className="px-8 py-8 flex flex-col h-full" style={{ minHeight: 220 }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded" style={{ background: `${card.color}20`, color: card.color }}>
              {card.domain}
            </span>
            <span className="text-white/20 text-[10px]">{(idx % filtered.length) + 1} / {filtered.length}</span>
          </div>

          {!flipped ? (
            <div className="flex-1 flex items-center">
              <p className="text-white font-medium text-lg leading-relaxed">{card.q}</p>
            </div>
          ) : (
            <div className="flex-1 flex items-center">
              <p className="text-lg font-bold leading-relaxed" style={{ color: card.color }}>{card.a}</p>
            </div>
          )}

          <p className="text-white/20 text-[10px] text-center mt-4">
            {flipped ? "Did you know this?" : "Tap to reveal answer"}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      {flipped && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            onClick={() => next(false)}
            className="py-4 rounded-xl font-bold text-sm transition-all hover:scale-[1.02]"
            style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" }}
          >
            Need to Study
          </button>
          <button
            onClick={() => next(true)}
            className="py-4 rounded-xl font-bold text-sm transition-all hover:scale-[1.02]"
            style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)" }}
          >
            Knew It ✓
          </button>
        </div>
      )}
      {!flipped && (
        <button
          onClick={() => setFlipped(true)}
          className="w-full mt-4 py-4 rounded-xl font-bold text-sm transition-all"
          style={{ background: `${card.color}15`, color: card.color, border: `1px solid ${card.color}30` }}
        >
          Reveal Answer
        </button>
      )}

      <p className="text-center text-white/20 text-xs mt-6">
        25 cards across all 6 domains · Progress saves automatically
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

type Tab = "architecture" | "roadmap" | "domains" | "practice";

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: "architecture", label: "Architecture", emoji: "🏛️" },
  { id: "roadmap", label: "7-Day Roadmap", emoji: "📅" },
  { id: "domains", label: "Domains", emoji: "📚" },
  { id: "practice", label: "Practice Exam", emoji: "🎯" },
];

export default function GH600Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("architecture");
  const [completedDomains, setCompletedDomains] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try { return new Set(JSON.parse(localStorage.getItem("gh600-domains") ?? "[]")); } catch { return new Set(); }
  });

  function toggleDomain(id: string) {
    setCompletedDomains((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      localStorage.setItem("gh600-domains", JSON.stringify([...next]));
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-[#080C16] font-sans text-[#F9FAFB]">
      {/* Ambient */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[400px] bg-violet-600/4 rounded-full blur-[140px] pointer-events-none" />

      {/* ── Header ── */}
      <div className="sticky top-0 z-50" style={{ background: "rgba(8,12,22,0.92)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(16px)" }}>
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
            <div>
              <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-blue-400/60 mb-0.5">GH-600 AI Developer Certification</p>
              <h1 className="text-xl font-black text-white tracking-tight">Study System</h1>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <DomainProgress completed={completedDomains} />
              <ExamCountdown />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-4 py-2 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5"
                style={{
                  background: activeTab === tab.id ? "rgba(255,255,255,0.1)" : "transparent",
                  color: activeTab === tab.id ? "white" : "rgba(255,255,255,0.35)",
                  border: `1px solid ${activeTab === tab.id ? "rgba(255,255,255,0.15)" : "transparent"}`,
                }}
              >
                <span>{tab.emoji}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        {activeTab === "architecture" && <ArchitectureTab completedDomains={completedDomains} onToggleDomain={toggleDomain} />}
        {activeTab === "roadmap" && <RoadmapTab />}
        {activeTab === "domains" && <DomainsTab completedDomains={completedDomains} onToggleDomain={toggleDomain} />}
        {activeTab === "practice" && <PracticeTab />}
      </div>

      <footer className="border-t border-white/[0.04] py-6 mt-10">
        <p className="text-center text-[10px] text-white/15">GH-600 Study System · Built by Jonathan Cardona · DWT AI OS as live case study</p>
      </footer>
    </div>
  );
}
