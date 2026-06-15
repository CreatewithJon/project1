"use client";

import { useEffect, useRef, useState } from "react";

const forces = [
  {
    topic: "AI",
    statement:
      "Every industry is being restructured around it. Most people don't know where they stand yet.",
  },
  {
    topic: "Automation",
    statement:
      "The labor model is shifting faster than most institutions can acknowledge.",
  },
  {
    topic: "Digital Ownership",
    statement:
      "Property, money, identity — the definitions are changing beneath the surface.",
  },
  {
    topic: "Wealth",
    statement:
      "The people building it next don't look like the people who built it last time.",
  },
];

function ForceBlock({ topic, statement }: { topic: string; statement: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="py-20 sm:py-24"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        opacity: visible ? 1 : 0.1,
        transition: "opacity 900ms ease-out",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <h3
          className="font-bold text-white leading-none tracking-[-0.03em] mb-5"
          style={{ fontSize: "clamp(56px, 9vw, 104px)" }}
        >
          {topic}
        </h3>
        <p className="text-base sm:text-lg text-white/35 max-w-lg leading-relaxed">
          {statement}
        </p>
      </div>
    </div>
  );
}

export default function StakesSection() {
  return (
    <section className="px-6" style={{ background: "#080C14" }}>
      {/* Section label */}
      <div className="max-w-5xl mx-auto">
        <div
          className="pt-20 pb-12"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/20">
            The stakes
          </span>
        </div>
      </div>

      {forces.map((f) => (
        <ForceBlock key={f.topic} topic={f.topic} statement={f.statement} />
      ))}
    </section>
  );
}
