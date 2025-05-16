// payment-callback.js
export const handler = async (event) => {
  // Swish skickar sitt JSON-payload i POST-body
  const { payeePaymentReference, status } = JSON.parse(event.body)
  console.log('Swish callback:', payeePaymentReference, status)
  // Här skulle du normalt uppdatera din databas, t.ex. via fetch/MongoDB/…
  return { statusCode: 200 }
}

