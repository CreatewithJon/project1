import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /gh600
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

  // Protect /docs
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

  return NextResponse.next();
}

export const config = {
  matcher: ["/gh600/:path*", "/api/gh600-auth", "/docs/:path*", "/api/docs-auth"],
};
