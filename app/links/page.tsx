import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Jonathan Cardona — Digital Wealth Transfer",
  description:
    "I build AI systems that help local businesses capture leads, follow up automatically, and grow revenue. Based in Las Vegas.",
};

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] font-sans text-[#F9FAFB]">
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-sm mx-auto px-4 pt-12 pb-16">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="mx-auto mb-5" style={{ filter: "drop-shadow(0 0 18px rgba(59,130,246,0.25)) drop-shadow(0 0 40px rgba(139,92,246,0.12))" }}>
            <Image
              src="/brand/logo.svg"
              alt="Digital Wealth Transfer"
              width={200}
              height={42}
              priority
              unoptimized
              className="mx-auto w-[160px] sm:w-[200px]"
              style={{ height: "auto" }}
            />
          </div>
          <h1 className="text-2xl font-bold text-white leading-tight mb-2">
            Jonathan Cardona
          </h1>
          <p className="text-sm text-[#A1A1AA] leading-relaxed mb-3">
            I build AI systems that help local businesses capture leads, follow up automatically, and close more customers.
          </p>
          <p className="text-[11px] font-semibold tracking-widest uppercase text-[#A1A1AA]/40">
            Las Vegas · AI Systems · Automation · Growth
          </p>
        </div>

        {/* Primary CTA */}
        <div className="flex flex-col gap-3 mb-8">
          <Link
            href="/ai-systems"
            className="block w-full bg-blue-600 hover:bg-blue-500 rounded-2xl px-5 py-4 transition-all shadow-[0_0_30px_rgba(59,130,246,0.35)] active:scale-[0.98]"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-white font-bold text-base leading-tight">Get a Free System Audit</p>
                <p className="text-white/60 text-xs mt-0.5">I&apos;ll show you exactly what I&apos;d build for your business</p>
              </div>
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0 text-white/50">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>

          <Link
            href="/ai-systems#offer"
            className="block w-full bg-[#151B2D] border border-white/[0.12] hover:border-white/25 rounded-2xl px-5 py-4 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-white font-bold text-base leading-tight">See What&apos;s Included</p>
                <p className="text-[#A1A1AA] text-xs mt-0.5">AI Lead Machine · Appointment Setter · Full System</p>
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
                <p className="text-white font-semibold text-sm">Partner With Me</p>
                <p className="text-[#A1A1AA] text-xs mt-0.5">Referral, white-label, and co-delivery options</p>
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
                <p className="text-white font-semibold text-sm">Browse AI & Tech Companies</p>
                <p className="text-[#A1A1AA] text-xs mt-0.5">Find vetted providers in Las Vegas</p>
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
              Learn AI, Bitcoin & Business
            </p>
          </Link>

          <a
            href="https://www.linkedin.com/in/jonathan-cardona-1089291b9"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-transparent border border-white/[0.06] hover:border-white/[0.12] rounded-xl px-5 py-3 transition-all active:scale-[0.98]"
          >
            <p className="text-[#A1A1AA] hover:text-white text-sm font-medium transition-colors">
              Connect on LinkedIn
            </p>
          </a>
        </div>

        {/* Footer */}
        <p className="text-[11px] text-[#A1A1AA]/20 text-center mt-12">
          © 2026 Digital Wealth Transfer · Jonathan Cardona
        </p>
      </div>
    </div>
  );
}
