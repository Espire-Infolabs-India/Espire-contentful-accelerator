import { Handler } from "@netlify/functions";
// import { getEntryByID } from "@/utils/utilityFunctions/getEntryByID";
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
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
      process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_KEY as string
    );

    const response = await client.saveObject({
      indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string,
      body: {
        name: "Feeding from Function",
        color: "#000000||Algolia",
        availableIn: "https://source.unsplash.com/100x100/?paris||Paris",
        objectID: "myID",
      },
    });

    console.log("Aloglia Response:", response);

    const payload = JSON.parse(event.body || "{}");

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
