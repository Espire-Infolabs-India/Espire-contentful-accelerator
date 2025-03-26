import { Handler } from "@netlify/functions";
import { parseJSONSafely } from "@/utils/lib/ParseJSONData";
import { PushDataToAlgolia } from "@/utils/lib/PushDataToAlgolia";
import { ProcessPayload } from "@/utils/lib/ProcessPayload";

const handler: Handler = async (event) => {
  try {
    const payload = await parseJSONSafely(event.body || "{}");

    if (!payload) {
      console.error("❌ Payload content is missing.");
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid payload" }),
      };
    }

    const formattedPayload = await ProcessPayload(payload);

    await PushDataToAlgolia(formattedPayload);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Background job completed" }),
    };
  } catch (error) {
    console.error("❌ Error in background processing:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};

export { handler };
