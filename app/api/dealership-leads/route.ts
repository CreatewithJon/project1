import { NextRequest } from "next/server";

interface DealershipLead {
  name: string;
  phone?: string;
  email: string;
  lead_type: string;
  vehicle_slug?: string;
  vehicle_interested_in?: string;
  budget?: string;
  down_payment?: string;
  credit_range?: string;
  trade_in?: string;
  preferred_contact?: string;
  vehicle_year?: string;
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_mileage?: string;
  vehicle_condition?: string;
  asking_price?: string;
  message?: string;
  source_page: string;
}

function hasSupabase(): boolean {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key);
}

async function insertLead(lead: DealershipLead) {
  const { createClient } = await import("@supabase/supabase-js");
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(url!, key!);

  const { data, error } = await supabase
    .from("dealership_leads")
    .insert([lead])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function GET() {
  try {
    const { createClient } = await import("@supabase/supabase-js");
    const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(url!, key!);

    const { data, error } = await supabase
      .from("dealership_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return Response.json({ leads: data ?? [] });
  } catch (err) {
    return Response.json({ error: err instanceof Error ? err.message : "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: DealershipLead = await request.json();

    if (!body.name || !body.email) {
      return Response.json({ error: "name and email are required" }, { status: 422 });
    }

    const lead: DealershipLead = {
      ...body,
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim(),
    };

    console.log("[dealership-leads] New submission:", {
      lead_type: lead.lead_type,
      name: lead.name,
      email: lead.email,
      vehicle: lead.vehicle_interested_in ?? lead.vehicle_slug ?? "—",
      source: lead.source_page,
      timestamp: new Date().toISOString(),
    });

    if (hasSupabase()) {
      await insertLead(lead);
    } else {
      console.warn("[dealership-leads] Supabase not configured — lead logged to console only.");
    }

    return Response.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[dealership-leads] Error:", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
