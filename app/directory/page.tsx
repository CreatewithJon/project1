import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Header from "@/components/Header";
import CompanyCard from "@/components/CompanyCard";
import FilterPanel from "@/components/FilterPanel";
import { filterCompanies } from "@/lib/data/companies";

export const metadata: Metadata = {
  title: "Las Vegas AI & Tech Services Directory — DigitalWealthTransfer.com",
  description:
    "Browse vetted AI, blockchain, and fintech partners. Find the right tech company for your business — or get listed as a provider.",
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
    <div className="min-h-screen bg-[#0B0F1A] text-[#F9FAFB]">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-10 w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">
            Las Vegas AI &amp; Tech Partner Network
          </h1>
          <p className="text-[#A1A1AA] text-sm mb-3">
            Curated AI, blockchain, and fintech companies. Tell us what you need — we&apos;ll connect you with the right partner.
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#A1A1AA]/50">
              {results.length} {results.length === 1 ? "company" : "companies"} found
              {activeFilters.length > 0 && ` · Filtered by: ${activeFilters.join(", ")}`}
            </p>
            <Link
              href="/#business-form"
              className="text-sm bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.25)]"
            >
              Get Matched
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-4 sticky top-20">
              <h2 className="font-semibold text-white text-sm mb-4">Filters</h2>
              <Suspense fallback={<div className="h-40 animate-pulse bg-white/[0.04] rounded-xl" />}>
                <FilterPanel />
              </Suspense>
            </div>
          </aside>

          {/* Results grid */}
          <div className="flex-1">
            {results.length === 0 ? (
              <div className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-12 text-center">
                <p className="text-[#A1A1AA] mb-2">No companies found matching your filters.</p>
                <a href="/directory" className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
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

      <footer className="border-t border-white/[0.06] mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-[#A1A1AA]/50 text-center">
          © 2025 DigitalWealthTransfer.com · Las Vegas, Nevada
        </div>
      </footer>
    </div>
  );
}
