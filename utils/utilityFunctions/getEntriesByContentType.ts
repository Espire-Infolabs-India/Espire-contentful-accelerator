import { contentfulClient } from "../lib/ContentfulClient";

export const getEntriesByContentType = async (
  content_type: string,
  url?: string,
  site?: string
) => {
  const client = contentfulClient();
  try {
    if (client) {
      const params: {
        content_type: string;
        include: number;
        [key: string]: unknown;
      } = {
        content_type,
        include: 8,
      };

      if (url) {
        params["fields.url"] = url;
        params["fields.site"] = site;
      }

      const entries = await client.getEntries(params);

      const items = entries?.items;

      return { items };
    } else {
      console.log("No Data available");
      return false;
    }
  } catch (error) {
    console.log("Error occurred while fetching data :: ", error);
    return false;
  }
};
