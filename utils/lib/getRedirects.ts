// lib/getRedirects.js
import { contentfulClient } from "../lib/ContentfulClient";

const client = contentfulClient();

const getRedirects = async () => {
  const entries = await client.getEntries({
    content_type: "redirectRule",
    "fields.active": true,
  });
  return entries.items
    .map((item) => {
      const { source, destination } = item.fields;

      if (typeof source === "string" && typeof destination === "string") {
        return {
          source,
          destination,
          permanent: true,
        };
      }

      return null;
    })
    .filter(Boolean) as {
    source: string;
    destination: string;
    permanent: true;
  }[];
};

export default getRedirects;
