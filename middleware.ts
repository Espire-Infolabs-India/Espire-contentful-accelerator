import { NextRequest, NextResponse } from "next/server";
import getRedirects from "./utils/lib/getRedirects";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.endsWith(".json")
  ) {
    return NextResponse.next();
  }
  const normalizedPath = pathname.replace(/^\/|\/$/g, "");
  const redirects = await getRedirects();
  const match = redirects.find((r) => r.source === `/${normalizedPath}`);

  if (match) {
    const target = new URL(match.destination, req.url);
    if (target.toString() === req.url) return NextResponse.next();

    const response = NextResponse.redirect(target, match.permanent ? 308 : 307);
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate"
    );
    return response;
  }

  return NextResponse.next();
}
