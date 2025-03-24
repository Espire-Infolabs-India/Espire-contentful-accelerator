import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Triggered from Webhook After Publishing Entries " }),
  };
};

export { handler };
