import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPublishedArticles } from "@/lib/content";
import { ARTICLE_CATEGORY_LABELS } from "@/lib/types";
import SiteNav from "@/components/dwt/SiteNav";
import SignalLine from "@/components/dwt/SignalLine";
import RevealOnScroll from "@/components/dwt/RevealOnScroll";

export const metadata: Metadata = {
  title: "Blog — Digital Wealth Transfer",
  description:
    "Articles, research, and commentary on AI, Bitcoin, automation, and the digital economy — for people navigating what's happening.",
};

export default async function BlogIndexPage() {
  const articles = await getAllPublishedArticles();

  return (
    <div className="min-h-screen font-sans" style={{ background: "#080C14" }}>
      <SiteNav />
      <SignalLine />

      <main className="px-6 pt-36 pb-28">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <RevealOnScroll>
            <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.24em] mb-6" style={{ color: "rgba(255,255,255,0.2)" }}>
              Digital Wealth Transfer · All articles
            </span>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <h1
              className="font-bold text-white tracking-[-0.025em] leading-[1.06] mb-4"
              style={{ fontSize: "clamp(34px, 5vw, 52px)" }}
            >
              The Signal
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={160}>
            <p className="text-base leading-relaxed mb-16 max-w-lg" style={{ color: "rgba(240,244,255,0.38)" }}>
              Articles, research, and commentary on AI, Bitcoin, automation, and
              the digital economy — for people navigating what&apos;s happening.
            </p>
          </RevealOnScroll>

          {/* Article list */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            {articles.map((article, i) => (
              <RevealOnScroll key={article.slug} delay={i * 50}>
                <article
                  className="py-10"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <Link
                      href={`/${article.category}`}
                      className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {ARTICLE_CATEGORY_LABELS[article.category]}
                    </Link>
                    <span style={{ color: "rgba(255,255,255,0.14)" }}>·</span>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
                      {new Date(article.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.14)" }}>·</span>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
                      {article.readTime} min read
                    </span>
                    {article.featured && (
                      <>
                        <span style={{ color: "rgba(255,255,255,0.14)" }}>·</span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "rgba(139,92,246,0.7)" }}>
                          Featured
                        </span>
                      </>
                    )}
                  </div>

                  <Link href={`/blog/${article.slug}`} className="group block mb-3">
                    <h2
                      className="font-bold text-white leading-snug tracking-[-0.02em] mb-2 group-hover:text-blue-400 transition-colors duration-200"
                      style={{ fontSize: "clamp(18px, 2.5vw, 24px)" }}
                    >
                      {article.title}
                    </h2>
                    {article.subtitle && (
                      <p className="text-sm mb-3" style={{ color: "rgba(240,244,255,0.35)" }}>
                        {article.subtitle}
                      </p>
                    )}
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(240,244,255,0.42)" }}>
                      {article.excerpt}
                    </p>
                  </Link>

                  <Link
                    href={`/blog/${article.slug}`}
                    className="text-xs font-semibold transition-colors duration-200 hover:text-blue-300"
                    style={{ color: "rgba(59,130,246,0.7)" }}
                  >
                    Read article →
                  </Link>
                </article>
              </RevealOnScroll>
            ))}
          </div>

        </div>
      </main>

      {/* Newsletter footer CTA */}
      <div
        className="px-6 py-16"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)", background: "rgba(255,255,255,0.01)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm mb-4" style={{ color: "rgba(240,244,255,0.35)" }}>
            Stay in the signal. Weekly dispatch on AI, Bitcoin, and the digital economy.
          </p>
          <Link
            href="/#newsletter"
            className="inline-block text-sm font-semibold text-white px-6 py-2.5 rounded-xl transition-all duration-200"
            style={{
              background: "rgba(59,130,246,0.9)",
              boxShadow: "0 0 20px rgba(59,130,246,0.2)",
            }}
          >
            Subscribe to the Newsletter →
          </Link>
        </div>
      </div>

      <footer
        className="px-6 py-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Image
            src="/brand/logo.svg"
            alt="Digital Wealth Transfer"
            width={120}
            height={25}
            unoptimized
            style={{ height: "auto", opacity: 0.4 }}
          />
          <span className="text-xs" style={{ color: "rgba(240,244,255,0.2)" }}>
            © 2026 Jonathan Cardona
          </span>
        </div>
      </footer>
    </div>
  );
}
