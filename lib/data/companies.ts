import type { Company } from "@/lib/types";

export const companies: Company[] = [
  {
    id: "1",
    slug: "nexus-ai-solutions",
    name: "Nexus AI Solutions",
    categories: ["Enterprise AI Solutions", "AI Services"],
    description:
      "Nexus AI delivers enterprise-grade artificial intelligence platforms for financial services firms in the Las Vegas market, specializing in fraud detection and predictive analytics.",
    website: "https://nexusai.example.com",
    location: "Summerlin",
    tags: ["machine learning", "fraud detection", "predictive analytics", "enterprise"],
    email: "contact@nexusai.example.com",
    phone: "(702) 555-0101",
    isPremium: true,
    isFeatured: true,
    isClaimed: true,
  },
  {
    id: "2",
    slug: "desert-chain-labs",
    name: "Desert Chain Labs",
    categories: ["Blockchain Infrastructure"],
    description:
      "Desert Chain Labs builds and maintains blockchain infrastructure for enterprises and DeFi projects across Nevada, offering node hosting, smart contract auditing, and chain consulting.",
    website: "https://desertchain.example.com",
    location: "Henderson",
    tags: ["blockchain", "smart contracts", "DeFi", "node hosting", "auditing"],
    email: "hello@desertchain.example.com",
    phone: "(702) 555-0202",
    isPremium: true,
    isClaimed: true,
  },
  {
    id: "3",
    slug: "silver-state-custody",
    name: "Silver State Custody",
    categories: ["Digital Asset Custody"],
    description:
      "Silver State Custody provides institutional-grade cold storage and digital asset custody services, fully compliant with Nevada state regulations.",
    website: "https://silverstatecustody.example.com",
    location: "Downtown Las Vegas",
    tags: ["custody", "cold storage", "institutional", "compliance", "crypto"],
    email: "secure@silverstatecustody.example.com",
    isPremium: true,
    isClaimed: true,
  },
  {
    id: "4",
    slug: "vegas-wealth-ai",
    name: "Vegas Wealth AI",
    categories: ["AI Wealth Advisors", "Fintech Platforms"],
    description:
      "Vegas Wealth AI combines robo-advisory technology with human expertise to optimize portfolios that include both traditional assets and digital currencies.",
    website: "https://vegaswealthai.example.com",
    location: "Summerlin",
    tags: ["robo-advisor", "portfolio management", "wealth management", "crypto", "AI"],
    email: "invest@vegaswealthai.example.com",
    phone: "(702) 555-0303",
    isClaimed: true,
  },
  {
    id: "5",
    slug: "meridian-fintech",
    name: "Meridian Fintech",
    categories: ["Fintech Platforms"],
    description:
      "Meridian Fintech offers payment infrastructure, digital banking APIs, and compliance tooling for startups and established businesses expanding into digital payments.",
    website: "https://meridianfintech.example.com",
    location: "Enterprise",
    tags: ["payments", "API", "digital banking", "compliance", "fintech"],
    email: "partners@meridianfintech.example.com",
    phone: "(702) 555-0404",
    isPremium: true,
    isClaimed: true,
  },
  {
    id: "6",
    slug: "nevada-estate-tech",
    name: "Nevada Estate Tech",
    categories: ["Estate Tech"],
    description:
      "Nevada Estate Tech modernizes estate planning with digital asset inheritance tools, smart-will contracts, and estate administration software for attorneys and financial advisors.",
    website: "https://nevadaestatetech.example.com",
    location: "Henderson",
    tags: ["estate planning", "digital inheritance", "smart wills", "attorneys"],
    email: "info@nevadaestatetech.example.com",
    isClaimed: false,
  },
  {
    id: "7",
    slug: "block-valley-consulting",
    name: "Block Valley Consulting",
    categories: ["Blockchain Infrastructure", "Enterprise AI Solutions"],
    description:
      "Block Valley Consulting advises Fortune 500 companies on blockchain adoption strategies and AI integration, bridging enterprise legacy systems with decentralized infrastructure.",
    website: "https://blockvalley.example.com",
    location: "Spring Valley",
    tags: ["consulting", "enterprise blockchain", "strategy", "AI integration"],
    phone: "(702) 555-0505",
    isClaimed: false,
  },
  {
    id: "8",
    slug: "pinnacle-digital-assets",
    name: "Pinnacle Digital Assets",
    categories: ["Digital Asset Custody", "Fintech Platforms"],
    description:
      "Pinnacle Digital Assets operates a regulated exchange and custody platform for high-net-worth individuals and family offices seeking exposure to digital asset markets.",
    website: "https://pinnacle.example.com",
    location: "Summerlin",
    tags: ["exchange", "custody", "HNW", "family office", "regulated"],
    email: "wealth@pinnacle.example.com",
    phone: "(702) 555-0606",
    isPremium: true,
    isFeatured: true,
    isClaimed: true,
  },
  {
    id: "9",
    slug: "ai-wealth-navigator",
    name: "AI Wealth Navigator",
    categories: ["AI Wealth Advisors"],
    description:
      "AI Wealth Navigator uses machine learning models trained on Las Vegas regional market data to provide hyper-local investment recommendations and risk scoring.",
    website: "https://aiwealthnavigator.example.com",
    location: "North Las Vegas",
    tags: ["machine learning", "investment", "risk scoring", "local market"],
    email: "hello@aiwealthnavigator.example.com",
    isClaimed: false,
  },
  {
    id: "10",
    slug: "crypto-corridor-nv",
    name: "Crypto Corridor NV",
    categories: ["Blockchain Infrastructure", "Digital Asset Custody"],
    description:
      "Crypto Corridor NV is a co-working hub and incubator for blockchain startups, offering office space, mentorship, and technical infrastructure in downtown Las Vegas.",
    website: "https://cryptocorridor.example.com",
    location: "Downtown Las Vegas",
    tags: ["incubator", "co-working", "startup", "community", "networking"],
    email: "join@cryptocorridor.example.com",
    phone: "(702) 555-0707",
    isClaimed: true,
  },
  {
    id: "11",
    slug: "sunbelt-ai-labs",
    name: "Sunbelt AI Labs",
    categories: ["AI Services", "Enterprise AI Solutions"],
    description:
      "Sunbelt AI Labs develops custom large language model applications and AI agents for hospitality, real estate, and finance sectors throughout the Southwest.",
    website: "https://sunbeltai.example.com",
    location: "Las Vegas",
    tags: ["LLM", "AI agents", "custom AI", "hospitality", "real estate"],
    email: "build@sunbeltai.example.com",
    phone: "(702) 555-0808",
    isPremium: true,
    isClaimed: true,
  },
  {
    id: "12",
    slug: "digitrust-estate",
    name: "DigiTrust Estate",
    categories: ["Estate Tech", "AI Wealth Advisors"],
    description:
      "DigiTrust Estate combines AI-driven estate valuation with blockchain-based asset transfer protocols, making digital wealth transfer seamless and secure for families.",
    website: "https://digitrust.example.com",
    location: "Henderson",
    tags: ["estate valuation", "digital transfer", "family wealth", "blockchain", "AI"],
    email: "trust@digitrust.example.com",
    isFeatured: true,
    isClaimed: false,
  },
  {
    id: "13",
    slug: "oasis-fintech-group",
    name: "Oasis Fintech Group",
    categories: ["Fintech Platforms", "AI Services"],
    description:
      "Oasis Fintech Group provides white-label lending and credit scoring platforms powered by AI, enabling regional banks and credit unions to modernize their loan origination pipelines.",
    website: "https://oasisfintech.example.com",
    location: "Enterprise",
    tags: ["lending", "credit scoring", "white-label", "banks", "credit unions"],
    email: "partners@oasisfintech.example.com",
    phone: "(702) 555-0909",
    isClaimed: true,
  },
  {
    id: "14",
    slug: "nevada-node-works",
    name: "Nevada Node Works",
    categories: ["Blockchain Infrastructure"],
    description:
      "Nevada Node Works specializes in high-availability validator node operations for major proof-of-stake networks, offering institutional staking services from Nevada data centers.",
    website: "https://nevadanodeworks.example.com",
    location: "North Las Vegas",
    tags: ["staking", "validator", "PoS", "infrastructure", "data center"],
    email: "stake@nevadanodeworks.example.com",
    isClaimed: false,
  },
  {
    id: "15",
    slug: "heritage-digital-planning",
    name: "Heritage Digital Planning",
    categories: ["Estate Tech"],
    description:
      "Heritage Digital Planning works with estate attorneys to create legally compliant plans for transferring cryptocurrency, NFTs, and tokenized assets to beneficiaries.",
    website: "https://heritagedigital.example.com",
    location: "Summerlin",
    tags: ["NFTs", "tokenized assets", "beneficiaries", "legal", "crypto estate"],
    email: "plan@heritagedigital.example.com",
    phone: "(702) 555-1010",
    isClaimed: false,
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

  // Featured and premium first
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
  "Summerlin",
  "Henderson",
  "Downtown Las Vegas",
  "North Las Vegas",
  "Spring Valley",
  "Enterprise",
  "Las Vegas",
] as const;
