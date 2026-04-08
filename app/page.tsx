import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import { getFeaturedArticles, getArticlesByCategory, ALL_ARTICLE_CATEGORIES } from "@/lib/data/articles";
import { ARTICLE_CATEGORY_LABELS } from "@/lib/types";

export default function HomePage() {
  const featured = getFeaturedArticles();
  const [heroArticle, ...restFeatured] = featured;

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Nav */}
      <header className="border-b border-zinc-100 sticky top-0 bg-white/95 backdrop-blur z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold text-base tracking-tight text-zinc-900">
            Digital<span className="text-blue-600">Wealth</span>Transfer
          </Link>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-zinc-500">
            {ALL_ARTICLE_CATEGORIES.map((cat) => (
              <Link key={cat} href={`/${cat}`} className="hover:text-zinc-900 transition-colors capitalize">
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

      <main className="max-w-5xl mx-auto px-6">

        {/* Hero Article */}
        {heroArticle && (
          <section className="py-16 border-b border-zinc-100">
            <Link href={`/blog/${heroArticle.slug}`} className="group block">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
                {ARTICLE_CATEGORY_LABELS[heroArticle.category]}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 leading-tight mb-4 max-w-3xl group-hover:text-blue-600 transition-colors">
                {heroArticle.title}
              </h1>
              <p className="text-zinc-500 text-lg leading-relaxed max-w-2xl mb-4">
                {heroArticle.excerpt}
              </p>
              <p className="text-sm text-zinc-400">
                {new Date(heroArticle.date).toLocaleDateString("en-US", {
                  month: "long", day: "numeric", year: "numeric",
                })}
                {" · "}{heroArticle.readTime} min read
              </p>
            </Link>
          </section>
        )}

        {/* Featured Articles Grid */}
        {restFeatured.length > 0 && (
          <section className="py-12 border-b border-zinc-100">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-6">
              Featured
            </h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {restFeatured.map((article) => (
                <ArticleCard key={article.slug} article={article} size="large" />
              ))}
            </div>
          </section>
        )}

        {/* Category Previews */}
        <section className="py-12 border-b border-zinc-100">
          <div className="grid sm:grid-cols-2 gap-12">
            {ALL_ARTICLE_CATEGORIES.map((cat) => {
              const catArticles = getArticlesByCategory(cat).slice(0, 2);
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-700">
                      {ARTICLE_CATEGORY_LABELS[cat]}
                    </h2>
                    <Link
                      href={`/${cat}`}
                      className="text-xs text-blue-600 hover:underline font-medium"
                    >
                      See all →
                    </Link>
                  </div>
                  <div className="flex flex-col gap-5">
                    {catArticles.map((article) => (
                      <ArticleCard key={article.slug} article={article} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16">
          <div className="max-w-xl">
            <h2 className="text-xl font-bold text-zinc-900 mb-2">
              Stay ahead of the Las Vegas digital wealth market
            </h2>
            <p className="text-zinc-500 text-sm mb-5">
              Weekly insights on AI, blockchain, fintech, and opportunities in Nevada. No spam.
            </p>
            <NewsletterForm />
          </div>
        </section>

      </main>

      <footer className="border-t border-zinc-100 py-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <span>© 2025 DigitalWealthTransfer.com · Las Vegas, Nevada</span>
          <div className="flex items-center gap-4">
            <Link href="/directory" className="hover:text-zinc-600">Directory</Link>
            <Link href="/landing" className="hover:text-zinc-600">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
