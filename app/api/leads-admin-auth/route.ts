import { NextRequest, NextResponse } from "next/server";

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("leads-admin-auth", "", { maxAge: 0, path: "/" });
  return res;
}

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (password !== process.env.LEADS_ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set("leads-admin-auth", password, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: "lax",
  });
  return res;
}
