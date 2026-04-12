import Link from "next/link";
import type { Company } from "@/lib/types";

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <div className="border border-zinc-200 rounded-lg p-5 bg-white hover:border-blue-300 hover:shadow-sm transition-all relative">
      {company.isFeatured && (
        <span className="absolute top-3 right-3 text-xs bg-amber-100 text-amber-700 font-medium px-2 py-0.5 rounded-full">
          Featured
        </span>
      )}
      {!company.isFeatured && company.isPremium && (
        <span className="absolute top-3 right-3 text-xs bg-blue-50 text-blue-600 font-medium px-2 py-0.5 rounded-full">
          Premium
        </span>
      )}

      <div className="flex flex-wrap gap-1.5 mb-3">
        {company.categories.map((cat) => (
          <span
            key={cat}
            className="text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full"
          >
            {cat}
          </span>
        ))}
      </div>

      <h3 className="font-semibold text-zinc-900 text-base mb-1">
        <Link href={`/companies/${company.slug}`} className="hover:text-blue-600 transition-colors">
          {company.name}
        </Link>
      </h3>

      <p className="text-xs text-zinc-500 mb-2">{company.location}, Nevada</p>

      <p className="text-sm text-zinc-600 mb-4 line-clamp-2">{company.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {company.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="text-xs text-zinc-400 border border-zinc-200 px-2 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-3 border-t border-zinc-100">
        <Link
          href={`/companies/${company.slug}`}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View Profile →
        </Link>
        {!company.isClaimed && (
          <Link
            href={`/companies/${company.slug}#claim`}
            className="text-sm text-zinc-400 hover:text-zinc-600 ml-auto"
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
            className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            Visit website →
          </a>
        </div>
      )}
    </div>
  );
}
