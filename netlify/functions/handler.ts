import { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
    }

    console.log("🔍 Incoming Event Body:", event.body);

    // Trigger the background function with the payload
    await fetch(`https://espire-contentful-starterkit.netlify.app/.netlify/functions/handler-background`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: event.body, // Send the same payload
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Background process started" }),
    };
  } catch (error) {
    console.error("❌ Error triggering background job:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Internal Server Error" }) };
  }
};

export { handler };
