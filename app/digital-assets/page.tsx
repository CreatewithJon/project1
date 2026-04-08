import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { getArticlesByCategory } from "@/lib/data/articles";

export const metadata: Metadata = {
  title: "Digital Assets",
  description: "Blockchain infrastructure, digital asset custody, and crypto adoption trends in the Las Vegas market.",
};

export default function DigitalAssetsPage() {
  return <CategoryPage category="digital-assets" articles={getArticlesByCategory("digital-assets")} />;
}
