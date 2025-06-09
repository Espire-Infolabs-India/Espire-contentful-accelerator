const withTM = require("next-transpile-modules")([
  "react-instantsearch",
  "@ninetailed/experience.js-next",
  "@ninetailed/experience.js-utils",
  "@ninetailed/experience.js-utils-contentful",
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["images.ctfassets.net", "res.cloudinary.com"],
  },

  i18n: {
    locales: ["en-US", "fr", "de"],
    defaultLocale: "en-US",
    localeDetection: false,
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

  webpack(config: { resolve: { fallback?: any; }; }, options: { isServer: any; }) {
    const isServer = options.isServer;

    if (!isServer) {
      if (!config.resolve) config.resolve = {};
      if (!config.resolve.fallback) config.resolve.fallback = {};

      config.resolve.fallback.fs = false;
      config.resolve.fallback.path = false;
      config.resolve.fallback.crypto = false;
      config.resolve.fallback.stream = false;
      config.resolve.fallback.os = false;
      config.resolve.fallback.zlib = false;
      config.resolve.fallback.http = false;
      config.resolve.fallback.https = false;
      config.resolve.fallback.timers = false;
      config.resolve.fallback.url = false;
      config.resolve.fallback.util = false;
      config.resolve.fallback.vm = false;
      config.resolve.fallback.buffer = false;
    }

    return config;
  },
};

module.exports = withTM(nextConfig);
