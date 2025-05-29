import { NextApiRequest, NextApiResponse } from "next";

const SPACE_ID = process.env.NEXT_PUBLIC_SPACE_ID!;
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT || "master";
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_DELIVERY_TOKEN!;
const ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;

type EntryItem = {
  sys?: { id?: string };
  title?: string;
  url?: string;
  image?: { url?: string };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { contentType, limit = 100 } = req.body;

  if (!contentType) {
    return res
      .status(400)
      .json({ error: "Missing contentType in request body." });
  }

  let fragmentFields = `
    sys { id }
    title
    url
  `;

  const withImage = ["blogLandingPage"];
  if (withImage.includes(contentType)) {
    fragmentFields += `
      image {
        url
      }
    `;
  }

  const query = `
    query ($limit: Int!) {
      ${contentType}Collection(limit: $limit) {
        items {
          ${fragmentFields}
        }
      }
    }
  `;

  try {
    const result = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables: { limit: Number(limit) },
      }),
    });

    const json = await result.json();

    if (json.errors) {
      return res
        .status(500)
        .json({ error: "GraphQL query failed", details: json.errors });
    }

    const rawItems = json.data?.[`${contentType}Collection`]?.items || [];

    const entries = (rawItems as EntryItem[]).map((item) => ({
      id: item?.sys?.id || "",
      title: item?.title || "(No title)",
      url: item?.url || "#",
      image: item?.image?.url || null,
    }));

    res.status(200).json({ entries });
  } catch (error) {
    res.status(500).json({
      error: "GraphQL fetch failed",
      detail: (error as Error).message,
    });
  }
}
