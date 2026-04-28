import type { Company } from "@/lib/types";

export const companies: Company[] = [
  {
    id: "1",
    slug: "nft-las-vegas",
    name: "NFT Las Vegas",
    categories: ["Blockchain Infrastructure"],
    description:
      "NFT Las Vegas is a digital marketplace and community hub connecting creators, collectors, and businesses with NFT and blockchain services in the Las Vegas market.",
    website: "https://nftlasvegas.io",
    location: "Las Vegas",
    tags: ["NFT", "digital assets", "marketplace", "blockchain", "Las Vegas"],
    isPremium: true,
    isFeatured: true,
    isClaimed: true,
  },
  {
    id: "2",
    slug: "advanced-ai-marketing",
    name: "Advanced AI Marketing Las Vegas",
    categories: ["AI Services", "Enterprise AI Solutions"],
    description:
      "Advanced AI Marketing Las Vegas delivers AI-powered marketing automation and digital growth strategies for businesses looking to leverage artificial intelligence for customer acquisition.",
    website: "https://advancedaimarketinglasvegas.com",
    location: "Las Vegas",
    tags: ["AI marketing", "automation", "digital marketing", "lead generation", "Las Vegas"],
    isPremium: true,
    isFeatured: true,
    isClaimed: true,
  },
  {
    id: "3",
    slug: "ai-smart-ventures",
    name: "AI Smart Ventures",
    categories: ["Enterprise AI Solutions", "AI Services"],
    description:
      "AI Smart Ventures helps businesses identify and implement AI-driven solutions, offering strategic consulting and deployment services across industries in the Las Vegas region.",
    website: "https://aismartventures.com",
    location: "Las Vegas",
    tags: ["AI consulting", "strategy", "business automation", "AI deployment"],
    isPremium: true,
    isFeatured: true,
    isClaimed: true,
  },
  {
    id: "4",
    slug: "effectivesoft",
    name: "Effectivesoft",
    categories: ["Enterprise AI Solutions", "AI Services"],
    description:
      "Effectivesoft is a custom software development firm specializing in AI integration, enterprise applications, and digital transformation solutions for businesses across industries.",
    website: "https://www.effectivesoft.com",
    location: "Las Vegas",
    tags: ["software development", "AI integration", "enterprise", "digital transformation"],
    isPremium: true,
    isFeatured: true,
    isClaimed: true,
  },
  {
    id: "5",
    slug: "sapient-pro",
    name: "Sapient.pro",
    categories: ["Enterprise AI Solutions", "AI Services"],
    description:
      "Sapient.pro provides expert AI consulting and technology solutions, helping organizations design and deploy intelligent systems that drive measurable business outcomes.",
    website: "https://sapient.pro",
    location: "Las Vegas",
    tags: ["AI consulting", "technology solutions", "intelligent systems", "enterprise AI"],
    isPremium: true,
    isFeatured: true,
    isClaimed: true,
  },
  {
    id: "6",
    slug: "its-asap",
    name: "IT's ASAP",
    categories: ["AI Services", "Enterprise AI Solutions"],
    description:
      "IT's ASAP delivers rapid IT support, managed services, and technology solutions for businesses, combining responsive service with modern AI-enhanced tools.",
    website: "https://www.itsasap.com",
    location: "Las Vegas",
    tags: ["IT support", "managed services", "technology solutions", "AI tools"],
    isPremium: true,
    isFeatured: true,
    isClaimed: true,
  },
];

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

export function filterCompanies(params: {
  search?: string;
  category?: string;
  location?: string;
}): Company[] {
  let results = [...companies];

  if (params.search) {
    const q = params.search.toLowerCase();
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (params.category) {
    results = results.filter((c) =>
      c.categories.some((cat) => cat === params.category)
    );
  }

  if (params.location) {
    results = results.filter((c) => c.location === params.location);
  }

  return results.sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    if (a.isPremium && !b.isPremium) return -1;
    if (!a.isPremium && b.isPremium) return 1;
    return 0;
  });
}

export const ALL_CATEGORIES = [
  "AI Services",
  "Enterprise AI Solutions",
  "AI Wealth Advisors",
  "Blockchain Infrastructure",
  "Digital Asset Custody",
  "Fintech Platforms",
  "Estate Tech",
] as const;

export const ALL_LOCATIONS = [
  "Las Vegas",
  "Summerlin",
  "Henderson",
  "Downtown Las Vegas",
  "North Las Vegas",
  "Spring Valley",
  "Enterprise",
] as const;
