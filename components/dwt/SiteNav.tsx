"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16"
      style={{
        background: scrolled ? "rgba(8,12,20,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
        transition:
          "background 400ms ease, border-color 400ms ease, backdrop-filter 400ms ease",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/">
          <Image
            src="/brand/logo.svg"
            alt="Digital Wealth Transfer"
            width={160}
            height={33}
            priority
            unoptimized
            style={{ height: "auto" }}
          />
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/blog"
            className="hidden sm:block text-sm text-white/40 hover:text-white/80 px-3 py-1.5 rounded-lg transition-colors duration-200"
          >
            Read
          </Link>
          <Link
            href="#newsletter"
            className="text-sm font-semibold text-white px-4 py-2 rounded-xl transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.11)",
            }}
          >
            Subscribe
          </Link>
        </div>
      </div>
    </nav>
  );
}
