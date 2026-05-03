import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Request Received — Lumbre Bakery",
  description: "Your custom cake request has been received. We'll be in touch within 24 hours.",
};

export default function LumbreThankYouPage() {
  return (
    <div className="min-h-screen bg-[#0C0906] font-sans text-[#FDF8F0] flex items-center justify-center px-6">
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-amber-600/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9 text-amber-400">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <span className="inline-block text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full mb-6 tracking-wide">
          Request Received
        </span>

        <h1 className="text-4xl font-bold text-[#FDF8F0] tracking-tight mb-4">
          We&apos;ve got your order!
        </h1>
        <p className="text-white/50 leading-relaxed mb-8">
          Thanks for reaching out to Lumbre Bakery. We&apos;ll review your request and follow up within <span className="text-white/70 font-semibold">24 hours</span> with a personalized quote and next steps.
        </p>

        {/* What's next */}
        <div className="bg-[#15100A] border border-white/[0.08] rounded-2xl p-6 text-left mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">What happens next</p>
          <div className="flex flex-col gap-4">
            {[
              { step: "01", text: "We review your request and check availability for your date" },
              { step: "02", text: "You receive a personalized quote and design consultation" },
              { step: "03", text: "We start baking — and deliver something amazing" },
            ].map(({ step, text }) => (
              <div key={step} className="flex gap-4">
                <span className="text-2xl font-black text-white/10 leading-none shrink-0 select-none">{step}</span>
                <p className="text-white/50 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/lumbre-demo"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-[#0C0906] px-7 py-3 rounded-xl font-bold text-sm transition-colors shadow-[0_0_20px_rgba(245,158,11,0.3)]"
          >
            Back to Lumbre Bakery
          </Link>
          <Link
            href="/"
            className="inline-block bg-white/[0.06] hover:bg-white/10 border border-white/[0.08] text-white/60 hover:text-white px-7 py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            Digital Wealth Transfer →
          </Link>
        </div>

        <p className="text-xs text-white/20 mt-8">
          Lumbre Bakery · Las Vegas, NV
        </p>
      </div>
    </div>
  );
}
