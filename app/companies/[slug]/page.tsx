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
    <div className="min-h-screen bg-[#0B0F1A] text-[#F9FAFB]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-10 w-full">

        {/* Breadcrumb */}
        <nav className="text-sm text-[#A1A1AA] mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="text-white/20">/</span>
          <Link href="/directory" className="hover:text-white transition-colors">Directory</Link>
          <span className="text-white/20">/</span>
          <span className="text-white/60">{company.name}</span>
        </nav>

        <div className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-7 mb-6">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-2xl font-bold text-white">{company.name}</h1>
                {company.isFeatured && (
                  <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium px-2 py-0.5 rounded-full">
                    Curated Partner
                  </span>
                )}
              </div>
              <p className="text-sm text-[#A1A1AA]">{company.location}, Nevada</p>
            </div>
            {company.website && !company.website.includes("example.com") && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.25)]"
              >
                Visit Website →
              </a>
            )}
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-5">
            {company.categories.map((cat) => (
              <Link
                key={cat}
                href={`/directory?category=${encodeURIComponent(cat)}`}
                className="text-sm bg-white/[0.06] text-[#A1A1AA] px-3 py-1 rounded-full border border-white/[0.06] hover:bg-white/[0.1] transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Description */}
          <p className="text-[#A1A1AA] leading-relaxed mb-6">{company.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {company.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-[#A1A1AA]/60 border border-white/[0.06] px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Lead capture form */}
        <LeadForm companySlug={company.slug} companyName={company.name} />

        {/* Claim profile CTA */}
        {!company.isClaimed && (
          <div id="claim" className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-6 mb-6">
            <h2 className="font-semibold text-white mb-1">Is this your business?</h2>
            <p className="text-sm text-[#A1A1AA] mb-4">
              Claim this profile to update your information and unlock premium placement. Apply as a provider to get started.
            </p>
            <a
              href="/#provider-form"
              className="inline-block bg-white/[0.08] text-white border border-white/[0.12] px-4 py-2 rounded-xl text-sm font-semibold hover:bg-white/[0.12] transition-colors"
            >
              Apply as a Provider →
            </a>
          </div>
        )}

        {/* Back link */}
        <Link href="/directory" className="text-sm text-[#A1A1AA] hover:text-white transition-colors">
          ← Back to Directory
        </Link>
      </main>

      <footer className="border-t border-white/[0.06] mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-[#A1A1AA]/50 text-center">
          © 2025 DigitalWealthTransfer.com · Las Vegas, Nevada
        </div>
      </footer>
    </div>
  );
}
