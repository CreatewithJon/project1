import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/db/vehicles";

export async function GET() {
  const supabase = getSupabase();
  const { data, error } = await supabase.storage.listBuckets();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ buckets: data?.map((b) => b.name) });
}
