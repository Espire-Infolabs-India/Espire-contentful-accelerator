import type { NextConfig } from "next";
import secuityHeadersConfig from "./config/headers";

const sites = {
  site1: {
    domain: "espire-starterkit-multisite-domain1.netlify.app",
  },
  site2: {
    domain: "espire-starterkit-multisite-domain2.netlify.app",
  },
};
const siteKeys = Object.keys(sites);

console.log("SiteKeys:", siteKeys); // Debugging line to check the site keys

const nextConfig: NextConfig = {
  i18n: {
    locales: siteKeys,
    defaultLocale: siteKeys[0],
    domains: siteKeys.map((siteKey) => ({
      domain: sites[siteKey as keyof typeof sites].domain,
      defaultLocale: siteKey,
    })),
  },

  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
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
