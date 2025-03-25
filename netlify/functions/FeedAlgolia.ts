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

// Function to extract plain text from RTE content
const extractPlainText = (rteData: RTEData): string => {
  if (!rteData?.["en-US"]?.content) return "";

  return rteData["en-US"].content
    .map((node) => node.content.map((textNode) => textNode.value).join(" "))
    .join("\n\n");
};

// Utility function to wait for payload content
const waitForContent = async (payload: { content?: unknown }, maxRetries = 20, delay = 1000): Promise<{ content?: unknown }> => {
  let attempts = 0;
  while (attempts < maxRetries) {
    if (payload?.content) {
      return payload; // Content is now available
    }
    console.warn(`⏳ Payload content not available, retrying... (${attempts + 1}/${maxRetries})`);
    await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
    attempts++;
  }
  return payload; // Return as is after retries
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

    let payload = JSON.parse(event.body || "{}");

    // Wait for content if it's null
    payload = await waitForContent(payload);

    if (!payload?.content) {
      console.error("❌ Payload content is still null after retries.");
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid payload" }) };
    }

    console.log("📦 Final Payload:", JSON.stringify(payload, null, 2));

    const content = extractPlainText(payload.content);
    console.log("📄 Extracted Content:", content);

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
