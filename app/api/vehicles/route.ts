import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/db/vehicles";

function slugify(year: number, make: string, model: string): string {
  const base = `${year}-${make}-${model}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const suffix = Math.random().toString(36).slice(2, 7);
  return `${base}-${suffix}`;
}

export async function GET(req: NextRequest) {
  const supabase = getSupabase();
  const available = req.nextUrl.searchParams.get("available");

  let query = supabase.from("vehicles").select("*").order("created_at", { ascending: false });
  if (available === "1") query = query.eq("sold", false);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ vehicles: data ?? [] });
}

export async function POST(req: NextRequest) {
  let body: {
    year?: number;
    make?: string;
    model?: string;
    trim?: string;
    category?: string;
    mileage?: number;
    price?: number;
    color?: string;
    description?: string;
    image_url?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { year, make, model, price } = body;
  if (!year || !make || !model || !price) {
    return NextResponse.json({ error: "year, make, model, and price are required." }, { status: 400 });
  }

  const supabase = getSupabase();
  const monthly_payment = Math.round(Number(price) * 0.0173);

  const { data, error } = await supabase
    .from("vehicles")
    .insert([
      {
        slug: slugify(year, make, model),
        year: Number(year),
        make,
        model,
        trim: body.trim ?? null,
        category: body.category ?? "other",
        category_label: body.category ?? "Other",
        mileage: body.mileage ? Number(body.mileage) : null,
        price: Number(price),
        monthly_payment,
        color: body.color ?? null,
        description: body.description ?? null,
        image_url: body.image_url ?? null,
        sold: false,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ vehicle: data }, { status: 201 });
}
