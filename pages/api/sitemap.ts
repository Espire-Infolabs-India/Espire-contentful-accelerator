import { NextApiRequest, NextApiResponse } from "next";
import { contentfulClient } from "@/utils/lib/ContentfulClient";
export default async function generateSitemap(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = contentfulClient();
    const entries = await client.getEntries();
    const domain = `${req.headers["x-forwarded-proto"] || "http"}://${req.headers.host}`;
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${entries.items
        .filter(
          (entry) =>
            typeof entry?.fields?.url === "string" &&
            entry.fields.url.trim() &&
            !entry.fields.url.includes("https") &&
            !entry.fields.url.includes("/")
        )
        .map((entry) => {
          const slug = (entry?.fields?.url as string)?.trim();
          return `
            <url>
              <loc>${domain}/${slug}</loc>
              <changefreq>weekly</changefreq>
              <priority>0.8</priority>
            </url>`;
        })
        .join("")}
    </urlset>`;
    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).end();
  }
}
