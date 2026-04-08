import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import type { Article, ArticleCategory } from "@/lib/types";
import { ARTICLE_CATEGORY_LABELS, ALL_ARTICLE_CATEGORIES } from "@/lib/data/articles";

interface CategoryPageProps {
  category: ArticleCategory;
  articles: Article[];
}

export default function CategoryPage({ category, articles }: CategoryPageProps) {
  const label = ARTICLE_CATEGORY_LABELS[category];

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Nav */}
      <header className="border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold text-base tracking-tight text-zinc-900">
            Digital<span className="text-blue-600">Wealth</span>Transfer
          </Link>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-zinc-500">
            {ALL_ARTICLE_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/${cat}`}
                className={`hover:text-zinc-900 transition-colors ${
                  cat === category ? "text-zinc-900 font-medium" : ""
                }`}
              >
                {ARTICLE_CATEGORY_LABELS[cat]}
              </Link>
            ))}
          </nav>
          <Link
            href="/directory"
            className="text-sm font-medium border border-zinc-300 text-zinc-700 px-4 py-1.5 rounded-md hover:bg-zinc-50 transition-colors"
          >
            Directory
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-14">

        {/* Category header */}
        <div className="mb-12 pb-10 border-b border-zinc-100">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            Category
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-3">{label}</h1>
          <p className="text-zinc-500 max-w-xl">
            In-depth analysis and insights on {label.toLowerCase()} trends shaping the Las Vegas market.
          </p>
        </div>

        {/* Articles */}
        {articles.length === 0 ? (
          <p className="text-zinc-400 text-sm">No articles yet. Check back soon.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} size="large" />
            ))}
          </div>
        )}

      </main>

      <footer className="border-t border-zinc-100 py-6 px-6 mt-12">
        <div className="max-w-5xl mx-auto text-xs text-zinc-400 text-center">
          © 2025 DigitalWealthTransfer.com · Las Vegas, Nevada
        </div>
      </footer>
    </div>
  );
}
