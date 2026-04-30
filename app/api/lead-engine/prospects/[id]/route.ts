import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return createClient(url!, key!);
}

const ALLOWED = [
  "business_name", "website", "instagram_url", "linkedin_url",
  "industry", "location", "contact_name", "email", "phone",
  "source", "problem_signal", "status", "notes",
  "last_contacted_at", "next_followup_at",
  "ai_score", "ai_score_reason", "recommended_offer", "outreach_drafts",
];

export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;
  const supabase = getSupabase();

  try {
    const raw = await request.json();
    const update: Record<string, unknown> = {};
    for (const key of ALLOWED) {
      if (key in raw) update[key] = raw[key];
    }

    const { data, error } = await supabase
      .from("prospects")
      .update(update)
      .eq("id", id)
      .select()
      .single();

    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ prospect: data });
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
}

export async function DELETE(
  _request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;
  const supabase = getSupabase();

  const { error } = await supabase.from("prospects").delete().eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
