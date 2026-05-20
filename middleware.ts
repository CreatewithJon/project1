import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /gh600 routes (not the login page or auth API)
  if (
    pathname.startsWith("/gh600") &&
    !pathname.startsWith("/gh600/login") &&
    pathname !== "/api/gh600-auth"
  ) {
    const auth = req.cookies.get("gh600-auth")?.value;
    if (auth !== process.env.GH600_PASSWORD) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/gh600/login";
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/gh600/:path*", "/api/gh600-auth"],
};
