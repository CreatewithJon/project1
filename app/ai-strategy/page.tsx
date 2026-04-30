import type { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Solution from "@/components/landing/Solution";
import Steps from "@/components/landing/Steps";
import CTAForm from "@/components/landing/CTAForm";

export const metadata: Metadata = {
  title: "Get Your Free AI Strategy — Digital Wealth Transfer",
  description:
    "We help businesses generate more leads, automate operations, and grow using AI — without the guesswork. Get your free AI strategy today.",
};

export default function AIStrategyPage() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] font-sans text-[#F9FAFB]">
      <Hero />
      <Problem />
      <Solution />
      <Steps />

      {/* CTA + Form */}
      <section id="get-started" className="bg-[#111827] border-t border-white/[0.06] py-24 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-5 tracking-wide">
              Free Strategy Session
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Get Your Custom AI Strategy
            </h2>
            <p className="text-[#A1A1AA]">
              Tell us about your business. We&apos;ll follow up personally within 24 hours with a plan built for you.
            </p>
          </div>
          <div className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-8">
            <CTAForm />
          </div>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="border-t border-white/[0.06] py-8 px-6 text-center">
        <p className="text-xs text-[#A1A1AA]/40">
          © 2025 Digital Wealth Transfer · Jonathan Cardona · Las Vegas, Nevada
        </p>
      </footer>
    </div>
  );
}
