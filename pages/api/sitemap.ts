import { NextApiRequest, NextApiResponse } from "next";
import { contentfulClient } from "@/utils/lib/ContentfulClient";
export default async function generateSitemap(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = contentfulClient();
    const entries = await client.getEntries();
    const domain = `${req.headers["x-forwarded-proto"] || "http"}://${
      req.headers.host
    }`;
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${entries.items
        .filter((entry) => {
          return entry.sys.contentType.sys.id === "landingPage";
        })
        .sort((a, b) => {
          if (!a.fields.url || !b.fields.url) return 0;
          return a.fields.url > b.fields.url ? 1 : -1;
        })
        .map((entry) => {
          const slug = (entry?.fields?.url as string)?.trim();
          const lastmodifiedDate = entry?.sys?.updatedAt;
          interface SitemapFields {
            priority: string;
            frequency: string;
          }
          const sitemapFields = entry?.fields?.sitemap as unknown as {
            fields: SitemapFields;
          };
          const priority = sitemapFields?.fields?.priority || 0.8;
          const changefreq =
            sitemapFields?.fields?.frequency.toLocaleLowerCase() || "daily";
          return `
        <url>
          <loc>${domain}/${slug}</loc>
          <lastmod>${lastmodifiedDate}</lastmod>
          <changefreq>${changefreq}</changefreq>
          <priority>${priority}</priority>
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
