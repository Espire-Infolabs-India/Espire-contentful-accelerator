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
    const { source, destination } = item.fields;

    if (
      typeof source === "string" &&
      source.trim() !== "" &&
      typeof destination === "string" &&
      destination.trim() !== ""
    ) {
      const trimmedSource = source.replace(/^\/|\/$/g, "");
       const trimmedDestination = destination.replace(/^\/|\/$/g, "");

      // const normalizedSource = source.startsWith("/") ? source : `/${source}`;
      // const normalizedDestination = destination.startsWith("/")
      //   ? destination
      //   : `/${destination}`;
      // const sourceQuery = normalizedSource.replace(/^\/+/, "");
      // const destinationQuery = normalizedDestination.replace(/^\/+/, "");

      const sourceResult = await getEntriesByContentType(
        "landingPage",
        trimmedSource
      );
      const sourceExists =
        sourceResult && sourceResult.items && sourceResult.items.length > 0;

      const destinationResult = await getEntriesByContentType(
        "landingPage",
        trimmedDestination
      );
      const destinationExists =
        destinationResult &&
        destinationResult.items &&
        destinationResult.items.length > 0;

      console.log(
        `Redirect check: [${source}] → [${destination}], sourceExists: ${sourceExists}, destinationExists: ${destinationExists}`
      );

      if (sourceExists && destinationExists) {
        redirects.push({
          source,
          destination,
          statusCode: 301,
        });
        // redirects.push({
        //   source:normalizedSource,
        //   destination:normalizedDestination,
        //   statusCode: 301,
        // });
      }
    }
  }

  return redirects;
};

export default getRedirects;
