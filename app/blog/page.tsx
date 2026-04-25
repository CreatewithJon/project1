import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { articles } from "@/lib/data/articles";
import { ARTICLE_CATEGORY_LABELS } from "@/lib/types";

export const metadata: Metadata = {
  title: "Blog — Digital Wealth Transfer",
  description:
    "Insights on AI, blockchain, fintech, and digital assets in the Las Vegas market.",
};

export default function BlogIndexPage() {
  const sorted = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-[#0B0F1A] font-sans text-[#F9FAFB]">

      {/* Nav */}
      <header className="border-b border-white/[0.06] bg-[#0B0F1A]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/">
            <Image src="/brand/logo.svg" alt="Digital Wealth Transfer" width={160} height={33} priority unoptimized style={{ height: "auto" }} />
          </Link>
          <span className="text-sm text-[#A1A1AA]">Blog</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-14">

        {/* Page header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">
            Digital Wealth Transfer · Media
          </p>
          <h1 className="text-3xl font-bold text-white mb-3">Blog</h1>
          <p className="text-[#A1A1AA] text-sm leading-relaxed max-w-xl">
            Insights on AI, blockchain, fintech, and the shifting financial landscape
            in the Las Vegas market and beyond.
          </p>
        </div>

        {/* Article list */}
        <div className="flex flex-col divide-y divide-white/[0.06]">
          {sorted.map((article) => (
            <article key={article.slug} className="py-7">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                  {ARTICLE_CATEGORY_LABELS[article.category]}
                </span>
                <span className="text-white/20">·</span>
                <span className="text-xs text-[#A1A1AA]">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    month: "long", day: "numeric", year: "numeric",
                  })}
                </span>
                <span className="text-white/20">·</span>
                <span className="text-xs text-[#A1A1AA]">{article.readTime} min read</span>
              </div>
              <Link href={`/blog/${article.slug}`} className="group">
                <h2 className="text-lg font-semibold text-white mb-1.5 group-hover:text-blue-400 transition-colors leading-snug">
                  {article.title}
                </h2>
              </Link>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-3">{article.excerpt}</p>
              <Link
                href={`/blog/${article.slug}`}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Read article →
              </Link>
            </article>
          ))}
        </div>

      </main>

      {/* Footer CTA */}
      <div className="border-t border-white/[0.06] bg-[#111827] py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-[#A1A1AA] mb-3">
            Looking for help with AI or digital asset services?
          </p>
          <Link
            href="/#business-form"
            className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.25)]"
          >
            Get Connected
          </Link>
        </div>
      </div>

      <footer className="border-t border-white/[0.06] py-6 px-6">
        <div className="max-w-3xl mx-auto text-xs text-[#A1A1AA]/50 text-center">
          © 2025 Jonathan Cardona · DigitalWealthTransfer.com
        </div>
      </footer>
    </div>
  );
}
