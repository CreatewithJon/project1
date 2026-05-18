/**
 * Apify client utilities
 *
 * Env vars required:
 *   APIFY_API_TOKEN    — from apify.com → Settings → Integrations
 *   APIFY_ACTOR_ID     — default: "apify~google-maps-scraper"
 *
 * Actor docs: https://apify.com/apify/google-maps-scraper
 */

const APIFY_BASE = "https://api.apify.com/v2";

function getToken(): string {
  const token = process.env.APIFY_API_TOKEN;
  if (!token) throw new Error("APIFY_API_TOKEN is not set in environment variables.");
  return token;
}

function getActorId(): string {
  return process.env.APIFY_ACTOR_ID ?? "compass~crawler-google-places";
}

// ── Types ────────────────────────────────────────────────────────────────────

export type ApifyRunStatus =
  | "READY"
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "ABORTED"
  | "TIMED-OUT";

export interface ApifyRun {
  id: string;
  status: ApifyRunStatus;
  defaultDatasetId: string;
  startedAt?: string;
  finishedAt?: string;
  stats?: {
    inputBodyLen: number;
    durationMillis?: number;
  };
}

export interface GoogleMapsPlace {
  title: string;
  website?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  countryCode?: string;
  postalCode?: string;
  categoryName?: string;
  categories?: string[];
  totalScore?: number;
  reviewsCount?: number;
  url?: string;           // Google Maps URL
  email?: string;
  temporarilyClosed?: boolean;
  permanentlyClosed?: boolean;
  placeId?: string;
}

export interface ScrapeParams {
  /** Search queries, e.g. ["mortgage broker Las Vegas NV"] */
  queries: string[];
  /** Max places per query (default 20, max 100 without a paid Apify plan) */
  maxPerQuery?: number;
}

// ── API Calls ────────────────────────────────────────────────────────────────

/**
 * Kick off an Apify actor run and return the run ID immediately.
 * The run is asynchronous — poll getRunStatus() until SUCCEEDED.
 */
export async function triggerScrape(params: ScrapeParams): Promise<{ runId: string }> {
  const token = getToken();
  const actorId = getActorId();

  const body = {
    searchStringsArray: params.queries,
    maxCrawledPlacesPerSearch: params.maxPerQuery ?? 20,
    language: "en",
    maxImages: 0,
    maxReviews: 0,
    exportPlaceUrls: false,
    includeHistogram: false,
    includeOpeningHours: false,
    includePeopleAlsoSearch: false,
    scrapeDirectories: false,
    deeperCityScrape: false,
  };

  const res = await fetch(`${APIFY_BASE}/acts/${encodeURIComponent(actorId)}/runs?token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Apify trigger failed (${res.status}): ${txt}`);
  }

  const json = await res.json();
  return { runId: json.data.id as string };
}

/**
 * Poll run status. Keep calling until status is SUCCEEDED, FAILED, or ABORTED.
 */
export async function getRunStatus(runId: string): Promise<ApifyRun> {
  const token = getToken();

  const res = await fetch(`${APIFY_BASE}/actor-runs/${runId}?token=${token}`);
  if (!res.ok) throw new Error(`Apify status check failed (${res.status})`);

  const json = await res.json();
  const d = json.data;

  return {
    id: d.id,
    status: d.status,
    defaultDatasetId: d.defaultDatasetId,
    startedAt: d.startedAt,
    finishedAt: d.finishedAt,
    stats: d.stats,
  };
}

/**
 * Fetch the results from a completed run's dataset.
 */
export async function getDatasetItems(datasetId: string): Promise<GoogleMapsPlace[]> {
  const token = getToken();

  const url = `${APIFY_BASE}/datasets/${datasetId}/items?token=${token}&format=json&clean=true&limit=200`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Apify dataset fetch failed (${res.status})`);

  const items: GoogleMapsPlace[] = await res.json();

  // Filter out closed businesses and ones without usable data
  return items.filter(
    (p) => !p.permanentlyClosed && !p.temporarilyClosed && (p.website || p.phone)
  );
}

/**
 * Normalize a Google Maps place into the shape we store in real_estate_leads.
 */
export function normalizePlaceToLead(place: GoogleMapsPlace, niche: string, source = "apify_google_maps") {
  // Try to extract city/state from address
  const addressParts = place.address?.split(",").map((s) => s.trim()) ?? [];
  const city = place.city ?? addressParts[1] ?? null;
  const stateZip = place.state ?? addressParts[2] ?? null;
  const state = stateZip?.split(" ")[0] ?? null;

  return {
    company_name: place.title,
    phone: place.phone ?? null,
    website: place.website ?? null,
    address: place.address ?? null,
    city,
    state,
    niche,
    source,
    google_maps_url: place.url ?? null,
    google_rating: place.totalScore ?? null,
    google_review_count: place.reviewsCount ?? null,
    raw_data: place,
    status: "new",
    outreach_status: "none",
  };
}
