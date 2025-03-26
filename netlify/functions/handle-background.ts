import { extractPlainTextAsync } from "@/common/RTE/ExtractRTEData";
import { Handler } from "@netlify/functions";
import { RTEData } from "@/common/RTE/ExtractRTEData";
import { parseJSONSafely } from "@/utils/lib/ParseJSONData";
import { PushDataToAlgolia } from "@/utils/lib/PushDataToAlgolia";


const handler: Handler = async (event) => {
  try {
    const payload = await parseJSONSafely(event.body || "{}");
    console.log("🔍 Incoming Event Body:", payload);

    if (!payload) {
      console.error("❌ Payload content is missing.");
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid payload" }),
      };
    }

    // const content = await extractPlainTextAsync(
    //   payload.shortDescription as unknown as RTEData
    // );

   await PushDataToAlgolia(payload);

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
