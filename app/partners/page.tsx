import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import OfferLeadForm from "@/components/OfferLeadForm";

export const metadata: Metadata = {
  title: "Partner With Us — Digital Wealth Transfer",
  description:
    "Agencies and consultants: partner with Digital Wealth Transfer to deliver AI systems to your clients. White-label, referral, and co-delivery options available.",
};

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] font-sans text-[#F9FAFB]">

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#0B0F1A]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/">
            <Image src="/brand/logo.svg" alt="Digital Wealth Transfer" width={160} height={33} priority unoptimized style={{ height: "auto" }} />
          </Link>
          <Link href="#apply" className="bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-green-500 transition-colors shadow-[0_0_20px_rgba(34,197,94,0.3)]">
            Apply to Partner
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-green-600/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-10 left-1/4 w-[300px] h-[200px] bg-blue-600/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <span className="inline-block text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/20 px-3.5 py-1.5 rounded-full mb-7 tracking-wide">
            Partner Program · Digital Wealth Transfer
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.06] tracking-tight mb-5">
            Grow Your Agency<br />
            <span className="text-green-400">With AI-Powered Systems</span>
          </h1>
          <p className="text-xl text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto mb-10">
            Are you an agency, consultant, or freelancer who wants to offer AI systems to your clients — without building everything from scratch? Let&apos;s work together.
          </p>
          <Link
            href="#apply"
            className="inline-block bg-green-600 text-white px-9 py-4 rounded-xl font-bold text-base hover:bg-green-500 transition-colors shadow-[0_0_35px_rgba(34,197,94,0.4)]"
          >
            Apply to Partner →
          </Link>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-20 px-6 bg-[#111827] border-y border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/20 px-3.5 py-1.5 rounded-full mb-5">Why Partner</span>
            <h2 className="text-3xl font-bold text-white tracking-tight mb-4">Your clients need AI. You need delivery.</h2>
            <p className="text-[#A1A1AA] leading-relaxed">Most agencies know AI is the future — but building it yourself takes time, expertise, and trial and error you don&apos;t have.</p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { n: "01", t: "Add AI services without the overhead", d: "Offer AI content systems and lead automation under your own brand — without hiring developers or learning new tech stacks." },
              { n: "02", t: "Increase revenue per client", d: "Add high-value AI deliverables to your existing packages and charge more for the same clients you already have." },
              { n: "03", t: "Deliver results faster", d: "We do the build. You manage the relationship. Your clients get faster outcomes and you look like a hero." },
            ].map(({ n, t, d }) => (
              <div key={n} className="bg-[#151B2D] border border-white/[0.08] rounded-2xl px-6 py-5 flex gap-4">
                <span className="text-[11px] font-bold text-green-500/50 uppercase tracking-widest shrink-0 mt-0.5">{n}</span>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">{t}</p>
                  <p className="text-[#A1A1AA] text-sm leading-relaxed">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Models */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/20 px-3.5 py-1.5 rounded-full mb-5">How We Work Together</span>
            <h2 className="text-3xl font-bold text-white tracking-tight">Flexible partnership models</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                title: "Referral Partner",
                desc: "Send us qualified clients and earn a referral fee. Zero delivery work required — just the introduction.",
                icon: "→",
                color: "border-green-500/15",
                dot: "bg-green-400",
              },
              {
                title: "Co-Delivery",
                desc: "You manage the client relationship, we build and deliver the AI systems together under a shared strategy.",
                icon: "⇄",
                color: "border-blue-500/15",
                dot: "bg-blue-400",
              },
              {
                title: "White-Label",
                desc: "We build under your brand. Your clients see your name. You set the price and keep the margin.",
                icon: "◆",
                color: "border-purple-500/15",
                dot: "bg-purple-400",
              },
            ].map(({ title, desc, icon, color, dot }) => (
              <div key={title} className={`bg-[#151B2D] border ${color} rounded-2xl p-6 flex flex-col`}>
                <span className="text-2xl mb-4 text-white/20 font-mono">{icon}</span>
                <h3 className="text-white font-bold text-sm mb-2">{title}</h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed flex-1">{desc}</p>
                <div className={`w-1.5 h-1.5 rounded-full ${dot} mt-5`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-20 px-6 bg-[#111827] border-y border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/20 px-3.5 py-1.5 rounded-full mb-5">Who This Is For</span>
            <h2 className="text-3xl font-bold text-white tracking-tight">Built for growth-focused professionals</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Marketing agencies looking to add AI services",
              "Social media managers who want to offer more",
              "Business consultants serving SMBs",
              "Web designers / developers expanding scope",
              "Sales consultants focused on lead generation",
              "Coaches and course creators with client audiences",
            ].map((item) => (
              <div key={item} className="bg-[#151B2D] border border-white/[0.08] rounded-xl px-5 py-4 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                <p className="text-[#A1A1AA] text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="bg-[#0B0F1A] border-t border-white/[0.06] py-20 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/20 px-3.5 py-1.5 rounded-full mb-5">Apply to Partner</span>
            <h2 className="text-3xl font-bold text-white tracking-tight mb-4">Let&apos;s build something together</h2>
            <p className="text-[#A1A1AA]">Tell me about your business and what you&apos;re looking for. I&apos;ll follow up within 24 hours.</p>
          </div>
          <div className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-8">
            <OfferLeadForm
              service="Partner Application"
              companySlug="partners"
              ctaLabel="Apply to Partner →"
              accentColor="green"
              variant="partners"
              sourcePage="/partners"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#A1A1AA]/40">© 2025 Digital Wealth Transfer · Jonathan Cardona</p>
          <div className="flex items-center gap-5 text-sm text-[#A1A1AA]/60">
            <Link href="/solutions" className="hover:text-white transition-colors">All Solutions</Link>
            <Link href="/ai-content" className="hover:text-white transition-colors">AI Content</Link>
            <Link href="/ai-leads" className="hover:text-white transition-colors">AI Leads</Link>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
