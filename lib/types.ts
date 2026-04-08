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

// --- Directory types ---

export type Category =
  | "AI Services"
  | "Enterprise AI Solutions"
  | "AI Wealth Advisors"
  | "Blockchain Infrastructure"
  | "Digital Asset Custody"
  | "Fintech Platforms"
  | "Estate Tech";

export type LasVegasArea =
  | "Summerlin"
  | "Henderson"
  | "Downtown Las Vegas"
  | "North Las Vegas"
  | "Spring Valley"
  | "Enterprise"
  | "Las Vegas";

export interface Company {
  id: string;
  slug: string;
  name: string;
  categories: Category[];
  description: string;
  website: string;
  location: LasVegasArea;
  tags: string[];
  email?: string;
  phone?: string;
  isPremium?: boolean;
  isFeatured?: boolean;
  isClaimed?: boolean;
}
