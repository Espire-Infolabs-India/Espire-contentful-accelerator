// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl.clone();

  // ❌ Don't rewrite static assets
  if (
    url.pathname.startsWith("/_next/") ||
    url.pathname.startsWith("/static/") ||
    url.pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  console.log(`🌎 Host: ${host}, 🛤️ Path: ${url.pathname}`);

  // ✅ Internally rewrite requests for site1.local → /site1/*
  if (host.includes("site1.local") && !url.pathname.startsWith("/site1")) {
    url.pathname = `/site1${url.pathname}`;
    console.log(`🔀 Rewriting to: ${url.pathname}`);
    return NextResponse.rewrite(url);
  }

  // ✅ Internally rewrite requests for site2.local → /site2/*
  if (host.includes("site2.local") && !url.pathname.startsWith("/site2")) {
    url.pathname = `/site2${url.pathname}`;
    console.log(`🔀 Rewriting to: ${url.pathname}`);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
