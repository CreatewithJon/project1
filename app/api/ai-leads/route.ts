import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return createClient(url!, key!);
}

export async function POST(request: NextRequest) {
  try {
    let body: Record<string, string>;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid or empty request body" }, { status: 400 });
    }

    const { name, email, business_name, website, industry, service_need, budget, message } = body;

    if (!name || !email) {
      return Response.json({ error: "name and email are required" }, { status: 422 });
    }

    console.log("[ai-leads] New submission:", {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      business_name,
      service_need,
      budget,
      timestamp: new Date().toISOString(),
    });

    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("ai_leads")
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          business_name: business_name?.trim() ?? null,
          website: website?.trim() ?? null,
          industry: industry?.trim() ?? null,
          service_need: service_need ?? null,
          budget: budget ?? null,
          message: message?.trim() ?? null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("[ai-leads] Supabase insert error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true, leadId: data.id }, { status: 201 });
  } catch (err) {
    console.error("[ai-leads] Unhandled error:", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
