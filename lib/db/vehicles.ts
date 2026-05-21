import { createClient } from "@supabase/supabase-js";
import type { Vehicle, VehicleCategory } from "@/lib/data/vehicles";

export interface DbVehicle {
  id: string;
  slug: string;
  year: number;
  make: string;
  model: string;
  trim: string | null;
  category: string;
  category_label: string | null;
  mileage: number | null;
  price: number;
  monthly_payment: number | null;
  color: string | null;
  description: string | null;
  features: string[] | null;
  specs: { label: string; value: string }[] | null;
  image_url: string | null;
  gradient: string | null;
  accent_color: string | null;
  featured: boolean;
  sold: boolean;
  created_at: string;
  updated_at: string;
}

export function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/** Maps a Supabase DB row to the Vehicle shape expected by existing UI components. */
export function dbToVehicle(v: DbVehicle): Vehicle {
  return {
    slug: v.slug,
    year: v.year,
    make: v.make,
    model: v.model,
    trim: v.trim ?? "",
    category: (v.category as VehicleCategory) || "other",
    categoryLabel: v.category_label ?? v.category,
    mileage: v.mileage ?? 0,
    price: v.price,
    monthlyPayment: v.monthly_payment ?? Math.round(v.price * 0.0173),
    color: v.color ?? "",
    description: v.description ?? "",
    features: v.features ?? [],
    specs: v.specs ?? [],
    gradient: v.gradient ?? "from-zinc-900 via-zinc-950 to-[#080808]",
    accentColor: v.accent_color ?? "#C9A84C",
    featured: v.featured,
    imageUrl: v.image_url ?? "",
  };
}
