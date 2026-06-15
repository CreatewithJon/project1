import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ArticleCard from "@/components/ArticleCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import SiteNav from "@/components/dwt/SiteNav";
import SignalLine from "@/components/dwt/SignalLine";
import HeroSection from "@/components/dwt/HeroSection";
import NavigatorSection from "@/components/dwt/NavigatorSection";
import StakesSection from "@/components/dwt/StakesSection";
import RevealOnScroll from "@/components/dwt/RevealOnScroll";
import { getFeaturedArticles, getRecentArticles } from "@/lib/content";
import { ARTICLE_CATEGORY_LABELS } from "@/lib/types";

export const metadata: Metadata = {
  title: "Digital Wealth Transfer — Media, Education & Research",
  description:
    "Documenting the transition into the AI-powered digital economy. Articles, research, and commentary for people navigating what's happening — not engineers, not institutions.",
};

const topics = [
  { slug: "ai-economy", label: "AI Economy" },
  { slug: "digital-assets", label: "Digital Assets" },
  { slug: "financial-shift", label: "Financial Shift" },
  { slug: "opportunities", label: "Opportunities" },
];

export default async function HomePage() {
  const [featuredList, recent] = await Promise.all([
    getFeaturedArticles(),
    getRecentArticles(4),
  ]);
  const featured = featuredList[0];

  return (
    <div className="min-h-screen font-sans text-[#F0F4FF]" style={{ background: "#080C14" }}>

      {/* Fixed chrome */}
      <SiteNav />
      <SignalLine />

      {/* ── Act I: The Threshold ── */}
      <HeroSection />

      {/* ── Act II: The Navigator ── */}
      <NavigatorSection />

      {/* ── Act III: The Stakes ── */}
      <StakesSection />

      {/* ── Act IV: The Crossing ── */}
      <section className="px-6 py-28" style={{ background: "#080C14" }}>
        <div className="max-w-5xl mx-auto">

          {/* Section header */}
          <RevealOnScroll>
            <div className="flex items-center gap-4 mb-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/20">
                The signal
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <p className="text-sm text-white/28 mb-14 max-w-md leading-relaxed">
              Articles, research, and commentary on what&apos;s happening
              and what it means.
            </p>
          </RevealOnScroll>

          {/* Topic pills */}
          <RevealOnScroll delay={160}>
            <div className="flex flex-wrap gap-2 mb-16">
              {topics.map(({ slug, label }) => (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="text-xs font-semibold text-white/28 px-3 py-1.5 rounded-full transition-colors duration-200 hover:text-white/65"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/blog"
                className="text-xs font-semibold text-blue-400/60 px-3 py-1.5 rounded-full transition-colors duration-200 hover:text-blue-400"
                style={{ border: "1px solid rgba(59,130,246,0.15)" }}
              >
                All articles →
              </Link>
            </div>
          </RevealOnScroll>

          {/* Featured article — editorial treatment */}
          {featured && (
            <RevealOnScroll delay={200}>
              <Link href={`/blog/${featured.slug}`} className="group block mb-16">
                <div
                  className="rounded-2xl p-8 sm:p-12 transition-all duration-500 border border-white/[0.06] group-hover:border-blue-500/[0.18]"
                  style={{
                    background: "linear-gradient(150deg, #111827 0%, #0D1117 100%)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                      {ARTICLE_CATEGORY_LABELS[featured.category]}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.14)" }}>·</span>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.22)" }}>
                      {featured.readTime} min read
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.14)" }}>·</span>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.22)" }}>
                      Featured
                    </span>
                  </div>
                  <h2
                    className="font-bold text-white leading-snug tracking-[-0.02em] mb-4 max-w-2xl group-hover:text-blue-400 transition-colors duration-300"
                    style={{ fontSize: "clamp(22px, 3vw, 32px)" }}
                  >
                    {featured.title}
                  </h2>
                  <p className="leading-relaxed mb-7 max-w-xl text-sm sm:text-base" style={{ color: "rgba(255,255,255,0.36)" }}>
                    {featured.excerpt}
                  </p>
                  <span className="text-xs font-semibold text-blue-400/60 group-hover:text-blue-400 transition-colors duration-300">
                    Read article →
                  </span>
                </div>
              </Link>
            </RevealOnScroll>
          )}

          {/* Recent articles grid */}
          <div className="grid sm:grid-cols-2 gap-5 mb-24">
            {recent.map((article, i) => (
              <RevealOnScroll key={article.slug} delay={i * 70}>
                <ArticleCard article={article} size="large" />
              </RevealOnScroll>
            ))}
          </div>

          {/* Sovereign OS teaser */}
          <RevealOnScroll>
            <div
              className="rounded-2xl p-8 sm:p-10 text-center"
              style={{
                background: "rgba(139,92,246,0.04)",
                border: "1px solid rgba(139,92,246,0.1)",
              }}
            >
              <div className="inline-flex items-center gap-2.5 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-400/50">
                  In development
                </span>
              </div>
              <h3
                className="font-bold text-white tracking-[-0.015em] mb-3"
                style={{ fontSize: "clamp(20px, 2.5vw, 26px)" }}
              >
                Sovereign OS
              </h3>
              <p className="text-sm leading-relaxed max-w-sm mx-auto" style={{ color: "rgba(255,255,255,0.32)" }}>
                A personal intelligence operating system for the AI era.
                Own your tools. Own your data. No subscriptions, no noise.
              </p>
            </div>
          </RevealOnScroll>

        </div>
      </section>

      {/* ── Act V: The Commitment ── */}
      <section
        id="newsletter"
        className="px-6 py-28 scroll-mt-16"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="max-w-xl mx-auto">

          <RevealOnScroll>
            <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.24em] text-white/20 mb-7">
              The newsletter
            </span>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <h2
              className="font-bold text-white tracking-[-0.025em] leading-[1.06] mb-6"
              style={{ fontSize: "clamp(38px, 5vw, 58px)" }}
            >
              Stay in
              <br />
              the signal.
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <p className="text-base leading-relaxed mb-10 max-w-sm" style={{ color: "rgba(255,255,255,0.36)" }}>
              A weekly dispatch on AI, Bitcoin, automation, and digital business.
              Written from inside the transition, not above it.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={300}>
            <NewsletterSignup />
            <p className="text-[11px] mt-4" style={{ color: "rgba(255,255,255,0.18)" }}>
              No spam. Unsubscribe anytime.
            </p>
          </RevealOnScroll>

          {/* Future content placeholders */}
          <RevealOnScroll delay={500} from="fade">
            <div
              className="mt-16 pt-10"
              style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-4" style={{ color: "rgba(255,255,255,0.14)" }}>
                Coming
              </p>
              <div className="flex gap-6 text-sm" style={{ color: "rgba(255,255,255,0.14)" }}>
                <span>Podcast</span>
                <span>Research</span>
                <span>Community</span>
              </div>
            </div>
          </RevealOnScroll>

        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="px-6 py-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <Image
              src="/brand/logo.svg"
              alt="Digital Wealth Transfer"
              width={140}
              height={29}
              unoptimized
              style={{ height: "auto", opacity: 0.55 }}
            />
            <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.18)" }}>
              © 2026 Jonathan Cardona · Las Vegas, Nevada
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs" style={{ color: "rgba(255,255,255,0.22)" }}>
            <Link href="/blog" className="hover:text-white/60 transition-colors duration-200">
              Read
            </Link>
            <Link href="/portfolio" className="hover:text-white/60 transition-colors duration-200">
              Portfolio
            </Link>
            <Link href="#newsletter" className="hover:text-white/60 transition-colors duration-200">
              Newsletter
            </Link>
            <a
              href="https://www.linkedin.com/in/jonathan-cardona-1089291b9"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors duration-200"
            >
              LinkedIn →
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
