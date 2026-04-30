import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Jonathan Cardona — Digital Wealth Transfer",
  description:
    "I help businesses generate leads, create content, and connect with the right tech partners using AI systems.",
};

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] font-sans text-[#F9FAFB]">
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-sm mx-auto px-4 pt-12 pb-16">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#151B2D] border border-white/[0.08] flex items-center justify-center p-3">
            <Image
              src="/brand/logo.svg"
              alt="Digital Wealth Transfer"
              width={44}
              height={44}
              unoptimized
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <h1 className="text-2xl font-bold text-white leading-tight mb-2">
            Get More Customers<br />Using AI
          </h1>
          <p className="text-sm text-[#A1A1AA] leading-relaxed mb-3">
            I help businesses generate leads, create content, and connect with the right tech partners.
          </p>
          <p className="text-[11px] font-semibold tracking-widest uppercase text-[#A1A1AA]/40">
            Las Vegas · AI + Automation + Growth Systems
          </p>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-col gap-3 mb-8">
          <Link
            href="/ai-leads"
            className="block w-full bg-blue-600 hover:bg-blue-500 rounded-2xl px-5 py-4 transition-all shadow-[0_0_30px_rgba(59,130,246,0.35)] active:scale-[0.98]"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-white font-bold text-base leading-tight">🚀 I Need More Customers</p>
                <p className="text-white/60 text-xs mt-0.5">Get qualified leads using AI systems</p>
              </div>
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0 text-white/50">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>

          <Link
            href="/ai-content"
            className="block w-full bg-purple-600 hover:bg-purple-500 rounded-2xl px-5 py-4 transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)] active:scale-[0.98]"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-white font-bold text-base leading-tight">📉 I Struggle With Content</p>
                <p className="text-white/60 text-xs mt-0.5">Turn ideas into posts, reels, and content automatically</p>
              </div>
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0 text-white/50">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>

          <Link
            href="/solutions"
            className="block w-full bg-[#151B2D] border border-white/[0.15] hover:border-white/30 rounded-2xl px-5 py-4 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-white font-bold text-base leading-tight">🤔 Not Sure What I Need?</p>
                <p className="text-[#A1A1AA] text-xs mt-0.5">We&apos;ll help you figure it out quickly</p>
              </div>
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0 text-white/30">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[11px] text-[#A1A1AA]/30 uppercase tracking-widest">More</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        {/* Secondary */}
        <div className="flex flex-col gap-2.5 mb-8">
          <Link
            href="/partners"
            className="block w-full bg-[#151B2D] border border-green-500/20 hover:border-green-500/40 rounded-xl px-5 py-3.5 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-white font-semibold text-sm">🤝 Get Clients for Your Agency</p>
                <p className="text-[#A1A1AA] text-xs mt-0.5">White-label, referral, and co-delivery options</p>
              </div>
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0 text-white/20">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>

          <Link
            href="/directory"
            className="block w-full bg-[#151B2D] border border-white/[0.08] hover:border-white/20 rounded-xl px-5 py-3.5 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-white font-semibold text-sm">📊 Browse AI & Tech Companies</p>
                <p className="text-[#A1A1AA] text-xs mt-0.5">Find vetted partners in Las Vegas</p>
              </div>
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0 text-white/20">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-white/[0.04]" />
          <span className="text-[11px] text-[#A1A1AA]/20 uppercase tracking-widest">Connect</span>
          <div className="flex-1 h-px bg-white/[0.04]" />
        </div>

        {/* Authority / Tertiary */}
        <div className="flex flex-col gap-2">
          <Link
            href="/blog"
            className="block w-full bg-transparent border border-white/[0.06] hover:border-white/[0.12] rounded-xl px-5 py-3 transition-all active:scale-[0.98]"
          >
            <p className="text-[#A1A1AA] hover:text-white text-sm font-medium transition-colors">
              🧠 Learn AI, Bitcoin & Business
            </p>
          </Link>

          <a
            href="https://www.instagram.com/crypto.papi"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-transparent border border-white/[0.06] hover:border-white/[0.12] rounded-xl px-5 py-3 transition-all active:scale-[0.98]"
          >
            <p className="text-[#A1A1AA] hover:text-white text-sm font-medium transition-colors">
              🎥 Follow Me (@crypto.papi)
            </p>
          </a>

          <Link
            href="/solutions#get-started"
            className="block w-full bg-transparent border border-white/[0.06] hover:border-white/[0.12] rounded-xl px-5 py-3 transition-all active:scale-[0.98]"
          >
            <p className="text-[#A1A1AA] hover:text-white text-sm font-medium transition-colors">
              📩 Contact / Work With Me
            </p>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-[11px] text-[#A1A1AA]/20 text-center mt-12">
          © 2025 Digital Wealth Transfer · Jonathan Cardona
        </p>
      </div>
    </div>
  );
}
