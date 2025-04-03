import { algoliasearch } from "algoliasearch";
export const PushDataToAlgolia = async (payload: {
  [key: string]: string | string[] | unknown;
}) => {
  console.log("Payload received in Algolia", payload);
  const client = algoliasearch(
    process.env.ALGOLIA_APP_ID as string,
    process.env.ALGOLIA_API_KEY as string
  );

  await client.saveObject({
    indexName: process.env.ALGOLIA_INDEX_NAME as string,
    body: payload,
  });

  console.log("✅ Successfully indexed in Algolia");
};
