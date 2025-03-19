import { NextApiRequest, NextApiResponse } from "next";

const robotsTxt = `
User-agent: *
Disallow:/
Allow: /
Sitemap: https://espire-contentful-starterkit.netlify.app
`;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(robotsTxt);
}
