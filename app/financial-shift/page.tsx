import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { getArticlesByCategory } from "@/lib/data/articles";

export const metadata: Metadata = {
  title: "Financial Shift",
  description: "How fintech disruption, digital estate planning, and the new financial infrastructure are changing wealth in Nevada.",
};

export default function FinancialShiftPage() {
  return <CategoryPage category="financial-shift" articles={getArticlesByCategory("financial-shift")} />;
}
