import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import CompanyCard from "@/components/CompanyCard";
import FilterPanel from "@/components/FilterPanel";
import { filterCompanies } from "@/lib/data/companies";

export const metadata: Metadata = {
  title: "Las Vegas AI & Tech Services Directory — DigitalWealthTransfer.com",
  description:
    "Browse Las Vegas fintech, blockchain, and enterprise AI companies. Filter by category and location.",
};

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string; location?: string }>;
}) {
  const { search, category, location } = await searchParams;
  const results = filterCompanies({ search, category, location });

  const activeFilters = [
    search && `"${search}"`,
    category,
    location,
  ].filter(Boolean);

  return (
    <>
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-zinc-900 mb-1">
            Las Vegas AI &amp; Tech Services Directory
          </h1>
          <p className="text-sm text-zinc-500">
            {results.length} {results.length === 1 ? "company" : "companies"} found
            {activeFilters.length > 0 && ` · Filtered by: ${activeFilters.join(", ")}`}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white border border-zinc-200 rounded-lg p-4 sticky top-4">
              <h2 className="font-semibold text-zinc-800 text-sm mb-4">Filters</h2>
              <Suspense fallback={<div className="h-40 animate-pulse bg-zinc-100 rounded" />}>
                <FilterPanel />
              </Suspense>
            </div>
          </aside>

          {/* Results grid */}
          <div className="flex-1">
            {results.length === 0 ? (
              <div className="bg-white border border-zinc-200 rounded-lg p-12 text-center">
                <p className="text-zinc-500 mb-2">No companies found matching your filters.</p>
                <a href="/directory" className="text-blue-600 text-sm hover:underline">
                  Clear all filters
                </a>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {results.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-200 bg-white mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-zinc-400 text-center">
          © 2025 DigitalWealthTransfer.com · Las Vegas, Nevada
        </div>
      </footer>
    </>
  );
}
