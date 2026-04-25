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
        <div className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-8 hover:border-blue-500/25 hover:shadow-[0_0_25px_rgba(59,130,246,0.07)] transition-all h-full">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              {ARTICLE_CATEGORY_LABELS[article.category]}
            </span>
            <span className="text-white/20">·</span>
            <span className="text-xs text-[#A1A1AA]">{article.readTime} min read</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-blue-400 transition-colors">
            {article.title}
          </h2>
          <p className="text-[#A1A1AA] text-sm leading-relaxed mb-4">{article.excerpt}</p>
          <p className="text-xs text-[#A1A1AA]/50">
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
      <div className="border-b border-white/[0.06] pb-5 hover:border-white/[0.12] transition-colors">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            {ARTICLE_CATEGORY_LABELS[article.category]}
          </span>
          <span className="text-white/20">·</span>
          <span className="text-xs text-[#A1A1AA]">{article.readTime} min read</span>
        </div>
        <h3 className="text-base font-semibold text-white mb-1.5 leading-snug group-hover:text-blue-400 transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-[#A1A1AA] line-clamp-2">{article.excerpt}</p>
      </div>
    </Link>
  );
}
