import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { password } = body;
  const correct = process.env.DEALERSHIP_ADMIN_PASSWORD;

  if (!correct || password !== correct) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const from = req.nextUrl.searchParams.get("from") ?? "/dealership-admin";
  const res = NextResponse.json({ redirect: from });
  res.cookies.set("dealership-admin-auth", correct, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return res;
}
