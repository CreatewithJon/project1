import Link from "next/link";
import type { Company } from "@/lib/types";

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <div className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-5 hover:border-blue-500/25 hover:shadow-[0_0_25px_rgba(59,130,246,0.07)] transition-all relative">
      {company.isFeatured && (
        <span className="absolute top-3 right-3 text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium px-2 py-0.5 rounded-full">
          Curated Partner
        </span>
      )}

      <div className="flex flex-wrap gap-1.5 mb-3">
        {company.categories.map((cat) => (
          <span
            key={cat}
            className="text-xs bg-white/[0.06] text-[#A1A1AA] px-2 py-0.5 rounded-full border border-white/[0.06]"
          >
            {cat}
          </span>
        ))}
      </div>

      <h3 className="font-semibold text-white text-base mb-1">
        <Link href={`/companies/${company.slug}`} className="hover:text-blue-400 transition-colors">
          {company.name}
        </Link>
      </h3>

      <p className="text-xs text-[#A1A1AA] mb-2">{company.location}, Nevada</p>

      <p className="text-sm text-[#A1A1AA] mb-4 line-clamp-2">{company.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {company.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="text-xs text-[#A1A1AA]/60 border border-white/[0.06] px-2 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
        <Link
          href={`/companies/${company.slug}`}
          className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
        >
          View Profile →
        </Link>
        {!company.isClaimed && (
          <Link
            href={`/companies/${company.slug}#claim`}
            className="text-sm text-[#A1A1AA]/50 hover:text-[#A1A1AA] ml-auto transition-colors"
          >
            Claim this listing
          </Link>
        )}
      </div>
      {company.website && !company.website.includes("example.com") && (
        <div className="mt-2">
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#A1A1AA]/50 hover:text-[#A1A1AA] transition-colors"
          >
            Visit website →
          </a>
        </div>
      )}
    </div>
  );
}
