import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, service, companySlug } = body;

  if (!name || !email || !companySlug) {
    return Response.json(
      { error: "name, email, and companySlug are required" },
      { status: 422 }
    );
  }

  const { data, error } = await supabase
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

  if (error) {
    console.error("Supabase insert error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true, leadId: data.id }, { status: 201 });
}

export async function GET() {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error);
    return Response.json({ error: "Failed to fetch leads" }, { status: 500 });
  }

  return Response.json({ count: data.length, leads: data });
}
