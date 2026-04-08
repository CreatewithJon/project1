import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, articles } from "@/lib/data/articles";
import { ARTICLE_CATEGORY_LABELS } from "@/lib/types";
import type { ContentBlock } from "@/lib/types";

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={i} className="text-xl font-bold text-zinc-900 mt-10 mb-4">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={i} className="text-lg font-semibold text-zinc-800 mt-8 mb-3">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="text-zinc-700 leading-[1.85] mb-5">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="mb-5 flex flex-col gap-2">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-zinc-700 text-sm leading-relaxed">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
  }
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const categoryLabel = ARTICLE_CATEGORY_LABELS[article.category];

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Nav */}
      <header className="border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold text-base tracking-tight text-zinc-900">
            Digital<span className="text-blue-600">Wealth</span>Transfer
          </Link>
          <Link href={`/${article.category}`} className="text-sm text-blue-600 hover:underline">
            ← {categoryLabel}
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-14">

        {/* Article header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href={`/${article.category}`}
              className="text-xs font-semibold uppercase tracking-widest text-blue-600 hover:underline"
            >
              {categoryLabel}
            </Link>
            <span className="text-zinc-200">·</span>
            <span className="text-xs text-zinc-400">{article.readTime} min read</span>
            <span className="text-zinc-200">·</span>
            <span className="text-xs text-zinc-400">
              {new Date(article.date).toLocaleDateString("en-US", {
                month: "long", day: "numeric", year: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-zinc-500 leading-relaxed">{article.excerpt}</p>
        </div>

        <hr className="border-zinc-100 mb-10" />

        {/* Article body */}
        <article className="text-base">
          {article.content.map((block, i) => renderBlock(block, i))}
        </article>

        <hr className="border-zinc-100 mt-12 mb-10" />

        {/* CTA */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            Digital Wealth Transfer
          </p>
          <h2 className="text-xl font-bold text-zinc-900 mb-3">
            Ready to connect with qualified clients?
          </h2>
          <p className="text-zinc-500 text-sm mb-6 max-w-md mx-auto">
            Browse the Las Vegas directory or claim your listing to start receiving high-intent leads.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/directory"
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              Browse Directory
            </Link>
            <Link
              href="/landing#cta"
              className="w-full sm:w-auto border border-zinc-300 text-zinc-700 px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-zinc-100 transition-colors text-center"
            >
              Get Qualified Leads
            </Link>
          </div>
        </div>

      </main>

      <footer className="border-t border-zinc-100 py-6 px-6">
        <div className="max-w-5xl mx-auto text-xs text-zinc-400 text-center">
          © 2025 DigitalWealthTransfer.com · Las Vegas, Nevada
        </div>
      </footer>
    </div>
  );
}
