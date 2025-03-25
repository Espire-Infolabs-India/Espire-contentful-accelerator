import { Handler } from "@netlify/functions";
import { algoliasearch } from "algoliasearch";

type TextNode = { data: object; marks: unknown[]; value: string; nodeType: string };
type ContentNode = { data: object; content: TextNode[]; nodeType: string };
type RTEData = { "en-US"?: { data: object; content: ContentNode[]; nodeType: string } };

type Payload = {
  title?: string;
  shortDescription?: string;
  content?: unknown;
  image?: string;
  url?: string;
  author?: string;
  publishDate?: string;
  tags?: string[];
};

// Safe JSON parsing with timeout
const parseJSONSafely = async (jsonString: string, timeoutMs = 500): Promise<Payload> => {
  return Promise.race([
    new Promise<Payload>((resolve) => {
      try {
        const parsed = JSON.parse(jsonString);

        // Ensure parsed result is an object and cast it to Payload type
        if (typeof parsed === "object" && parsed !== null) {
          resolve(parsed as Payload);
        } else {
          console.warn("⚠️ Parsed JSON is not an object, returning empty object.");
          resolve({} as Payload);
        }
      } catch (error) {
        console.error("❌ JSON Parsing Error:", error);
        resolve({} as Payload); // Return an empty object if parsing fails
      }
    }),
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error("JSON parse timeout")), timeoutMs)),
  ]);
};


const extractPlainText = (rteData: RTEData): string => {
  if (!rteData?.["en-US"]?.content) return "";
  return rteData["en-US"].content.map(node => node.content.map(textNode => textNode.value).join(" ")).join("\n\n");
};

const handler: Handler = async (event) => {
  try {
    console.log("🔍 Processing Background Job...");

    const payload = (await parseJSONSafely(event.body || "{}"));


    if (!payload || !payload?.content) {
      console.error("❌ Payload content is missing.");
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid payload" }) };
    }

    console.log("retuened Payload :::: ",payload);
    const content = extractPlainText(payload.content);
    console.log("📄 Extracted Content:", content);

    const client = algoliasearch(process.env.ALGOLIA_APP_ID as string, process.env.ALGOLIA_API_KEY as string);

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
        publishDate: payload?.publishDate,
        tags: payload?.tags,
      },
    });

    console.log("✅ Successfully indexed in Algolia");

    return { statusCode: 200, body: JSON.stringify({ message: "Background job completed" }) };
  } catch (error) {
    console.error("❌ Error in background processing:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Internal Server Error" }) };
  }
};

export { handler };
