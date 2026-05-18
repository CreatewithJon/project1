/**
 * GET  /api/lead-engine/raw-leads           — list real_estate_leads
 * POST /api/lead-engine/raw-leads           — create one or many leads
 * PUT  /api/lead-engine/raw-leads?id=xxx    — update a lead's status / fields
 */

import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return createClient(url!, key!);
}

// ── GET ───────────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const supabase = getSupabase();
  const { searchParams } = new URL(request.url);

  const status = searchParams.get("status");
  const niche = searchParams.get("niche");
  const limit = parseInt(searchParams.get("limit") ?? "200");

  let query = supabase
    .from("real_estate_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (status) query = query.eq("status", status);
  if (niche) query = query.eq("niche", niche);

  const { data, error } = await query;
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ leads: data ?? [], total: data?.length ?? 0 });
}

// ── POST ──────────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const supabase = getSupabase();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const rows = Array.isArray(body) ? body : [body];

  if (!rows.length || !rows[0].company_name) {
    return Response.json({ error: "Each row requires at least 'company_name'" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("real_estate_leads")
    .insert(rows)
    .select();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ leads: data }, { status: 201 });
}

// ── PUT ───────────────────────────────────────────────────────────────────────

export async function PUT(request: NextRequest) {
  const supabase = getSupabase();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) return Response.json({ error: "Provide ?id=xxx" }, { status: 400 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Whitelist updatable fields to prevent injection
  const allowed: (keyof typeof body)[] = [
    "status", "outreach_status", "notes", "contact_name", "email",
    "phone", "website", "lead_score", "ai_summary", "website_quality",
    "recommended_offer", "outreach_angle", "missing_features",
  ];
  const updates = Object.fromEntries(
    Object.entries(body).filter(([k]) => allowed.includes(k))
  );

  const { data, error } = await supabase
    .from("real_estate_leads")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ lead: data });
}
