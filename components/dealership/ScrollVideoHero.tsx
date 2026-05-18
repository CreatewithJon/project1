"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Props {
  videoSrc?: string;
}

export default function ScrollVideoHero({ videoSrc = "/videos/dealership-hero.mp4" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  // Scrub video on scroll
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // Force browser to render first frame then freeze
    const init = () => {
      video.currentTime = 0;
      video.pause();
      setReady(true);
    };

    if (video.readyState >= 2) {
      init();
    } else {
      video.addEventListener("canplay", init, { once: true });
    }

    function onScroll() {
      if (!section || !video) return;
      const rect = section.getBoundingClientRect();
      const scrollableHeight = section.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const p = scrollableHeight > 0 ? Math.min(1, scrolled / scrollableHeight) : 0;
      setProgress(p);
      if (video.duration) {
        video.currentTime = p * video.duration;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // Section is 300vh tall so there's room to scroll
    <div ref={sectionRef} style={{ height: "300vh" }} className="relative">

      {/* Sticky viewport — stays pinned while user scrolls through 300vh */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Fallback gradient always rendered behind video */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F0F0F] via-[#080808] to-[#000000]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(201,168,76,0.06)_0%,transparent_60%)]" />

        {/* Video — autoPlay forces first frame to render, JS immediately pauses it */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: ready ? 1 : 0 }}
          playsInline
          muted
          autoPlay
          preload="auto"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Cinematic overlay — darkens edges, lifts text */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-6 sm:px-12 max-w-7xl mx-auto w-full">

          {/* Scroll progress bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5">
            <div
              className="h-full bg-[#C9A84C] transition-none"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          {/* Badge */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/20 px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              Oxnard, CA · Family Owned
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl sm:text-8xl lg:text-[110px] font-black tracking-tight leading-[0.9] text-white mb-6">
            SHAFIK<br />
            <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)", color: "transparent" }}>
              N SONS
            </span>
          </h1>

          <p className="text-white/50 text-base sm:text-lg max-w-lg mb-10 leading-relaxed">
            Classic builds. Premium imports. Family owned since day one.
            Scroll to see what we have.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/dealership-demo/inventory"
              className="text-sm font-bold text-black bg-[#C9A84C] hover:bg-[#FDBA74] px-7 py-3.5 rounded-full transition-all duration-200 hover:shadow-[0_4px_24px_rgba(201,168,76,0.4)]"
            >
              Browse Inventory
            </Link>
            <Link
              href="/dealership-demo/financing"
              className="text-sm font-bold text-white border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 px-7 py-3.5 rounded-full transition-all duration-200"
            >
              Get Pre-Approved
            </Link>
          </div>
        </div>

        {/* Scroll hint — fades out as user scrolls */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-300"
          style={{ opacity: progress > 0.05 ? 0 : 1 }}
        >
          <p className="text-white/25 text-[10px] uppercase tracking-[0.25em]">Scroll</p>
          <div className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
}
