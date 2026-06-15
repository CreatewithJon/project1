"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 900ms ease-out ${delay}ms, transform 900ms ease-out ${delay}ms`,
  });

  return (
    <section className="relative min-h-screen flex items-center pt-16 px-6 overflow-hidden">

      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 5% 85%, rgba(59,130,246,0.07) 0%, transparent 60%), " +
            "radial-gradient(ellipse 55% 45% at 85% 15%, rgba(139,92,246,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto w-full grid lg:grid-cols-[1fr_400px] gap-12 xl:gap-20 items-center py-20">

        {/* Left: Editorial text */}
        <div>
          <div style={fadeUp(0)}>
            <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.24em] text-white/20 mb-8">
              Media · Education · Research
            </span>
          </div>

          <div style={fadeUp(160)}>
            <h1
              className="font-bold text-white leading-[1.02] tracking-[-0.03em] mb-8"
              style={{ fontSize: "clamp(52px, 7.5vw, 92px)" }}
            >
              Something
              <br />
              fundamental
              <br />
              is changing.
            </h1>
          </div>

          <div style={fadeUp(360)}>
            <p className="text-lg sm:text-xl text-white/40 leading-relaxed max-w-md mb-12">
              Technology, AI, and ownership are being redefined.
              Digital Wealth Transfer documents the transition.
            </p>
          </div>

          <div style={fadeUp(560)} className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Link
              href="/blog"
              className="text-sm font-semibold text-white/75 hover:text-white transition-colors duration-200 border-b border-white/20 hover:border-white/50 pb-px"
            >
              Start reading →
            </Link>
            <Link
              href="#newsletter"
              className="text-sm text-white/25 hover:text-white/50 transition-colors duration-200"
            >
              Subscribe to the signal ↓
            </Link>
          </div>
        </div>

        {/* Right: Portrait placeholder */}
        <div style={fadeUp(260)} className="hidden lg:block">
          <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{
              aspectRatio: "3/4",
              background: "linear-gradient(160deg, #0F1520 0%, #090D16 100%)",
              border: "1px solid rgba(255,255,255,0.055)",
            }}
          >
            {/* Subtle inner glow at bottom */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(59,130,246,0.07) 0%, transparent 70%)",
              }}
            />
            {/* Placeholder label */}
            <div className="absolute bottom-5 left-5">
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/12">
                Portrait
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={fadeUp(900)}
      >
        <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/18">
          Scroll
        </span>
        <div
          className="w-px h-7"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)",
          }}
        />
      </div>
    </section>
  );
}
