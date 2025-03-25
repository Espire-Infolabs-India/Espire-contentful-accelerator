import { Handler } from "@netlify/functions";
import {algoliasearch} from "algoliasearch";

type TextNode = {
  data: object;
  marks: unknown[];
  value: string;
  nodeType: string;
};

type ContentNode = {
  data: object;
  content: TextNode[];
  nodeType: string;
};

type RTEData = {
  "en-US"?: {
    data: object;
    content: ContentNode[];
    nodeType: string;
  };
};

const extractPlainText = (rteData: RTEData): string => {
  console.log("🟢 extractPlainText called with:", JSON.stringify(rteData, null, 2));

  if (!rteData?.["en-US"]?.content) {
    console.log("⚠️ Invalid RTEData format, returning empty string.");
    return "";
  }

  return rteData["en-US"].content
    .map((node) => node.content.map((textNode) => textNode.value).join(" "))
    .join("\n\n");
};

const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method Not Allowed" }),
      };
    }

    console.log("🔍 Incoming Event Body:", event.body);

    const payload = JSON.parse(event.body || "{}");

    if (!payload?.content) {
      console.error("❌ Missing 'content' field in payload.");
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid payload" }) };
    }

    const content = extractPlainText(payload.content);

    console.log("📦 Extracted Content:", content);

    // Algolia logic remains unchanged
    const client = algoliasearch(
      process.env.ALGOLIA_APP_ID as string,
      process.env.ALGOLIA_API_KEY as string
    );

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

    console.log("✅ Successfully indexed in Algolia");

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
