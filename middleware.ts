import { NextRequest, NextResponse } from "next/server";

const DEALERSHIP_HOSTS = ["shafiknsons.com", "www.shafiknsons.com"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const host = req.headers.get("host") ?? "";

  // ── shafiknsons.com domain routing ─────────────────────────────────────────
  // Rewrite all paths so shafiknsons.com/* serves the dealership pages
  if (DEALERSHIP_HOSTS.includes(host)) {
    const url = req.nextUrl.clone();

    // Already-rewritten internal paths — pass through as-is
    if (pathname.startsWith("/dealership-demo") || pathname.startsWith("/dealership-admin")) {
      return NextResponse.next();
    }

    // Static public assets (videos, images, fonts, etc.) — pass through
    if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
      return NextResponse.next();
    }

    // /admin → dealership admin (password protected below)
    if (pathname === "/admin" || pathname.startsWith("/admin/")) {
      url.pathname = pathname.replace(/^\/admin/, "/dealership-admin");
      return NextResponse.rewrite(url);
    }

    // API routes pass through as-is
    if (pathname.startsWith("/api/")) {
      return NextResponse.next();
    }

    // Everything else: rewrite to /dealership-demo equivalent
    // / → /dealership-demo
    // /inventory → /dealership-demo/inventory
    // /inventory/slug → /dealership-demo/inventory/slug
    // /financing → /dealership-demo/financing
    // /sell-your-car → /dealership-demo/sell-your-car
    url.pathname = pathname === "/" ? "/dealership-demo" : `/dealership-demo${pathname}`;
    return NextResponse.rewrite(url);
  }

  // ── Protect /gh600 ──────────────────────────────────────────────────────────
  if (
    pathname.startsWith("/gh600") &&
    !pathname.startsWith("/gh600/login") &&
    pathname !== "/api/gh600-auth"
  ) {
    const auth = req.cookies.get("gh600-auth")?.value;
    if (auth !== process.env.GH600_PASSWORD) {
      const url = req.nextUrl.clone();
      url.pathname = "/gh600/login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  // ── Protect /docs ───────────────────────────────────────────────────────────
  if (
    pathname.startsWith("/docs") &&
    !pathname.startsWith("/docs/login") &&
    pathname !== "/api/docs-auth"
  ) {
    const auth = req.cookies.get("docs-auth")?.value;
    if (auth !== process.env.DOCS_PASSWORD) {
      const url = req.nextUrl.clone();
      url.pathname = "/docs/login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  // ── Protect /leads-admin ───────────────────────────────────────────────────
  if (
    pathname.startsWith("/leads-admin") &&
    !pathname.startsWith("/leads-admin/login") &&
    pathname !== "/api/leads-admin-auth"
  ) {
    const auth = req.cookies.get("leads-admin-auth")?.value;
    if (auth !== process.env.LEADS_ADMIN_PASSWORD) {
      const url = req.nextUrl.clone();
      url.pathname = "/leads-admin/login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  // ── Protect /dealership-admin ───────────────────────────────────────────────
  if (
    pathname.startsWith("/dealership-admin") &&
    !pathname.startsWith("/dealership-admin/login") &&
    pathname !== "/api/dealership-admin-auth"
  ) {
    const auth = req.cookies.get("dealership-admin-auth")?.value;
    if (auth !== process.env.DEALERSHIP_ADMIN_PASSWORD) {
      const url = req.nextUrl.clone();
      url.pathname = "/dealership-admin/login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths for domain-based routing
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
