// --- Article types ---

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

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  date: string;
  readTime: number;
  featured?: boolean;
  content: ContentBlock[];
}

