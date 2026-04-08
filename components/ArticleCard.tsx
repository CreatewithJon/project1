import Link from "next/link";
import type { Article } from "@/lib/types";
import { ARTICLE_CATEGORY_LABELS } from "@/lib/types";

interface ArticleCardProps {
  article: Article;
  size?: "default" | "large";
}

export default function ArticleCard({ article, size = "default" }: ArticleCardProps) {
  if (size === "large") {
    return (
      <Link href={`/blog/${article.slug}`} className="group block">
        <div className="border border-zinc-200 rounded-xl p-8 bg-white hover:border-zinc-300 hover:shadow-sm transition-all h-full">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              {ARTICLE_CATEGORY_LABELS[article.category]}
            </span>
            <span className="text-zinc-200">·</span>
            <span className="text-xs text-zinc-400">{article.readTime} min read</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
            {article.title}
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed mb-4">{article.excerpt}</p>
          <p className="text-xs text-zinc-400">
            {new Date(article.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <div className="border-b border-zinc-100 pb-5 hover:border-zinc-200 transition-colors">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            {ARTICLE_CATEGORY_LABELS[article.category]}
          </span>
          <span className="text-zinc-200">·</span>
          <span className="text-xs text-zinc-400">{article.readTime} min read</span>
        </div>
        <h3 className="text-base font-semibold text-zinc-900 mb-1.5 leading-snug group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-zinc-500 line-clamp-2">{article.excerpt}</p>
      </div>
    </Link>
  );
}
