import { contentfulClient } from "../lib/ContentfulClient";

export const getEntriesByContentType = async (
  content_type: string,
  domain: string,
  url?: string,
  lang?: string
) => {
  const client = contentfulClient();
  const locale = lang || "en-US";
  const currentSite = domain;

  console.log("Current Site :::: ", currentSite);

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
        // console.log("Domain value:", domain);
        // console.log("fields.title:", params["fields.title"]);
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
