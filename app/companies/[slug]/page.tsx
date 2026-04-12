import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import LeadForm from "@/components/LeadForm";
import { getCompanyBySlug, companies } from "@/lib/data/companies";

export async function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<"/companies/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const company = getCompanyBySlug(slug);
  if (!company) return {};
  return {
    title: company.name,
    description: company.description,
  };
}

export default async function CompanyProfilePage(props: PageProps<"/companies/[slug]">) {
  const { slug } = await props.params;
  const company = getCompanyBySlug(slug);

  if (!company) notFound();

  return (
    <>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
        {/* Breadcrumb */}
        <nav className="text-sm text-zinc-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-zinc-600">Home</Link>
          <span>/</span>
          <Link href="/directory" className="hover:text-zinc-600">Directory</Link>
          <span>/</span>
          <span className="text-zinc-600">{company.name}</span>
        </nav>

        <div className="bg-white border border-zinc-200 rounded-lg p-6 mb-6">
          {/* Header row */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-zinc-900">{company.name}</h1>
                {company.isFeatured && (
                  <span className="text-xs bg-amber-100 text-amber-700 font-medium px-2 py-0.5 rounded-full">
                    Featured
                  </span>
                )}
                {!company.isFeatured && company.isPremium && (
                  <span className="text-xs bg-blue-50 text-blue-600 font-medium px-2 py-0.5 rounded-full">
                    Premium
                  </span>
                )}
              </div>
              <p className="text-sm text-zinc-500">{company.location}, Nevada</p>
            </div>
            {company.website && !company.website.includes("example.com") && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shrink-0"
              >
                Visit Website →
              </a>
            )}
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {company.categories.map((cat) => (
              <Link
                key={cat}
                href={`/directory?category=${encodeURIComponent(cat)}`}
                className="text-sm bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full hover:bg-zinc-200 transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Description */}
          <p className="text-zinc-700 leading-relaxed mb-6">{company.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {company.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-zinc-400 border border-zinc-200 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

        </div>

        {/* Lead capture form */}
        {/* This form submits an inquiry request routed through Jonathan Cardona — not direct company contact */}
        <LeadForm companySlug={company.slug} companyName={company.name} />

        {/* Claim profile CTA */}
        {!company.isClaimed && (
          <div id="claim" className="bg-zinc-50 border border-zinc-200 rounded-lg p-6 mb-6">
            <h2 className="font-semibold text-zinc-800 mb-1">Is this your business?</h2>
            <p className="text-sm text-zinc-500 mb-4">
              Claim this profile to update your information and unlock premium placement. Apply as a provider to get started.
            </p>
            <a
              href="/#provider-form"
              className="inline-block bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-700 transition-colors"
            >
              Apply as a Provider →
            </a>
          </div>
        )}

        {/* Back link */}
        <Link href="/directory" className="text-sm text-zinc-400 hover:text-zinc-600">
          ← Back to Directory
        </Link>
      </main>

      <footer className="border-t border-zinc-200 bg-white mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-zinc-400 text-center">
          © 2025 DigitalWealthTransfer.com · Las Vegas, Nevada
        </div>
      </footer>
    </>
  );
}
