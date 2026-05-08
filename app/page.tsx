import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CompanyCard from "@/components/CompanyCard";
import BusinessLeadForm from "@/components/BusinessLeadForm";
import ProviderLeadForm from "@/components/ProviderLeadForm";
import { companies } from "@/lib/data/companies";

export const metadata: Metadata = {
  title: "Digital Wealth Transfer — AI, Automation & Emerging Technology",
  description:
    "Helping businesses and entrepreneurs leverage AI, automation, and emerging technology to create more freedom, opportunity, and growth.",
};

const featured = companies.filter((c) => c.isFeatured).slice(0, 3);

const features = [
  {
    title: "AI & Automation First",
    desc: "Every solution is built around real AI implementation — not generic advice. We help you apply tools that actually move the needle.",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M10 2l1.5 4.5L16 8l-4.5 1.5L10 14l-1.5-4.5L4 8l4.5-1.5L10 2z" strokeLinejoin="round" />
        <path d="M16 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Human-Reviewed Introductions",
    desc: "Every match is personally reviewed by Jonathan Cardona — not sorted by an algorithm. Real judgment, not automation theater.",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-400",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <circle cx="10" cy="7" r="3" />
        <path d="M4 17c0-3.31 2.69-6 6-6s6 2.69 6 6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Pre-Qualified Opportunities",
    desc: "Businesses are vetted for budget and intent before any introduction. Providers only receive prospects who are ready to move.",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M5 10l3.5 3.5L15 7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="10" r="8" />
      </svg>
    ),
  },
  {
    title: "Las Vegas & Nationwide",
    desc: "Rooted in Las Vegas with a growing national network. Deep local knowledge, broad ecosystem reach.",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <circle cx="10" cy="10" r="8" />
        <path d="M2 10h16M10 2c-2.5 2.5-4 5-4 8s1.5 5.5 4 8M10 2c2.5 2.5 4 5 4 8s-1.5 5.5-4 8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "24-Hour Response",
    desc: "Every submission receives a personal reply within 24 hours. No automated acknowledgements. No black holes.",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-400",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <circle cx="10" cy="10" r="8" />
        <path d="M10 6v4l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Built for the Future",
    desc: "The ecosystem is growing — from matchmaking to AI systems, education, dashboards, and infrastructure for the digital economy.",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M4 10h12M13 7l3 3-3 3M7 7L4 10l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] font-sans text-[#F9FAFB]">

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-[#0B0F1A]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Image src="/brand/logo.svg" alt="Digital Wealth Transfer" width={180} height={37} priority unoptimized style={{ height: "auto" }} />
          <div className="hidden sm:flex items-center gap-1">
            <Link href="/ai-systems" className="text-sm text-[#A1A1AA] hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
              AI Systems
            </Link>
            <Link href="/directory" className="text-sm text-[#A1A1AA] hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
              Directory
            </Link>
            <Link href="/blog" className="text-sm text-[#A1A1AA] hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
              Blog
            </Link>
            <Link
              href="/ai-systems#get-started"
              className="ml-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 left-1/3 w-[300px] h-[300px] bg-purple-600/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-7 tracking-wide">
            AI · Automation · Emerging Technology
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-5">
            Technology That Creates<br />
            <span className="text-blue-400">Freedom and Opportunity</span>
          </h1>
          <p className="text-xl text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto mb-4">
            Digital Wealth Transfer helps businesses and entrepreneurs leverage AI, automation, and emerging technology — turning complexity into leverage, and tools into real outcomes.
          </p>
          <p className="text-sm text-[#A1A1AA]/60 mb-10">How can we help you?</p>

          {/* Two clear paths */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/ai-systems"
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-blue-500 transition-colors text-center shadow-[0_0_30px_rgba(59,130,246,0.35)]"
            >
              Build My AI System →
            </Link>
            <Link
              href="#provider-form"
              className="w-full sm:w-auto border border-purple-500/30 bg-purple-500/[0.06] text-[#F9FAFB] px-8 py-4 rounded-xl font-bold text-base hover:bg-purple-500/[0.12] transition-colors text-center"
            >
              Get More Clients →
            </Link>
          </div>
          <p className="text-xs text-[#A1A1AA]/50">Free consultation · Personal response within 24 hours · No pressure</p>
        </div>
      </section>

      {/* ── Mission Strip ── */}
      <section className="border-y border-white/[0.06] bg-[#111827] py-14 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] font-semibold text-[#A1A1AA]/50 uppercase tracking-[0.15em] mb-5">
            The mission
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-6 max-w-3xl mx-auto">
            &ldquo;Helping everyday people and businesses leverage AI, automation, and emerging technology to create more freedom, ownership, and opportunity.&rdquo;
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            {[
              { icon: "→", title: "Identify the right tools", desc: "We match your business with the AI and automation systems that solve real problems — no guesswork." },
              { icon: "→", title: "Build and implement", desc: "Jonathan builds the systems personally. Not a reseller. Not a middleman. Hands-on execution." },
              { icon: "→", title: "Create measurable outcomes", desc: "More leads, faster operations, better follow-up. Systems that generate real business growth." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-6 text-left">
                <h3 className="text-white font-semibold text-sm mb-2">{title}</h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3.5 py-1.5 rounded-full mb-5">
              The Problem
            </span>
            <h2 className="text-4xl font-bold text-white tracking-tight mb-5">
              Technology is moving fast.<br />Most businesses are getting left behind.
            </h2>
            <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
              AI and automation create enormous leverage — but only for people who know how to implement them. The gap between knowing and doing is where most businesses lose.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { title: "Overwhelmed by the options", desc: "Hundreds of AI tools, no clear path. Most businesses try one thing, get confused, and give up before they see results.", label: "01" },
              { title: "No system, just scattered tools", desc: "Buying software is not the same as building a system. Without the right architecture, tools become expensive noise.", label: "02" },
              { title: "Falling further behind every month", desc: "Competitors who implement AI well move faster, respond better, and convert more. The gap widens every quarter you wait.", label: "03" },
            ].map(({ title, desc, label }) => (
              <div key={label} className="bg-[#151B2D] rounded-2xl border border-white/[0.08] p-7 hover:border-rose-500/20 transition-all">
                <span className="text-[11px] font-bold text-rose-500/40 uppercase tracking-widest mb-4 block">{label}</span>
                <h3 className="text-base font-semibold text-white mb-2.5">{title}</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solution / How It Works ── */}
      <section id="how" className="bg-[#111827] border-y border-white/[0.06] py-24 px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-5">
              How It Works
            </span>
            <h2 className="text-4xl font-bold text-white tracking-tight mb-5 leading-tight">
              A personal guide,<br />not just a platform
            </h2>
            <p className="text-lg text-[#A1A1AA] leading-relaxed mb-8">
              Jonathan Cardona personally reviews every request — understanding your goals, identifying the right solution, and staying involved through implementation.
            </p>
            <ul className="space-y-4">
              {[
                "Vetted partners and tools — no generic recommendations",
                "Custom-built systems, not off-the-shelf templates",
                "Real follow-up and accountability — not a lead dump",
                "Personal response guaranteed within 24 hours",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.4)]">
                    <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="1.8" className="w-3 h-3">
                      <path d="M2 6l2.5 2.5L10 3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm text-[#A1A1AA] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            {[
              { step: "01", title: "Tell Me What You Need", desc: "Takes under 2 minutes. Describe your business, your goal, or the problem you're trying to solve." },
              { step: "02", title: "I Build the Right Solution", desc: "Jonathan designs and builds your system personally — no resellers, no outsourcing, no templates." },
              { step: "03", title: "You Get Real Results", desc: "More leads captured. Faster response times. Better follow-up. Systems that work while you focus on your business." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-[#151B2D] rounded-2xl border border-white/[0.08] p-6 flex gap-5 hover:border-blue-500/20 transition-all">
                <span className="text-2xl font-black text-white/10 leading-none shrink-0 select-none">{step}</span>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Why Digital Wealth Transfer</h2>
            <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto">
              Built for the AI era. Focused on real implementation. Committed to your outcomes.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ title, desc, iconBg, iconColor, icon }) => (
              <div key={title} className="bg-[#151B2D] rounded-2xl border border-white/[0.08] p-7 hover:border-blue-500/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.05)] transition-all">
                <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center ${iconColor} mb-5`}>{icon}</div>
                <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Directory Preview ── */}
      <section className="bg-[#111827] border-y border-white/[0.06] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-4">Partner Network</span>
              <h2 className="text-4xl font-bold text-white tracking-tight">Vetted tech partners</h2>
              <p className="text-[#A1A1AA] text-sm mt-2 max-w-md">AI, blockchain, fintech, and automation companies — reviewed and ready for warm introductions.</p>
            </div>
            <Link href="/directory" className="shrink-0 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
              View all partners →
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {featured.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/directory" className="inline-block border border-white/[0.12] bg-white/[0.04] text-[#F9FAFB] text-sm font-semibold px-7 py-3 rounded-xl hover:bg-white/[0.08] transition-colors">
              View Full Partner Directory
            </Link>
          </div>
        </div>
      </section>

      {/* ── Two Paths ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Two paths. One ecosystem.</h2>
            <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto">
              Whether you need a tech partner or want more qualified clients, there&apos;s a clear path for you.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.06] p-8">
              <span className="inline-block text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-5">For Businesses</span>
              <h3 className="text-xl font-bold text-white mb-3">Build an AI System</h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                Tell me what you need. I&apos;ll build the right AI system for your business — lead capture, automation, websites, chatbots, or content.
              </p>
              <ul className="space-y-2 mb-7">
                {["AI lead capture and follow-up", "Automated appointment setting", "AI-powered websites and funnels", "Content and growth systems"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-[#A1A1AA]">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />{item}
                  </li>
                ))}
              </ul>
              <Link href="/ai-systems" className="inline-block bg-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                Get My AI System →
              </Link>
            </div>
            <div className="rounded-2xl border border-purple-500/20 bg-purple-500/[0.06] p-8">
              <span className="inline-block text-[11px] font-bold text-purple-400 uppercase tracking-widest mb-5">For Providers</span>
              <h3 className="text-xl font-bold text-white mb-3">Get More Clients</h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                Tell me who you serve. I&apos;ll send you pre-vetted introductions — businesses ready to buy, no cold outreach required.
              </p>
              <ul className="space-y-2 mb-7">
                {["AI solution and development companies", "Blockchain infrastructure providers", "Digital asset and custody firms", "Fintech platforms and AI advisors"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-[#A1A1AA]">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />{item}
                  </li>
                ))}
              </ul>
              <Link href="#provider-form" className="inline-block border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-purple-500/20 transition-colors">
                Get More Clients →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lead Forms ── */}
      <section className="bg-[#111827] border-t border-white/[0.06] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Let&apos;s start building</h2>
            <p className="text-lg text-[#A1A1AA] max-w-lg mx-auto">
              Submit your info below. Jonathan will follow up personally within 24 hours.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-10">
            <div id="business-form" className="scroll-mt-24">
              <div className="mb-6">
                <span className="inline-block text-[11px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-3 uppercase tracking-widest">For Businesses</span>
                <h3 className="text-xl font-bold text-white">Build an AI System</h3>
                <p className="text-sm text-[#A1A1AA] mt-1">Tell me what you need. I&apos;ll build the right solution.</p>
              </div>
              <BusinessLeadForm />
            </div>
            <div id="provider-form" className="scroll-mt-24">
              <div className="mb-6">
                <span className="inline-block text-[11px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full mb-3 uppercase tracking-widest">For Providers</span>
                <h3 className="text-xl font-bold text-white">Get More Clients</h3>
                <p className="text-sm text-[#A1A1AA] mt-1">Tell me who you serve. I&apos;ll send you pre-vetted intros.</p>
              </div>
              <ProviderLeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] bg-[#0B0F1A] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <Image src="/brand/logo.svg" alt="Digital Wealth Transfer" width={160} height={33} unoptimized style={{ height: "auto" }} />
            <p className="text-xs text-[#A1A1AA]/60 mt-1">© 2026 Jonathan Cardona · Las Vegas, Nevada</p>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-sm text-[#A1A1AA]">
            <Link href="/ai-systems" className="hover:text-white transition-colors">AI Systems</Link>
            <Link href="/directory" className="hover:text-white transition-colors">Directory</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="#business-form" className="hover:text-white transition-colors">For Businesses</Link>
            <Link href="#provider-form" className="hover:text-white transition-colors">For Providers</Link>
            <a href="https://www.linkedin.com/in/jonathan-cardona-1089291b9" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn →</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
