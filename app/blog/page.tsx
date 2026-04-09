import type { Metadata } from "next";
import Link from "next/link";
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
    <div className="min-h-screen bg-white font-sans">

      {/* Nav */}
      <header className="border-b border-zinc-100">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-zinc-800 hover:text-zinc-600 transition-colors">
            ← Jonathan Cardona
          </Link>
          <span className="text-sm text-zinc-400">Blog</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-14">

        {/* Page header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            Digital Wealth Transfer · Media
          </p>
          <h1 className="text-3xl font-bold text-zinc-900 mb-3">Blog</h1>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xl">
            Insights on AI, blockchain, fintech, and the shifting financial landscape
            in the Las Vegas market and beyond.
          </p>
        </div>

        {/* Article list */}
        <div className="flex flex-col divide-y divide-zinc-100">
          {sorted.map((article) => (
            <article key={article.slug} className="py-7">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  {ARTICLE_CATEGORY_LABELS[article.category]}
                </span>
                <span className="text-zinc-200">·</span>
                <span className="text-xs text-zinc-400">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    month: "long", day: "numeric", year: "numeric",
                  })}
                </span>
                <span className="text-zinc-200">·</span>
                <span className="text-xs text-zinc-400">{article.readTime} min read</span>
              </div>
              <Link href={`/blog/${article.slug}`} className="group">
                <h2 className="text-lg font-semibold text-zinc-900 mb-1.5 group-hover:text-blue-600 transition-colors leading-snug">
                  {article.title}
                </h2>
              </Link>
              <p className="text-sm text-zinc-500 leading-relaxed mb-3">{article.excerpt}</p>
              <Link
                href={`/blog/${article.slug}`}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Read article →
              </Link>
            </article>
          ))}
        </div>

      </main>

      {/* Footer CTA */}
      <div className="border-t border-zinc-100 bg-zinc-50 py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-zinc-600 mb-3">
            Looking for help with AI or digital asset services?
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Connected
          </Link>
        </div>
      </div>

      <footer className="border-t border-zinc-100 py-6 px-6">
        <div className="max-w-3xl mx-auto text-xs text-zinc-400 text-center">
          © 2025 Jonathan Cardona · DigitalWealthTransfer.com
        </div>
      </footer>
    </div>
  );
}
