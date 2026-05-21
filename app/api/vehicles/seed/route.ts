import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/db/vehicles";
import { vehicles } from "@/lib/data/vehicles";

export async function POST() {
  const supabase = getSupabase();

  // Check which slugs already exist so we don't double-insert
  const { data: existing } = await supabase
    .from("vehicles")
    .select("slug");

  const existingSlugs = new Set((existing ?? []).map((r: { slug: string }) => r.slug));

  const toInsert = vehicles
    .filter((v) => !existingSlugs.has(v.slug))
    .map((v) => ({
      slug: v.slug,
      year: v.year,
      make: v.make,
      model: v.model,
      trim: v.trim,
      category: v.category,
      category_label: v.categoryLabel,
      mileage: v.mileage,
      price: v.price,
      monthly_payment: v.monthlyPayment,
      color: v.color,
      description: v.description,
      features: v.features,
      specs: v.specs,
      image_url: v.imageUrl,
      gradient: v.gradient,
      accent_color: v.accentColor,
      featured: v.featured,
      sold: false,
    }));

  if (toInsert.length === 0) {
    return NextResponse.json({ message: "All vehicles already imported.", seeded: 0 });
  }

  const { error } = await supabase.from("vehicles").insert(toInsert);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: `Imported ${toInsert.length} vehicle(s).`, seeded: toInsert.length });
}
