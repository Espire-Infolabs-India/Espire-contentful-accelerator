import { contentfulClient } from "../lib/ContentfulClient";

export const getEntriesByContentType = async (
  content_type: string,
  url?: string,
  Locale?: string
) => {
  const client = contentfulClient();
  const locale = Locale || "en-US";

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
