"use client";

import RevealOnScroll from "./RevealOnScroll";

const journey = [
  { n: "01", text: "East LA raised" },
  { n: "02", text: "Sales · Banking · Customer support" },
  { n: "03", text: "Crypto education · Community building" },
  { n: "04", text: "Self-taught in AI, software, and automation" },
  { n: "05", text: "Building in Las Vegas" },
];

export default function NavigatorSection() {
  return (
    <section className="py-32 px-6" style={{ background: "#080C14" }}>
      <div className="max-w-4xl mx-auto">

        <RevealOnScroll>
          <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.24em] text-white/20 mb-8">
            The writer
          </span>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <h2
            className="font-bold text-white tracking-[-0.025em] leading-[1.08] mb-6"
            style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
          >
            This perspective
            <br />
            was earned.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <p className="text-base text-white/38 leading-relaxed max-w-lg mb-16">
            Not from a CS degree or a VC-backed startup. From navigating the same
            transition everyone else is navigating — just earlier, and on purpose.
          </p>
        </RevealOnScroll>

        {/* Journey */}
        <div className="mb-16">
          {journey.map(({ n, text }, i) => (
            <RevealOnScroll key={n} delay={i * 75}>
              <div
                className="flex items-center gap-7 py-5 group"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.045)" }}
              >
                <span className="text-[10px] font-bold text-white/14 w-5 shrink-0 tabular-nums">
                  {n}
                </span>
                <span className="text-lg sm:text-xl font-medium text-white/45 group-hover:text-white/75 transition-colors duration-300">
                  {text}
                </span>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={100}>
          <blockquote
            className="text-lg sm:text-xl text-white/60 leading-relaxed italic max-w-2xl pl-5"
            style={{ borderLeft: "2px solid rgba(255,255,255,0.1)" }}
          >
            &ldquo;I write because I needed this content and it didn&apos;t exist.&rdquo;
          </blockquote>
        </RevealOnScroll>

      </div>
    </section>
  );
}
