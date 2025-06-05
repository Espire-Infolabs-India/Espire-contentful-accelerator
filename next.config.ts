import type { NextConfig } from "next";
import secuityHeadersConfig from "./config/headers";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
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
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
