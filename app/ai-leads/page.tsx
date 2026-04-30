import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import OfferLeadForm from "@/components/OfferLeadForm";

export const metadata: Metadata = {
  title: "AI Lead System — Turn AI Into a Lead Generation Machine",
  description:
    "We help you capture, follow up, and convert leads automatically using AI-powered systems. Stop missing leads. Start closing more deals.",
};

export default function AILeadsPage() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] font-sans text-[#F9FAFB]">

      {/* Minimal Nav */}
      <nav className="sticky top-0 z-50 bg-[#0B0F1A]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/">
            <Image src="/brand/logo.svg" alt="Digital Wealth Transfer" width={160} height={33} priority unoptimized style={{ height: "auto" }} />
          </Link>
          <Link href="#get-started" className="bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-purple-500 transition-colors shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            Get My Lead System
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-blue-600/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <span className="inline-block text-xs font-semibold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3.5 py-1.5 rounded-full mb-7 tracking-wide">
            AI Lead System · Digital Wealth Transfer
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.06] tracking-tight mb-5">
            Turn AI Into a<br />
            <span className="text-purple-400">Lead Generation Machine</span>
          </h1>
          <p className="text-xl text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto mb-10">
            We help you capture, follow up, and convert leads automatically using AI-powered systems — so you stop missing opportunities and start closing more deals.
          </p>
          <Link
            href="#get-started"
            className="inline-block bg-purple-600 text-white px-9 py-4 rounded-xl font-bold text-base hover:bg-purple-500 transition-colors shadow-[0_0_35px_rgba(139,92,246,0.4)]"
          >
            Get My AI Lead System →
          </Link>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-6 bg-[#111827] border-y border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3.5 py-1.5 rounded-full mb-5">The Problem</span>
            <h2 className="text-3xl font-bold text-white tracking-tight mb-4">Most businesses are leaking leads every single day</h2>
            <p className="text-[#A1A1AA] leading-relaxed">If you don&apos;t have a system, you&apos;re losing leads to businesses that do.</p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { n: "01", t: "Leads come in and disappear", d: "Inquiries hit your inbox, DMs, or forms — and if you don't respond fast, they move on to a competitor." },
              { n: "02", t: "No follow-up system", d: "Most businesses follow up once, maybe twice. The majority of deals close after 5+ touchpoints." },
              { n: "03", t: "Outdated or missing CRM", d: "Without a proper lead pipeline, you have no visibility into who's interested or where they are in the process." },
            ].map(({ n, t, d }) => (
              <div key={n} className="bg-[#151B2D] border border-white/[0.08] rounded-2xl px-6 py-5 flex gap-4">
                <span className="text-[11px] font-bold text-rose-500/50 uppercase tracking-widest shrink-0 mt-0.5">{n}</span>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">{t}</p>
                  <p className="text-[#A1A1AA] text-sm leading-relaxed">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3.5 py-1.5 rounded-full mb-5">The Solution</span>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-5">A simple system that captures and follows up automatically</h2>
          <p className="text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto">
            We set up a lightweight AI-powered lead system that captures every inquiry, sends instant follow-ups, and keeps your pipeline organized — so no lead falls through the cracks.
          </p>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 px-6 bg-[#111827] border-y border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3.5 py-1.5 rounded-full mb-5">What You Get</span>
            <h2 className="text-3xl font-bold text-white tracking-tight">Everything you need to capture and convert leads</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Landing Page / Lead Form Optimization", desc: "Make sure your existing page is built to capture leads — not just look good." },
              { title: "Lead Capture System", desc: "A simple intake form or chatbot that collects the right info from every prospect." },
              { title: "AI Follow-Up Setup", desc: "Automated first-response and follow-up messages that go out instantly." },
              { title: "Lead Flow Setup", desc: "Your form connects to your CRM or email so every lead gets organized automatically." },
              { title: "Pipeline Visibility", desc: "Know exactly who's in your pipeline, what stage they're at, and what to do next." },
              { title: "Strategy Breakdown", desc: "A clear overview of your system so you understand every step of the process." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-[#151B2D] border border-purple-500/15 rounded-2xl p-5 flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                <div>
                  <p className="text-white font-semibold text-sm mb-1">{title}</p>
                  <p className="text-[#A1A1AA] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3.5 py-1.5 rounded-full mb-5">How It Works</span>
            <h2 className="text-3xl font-bold text-white tracking-tight">From setup to leads in days</h2>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { step: "01", title: "Audit your current lead flow", desc: "We review how leads currently come in and where they're being lost in your process." },
              { step: "02", title: "Build your lead system", desc: "We set up your capture form, follow-up automation, and CRM connection." },
              { step: "03", title: "Launch and start capturing", desc: "Your system goes live. Every lead gets captured and followed up with automatically." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-6 flex gap-5 hover:border-purple-500/20 transition-all">
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
            <span className="inline-block text-xs font-semibold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3.5 py-1.5 rounded-full mb-5">Get Started</span>
            <h2 className="text-3xl font-bold text-white tracking-tight mb-4">Stop losing leads. Start closing more.</h2>
            <p className="text-[#A1A1AA]">Fill out the form and I&apos;ll follow up within 24 hours to build your lead system.</p>
          </div>
          <div className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-8">
            <OfferLeadForm service="AI Lead System" companySlug="ai-leads" ctaLabel="Get My AI Lead System →" accentColor="purple" variant="ai-leads" sourcePage="/ai-leads" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#A1A1AA]/40">© 2025 Digital Wealth Transfer · Jonathan Cardona</p>
          <div className="flex items-center gap-5 text-sm text-[#A1A1AA]/60">
            <Link href="/ai-content" className="hover:text-white transition-colors">AI Content Engine →</Link>
            <Link href="/solutions" className="hover:text-white transition-colors">All Solutions →</Link>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
