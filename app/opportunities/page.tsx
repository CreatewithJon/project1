import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { getArticlesByCategory } from "@/lib/data/articles";

export const metadata: Metadata = {
  title: "Opportunities",
  description: "Market positioning, lead generation, and business opportunities for AI and digital asset companies in Las Vegas.",
};

export default function OpportunitiesPage() {
  return <CategoryPage category="opportunities" articles={getArticlesByCategory("opportunities")} />;
}
