import { type NextRequest } from "next/server";
import { filterCompanies } from "@/lib/data/companies";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const search = searchParams.get("search") ?? undefined;
  const category = searchParams.get("category") ?? undefined;

  const results = filterCompanies({ search, category });

  return Response.json({ companies: results, count: results.length });
}
