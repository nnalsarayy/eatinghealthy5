// netlify/functions/payment-status.js
export const handler = async (event) => {
  // Läs ut orderId från query-string
  const { orderId } = event.queryStringParameters || {};
  if (!orderId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing orderId' })
    };
  }

  // TODO: I produktion hämtar du status från din databas.
  // För test: returnera alltid PAID om du redan kört callback.
  return {
    statusCode: 200,
    body: JSON.stringify({ orderId, status: 'PAID' })
  };
};
