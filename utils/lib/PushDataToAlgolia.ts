import { algoliasearch } from "algoliasearch";
export const PushDataToAlgolia = async (payload: {
    [key: string]: string | string[] | unknown;
}) => {
    const client = algoliasearch(
    process.env.ALGOLIA_APP_ID as string,
    process.env.ALGOLIA_API_KEY as string
  );

  await client.saveObject({
    indexName: process.env.ALGOLIA_INDEX_NAME as string,
    body: {
      name: payload?.title,
      shortDescription: payload?.shortDescription,
      blogContent: payload?.blogContent,
      image: payload?.image,
      url: payload?.url,
      author: payload?.author,
      publishDate: payload?.publishDate,
      tags: payload?.tags,
    },
  });

  console.log("✅ Successfully indexed in Algolia");
}
