import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const clean = pathname.replace(/\/+$/, "");

  if (clean.startsWith("/admin")) {
    // Allow the login page (with or without trailing slash)
    if (clean === "/admin/login") return NextResponse.next();

    const cookie = req.cookies.get("admin_auth");
    const isAuthed = cookie?.value === "1";
    if (!isAuthed) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
