import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/db/vehicles";

export async function PATCH(
  req: NextRequest,
  props: RouteContext<"/api/vehicles/[id]">
) {
  const { id } = await props.params;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Recalculate monthly payment if price changed
  if (body.price) {
    body.monthly_payment = Math.round(Number(body.price) * 0.0173);
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("vehicles")
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ vehicle: data });
}

export async function DELETE(
  _req: NextRequest,
  props: RouteContext<"/api/vehicles/[id]">
) {
  const { id } = await props.params;

  const supabase = getSupabase();
  const { error } = await supabase.from("vehicles").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
