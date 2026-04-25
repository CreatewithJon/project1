export async function GET() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Response.json({
    SUPABASE_URL: url ? `SET (starts with: ${url.slice(0, 15)})` : "MISSING",
    SUPABASE_ANON_KEY: key ? `SET (length: ${key.length})` : "MISSING",
  });
}
