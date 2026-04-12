import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );
}

export async function POST(request: NextRequest) {
  try {
    let body: Record<string, string>;

    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid or empty request body" }, { status: 400 });
    }

    const { name, email, service, companySlug, lead_type } = body;

    if (!name || !email || !companySlug) {
      return Response.json(
        { error: "name, email, and companySlug are required" },
        { status: 422 }
      );
    }

    // Log every submission so you can monitor without checking the DB manually
    console.log("[leads] New submission:", {
      lead_type: lead_type ?? "unknown",
      name: name.trim(),
      email: email.trim().toLowerCase(),
      companySlug,
      service: service?.slice(0, 120),
      timestamp: new Date().toISOString(),
    });

    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          service: service?.trim() ?? null,
          company_slug: companySlug,
          // TODO: add `lead_type text` column to your Supabase leads table to store this field.
          // Run in Supabase SQL editor: ALTER TABLE leads ADD COLUMN lead_type text;
          lead_type: lead_type ?? null,
        },
      ])
      .select()
      .single();

    if (error) {
      // If lead_type column doesn't exist yet, retry without it so existing submissions still work
      if (error.message.includes("lead_type")) {
        console.warn("[leads] lead_type column missing — retrying without it. Add the column to fix this.");
        const { data: fallbackData, error: fallbackError } = await supabase
          .from("leads")
          .insert([
            {
              name: name.trim(),
              email: email.trim().toLowerCase(),
              service: service?.trim() ?? null,
              company_slug: companySlug,
            },
          ])
          .select()
          .single();

        if (fallbackError) {
          console.error("[leads] Supabase fallback insert error:", fallbackError);
          return Response.json({ error: fallbackError.message }, { status: 500 });
        }

        return Response.json({ success: true, leadId: fallbackData.id }, { status: 201 });
      }

      console.error("[leads] Supabase insert error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    // TODO: Add email notification here (e.g. Resend, SendGrid, or Supabase webhook)
    // so you receive an alert every time a lead is submitted.

    return Response.json({ success: true, leadId: data.id }, { status: 201 });
  } catch (err) {
    console.error("[leads] Unhandled POST error:", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[leads] Supabase fetch error:", error);
    return Response.json({ error: "Failed to fetch leads" }, { status: 500 });
  }

  return Response.json({ count: data.length, leads: data });
}
