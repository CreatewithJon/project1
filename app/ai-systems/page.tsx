import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AILeadForm from "@/components/AILeadForm";

export const metadata: Metadata = {
  title: "AI Revenue Systems for Local Businesses — Digital Wealth Transfer",
  description:
    "I build AI-powered systems that help businesses capture, qualify, and convert more leads — using automation, chatbots, funnels, websites, CRM workflows, and content systems.",
};

const offers = [
  {
    name: "AI Lead Capture System",
    price: "$500–$1,000",
    purpose: "Capture more leads and respond faster.",
    color: "blue",
    items: [
      "Landing page build",
      "Lead capture form",
      "CRM setup",
      "Basic email follow-up",
      "Lead notification system",
      "Simple analytics",
    ],
    outcome: "Turn website visitors and inquiries into an organized lead pipeline.",
  },
  {
    name: "AI Appointment Setter",
    price: "$750–$1,000",
    purpose: "Qualify leads and book calls automatically.",
    color: "purple",
    items: [
      "AI chatbot or SMS bot",
      "Lead qualification flow",
      "Calendar booking integration",
      "Auto-response workflow",
      "CRM handoff",
    ],
    outcome: "Reduce missed opportunities and convert more inquiries into booked appointments.",
  },
  {
    name: "AI Website + Funnel",
    price: "$1,000+",
    purpose: "A professional presence built around conversion.",
    color: "green",
    items: [
      "Website or landing page build",
      "Offer positioning",
      "Conversion-focused copy",
      "Lead form and CTA sections",
      "Basic SEO structure",
    ],
    outcome: "Create a modern business website that turns attention into leads.",
  },
  {
    name: "AI Content + Growth System",
    price: "$500/month",
    purpose: "Stay visible and generate demand through content.",
    color: "amber",
    items: [
      "Monthly content ideas",
      "Short-form video scripts",
      "LinkedIn/Instagram captions",
      "Blog repurposing",
      "Funnel updates and optimization",
    ],
    outcome: "Create consistent visibility and turn content into inbound interest.",
  },
];

const colorMap: Record<string, { border: string; badge: string; glow: string; dot: string }> = {
  blue:   { border: "border-blue-500/20",   badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",   glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.08)]",   dot: "bg-blue-400" },
  purple: { border: "border-purple-500/20", badge: "bg-purple-500/10 text-purple-400 border-purple-500/20", glow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]", dot: "bg-purple-400" },
  green:  { border: "border-green-500/20",  badge: "bg-green-500/10 text-green-400 border-green-500/20",  glow: "hover:shadow-[0_0_30px_rgba(34,197,94,0.08)]",   dot: "bg-green-400" },
  amber:  { border: "border-amber-500/20",  badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",  glow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.08)]",  dot: "bg-amber-400" },
};

const problems = [
  { label: "01", title: "Leads are slipping through the cracks", desc: "Inquiries come in through forms, DMs, and calls — and there's no system to capture, track, or follow up with all of them." },
  { label: "02", title: "Response times are too slow", desc: "Most businesses take hours or days to respond. By then, the prospect has moved on. Speed wins more deals than anything else." },
  { label: "03", title: "Websites don't convert", desc: "Most business websites look fine but aren't built to generate leads. No clear offer, no strong CTA, no follow-up path." },
  { label: "04", title: "There's no follow-up system", desc: "One email and done. Most businesses never follow up more than once — even though most sales happen after multiple touchpoints." },
  { label: "05", title: "Leads aren't being tracked", desc: "Without a CRM or pipeline, there's no visibility into who's interested, what stage they're at, or what they need next." },
];

const steps = [
  { step: "01", title: "Audit Your Current Setup", desc: "We review your website, lead flow, and follow-up process to identify where you're losing leads right now." },
  { step: "02", title: "Build Your AI System", desc: "I build the right combination of tools for your business — landing page, chatbot, CRM, automations, or content system." },
  { step: "03", title: "Launch and Test", desc: "We go live, test every touchpoint, and make sure leads are being captured and followed up with correctly." },
  { step: "04", title: "Optimize for More Conversions", desc: "After launch, we monitor results and optimize your system to keep improving lead quality and conversion rate." },
];

export default function AISystemsPage() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] font-sans text-[#F9FAFB]">

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#0B0F1A]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image src="/brand/logo.svg" alt="Digital Wealth Transfer" width={180} height={37} priority unoptimized style={{ height: "auto" }} />
          </Link>
          <div className="hidden sm:flex items-center gap-2">
            <Link href="/directory" className="text-sm text-[#A1A1AA] hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
              Directory
            </Link>
            <Link href="/blog" className="text-sm text-[#A1A1AA] hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
              Blog
            </Link>
            <Link
              href="#get-started"
              className="ml-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              Get My System
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-[300px] h-[300px] bg-purple-600/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-7 tracking-wide">
            AI Revenue Systems · Las Vegas & Nationwide
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.06] tracking-tight mb-6">
            Turn Your Business Into a<br />
            <span className="text-blue-400">Lead-Generating Machine</span>
          </h1>
          <p className="text-xl text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto mb-10">
            I build AI-powered systems that help you capture, qualify, and convert more customers —
            using automation, chatbots, funnels, websites, CRM workflows, and content systems.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link
              href="#get-started"
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-blue-500 transition-colors text-center shadow-[0_0_30px_rgba(59,130,246,0.35)]"
            >
              Get My System →
            </Link>
            <Link
              href="#how-it-works"
              className="w-full sm:w-auto border border-white/[0.12] bg-white/[0.04] text-[#F9FAFB] px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-white/[0.08] transition-colors text-center"
            >
              Book Free Audit
            </Link>
          </div>
          <p className="text-sm text-[#A1A1AA]/60">Free consultation · Response within 24 hours · No pressure</p>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="border-y border-white/[0.06] bg-[#111827] py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { value: "$500–$1,500+", label: "System pricing" },
            { value: "24 Hours", label: "Response guaranteed" },
            { value: "4 Core Systems", label: "For any business type" },
            { value: "Human-Built", label: "No templates, no shortcuts" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-lg font-bold text-white mb-1">{value}</p>
              <p className="text-sm text-[#A1A1AA]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3.5 py-1.5 rounded-full mb-5">
              The Problem
            </span>
            <h2 className="text-4xl font-bold text-white tracking-tight mb-5">
              Most businesses don&apos;t need more traffic first
            </h2>
            <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
              They need a better system to capture, qualify, and follow up with the leads they already get.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {problems.map(({ label, title, desc }) => (
              <div key={label} className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-6 hover:border-rose-500/20 transition-all">
                <span className="text-[11px] font-bold text-rose-500/40 uppercase tracking-widest mb-3 block">{label}</span>
                <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="bg-[#111827] border-y border-white/[0.06] py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-5">
            The Solution
          </span>
          <h2 className="text-4xl font-bold text-white tracking-tight mb-5">
            AI Revenue Systems
          </h2>
          <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto mb-14 leading-relaxed">
            A complete end-to-end system built around your business — so every lead gets captured, every prospect gets followed up with, and every opportunity gets tracked.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-0">
            {["Capture", "Engage", "Qualify", "Convert", "Track"].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-3">
                <div className="bg-[#151B2D] border border-blue-500/20 rounded-2xl px-6 py-4 text-center min-w-[100px]">
                  <p className="text-white font-bold text-sm">{step}</p>
                </div>
                {i < arr.length - 1 && (
                  <span className="text-blue-500/40 font-bold text-lg hidden sm:block">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Stack */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
              Pick your system
            </h2>
            <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto">
              Every system is built custom for your business. No templates. No shortcuts.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {offers.map((offer) => {
              const c = colorMap[offer.color];
              return (
                <div key={offer.name} className={`bg-[#151B2D] border ${c.border} rounded-2xl p-7 ${c.glow} transition-all`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className={`inline-block text-[11px] font-bold uppercase tracking-widest border px-2.5 py-1 rounded-full mb-3 ${c.badge}`}>
                        {offer.price}
                      </span>
                      <h3 className="text-lg font-bold text-white">{offer.name}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-[#A1A1AA] mb-5 leading-relaxed">{offer.purpose}</p>
                  <ul className="space-y-2 mb-6">
                    {offer.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-[#A1A1AA]">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className={`border-t ${c.border} pt-4`}>
                    <p className="text-xs text-[#A1A1AA]/60 leading-relaxed">
                      <span className="text-white/60 font-semibold">Outcome:</span> {offer.outcome}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-[#A1A1AA] mt-8">
            Not sure which system is right for you?{" "}
            <Link href="#get-started" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">
              Get a free audit →
            </Link>
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-[#111827] border-y border-white/[0.06] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-5">
              How It Works
            </span>
            <h2 className="text-4xl font-bold text-white tracking-tight">
              From audit to live system in days
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-6 hover:border-blue-500/20 transition-all">
                <span className="text-3xl font-black text-white/10 leading-none block mb-4 select-none">{step}</span>
                <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
            Built for local businesses
          </h2>
          <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto mb-12">
            If you have customers and you want more of them, this system works for you.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Med Spas", "Real Estate Agents", "Home Service Businesses", "Roofers",
              "Solar Companies", "Insurance Agents", "Law Firms", "Fitness Coaches",
              "Business Consultants", "Web3 & AI Providers", "Local Service Businesses",
            ].map((type) => (
              <span key={type} className="bg-white/[0.04] border border-white/[0.08] text-[#A1A1AA] text-sm px-4 py-2 rounded-full">
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section id="get-started" className="bg-[#111827] border-t border-white/[0.06] py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-5">
              Get Started
            </span>
            <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
              Want more leads without hiring more staff?
            </h2>
            <p className="text-lg text-[#A1A1AA]">
              Let&apos;s build your AI system. Fill out the form and I&apos;ll follow up personally within 24 hours.
            </p>
          </div>
          <div className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-8">
            <AILeadForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#0B0F1A] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <Link href="/">
              <Image src="/brand/logo.svg" alt="Digital Wealth Transfer" width={160} height={33} unoptimized style={{ height: "auto" }} />
            </Link>
            <p className="text-xs text-[#A1A1AA]/60 mt-1">© 2025 Jonathan Cardona · Las Vegas, Nevada</p>
          </div>
          <div className="flex items-center gap-5 text-sm text-[#A1A1AA]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/directory" className="hover:text-white transition-colors">Directory</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <a href="https://www.linkedin.com/in/jonathan-cardona-1089291b9" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              LinkedIn →
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
