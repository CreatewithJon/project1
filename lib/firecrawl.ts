/**
 * Firecrawl client utilities
 *
 * Env vars required:
 *   FIRECRAWL_API_KEY  — from firecrawl.dev → Dashboard → API Keys
 *
 * API docs: https://docs.firecrawl.dev/api-reference
 */

const FC_BASE = "https://api.firecrawl.dev/v1";

function getKey(): string {
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) throw new Error("FIRECRAWL_API_KEY is not set in environment variables.");
  return key;
}

// ── Types ────────────────────────────────────────────────────────────────────

export interface CrawlResult {
  /** Main page content as Markdown */
  markdown: string;
  /** Page <title> */
  title?: string;
  /** Meta description */
  metaDescription?: string;
  /** All links found on the page */
  links?: string[];
  /** HTTP status of the scraped page */
  statusCode?: number;
}

export interface WebsiteAnalysis {
  /** 0–10 overall quality / professionalism score */
  websiteQuality: number;
  /** True if any kind of booking / appointment system detected */
  hasBookingSystem: boolean;
  /** True if live chat widget detected */
  hasLiveChat: boolean;
  /** True if forms / lead capture detected */
  hasLeadCapture: boolean;
  /** True if basic SEO signals found (meta desc, h1, etc.) */
  hasSEO: boolean;
  /** True if social media links detected */
  hasSocial: boolean;
  /** Array of obvious missing features */
  missingFeatures: string[];
  /** 2–3 sentence plain-English AI summary */
  aiSummary: string;
  /** 1-sentence outreach hook */
  outreachAngle: string;
  /** Best matching DWT offer */
  recommendedOffer: string;
  /** 0–100 lead score */
  leadScore: number;
}

// ── API Calls ────────────────────────────────────────────────────────────────

/**
 * Crawl a single URL and return its markdown content.
 * Throws if the URL is unreachable or Firecrawl returns an error.
 */
export async function crawlUrl(url: string): Promise<CrawlResult> {
  const key = getKey();

  const normalized = url.startsWith("http") ? url : `https://${url}`;

  const res = await fetch(`${FC_BASE}/scrape`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      url: normalized,
      formats: ["markdown", "links"],
      onlyMainContent: true,
      timeout: 30000,
      waitFor: 1500,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Firecrawl error (${res.status}): ${txt}`);
  }

  const json = await res.json();
  const data = json.data ?? json;

  return {
    markdown: data.markdown ?? "",
    title: data.metadata?.title,
    metaDescription: data.metadata?.description,
    links: data.links ?? [],
    statusCode: data.metadata?.statusCode,
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Quick heuristic analysis of crawled content — no AI call needed.
 * Used to pre-populate fields before the full AI analysis.
 */
export function quickAnalysis(result: CrawlResult): Partial<WebsiteAnalysis> {
  const text = (result.markdown + " " + (result.links ?? []).join(" ")).toLowerCase();
  const links = (result.links ?? []).map((l) => l.toLowerCase());

  const bookingKeywords = ["book", "appointment", "schedule", "calendly", "acuity", "booking", "reserve"];
  const chatKeywords = ["chat", "intercom", "drift", "tidio", "freshchat", "livechat"];
  const formKeywords = ["contact", "inquiry", "get a quote", "free consultation", "call us", "reach out"];
  const socialKeywords = ["instagram", "facebook", "linkedin", "youtube", "twitter", "tiktok"];

  const hasBookingSystem = bookingKeywords.some((k) => text.includes(k));
  const hasLiveChat = chatKeywords.some((k) => text.includes(k));
  const hasLeadCapture = formKeywords.some((k) => text.includes(k));
  const hasSocial = socialKeywords.some((k) => links.some((l) => l.includes(k)));
  const hasSEO = !!(result.metaDescription && result.title);

  const missing: string[] = [];
  if (!hasBookingSystem) missing.push("Online booking / scheduling");
  if (!hasLiveChat) missing.push("Live chat or AI chatbot");
  if (!hasLeadCapture) missing.push("Lead capture form or CTA");
  if (!hasSocial) missing.push("Social media presence");
  if (!hasSEO) missing.push("SEO meta tags");

  // Quality score: starts at 5, adjust based on signals
  let quality = 5;
  if (hasBookingSystem) quality += 1;
  if (hasLiveChat) quality += 1;
  if (hasLeadCapture) quality += 1;
  if (hasSEO) quality += 1;
  if (result.markdown.length < 300) quality -= 2; // thin content
  if (result.markdown.length > 2000) quality += 1;

  return {
    hasBookingSystem,
    hasLiveChat,
    hasLeadCapture,
    hasSocial,
    hasSEO,
    missingFeatures: missing,
    websiteQuality: Math.min(10, Math.max(1, quality)),
  };
}
