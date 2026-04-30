import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import OfferLeadForm from "@/components/OfferLeadForm";

export const metadata: Metadata = {
  title: "AI Content Engine — Create Content Faster & Attract More Customers",
  description:
    "We build AI-powered content systems that help you stay consistent, grow your audience, and generate inbound leads — without spending hours creating content.",
};

export default function AIContentPage() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] font-sans text-[#F9FAFB]">

      {/* Minimal Nav */}
      <nav className="sticky top-0 z-50 bg-[#0B0F1A]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/">
            <Image src="/brand/logo.svg" alt="Digital Wealth Transfer" width={160} height={33} priority unoptimized style={{ height: "auto" }} />
          </Link>
          <Link href="#get-started" className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            Get My Content System
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-7 tracking-wide">
            AI Content Engine · Digital Wealth Transfer
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.06] tracking-tight mb-5">
            Create Content Faster<br />
            <span className="text-blue-400">and Attract More Customers</span>
          </h1>
          <p className="text-xl text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto mb-10">
            We build simple AI-powered content systems that help you stay consistent, grow your audience, and generate inbound leads — without spending hours creating content every week.
          </p>
          <Link
            href="#get-started"
            className="inline-block bg-blue-600 text-white px-9 py-4 rounded-xl font-bold text-base hover:bg-blue-500 transition-colors shadow-[0_0_35px_rgba(59,130,246,0.4)]"
          >
            Get My Content System →
          </Link>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-6 bg-[#111827] border-y border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3.5 py-1.5 rounded-full mb-5">The Problem</span>
            <h2 className="text-3xl font-bold text-white tracking-tight mb-4">Content kills most businesses before they even start</h2>
            <p className="text-[#A1A1AA] leading-relaxed">Most businesses know they need to post consistently — but they never do. Here&apos;s why:</p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { n: "01", t: "No system, no consistency", d: "Posting feels random and stressful. Without a system, content gets skipped whenever things get busy." },
              { n: "02", t: "Running out of ideas", d: "Most business owners don't know what to post. They overthink it and end up posting nothing." },
              { n: "03", t: "Takes too long", d: "Writing captions, scripts, and blog posts from scratch eats hours you don't have." },
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
          <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-5">The Solution</span>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-5">One idea. Multiple pieces of content. Done.</h2>
          <p className="text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto">
            We build you a simple AI content system that turns one idea into a week&apos;s worth of content — captions, scripts, hooks, and posts — in a fraction of the time.
          </p>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 px-6 bg-[#111827] border-y border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-5">What You Get</span>
            <h2 className="text-3xl font-bold text-white tracking-tight">Everything you need to show up consistently</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Content System Setup", desc: "A complete workflow so content creation becomes fast and repeatable." },
              { title: "Brand Voice Prompt", desc: "A custom AI prompt trained on your tone, audience, and style." },
              { title: "Content Calendar", desc: "A 30-day content plan with themes, topics, and posting schedule." },
              { title: "10–30 Content Ideas", desc: "Enough ideas to post for weeks without ever running dry." },
              { title: "Scripts & Captions", desc: "Ready-to-use short-form video scripts and social media captions." },
              { title: "Repurposing Workflow", desc: "Turn one piece of content into multiple formats automatically." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-[#151B2D] border border-blue-500/15 rounded-2xl p-5 flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-2" />
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
            <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-5">How It Works</span>
            <h2 className="text-3xl font-bold text-white tracking-tight">Up and running in days</h2>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { step: "01", title: "Tell me about your business", desc: "We start with a quick intake form to understand your audience, offer, and content goals." },
              { step: "02", title: "We build your content system", desc: "I set up your brand voice, content calendar, idea bank, and repurposing workflow." },
              { step: "03", title: "You post with confidence", desc: "Use the system to create content in minutes instead of hours — and stay consistent every week." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-6 flex gap-5 hover:border-blue-500/20 transition-all">
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
            <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-5">Get Started</span>
            <h2 className="text-3xl font-bold text-white tracking-tight mb-4">Ready to stop winging it?</h2>
            <p className="text-[#A1A1AA]">Fill out the form and I&apos;ll follow up within 24 hours to get your content system built.</p>
          </div>
          <div className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-8">
            <OfferLeadForm service="AI Content Engine" companySlug="ai-content" ctaLabel="Get My Content System →" accentColor="blue" variant="ai-content" sourcePage="/ai-content" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#A1A1AA]/40">© 2025 Digital Wealth Transfer · Jonathan Cardona</p>
          <div className="flex items-center gap-5 text-sm text-[#A1A1AA]/60">
            <Link href="/ai-leads" className="hover:text-white transition-colors">AI Lead System →</Link>
            <Link href="/solutions" className="hover:text-white transition-colors">All Solutions →</Link>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
