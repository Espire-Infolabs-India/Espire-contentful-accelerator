import { extractPlainText } from "@/common/RTE/ExtractRTEData";
import { Handler } from "@netlify/functions";
import { getEntryByID } from "@/utils/utilityFunctions/getEntryByID";
import { algoliasearch } from "algoliasearch";

const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method Not Allowed" }),
      };
    }

    const client = algoliasearch(
      process.env.ALGOLIA_APP_ID as string,
      process.env.ALGOLIA_API_KEY as string
    );

    const payload = JSON.parse(event.body || "{}");

    const content  = extractPlainText(payload?.content);

    const author = await getEntryByID(payload?.author as string);

    console.log("Content :::: ",extractPlainText(payload?.content));

    console.log("Author Data get ID :::: ",author);
   

    await client.saveObject({
      indexName: process.env.ALGOLIA_INDEX_NAME as string,
      body: {
        name: payload?.title,
        shortDescription: payload?.shortDescription,
        blogContent: payload?.content,
        content: content,
        image: payload?.image,
        url: payload?.url,
        author: payload?.author,
        publishDate: payload?.date,
        tags: payload?.tags,
      },
    });

    console.log("payload", payload);
    // const entryData = await getEntryByID("1IIw0nUuEqsm2H2IDps5fv");

    console.log("📦 Payload:", JSON.stringify(payload, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Triggered from Webhook After Publishing Entries",
        receivedPayload: payload,
      }),
    };
  } catch (error) {
    console.error("❌ Error processing webhook:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};

export { handler };
