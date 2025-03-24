import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  try {
    // Contentful sends a POST request with JSON data
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
      };
    }

    // Parse the webhook payload from Contentful
    const payload = JSON.parse(event.body || '{}');

    console.log("🚀 Triggered from Webhook After Publishing Entries");
    console.log("📦 Payload:", JSON.stringify(payload, null, 2)); // Pretty-print payload

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: "Triggered from Webhook After Publishing Entries",
        receivedPayload: payload 
      }),
    };
  } catch (error) {
    console.error("❌ Error processing webhook:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

export { handler };