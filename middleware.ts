import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname, locale, hostname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.endsWith(".json")
  ) {
    return NextResponse.next();
  }

  const normalizedPath = pathname.replace(/^\/|\/$/g, "");
  let redirects: {
    source: string;
    destination: string;
    siteKey: string;
    permanent: boolean;
  }[] = [];
  try {
    const apiUrl = `http://${hostname}/api/redirects`;
    const res = await fetch(apiUrl, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (res.ok) {
      redirects = await res.json();
    } else {
      console.warn("Failed to fetch redirects from API:", res.status);
    }
  } catch (error) {
    console.error("Error fetching redirects:", error);
  }

  const match = redirects.find(
    (r) => r.source === `/${normalizedPath}` && r.siteKey === locale
  );

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
