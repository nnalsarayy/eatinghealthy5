// create-payment.js
import https from 'https'
import fs    from 'fs'
import axios from 'axios'

export const handler = async (event) => {
  const { amount, orderId, callbackUrl } = JSON.parse(event.body)

  // Läs cert och konfiguration
  const agent = new https.Agent({
    pfx: fs.readFileSync(`${__dirname}/swishcert.p12`),
    passphrase: process.env.CERT_PASSPHRASE
  })

  try {
    const res = await axios.post(
      process.env.SWISH_API_URL,
      {
        payeePaymentReference: orderId,
        callbackUrl,
        payeeAlias: process.env.MERCHANT_NUMBER,
        amount: amount.toString(),
        currency: 'SEK'
      },
      { httpsAgent: agent }
    )
    const paymentUrl = res.headers.location
    return {
      statusCode: 200,
      body: JSON.stringify({ paymentUrl, orderId })
    }
  } catch (e) {
    console.error(e.response?.data || e.message)
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) }
  }
}

