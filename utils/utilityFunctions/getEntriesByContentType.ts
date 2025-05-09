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

      if (url && domain) {
        params["fields.url"] = url;
        params["fields.site"] = domain;
      }

      const entries = await client.getEntries(params);

      return { items: entries?.items };
    } else {
      console.log("No Data available");
      return false;
    }
  } catch (error) {
    console.log("Error occurred while fetching data :: ", error);
    return false;
  }
};
