// pages/api/redirects.ts
import type { NextApiRequest, NextApiResponse } from "next";
import getRedirects from "@/utils/lib/getRedirects"; // adjust if needed

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const redirects = await getRedirects();
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=30");
    res.status(200).json(redirects);
  } catch (error) {
    console.error("Error fetching redirects:", error);
    res.status(500).json({ error: "Failed to fetch redirects" });
  }
}
