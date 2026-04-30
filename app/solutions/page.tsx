import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import OfferLeadForm from "@/components/OfferLeadForm";

export const metadata: Metadata = {
  title: "AI Growth Systems — Digital Wealth Transfer",
  description:
    "Choose the AI system that fits your business: AI Content Engine, AI Lead System, or the complete AI Growth System. Built for modern businesses.",
};

const offers = [
  {
    label: "Traffic",
    name: "AI Content Engine",
    tagline: "Stay visible without spending hours creating content.",
    desc: "We build a content system that turns one idea into a week of posts — scripts, captions, hooks, and more.",
    items: ["Content system setup", "Brand voice prompt", "30-day content calendar", "Scripts & captions", "Repurposing workflow"],
    cta: "Learn More →",
    href: "/ai-content",
    border: "border-blue-500/20",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    dot: "bg-blue-400",
    glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.08)]",
    btnClass: "bg-blue-600/10 text-blue-400 border border-blue-500/20 hover:bg-blue-600 hover:text-white",
  },
  {
    label: "Conversion",
    name: "AI Lead System",
    tagline: "Capture, follow up, and convert leads automatically.",
    desc: "We set up a lightweight AI lead system that captures every inquiry and follows up automatically — so no lead falls through the cracks.",
    items: ["Lead capture form / landing page", "AI follow-up automation", "CRM connection", "Pipeline setup", "Strategy breakdown"],
    cta: "Learn More →",
    href: "/ai-leads",
    border: "border-purple-500/20",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    dot: "bg-purple-400",
    glow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]",
    btnClass: "bg-purple-600/10 text-purple-400 border border-purple-500/20 hover:bg-purple-600 hover:text-white",
  },
  {
    label: "Complete Package",
    name: "AI Growth System",
    tagline: "The full stack: content, leads, and automation working together.",
    desc: "Content that brings people in, leads that get captured, and follow-up that closes — all in one system built for your business.",
    items: ["Everything in AI Content Engine", "Everything in AI Lead System", "Unified content + lead strategy", "Cross-channel automation", "Full strategy breakdown"],
    cta: "Get My AI Growth System →",
    href: "#get-started",
    border: "border-white/[0.12]",
    badge: "bg-white/[0.06] text-white border-white/[0.12]",
    dot: "bg-white/60",
    glow: "hover:shadow-[0_0_30px_rgba(255,255,255,0.04)]",
    btnClass: "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]",
  },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] font-sans text-[#F9FAFB]">

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#0B0F1A]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/">
            <Image src="/brand/logo.svg" alt="Digital Wealth Transfer" width={160} height={33} priority unoptimized style={{ height: "auto" }} />
          </Link>
          <Link href="#get-started" className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            Get My AI Strategy
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-10 right-1/3 w-[300px] h-[200px] bg-purple-600/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-7 tracking-wide">
            Digital Wealth Transfer · Full Offer Stack
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.06] tracking-tight mb-5">
            AI Systems for<br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Modern Businesses</span>
          </h1>
          <p className="text-xl text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto mb-10">
            Attract more customers, capture every lead, and grow your revenue using AI — without the complexity.
          </p>
        </div>
      </section>

      {/* Three Offers */}
      <section className="py-20 px-6 bg-[#111827] border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6">
            {offers.map((o) => (
              <div key={o.name} className={`bg-[#151B2D] border ${o.border} rounded-2xl p-7 ${o.glow} transition-all flex flex-col`}>
                <span className={`inline-block text-[11px] font-bold uppercase tracking-widest border px-2.5 py-1 rounded-full mb-4 ${o.badge}`}>
                  {o.label}
                </span>
                <h2 className="text-lg font-bold text-white mb-2">{o.name}</h2>
                <p className="text-[#A1A1AA] text-sm font-medium mb-3">{o.tagline}</p>
                <p className="text-[#A1A1AA] text-sm leading-relaxed mb-5">{o.desc}</p>
                <ul className="space-y-2 mb-7 flex-1">
                  {o.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-[#A1A1AA]">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${o.dot}`} />{item}
                    </li>
                  ))}
                </ul>
                <Link href={o.href} className={`inline-block text-sm font-bold px-5 py-3 rounded-xl text-center transition-colors ${o.btnClass}`}>
                  {o.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-5">How It Works</span>
            <h2 className="text-3xl font-bold text-white tracking-tight">Simple process. Real results.</h2>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { step: "01", title: "Tell me about your business", desc: "Fill out a quick form. I'll learn what you do, who you serve, and what you need." },
              { step: "02", title: "I build your system", desc: "Whether it's content, leads, or both — I build your AI-powered system in days, not weeks." },
              { step: "03", title: "You grow on autopilot", desc: "Your content goes out, your leads get captured, and your follow-up runs automatically." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-6 flex gap-5">
                <span className="text-3xl font-black text-white/10 leading-none shrink-0 select-none">{step}</span>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1.5">{title}</h3>
                  <p className="text-[#A1A1AA] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Form */}
      <section id="get-started" className="bg-[#111827] border-t border-white/[0.06] py-20 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-4">Not sure which system you need?</h2>
            <p className="text-[#A1A1AA]">Tell me about your business. I&apos;ll recommend the right solution and follow up personally within 24 hours.</p>
          </div>
          <div className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-8">
            <OfferLeadForm service="AI Growth System" companySlug="solutions" ctaLabel="Get My AI Strategy →" accentColor="blue" sourcePage="/solutions" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#A1A1AA]/40">© 2025 Digital Wealth Transfer · Jonathan Cardona</p>
          <div className="flex items-center gap-5 text-sm text-[#A1A1AA]/60">
            <Link href="/ai-content" className="hover:text-white transition-colors">AI Content</Link>
            <Link href="/ai-leads" className="hover:text-white transition-colors">AI Leads</Link>
            <Link href="/partners" className="hover:text-white transition-colors">Partners</Link>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
