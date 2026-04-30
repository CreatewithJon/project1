import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const expected = process.env.LEAD_ENGINE_PASSWORD;
    if (!expected) {
      return Response.json({ error: "LEAD_ENGINE_PASSWORD env var not set" }, { status: 500 });
    }
    if (password !== expected) {
      return Response.json({ error: "Invalid password" }, { status: 401 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
