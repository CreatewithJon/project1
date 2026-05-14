import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BusinessLeadForm from "@/components/BusinessLeadForm";
import ProviderLeadForm from "@/components/ProviderLeadForm";

export const metadata: Metadata = {
  title: "Digital Wealth Transfer — AI Systems for Local Businesses",
  description:
    "I build AI lead capture, follow-up automation, and appointment-setting systems for local businesses. Done for you in 7 days.",
};

const offer = [
  {
    name: "AI Lead Machine",
    price: "$750",
    timeline: "7 days",
    best: true,
    desc: "The fastest way to stop losing leads to slow follow-up.",
    deliverables: [
      "Lead capture page or form optimization",
      "Automated 3-email follow-up sequence",
      "CRM setup and lead tracking",
      "2-minute AI response system",
      "Loom walkthrough + written SOP",
    ],
  },
  {
    name: "AI Appointment Setter",
    price: "$1,000",
    timeline: "10 days",
    best: false,
    desc: "An AI system that qualifies and books leads automatically.",
    deliverables: [
      "Everything in AI Lead Machine",
      "AI chatbot or SMS bot",
      "Lead qualification workflow",
      "Calendar booking integration",
      "Full handoff documentation",
    ],
  },
  {
    name: "Full AI System",
    price: "$1,500",
    timeline: "14 days",
    best: false,
    desc: "Complete AI infrastructure for your entire sales process.",
    deliverables: [
      "Everything in AI Appointment Setter",
      "AI-optimized website or funnel",
      "Conversion copy and SEO basics",
      "Analytics and reporting setup",
      "30-day optimization check-in",
    ],
  },
];

const results = [
  { stat: "< 2 min", label: "Average AI response time to new leads" },
  { stat: "40–60%", label: "Of leads lost due to slow manual follow-up" },
  { stat: "7 days", label: "From kickoff to live system" },
  { stat: "24 hrs", label: "Personal response guaranteed" },
];

const forWho = [
  "Med spas & aesthetics",
  "Real estate agents",
  "Solar & roofing",
  "Home service contractors",
  "Insurance agents",
  "Fitness coaches",
  "Law firms",
  "Consultants",
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
              Services
            </Link>
            <Link href="/directory" className="text-sm text-[#A1A1AA] hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
              Directory
            </Link>
            <Link href="/blog" className="text-sm text-[#A1A1AA] hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
              Blog
            </Link>
            <Link
              href="#business-form"
              className="ml-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-7 tracking-wide">
            AI Systems for Local Businesses · Las Vegas & Nationwide
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6">
            I Build the AI System.<br />
            <span className="text-blue-400">You Close the Leads.</span>
          </h1>
          <p className="text-xl text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto mb-10">
            Done-for-you AI lead capture, automated follow-up, and appointment-setting systems for local businesses.
            Built personally by Jonathan Cardona. Live in 7 days.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link
              href="#business-form"
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-blue-500 transition-colors text-center shadow-[0_0_30px_rgba(59,130,246,0.35)]"
            >
              Get a Free System Audit →
            </Link>
            <Link
              href="#offer"
              className="w-full sm:w-auto border border-white/[0.12] bg-white/[0.04] text-[#F9FAFB] px-8 py-4 rounded-xl font-bold text-base hover:bg-white/[0.08] transition-colors text-center"
            >
              See What&apos;s Included
            </Link>
          </div>
          <p className="text-xs text-[#A1A1AA]/50">No pressure · Free 15-min consultation · Personal response within 24 hours</p>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="border-y border-white/[0.06] bg-[#111827] py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
          {results.map(({ stat, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-black text-white mb-1">{stat}</p>
              <p className="text-xs text-[#A1A1AA]/70 leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3.5 py-1.5 rounded-full mb-5">
              The Problem
            </span>
            <h2 className="text-4xl font-bold text-white tracking-tight mb-5">
              You&apos;re probably losing leads<br />right now and don&apos;t know it.
            </h2>
            <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
              Most local businesses get inquiries but have no system to respond fast, follow up automatically, or book appointments without manual work. The business that responds first wins. Usually that&apos;s your competitor.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { label: "01", title: "Slow response time", desc: "Studies show 78% of customers buy from whoever responds first. If you're following up manually hours later, you're already losing." },
              { label: "02", title: "No follow-up system", desc: "Most leads need 5–7 touch points before they buy. Without automation, those follow-ups never happen and revenue walks out the door." },
              { label: "03", title: "No system, just scattered tools", desc: "A CRM you don't use, an email list with no sequences, a calendar with no automation — tools without systems create expensive noise." },
            ].map(({ label, title, desc }) => (
              <div key={label} className="bg-[#151B2D] rounded-2xl border border-white/[0.08] p-7 hover:border-rose-500/20 transition-all">
                <span className="text-[11px] font-bold text-rose-500/40 uppercase tracking-widest mb-4 block">{label}</span>
                <h3 className="text-base font-semibold text-white mb-2.5">{title}</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Offer ── */}
      <section id="offer" className="bg-[#111827] border-y border-white/[0.06] py-24 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-5">
              The Offer
            </span>
            <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
              Done-for-you AI systems.<br />Real results in 7–14 days.
            </h2>
            <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto">
              Everything is built and delivered by Jonathan personally. No outsourcing. No templates. No surprises.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {offer.map(({ name, price, timeline, best, desc, deliverables }) => (
              <div
                key={name}
                className={`rounded-2xl p-7 flex flex-col transition-all ${
                  best
                    ? "bg-blue-600/10 border-2 border-blue-500/40 shadow-[0_0_40px_rgba(59,130,246,0.12)]"
                    : "bg-[#151B2D] border border-white/[0.08] hover:border-blue-500/20"
                }`}
              >
                {best && (
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-4 block">Most Popular</span>
                )}
                <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
                <p className="text-sm text-[#A1A1AA] mb-4">{desc}</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-black text-white">{price}</span>
                  <span className="text-sm text-[#A1A1AA]/60">one-time</span>
                </div>
                <p className="text-xs text-blue-400/70 mb-6">Delivered in {timeline}</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm text-[#A1A1AA]">
                      <span className="mt-0.5 w-4 h-4 shrink-0 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                        <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-2.5 h-2.5 text-blue-400">
                          <path d="M2 5l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#business-form"
                  className={`text-center text-sm font-bold px-5 py-3 rounded-xl transition-colors ${
                    best
                      ? "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                      : "border border-white/[0.12] bg-white/[0.04] text-white hover:bg-white/[0.08]"
                  }`}
                >
                  Get Started →
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[#A1A1AA]/50 mt-8">
            Not sure which fits? Book a free 15-min call and I&apos;ll tell you exactly what I&apos;d build for your business.
          </p>
        </div>
      </section>

      {/* ── Who It's For ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-5">
              Who It&apos;s For
            </span>
            <h2 className="text-4xl font-bold text-white tracking-tight mb-5 leading-tight">
              Built for local businesses<br />ready to stop losing leads.
            </h2>
            <p className="text-lg text-[#A1A1AA] leading-relaxed mb-8">
              If you&apos;re running a service business, getting inquiries, but struggling to follow up fast enough or consistently enough — this was built for you. No technical knowledge required.
            </p>
            <div className="grid grid-cols-2 gap-2.5 mb-8">
              {forWho.map((type) => (
                <div key={type} className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 shrink-0" />
                  {type}
                </div>
              ))}
            </div>
            <Link
              href="#business-form"
              className="inline-block bg-blue-600 text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              Book a Free 15-Min Call →
            </Link>
          </div>
          <div className="space-y-4">
            {[
              { step: "01", title: "Free System Audit", desc: "Fill out the form below. I'll review your current lead process and tell you exactly what I'd build — no obligation." },
              { step: "02", title: "I Build It For You", desc: "Jonathan designs and builds your system personally. Every tool configured, every automation tested before handoff." },
              { step: "03", title: "You Go Live in 7 Days", desc: "Your system is live, documented, and yours. You get a Loom walkthrough and written SOP so your team can use it." },
              { step: "04", title: "Optional: I Optimize It Monthly", desc: "For $500/month I'll maintain your system, add new automations, and produce monthly content to grow your pipeline." },
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

      {/* ── About Jonathan ── */}
      <section className="bg-[#111827] border-y border-white/[0.06] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold text-[#A1A1AA]/50 uppercase tracking-[0.15em] mb-5">
            Who Builds These Systems
          </span>
          <h2 className="text-3xl font-bold text-white mb-5">
            Built by Jonathan Cardona
          </h2>
          <p className="text-lg text-[#A1A1AA] leading-relaxed mb-5 max-w-2xl mx-auto">
            I&apos;m a first-gen founder from East LA, now based in Las Vegas. I came up through sales, banking, and customer support — not a CS degree. I taught myself AI, automation, and software because I saw how much leverage these tools create for people who actually use them.
          </p>
          <p className="text-lg text-[#A1A1AA] leading-relaxed mb-8 max-w-2xl mx-auto">
            I don&apos;t run an agency. I don&apos;t outsource. Every system I build, I build myself — and I only take on projects I&apos;m confident will generate real results.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://www.linkedin.com/in/jonathan-cardona-1089291b9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              Connect on LinkedIn →
            </a>
            <Link href="#business-form" className="text-sm font-semibold text-[#A1A1AA] hover:text-white transition-colors">
              Work With Me →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Lead Form ── */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div id="business-form" className="scroll-mt-24 text-center mb-10">
            <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-5">
              Get Started
            </span>
            <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
              Get a Free System Audit
            </h2>
            <p className="text-lg text-[#A1A1AA]">
              Tell me about your business. I&apos;ll tell you exactly what I&apos;d build — free, no pressure, within 24 hours.
            </p>
          </div>
          <div className="bg-[#151B2D] rounded-2xl border border-white/[0.08] p-8">
            <BusinessLeadForm />
          </div>
        </div>
      </section>

      {/* ── Provider CTA (secondary) ── */}
      <section id="provider-form" className="bg-[#111827] border-t border-white/[0.06] py-20 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-12 items-start">
          <div>
            <span className="inline-block text-[11px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full mb-5 uppercase tracking-widest">
              For AI & Tech Providers
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">Get pre-vetted client introductions</h2>
            <p className="text-[#A1A1AA] leading-relaxed mb-6">
              If you&apos;re an AI solution provider, blockchain company, fintech platform, or automation agency — I&apos;ll send you warm introductions to businesses actively looking for what you offer.
            </p>
            <ul className="space-y-2">
              {["No cold outreach required", "Pre-qualified for budget and intent", "Personal introduction from Jonathan", "Growing network across Las Vegas and nationwide"].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-[#A1A1AA]">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400/60 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#151B2D] rounded-2xl border border-white/[0.08] p-7">
            <ProviderLeadForm />
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
            <Link href="/ai-systems" className="hover:text-white transition-colors">Services</Link>
            <Link href="/directory" className="hover:text-white transition-colors">Directory</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="#business-form" className="hover:text-white transition-colors">Get Started</Link>
            <a href="https://www.linkedin.com/in/jonathan-cardona-1089291b9" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn →</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
