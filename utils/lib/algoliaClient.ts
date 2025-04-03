import { liteClient as algoliasearch } from "algoliasearch/lite";

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string
);
export default algoliaClient;
