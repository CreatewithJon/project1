import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CompanyCard from "@/components/CompanyCard";
import BusinessLeadForm from "@/components/BusinessLeadForm";
import ProviderLeadForm from "@/components/ProviderLeadForm";
import { companies } from "@/lib/data/companies";

export const metadata: Metadata = {
  title: "DigitalWealthTransfer.com — Las Vegas AI & Tech Marketplace",
  description:
    "Find vetted AI, blockchain, and fintech providers in Las Vegas — or get matched with ready-to-buy clients. Human-reviewed. Fast.",
};

const featured = companies.filter((c) => c.isFeatured).slice(0, 3);

const features = [
  {
    title: "Las Vegas Focused",
    desc: "Deep knowledge of the local AI, blockchain, and fintech market. Not a generic national directory.",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M10 2C7.24 2 5 4.24 5 7c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5z" strokeLinejoin="round" />
        <circle cx="10" cy="7" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Human-Reviewed Matches",
    desc: "Every match is personally reviewed by Jonathan Cardona — not sorted by an algorithm.",
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
    title: "AI & Blockchain Specialists",
    desc: "We only work in AI, blockchain, fintech, and digital assets. No generalist noise.",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <rect x="3" y="3" width="14" height="14" rx="2" />
        <path d="M7 10h6M10 7v6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Pre-Qualified Leads",
    desc: "Businesses are vetted for budget and timeline before any introduction is made.",
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
    title: "24-Hour Response",
    desc: "Every submission receives a personal reply within 24 hours — no automated acknowledgements.",
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
    title: "Two-Sided Marketplace",
    desc: "Built for both buyers and providers. One platform, two clear paths, one trusted matchmaker.",
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
          <Image src="/brand/logo.svg" alt="Digital Wealth Transfer" width={200} height={41} priority unoptimized style={{ height: "auto" }} />
          <div className="hidden sm:flex items-center gap-1">
            <Link href="/ai-systems" className="text-sm text-[#A1A1AA] hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
              AI Systems
            </Link>
            <Link href="#how" className="text-sm text-[#A1A1AA] hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
              How It Works
            </Link>
            <Link href="/directory" className="text-sm text-[#A1A1AA] hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
              Directory
            </Link>
            <Link href="/blog" className="text-sm text-[#A1A1AA] hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
              Blog
            </Link>
            <Link href="#provider-form" className="text-sm text-[#A1A1AA] hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
              For Providers
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
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 left-1/3 w-[300px] h-[300px] bg-purple-600/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-7 tracking-wide">
            Las Vegas · AI, Blockchain & Fintech
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6">
            Connect With the Right<br />
            <span className="text-blue-400">AI & Tech Experts</span>
          </h1>
          <p className="text-xl text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto mb-10">
            Find vetted AI, blockchain, and fintech providers in Las Vegas —
            or get matched with ready-to-buy clients. Every match is personal and human-reviewed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Link
              href="#business-form"
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-blue-500 transition-colors text-center shadow-[0_0_30px_rgba(59,130,246,0.35)]"
            >
              Find a Service Provider →
            </Link>
            <Link
              href="#provider-form"
              className="w-full sm:w-auto border border-white/[0.12] bg-white/[0.04] text-[#F9FAFB] px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-white/[0.08] transition-colors text-center"
            >
              Get More Clients
            </Link>
          </div>
          <p className="text-sm text-[#A1A1AA]/60">
            Free to use · Response within 24 hours · No cold outreach
          </p>
        </div>
      </section>

      {/* ── Social Proof Strip ── */}
      <section className="border-y border-white/[0.06] bg-[#111827] py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[11px] font-semibold text-[#A1A1AA]/60 uppercase tracking-[0.15em] mb-10">
            Built for the Las Vegas AI & tech market
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 text-center">
            {[
              { value: "AI & Blockchain", label: "Specialist focus" },
              { value: "Las Vegas", label: "Local expertise" },
              { value: "24 Hours", label: "Guaranteed response" },
              { value: "Human-Reviewed", label: "Every introduction" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-lg font-bold text-white mb-1">{value}</p>
                <p className="text-sm text-[#A1A1AA]">{label}</p>
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
              Finding the right fit is harder than it should be
            </h2>
            <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
              The Las Vegas AI and tech market is growing fast — but connecting businesses with the right providers still relies on cold outreach, guesswork, and wasted time.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                title: "Wasted Time on Bad Fits",
                desc: "Businesses spend weeks evaluating vendors who were never the right fit. Every bad meeting has a real cost in time and momentum.",
                label: "01",
              },
              {
                title: "Leads That Never Convert",
                desc: "Service providers chase prospects who aren't qualified. Cold outreach burns budget on people who were never going to buy.",
                label: "02",
              },
              {
                title: "No Trusted Local Resource",
                desc: "There's no dedicated matchmaking layer for Las Vegas AI and tech businesses. The market is fragmented and hard to navigate.",
                label: "03",
              },
            ].map(({ title, desc, label }) => (
              <div
                key={label}
                className="bg-[#151B2D] rounded-2xl border border-white/[0.08] p-7 hover:border-rose-500/20 transition-all"
              >
                <span className="text-[11px] font-bold text-rose-500/40 uppercase tracking-widest mb-4 block">
                  {label}
                </span>
                <h3 className="text-base font-semibold text-white mb-2.5">{title}</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solution ── */}
      <section id="how" className="bg-[#111827] border-y border-white/[0.06] py-24 px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-5">
              The Solution
            </span>
            <h2 className="text-4xl font-bold text-white tracking-tight mb-5 leading-tight">
              A personal introduction,<br />not just a directory
            </h2>
            <p className="text-lg text-[#A1A1AA] leading-relaxed mb-8">
              Jonathan Cardona personally reviews every request from both sides — qualifying businesses for budget and intent, vetting providers for fit — then makes a warm introduction.
            </p>
            <ul className="space-y-4">
              {[
                "Both sides are vetted before any introduction",
                "You only receive matches who are ready to move forward",
                "No cold emails, no RFPs, no wasted calls",
                "Response guaranteed within 24 hours",
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
              {
                step: "01",
                title: "Submit Your Request",
                desc: "Takes under 2 minutes. Businesses describe what they need. Providers describe who they serve.",
              },
              {
                step: "02",
                title: "We Manually Review",
                desc: "Every submission is personally reviewed. Businesses are qualified for budget. Providers vetted for fit.",
              },
              {
                step: "03",
                title: "You Get a Warm Intro",
                desc: "A personal introduction from Jonathan Cardona — not a lead export or automated email blast.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-[#151B2D] rounded-2xl border border-white/[0.08] p-6 flex gap-5 hover:border-blue-500/20 transition-all">
                <span className="text-2xl font-black text-white/10 leading-none shrink-0 select-none">
                  {step}
                </span>
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
            <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
              Everything you need to connect
            </h2>
            <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto">
              Built specifically for the Las Vegas AI, blockchain, and fintech market.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ title, desc, iconBg, iconColor, icon }) => (
              <div
                key={title}
                className="bg-[#151B2D] rounded-2xl border border-white/[0.08] p-7 hover:border-blue-500/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.05)] transition-all"
              >
                <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center ${iconColor} mb-5`}>
                  {icon}
                </div>
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
              <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-4">
                Directory
              </span>
              <h2 className="text-4xl font-bold text-white tracking-tight">
                Browse Las Vegas providers
              </h2>
            </div>
            <Link
              href="/directory"
              className="shrink-0 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              View all companies →
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {featured.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/directory"
              className="inline-block border border-white/[0.12] bg-white/[0.04] text-[#F9FAFB] text-sm font-semibold px-7 py-3 rounded-xl hover:bg-white/[0.08] transition-colors"
            >
              View All Providers in the Directory
            </Link>
          </div>
        </div>
      </section>

      {/* ── Who It's For ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
              Built for both sides of the market
            </h2>
            <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto">
              Whether you need a provider or want more clients, there&apos;s a clear path for you.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Business side */}
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.06] p-8">
              <span className="inline-block text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-5">
                For Businesses
              </span>
              <h3 className="text-xl font-bold text-white mb-3">
                I need a service provider
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                Tell me what you need. I&apos;ll find the right match and make a personal introduction — no browsing required.
              </p>
              <ul className="space-y-2 mb-7">
                {["AI solutions & custom development", "Blockchain infrastructure", "Digital asset custody", "Fintech platforms & payment rails"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-[#A1A1AA]">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="#business-form" className="inline-block bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                Find a Provider →
              </Link>
            </div>
            {/* Provider side */}
            <div className="rounded-2xl border border-purple-500/20 bg-purple-500/[0.06] p-8">
              <span className="inline-block text-[11px] font-bold text-purple-400 uppercase tracking-widest mb-5">
                For Providers
              </span>
              <h3 className="text-xl font-bold text-white mb-3">
                I want more qualified clients
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                Tell me who you serve. I&apos;ll send you pre-vetted introductions — no cold outreach, no unqualified prospects.
              </p>
              <ul className="space-y-2 mb-7">
                {["Enterprise AI solution companies", "Blockchain infrastructure providers", "Digital asset & custody firms", "Fintech platforms & AI advisors"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-[#A1A1AA]">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="#provider-form" className="inline-block border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-purple-500/20 transition-colors">
                Apply as a Provider →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA / Lead Forms ── */}
      <section className="bg-[#111827] border-t border-white/[0.06] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
              Start connecting today
            </h2>
            <p className="text-lg text-[#A1A1AA] max-w-lg mx-auto">
              Submit your info below. Jonathan will follow up personally within 24 hours.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-10">
            {/* Form A */}
            <div id="business-form" className="scroll-mt-24">
              <div className="mb-6">
                <span className="inline-block text-[11px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-3 uppercase tracking-widest">
                  For Businesses
                </span>
                <h3 className="text-xl font-bold text-white">Find a Service Provider</h3>
                <p className="text-sm text-[#A1A1AA] mt-1">
                  Tell me what you need. I&apos;ll find the right match.
                </p>
              </div>
              <BusinessLeadForm />
            </div>
            {/* Form B */}
            <div id="provider-form" className="scroll-mt-24">
              <div className="mb-6">
                <span className="inline-block text-[11px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full mb-3 uppercase tracking-widest">
                  For Providers
                </span>
                <h3 className="text-xl font-bold text-white">Get More Clients</h3>
                <p className="text-sm text-[#A1A1AA] mt-1">
                  Tell me who you serve. I&apos;ll send you pre-vetted intros.
                </p>
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
            <p className="text-xs text-[#A1A1AA]/60">© 2025 Jonathan Cardona · Las Vegas, Nevada</p>
          </div>
          <div className="flex items-center gap-5 text-sm text-[#A1A1AA]">
            <Link href="/ai-systems" className="hover:text-white transition-colors">AI Systems</Link>
            <Link href="#business-form" className="hover:text-white transition-colors">For Businesses</Link>
            <Link href="#provider-form" className="hover:text-white transition-colors">For Providers</Link>
            <Link href="/directory" className="hover:text-white transition-colors">Directory</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <a
              href="https://www.linkedin.com/in/jonathan-cardona-1089291b9"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn →
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
