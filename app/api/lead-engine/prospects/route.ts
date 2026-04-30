import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return createClient(url!, key!);
}

function sanitizeInsert(body: Record<string, unknown>) {
  return {
    business_name: body.business_name,
    website: body.website || null,
    instagram_url: body.instagram_url || null,
    linkedin_url: body.linkedin_url || null,
    industry: body.industry || null,
    location: body.location || null,
    contact_name: body.contact_name || null,
    email: body.email || null,
    phone: body.phone || null,
    source: body.source || null,
    problem_signal: body.problem_signal || null,
    status: body.status || "New",
    notes: body.notes || null,
    last_contacted_at: body.last_contacted_at || null,
    next_followup_at: body.next_followup_at || null,
  };
}

export async function GET() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("prospects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ prospects: data ?? [] });
}

export async function POST(request: NextRequest) {
  const supabase = getSupabase();
  try {
    const body = await request.json();

    // Support bulk import (array) or single insert
    const isArray = Array.isArray(body);
    const rows = isArray ? body : [body];

    if (rows.length === 0) {
      return Response.json({ error: "No rows provided" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("prospects")
      .insert(rows.map(sanitizeInsert))
      .select();

    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ prospects: data }, { status: 201 });
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
}
