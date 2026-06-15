"use client";

import { useEffect, useRef, useState } from "react";

export default function SignalLine() {
  const [progress, setProgress] = useState(0);
  const [peaked, setPeaked] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setProgress(p);
      if (p >= 0.99) setPeaked(true);
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed top-16 left-0 right-0 z-40 h-px"
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          background: "linear-gradient(to right, #3B82F6, #8B5CF6)",
          opacity: peaked ? 1 : 0.6,
          transition: peaked ? "opacity 600ms ease-in-out" : "none",
        }}
      />
    </div>
  );
}
