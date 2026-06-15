// ─── Article categories ───────────────────────────────────────────────────────

export type ArticleCategory =
  | "ai-economy"
  | "digital-assets"
  | "financial-shift"
  | "opportunities";

export const ARTICLE_CATEGORY_LABELS: Record<ArticleCategory, string> = {
  "ai-economy": "AI Economy",
  "digital-assets": "Digital Assets",
  "financial-shift": "Financial Shift",
  "opportunities": "Opportunities",
};

// ─── Content blocks ───────────────────────────────────────────────────────────
//
// Phase 1: rendered by renderBlock() in app/blog/[slug]/page.tsx
// Phase 2: rendered by Sovereign OS Content Engine, same schema

export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "blockquote"; text: string; attribution?: string }
  | { type: "pullquote"; text: string }
  | { type: "callout"; text: string; label?: string }
  | { type: "divider" };

// ─── Article author ───────────────────────────────────────────────────────────

export interface ArticleAuthor {
  name: string;
  title?: string;
}

// ─── Article status ───────────────────────────────────────────────────────────
//
// Sovereign OS publishing workflow:
//   draft → review → published → (appears on DWT)

export type ArticleStatus = "draft" | "review" | "published";

// ─── Article ──────────────────────────────────────────────────────────────────

export interface Article {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  category: ArticleCategory;
  status: ArticleStatus;
  date: string; // ISO date string: "2026-06-01"
  author: ArticleAuthor;
  readTime: number;
  featured?: boolean;
  tags: string[];
  relatedSlugs?: string[];
  content: ContentBlock[];
}
