import type { NextConfig } from "next";
import secuityHeadersConfig from "./config/headers";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
    images: {
    domains: ["images.ctfassets.net","res.cloudinary.com"],
  },
  i18n: {
    locales: ["en-US", "fr", "de"],
    defaultLocale: "en-US",
    localeDetection: false,
  },
  async headers() {
    return secuityHeadersConfig();
  },
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
      { source: "/sitemap.xml", destination: "/api/sitemap" },
    ];
  },
};

export default nextConfig;
