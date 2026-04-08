import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { getArticlesByCategory } from "@/lib/data/articles";

export const metadata: Metadata = {
  title: "AI Economy",
  description: "How artificial intelligence is reshaping finance, wealth management, and enterprise operations in Las Vegas.",
};

export default function AiEconomyPage() {
  return <CategoryPage category="ai-economy" articles={getArticlesByCategory("ai-economy")} />;
}
