import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
        <h2 key={i} className="text-xl font-bold text-white mt-10 mb-4">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={i} className="text-lg font-semibold text-[#F9FAFB] mt-8 mb-3">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="text-[#A1A1AA] leading-[1.85] mb-5">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="mb-5 flex flex-col gap-2">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-[#A1A1AA] text-sm leading-relaxed">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
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
    <div className="min-h-screen bg-[#0B0F1A] font-sans text-[#F9FAFB]">

      {/* Nav */}
      <header className="border-b border-white/[0.06] bg-[#0B0F1A]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/">
            <Image src="/brand/logo.svg" alt="Digital Wealth Transfer" width={160} height={33} priority unoptimized style={{ height: "auto" }} />
          </Link>
          <Link href="/blog" className="text-sm text-[#A1A1AA] hover:text-white transition-colors">
            ← Blog
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-14">

        {/* Article header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              {categoryLabel}
            </span>
            <span className="text-white/20">·</span>
            <span className="text-xs text-[#A1A1AA]">{article.readTime} min read</span>
            <span className="text-white/20">·</span>
            <span className="text-xs text-[#A1A1AA]">
              {new Date(article.date).toLocaleDateString("en-US", {
                month: "long", day: "numeric", year: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-[#A1A1AA] leading-relaxed">{article.excerpt}</p>
        </div>

        <hr className="border-white/[0.06] mb-10" />

        {/* Article body */}
        <article className="text-base">
          {article.content.map((block, i) => renderBlock(block, i))}
        </article>

        <hr className="border-white/[0.06] mt-12 mb-10" />

        {/* CTA */}
        <div className="bg-[#151B2D] border border-blue-500/20 rounded-2xl p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">
            Jonathan Cardona
          </p>
          <h2 className="text-xl font-bold text-white mb-3">
            Looking for help with AI or digital asset services?
          </h2>
          <p className="text-[#A1A1AA] text-sm mb-6 max-w-md mx-auto">
            I connect AI, blockchain, and fintech companies with qualified clients actively
            looking for their services. Get connected today.
          </p>
          <Link
            href="/#business-form"
            className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.25)]"
          >
            Get Connected Here →
          </Link>
        </div>

      </main>

      <footer className="border-t border-white/[0.06] py-6 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between text-xs text-[#A1A1AA]/50">
          <span>© 2025 Jonathan Cardona · DigitalWealthTransfer.com</span>
          <Link href="/blog" className="hover:text-[#A1A1AA] transition-colors">← All articles</Link>
        </div>
      </footer>
    </div>
  );
}
