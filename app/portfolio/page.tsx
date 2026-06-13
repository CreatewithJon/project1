import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jonathan Cardona — AI Systems Portfolio",
  description:
    "AI systems builder focused on agentic workflows, context engineering, retrieval systems, automation, and AI education for business and workforce development.",
  keywords: [
    "AI systems",
    "context engineering",
    "agentic AI",
    "AI education",
    "workflow automation",
    "RAG",
    "human-in-the-loop",
    "AI consultant",
    "workforce development",
  ],
};

// ─── Data ──────────────────────────────────────────────────────────────────

const ROLES = [
  "Founder, Digital Wealth Transfer",
  "Chief AI Officer, Agentic Systems",
  "AI Systems Builder",
];

const HIGHLIGHTS = [
  { label: "AI Systems Builder", icon: "⚙️" },
  { label: "Context Engineering", icon: "🧠" },
  { label: "Business Automation", icon: "⚡" },
  { label: "AI Education", icon: "📚" },
  { label: "Workforce Development", icon: "🏗️" },
];

const TEAM = [
  {
    name: "Jonathan Cardona",
    title: "Chief AI Officer",
    initials: "JC",
    color: "#F59E0B",
    description:
      "Leads AI architecture, workflow design, implementation, automation systems, software development, and educational initiatives.",
  },
  {
    name: "Alberto",
    title: "Chief Executive Officer",
    initials: "A",
    color: "#60A5FA",
    description:
      "Focuses on business discovery, client engagement, operational analysis, and identifying opportunities for AI implementation.",
  },
  {
    name: "Dr. Kenneth A. Cottrell",
    title: "Chief Business Officer",
    initials: "KC",
    color: "#A78BFA",
    description:
      "Proven research, workforce development, policy, business strategy, and educational program development.",
  },
];

const PROJECTS = [
  {
    title: "Digital Wealth Transfer",
    description:
      "A personal brand, media, and education platform focused on helping everyday people understand and navigate the transition into the AI-powered digital economy.",
    concepts: ["AI Education", "Digital Transformation", "Emerging Technology", "Media", "Workforce Development"],
    url: "https://digitalwealthtransfer.com",
    urlLabel: "digitalwealthtransfer.com",
    accent: "#F59E0B",
  },
  {
    title: "Agentic Systems",
    description:
      "An AI consulting and implementation company focused on helping businesses design and deploy agentic workflows, automation systems, and AI-powered operations.",
    concepts: ["Agentic AI", "Workflow Automation", "Business Systems", "AI Implementation"],
    url: "https://aigentic-systems.ai",
    urlLabel: "aigentic-systems.ai",
    accent: "#60A5FA",
  },
  {
    title: "Big Money Realty AI Platform",
    description:
      "An Agentic Systems client project and educational case study used within the GH-600 / UNLV initiative. An AI workflow platform for real estate professionals covering lead capture, qualification, AI-assisted response generation, CRM workflows, and human approval loops.",
    concepts: ["Context Engineering", "Lead Automation", "Human-in-the-Loop", "CRM Automation", "Evaluation Loops"],
    url: "#",
    urlLabel: "Agentic Systems — In Development",
    accent: "#34D399",
  },
  {
    title: "Signal Dashboard / Sovereign OS",
    description:
      "A personal AI operating system concept for productivity, information management, AI assistance, knowledge workflows, and personal command-center style dashboards.",
    concepts: ["Memory Systems", "AI Assistants", "Knowledge Management", "Productivity Systems", "Dashboard Design"],
    url: "#",
    urlLabel: "In Development",
    accent: "#A78BFA",
  },
];

const CONCEPTS = [
  {
    title: "LLM Foundations",
    explanation:
      "Understanding how large language models work — training, tokens, temperature, and why models respond the way they do.",
    accent: "#F59E0B",
  },
  {
    title: "Prompt Engineering",
    explanation:
      "The craft of writing instructions and examples that reliably guide AI to produce the outputs you need.",
    accent: "#60A5FA",
  },
  {
    title: "Context Engineering",
    explanation:
      "Prompt engineering focuses on what you ask AI. Context engineering focuses on everything the AI knows, remembers, retrieves, and can do before it answers.",
    accent: "#F59E0B",
    featured: true,
  },
  {
    title: "Retrieval-Augmented Generation / RAG",
    explanation:
      "A technique where AI retrieves relevant information from your documents or database before responding — so answers are grounded in your actual data.",
    accent: "#34D399",
  },
  {
    title: "Memory Systems",
    explanation:
      "How AI systems store, retrieve, and apply information across conversations and sessions to maintain continuity and improve over time.",
    accent: "#60A5FA",
  },
  {
    title: "Agentic AI",
    explanation:
      "AI systems that take sequences of actions, use tools, make decisions, and work toward goals with minimal human instruction at each step.",
    accent: "#F59E0B",
  },
  {
    title: "Multi-Agent Systems",
    explanation:
      "Architectures where multiple specialized AI agents collaborate, delegate tasks, and coordinate to solve complex problems together.",
    accent: "#A78BFA",
  },
  {
    title: "Evaluation Loops",
    explanation:
      "Systematically testing, measuring, and improving AI system outputs to ensure quality, accuracy, and alignment with real-world needs.",
    accent: "#34D399",
  },
  {
    title: "Human-in-the-Loop Systems",
    explanation:
      "Designing AI workflows where humans review, approve, or redirect AI actions at critical decision points — combining AI speed with human judgment.",
    accent: "#60A5FA",
  },
  {
    title: "MCP / Tool Use",
    explanation:
      "How AI models connect to external tools, APIs, databases, and services to take actions and access information beyond generating text.",
    accent: "#A78BFA",
  },
];

const PROGRAMS = [
  {
    title: "AI Foundations for Business Professionals",
    level: "Introductory",
    description:
      "Introductory course on LLMs, prompting, AI tools, and practical business use cases. Designed for professionals who want to understand and use AI without a technical background.",
    accent: "#F59E0B",
  },
  {
    title: "Context Engineering & Knowledge Systems",
    level: "Intermediate",
    description:
      "A practical course on RAG, memory, retrieval, knowledge bases, and designing better AI context. Covers the full stack of making AI systems smarter with the right information.",
    accent: "#60A5FA",
  },
  {
    title: "Agentic AI Systems",
    level: "Advanced",
    description:
      "Hands-on course covering agents, tools, workflows, human approval, and evaluation loops. Students build working agentic systems by the end of the course.",
    accent: "#A78BFA",
  },
  {
    title: "AI for Small Business",
    level: "Practical",
    description:
      "Practical implementation course for lead generation, customer support, content workflows, and operational automation. Built for business owners, not engineers.",
    accent: "#34D399",
  },
  {
    title: "AI Builder Lab",
    level: "Workshop",
    description:
      "Hands-on lab where students build working AI dashboards, assistants, and automation workflows using modern tools. Learning by doing — no passive lectures.",
    accent: "#F59E0B",
  },
];

const PARTNERSHIPS = [
  { label: "Co-created courses", icon: "🤝" },
  { label: "Guest workshops", icon: "🎤" },
  { label: "AI curriculum development", icon: "📐" },
  { label: "Applied AI research", icon: "🔬" },
  { label: "Educational case studies", icon: "📋" },
  { label: "Author / educator AI knowledge systems", icon: "🧠" },
];

// ─── Component ─────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-[#F9FAFB] font-sans antialiased">

      {/* ── Sticky Nav ── */}
      <nav
        className="sticky top-0 z-50 border-b border-white/[0.06]"
        style={{ background: "rgba(11,15,26,0.92)", backdropFilter: "blur(20px)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight text-[#F9FAFB]/80">
            Jonathan Cardona
          </span>
          <div className="hidden sm:flex items-center gap-6 text-xs font-medium text-[#A1A1AA]">
            {[
              ["About", "#about"],
              ["Projects", "#projects"],
              ["Concepts", "#concepts"],
              ["Education", "#education"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="hover:text-[#F9FAFB] transition-colors duration-150"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        id="hero"
        className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(245,158,11,0.10) 0%, rgba(96,165,250,0.06) 45%, transparent 70%)",
        }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge strip */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {["Agentic AI", "Context Engineering", "Workflow Automation", "AI Education"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold uppercase tracking-[0.18em] px-3 py-1 rounded-full border"
                  style={{
                    borderColor: "rgba(245,158,11,0.3)",
                    color: "rgba(245,158,11,0.8)",
                    background: "rgba(245,158,11,0.06)",
                  }}
                >
                  {tag}
                </span>
              )
            )}
          </div>

          {/* Name */}
          <p className="text-sm font-medium text-[#A1A1AA] mb-3 tracking-widest uppercase">
            Jonathan Cardona
          </p>

          {/* Roles */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-8">
            {ROLES.map((role, i) => (
              <span key={role} className="flex items-center gap-3">
                <span className="text-sm text-[#A1A1AA]/70">{role}</span>
                {i < ROLES.length - 1 && (
                  <span className="text-[#A1A1AA]/30 text-xs">·</span>
                )}
              </span>
            ))}
          </div>

          {/* Headline */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6"
            style={{
              background:
                "linear-gradient(160deg, #F9FAFB 30%, rgba(245,158,11,0.85) 70%, rgba(96,165,250,0.9) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Building Practical AI Systems
            <br className="hidden md:block" />
            {" "}for Business, Education,
            <br className="hidden md:block" />
            {" "}and Workforce Development
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-10">
            I design and build agentic AI systems, context engineering workflows,
            automation dashboards, and educational frameworks that help people move
            from AI theory to real-world implementation.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#projects"
              className="px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #F59E0B, #D97706)",
                color: "#0B0F1A",
                boxShadow: "0 0 24px rgba(245,158,11,0.35), 0 2px 8px rgba(0,0,0,0.4)",
              }}
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-7 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 hover:bg-white/[0.04]"
              style={{
                borderColor: "rgba(96,165,250,0.4)",
                color: "rgba(96,165,250,0.9)",
              }}
            >
              Continue the Conversation →
            </a>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="px-4 sm:px-6 lg:px-8 py-20 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>About</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 max-w-2xl">
            AI builder at the intersection of systems, education, and implementation.
          </h2>
          <p className="text-[#A1A1AA] leading-relaxed max-w-3xl mb-12 text-base sm:text-lg">
            Jonathan Cardona is a self-taught AI systems builder focused on helping businesses,
            professionals, and educators apply AI through practical systems. His work focuses on
            agentic workflows, context engineering, retrieval systems, AI automation,
            human-in-the-loop design, and AI education. He builds systems that close the gap
            between AI capability and real-world business outcomes.
          </p>

          {/* Highlight cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {HIGHLIGHTS.map(({ label, icon }) => (
              <div
                key={label}
                className="rounded-xl p-4 border border-white/[0.07] text-center"
                style={{ background: "#151B2D" }}
              >
                <div className="text-2xl mb-2">{icon}</div>
                <p className="text-xs font-semibold text-[#F9FAFB]/80 leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section
        id="team"
        className="px-4 sm:px-6 lg:px-8 py-20 border-t border-white/[0.05]"
        style={{ background: "#0D1220" }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Leadership</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Agentic Systems Team
          </h2>
          <p className="text-[#A1A1AA] text-sm mb-10 max-w-xl">
            An interdisciplinary team combining AI architecture, business strategy, and research.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TEAM.map(({ name, title, initials, color, description }) => (
              <div
                key={name}
                className="rounded-2xl p-6 border border-white/[0.07] flex flex-col gap-4"
                style={{ background: "#151B2D" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold"
                    style={{
                      background: `${color}18`,
                      border: `1px solid ${color}40`,
                      color,
                    }}
                  >
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#F9FAFB] leading-snug">{name}</p>
                    <p className="text-[11px] font-medium mt-0.5" style={{ color }}>
                      {title}
                    </p>
                  </div>
                </div>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="px-4 sm:px-6 lg:px-8 py-20 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Work</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Featured Projects
          </h2>
          <p className="text-[#A1A1AA] text-sm mb-10 max-w-xl">
            Real systems built for real outcomes — from media platforms to agentic workflows.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROJECTS.map(({ title, description, concepts, url, urlLabel, accent }) => (
              <div
                key={title}
                className="rounded-2xl p-6 border border-white/[0.07] flex flex-col gap-4 group"
                style={{
                  background: "#151B2D",
                  boxShadow: "0 0 0 0 transparent",
                  transition: "box-shadow 0.2s",
                }}
              >
                {/* Accent bar */}
                <div
                  className="w-8 h-1 rounded-full"
                  style={{ background: accent }}
                />

                <div>
                  <h3 className="text-base font-bold text-[#F9FAFB] mb-2 leading-snug">
                    {title}
                  </h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{description}</p>
                </div>

                {/* Concept tags */}
                <div className="flex flex-wrap gap-1.5">
                  {concepts.map((c) => (
                    <span
                      key={c}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md"
                      style={{
                        background: `${accent}12`,
                        border: `1px solid ${accent}25`,
                        color: `${accent}`,
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href={url === "#" ? undefined : url}
                  target={url !== "#" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-xs font-medium mt-auto transition-colors"
                  style={{
                    color: url === "#" ? "#A1A1AA" : accent,
                    cursor: url === "#" ? "default" : "pointer",
                    pointerEvents: url === "#" ? "none" : "auto",
                  }}
                >
                  {url !== "#" ? `↗ ${urlLabel}` : `⏳ ${urlLabel}`}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Concepts ── */}
      <section
        id="concepts"
        className="px-4 sm:px-6 lg:px-8 py-20 border-t border-white/[0.05]"
        style={{ background: "#0D1220" }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Knowledge</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            AI Concepts I Teach
          </h2>
          <p className="text-[#A1A1AA] text-sm mb-10 max-w-xl">
            From foundations to advanced agentic systems — explained in plain English.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CONCEPTS.map(({ title, explanation, accent, featured }) => (
              <div
                key={title}
                className="rounded-xl p-5 border flex flex-col gap-3"
                style={{
                  background: featured ? `${accent}08` : "#151B2D",
                  borderColor: featured ? `${accent}35` : "rgba(255,255,255,0.07)",
                  boxShadow: featured ? `0 0 20px ${accent}12` : "none",
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className="text-sm font-bold leading-snug"
                    style={{ color: featured ? accent : "#F9FAFB" }}
                  >
                    {title}
                  </h3>
                  {featured && (
                    <span
                      className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded shrink-0"
                      style={{
                        background: `${accent}20`,
                        color: accent,
                        border: `1px solid ${accent}30`,
                      }}
                    >
                      Key
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">{explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section id="education" className="px-4 sm:px-6 lg:px-8 py-20 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Education</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Course &amp; Workshop Offerings
          </h2>
          <p className="text-[#A1A1AA] text-sm mb-10 max-w-xl">
            Curriculum developed through Agentic Systems for professional development,
            workforce readiness, and institutional partnerships — including the GH-600 / UNLV proof-of-concept.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROGRAMS.map(({ title, level, description, accent }) => (
              <div
                key={title}
                className="rounded-2xl p-6 border border-white/[0.07] flex flex-col gap-3"
                style={{ background: "#151B2D" }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{
                      background: `${accent}15`,
                      color: accent,
                      border: `1px solid ${accent}30`,
                    }}
                  >
                    {level}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#F9FAFB] leading-snug">{title}</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed flex-1">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Workforce Development ── */}
      <section
        id="workforce"
        className="px-4 sm:px-6 lg:px-8 py-20 border-t border-white/[0.05]"
        style={{ background: "#0D1220" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel>Workforce</SectionLabel>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-5">
                Real-World Learning &amp;
                <br />Workforce Development
              </h2>
              <p className="text-[#A1A1AA] leading-relaxed text-sm sm:text-base mb-6">
                The Agentic Systems approach to AI education is grounded in real projects. Instead of
                only explaining theory, students learn by studying and building applied systems
                that connect AI concepts to business outcomes, workforce skills, and practical
                implementation.
              </p>
              <p className="text-[#A1A1AA] leading-relaxed text-sm sm:text-base">
                The goal is AI literacy that translates into employable skills and operational
                competency — not just familiarity with tools.
              </p>
            </div>

            <div className="space-y-3">
              {[
                "Case-study-based learning",
                "Real business workflows",
                "AI literacy and workforce readiness",
                "Practical implementation over theory alone",
                "Potential alignment with continuing education and professional development",
              ].map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-xl p-4 border border-white/[0.06]"
                  style={{ background: "#151B2D" }}
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-px text-[10px] font-bold"
                    style={{
                      background: "rgba(245,158,11,0.15)",
                      color: "#F59E0B",
                      border: "1px solid rgba(245,158,11,0.3)",
                    }}
                  >
                    ✓
                  </span>
                  <p className="text-sm text-[#F9FAFB]/80 leading-snug">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Partnership ── */}
      <section
        id="partnership"
        className="px-4 sm:px-6 lg:px-8 py-20 border-t border-white/[0.05]"
      >
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Collaboration</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Ways to Collaborate
          </h2>
          <p className="text-[#A1A1AA] text-sm mb-10 max-w-xl">
            Areas of collaboration across Jonathan&apos;s work in AI education, curriculum development, and research.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PARTNERSHIPS.map(({ label, icon }) => (
              <div
                key={label}
                className="rounded-xl p-5 border border-white/[0.07] flex items-center gap-4"
                style={{ background: "#151B2D" }}
              >
                <span className="text-2xl shrink-0">{icon}</span>
                <p className="text-sm font-medium text-[#F9FAFB]/85 leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        className="px-4 sm:px-6 lg:px-8 py-20 border-t border-white/[0.05]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(96,165,250,0.07) 0%, rgba(245,158,11,0.05) 40%, transparent 70%)",
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <SectionLabel>Contact</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Follow the Work
          </h2>
          <p className="text-[#A1A1AA] text-sm mb-10 max-w-lg mx-auto">
            Jonathan writes about AI, Bitcoin, and the digital economy at Digital Wealth Transfer.
            Connect on LinkedIn or follow the build on GitHub.
          </p>

          {/* Contact card */}
          <div
            className="inline-flex flex-col items-center gap-6 rounded-2xl px-8 sm:px-14 py-10 border border-white/[0.08] max-w-md w-full mx-auto"
            style={{ background: "#151B2D" }}
          >
            <div>
              <p className="font-bold text-[#F9FAFB] text-lg">Jonathan Cardona</p>
              <p className="text-xs text-[#A1A1AA] mt-1">Founder, Digital Wealth Transfer</p>
              <p className="text-xs text-[#A1A1AA]">Chief AI Officer, Agentic Systems</p>
            </div>

            <div className="w-full space-y-3">
              {[
                {
                  label: "Website",
                  href: "https://digitalwealthtransfer.com",
                  display: "digitalwealthtransfer.com",
                  color: "#F59E0B",
                },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/jonathan-cardona-1089291b9",
                  display: "linkedin.com/in/jonathan-cardona",
                  color: "#60A5FA",
                },
                {
                  label: "GitHub",
                  href: "https://github.com/CreatewithJon",
                  display: "github.com/CreatewithJon",
                  color: "#A78BFA",
                },
              ].map(({ label, href, display, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-colors group"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <span className="text-xs font-medium text-[#A1A1AA] group-hover:text-[#F9FAFB] transition-colors">
                    {label}
                  </span>
                  <span className="text-xs font-medium truncate ml-3" style={{ color }}>
                    {display} ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-4 sm:px-6 lg:px-8 py-8 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#A1A1AA]/50">
            © {new Date().getFullYear()} Jonathan Cardona
          </p>
          <p className="text-xs text-[#A1A1AA]/30">
            AI Systems Portfolio
          </p>
        </div>
      </footer>
    </div>
  );
}

// ─── Shared sub-component ──────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] font-bold uppercase tracking-[0.22em] mb-3"
      style={{ color: "rgba(245,158,11,0.65)" }}
    >
      {children}
    </p>
  );
}
