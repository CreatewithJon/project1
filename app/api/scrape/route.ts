/**
 * POST /api/scrape — trigger an Apify Google Maps scrape
 * GET  /api/scrape?runId=xxx — poll run status + retrieve results
 *
 * Env vars: APIFY_API_TOKEN, APIFY_ACTOR_ID (optional)
 */

import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  triggerScrape,
  getRunStatus,
  getDatasetItems,
  normalizePlaceToLead,
  type ApifyRun,
} from "@/lib/apify";

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return createClient(url!, key!);
}

// ── POST: trigger a new scrape ───────────────────────────────────────────────

export async function POST(request: NextRequest) {
  if (!process.env.APIFY_API_TOKEN) {
    return Response.json(
      { error: "APIFY_API_TOKEN not configured — add it in Vercel env vars." },
      { status: 500 }
    );
  }

  let body: { niches?: string[]; city?: string; state?: string; maxPerQuery?: number; rawQueries?: string[] };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { niches = [], city = "Las Vegas", state = "NV", maxPerQuery = 20, rawQueries } = body;

  // rawQueries bypasses the niche+location builder — used for free-search mode
  let queries: string[];
  if (rawQueries && rawQueries.length > 0) {
    queries = rawQueries.map((q) => q.trim()).filter(Boolean);
    if (!queries.length) {
      return Response.json({ error: "Provide at least one search query." }, { status: 400 });
    }
  } else {
    if (!niches.length) {
      return Response.json({ error: "Provide at least one niche in the 'niches' array." }, { status: 400 });
    }
    queries = niches.map((niche) => `${niche} ${city} ${state}`);
  }

  try {
    const { runId } = await triggerScrape({ queries, maxPerQuery });
    return Response.json({ runId, queries, status: "RUNNING" });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Failed to trigger scrape" },
      { status: 500 }
    );
  }
}

// ── GET: poll status + (on success) store results ───────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const runId = searchParams.get("runId");
  const niche = searchParams.get("niche") ?? "real estate";
  const store = searchParams.get("store") === "true";

  if (!runId) {
    return Response.json({ error: "Provide ?runId=xxx" }, { status: 400 });
  }

  if (!process.env.APIFY_API_TOKEN) {
    return Response.json({ error: "APIFY_API_TOKEN not configured" }, { status: 500 });
  }

  let run: ApifyRun;
  try {
    run = await getRunStatus(runId);
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Failed to check run status" },
      { status: 500 }
    );
  }

  // Still running — return status only
  if (run.status === "RUNNING" || run.status === "READY") {
    return Response.json({ runId, status: run.status, results: null });
  }

  // Failed / aborted
  if (run.status !== "SUCCEEDED") {
    return Response.json(
      { runId, status: run.status, error: `Run ended with status: ${run.status}` },
      { status: 422 }
    );
  }

  // Succeeded — fetch results
  let places;
  try {
    places = await getDatasetItems(run.defaultDatasetId);
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Failed to fetch results" },
      { status: 500 }
    );
  }

  const normalized = places.map((p) => normalizePlaceToLead(p, niche));

  // Optionally store in Supabase
  if (store && normalized.length > 0) {
    const supabase = getSupabase();

    // Deduplicate: skip leads whose company_name + phone already exist
    const { data: existing } = await supabase
      .from("real_estate_leads")
      .select("company_name, phone");

    const existingSet = new Set(
      (existing ?? []).map((e) => `${e.company_name}|${e.phone ?? ""}`)
    );

    const toInsert = normalized.filter(
      (l) => !existingSet.has(`${l.company_name}|${l.phone ?? ""}`)
    );

    if (toInsert.length > 0) {
      const { error } = await supabase.from("real_estate_leads").insert(toInsert);
      if (error) {
        return Response.json({ error: `DB insert failed: ${error.message}` }, { status: 500 });
      }
    }

    return Response.json({
      runId,
      status: "SUCCEEDED",
      total: places.length,
      stored: toInsert.length,
      skipped: normalized.length - toInsert.length,
      results: normalized,
    });
  }

  return Response.json({
    runId,
    status: "SUCCEEDED",
    total: places.length,
    results: normalized,
  });
}
