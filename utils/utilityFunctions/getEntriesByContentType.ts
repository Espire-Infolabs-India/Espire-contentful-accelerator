import { contentfulClient } from "../lib/ContentfulClient";

export const getEntriesByContentType = async (
  content_type: string,
  url?: string,
  lang?: string,
  domain?: string
) => {
  const client = contentfulClient();
  const locale = lang || "en-US";

  try {
    if (client) {
      const params: {
        content_type: string;
        include: number;
        locale: string;
        [key: string]: unknown;
      } = {
        content_type,
        include: 8,
        locale,
      };

      if (url) {
        params["fields.url"] = url;
      }

      if (domain && domain !== "site1") {
        params["fields.site"] = domain;
      }

      const entries = await client.getEntries(params);

      return { items: entries?.items };
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
