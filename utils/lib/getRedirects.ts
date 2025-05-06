import { contentfulClient } from "../lib/ContentfulClient";
import { getEntriesByContentType } from "../utilityFunctions/getEntriesByContentType";

const client = contentfulClient();

const getRedirects = async () => {
  const entries = await client.getEntries({
    content_type: "redirectRule",
    "fields.active": true,
  });

  const redirects = [];

  for (const item of entries.items) {
    const { source, destination, siteKey, typeOfRedirect } = item.fields;

    if (
      typeof source === "string" &&
      source.trim() !== "" &&
      typeof destination === "string" &&
      destination.trim() !== ""
    ) {
      const trimmedSource = source.replace(/^\/|\/$/g, "").toLowerCase();
      const trimmedDestination = destination
        .replace(/^\/|\/$/g, "")
        .toLowerCase();
      const sourceResult = await getEntriesByContentType(
        "landingPage",
        trimmedSource
      );
      const sourceExists =
        sourceResult && sourceResult?.items && sourceResult?.items?.length > 0;

      const destinationResult = await getEntriesByContentType(
        "landingPage",
        trimmedDestination
      );
      const destinationExists =
        destinationResult &&
        destinationResult?.items &&
        destinationResult?.items?.length > 0;

      const normalizedSiteKey =
        typeof siteKey === "string" ? siteKey.toLowerCase() : "";

      if (sourceExists && destinationExists) {
        redirects.push({
          source: source.toLowerCase(),
          destination: destination.toLowerCase(),
          siteKey: normalizedSiteKey,
          permanent: typeOfRedirect == 308,
        });
      }
    }
  }

  return redirects;
};

export default getRedirects;
