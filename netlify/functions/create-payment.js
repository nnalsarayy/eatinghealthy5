const https = require('https');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

////////////////////////////////////////////////////////////////
// ======== KONFIGURATION VIA MILJÖVARIABLER ================
const MERCHANT_ALIAS = '1232005668';           // Ditt Swish-nummer
const CALLBACK_URL   = 'https://healthyeating.se/bekraftelse';
const P12_PASSWORD   = process.env.P12_PASSWORD;
// Dessa två innehåller halvorna av din Base64-kodade .p12
const P12_B64_PART1  = process.env.SWISH_P12_B64_1;
const P12_B64_PART2  = process.env.SWISH_P12_B64_2;
// Hela Base64-strängen för din PEM-fil
const CA_B64         = process.env.SWISH_CA_B64;
// ===========================================================

// Återskapa certifikat från Base64
const pfxBuffer = Buffer.from(P12_B64_PART1 + P12_B64_PART2, 'base64');
const caBuffer  = Buffer.from(CA_B64, 'base64');

// Skapa HTTPS-agent med Swish-certifikat
const agent = new https.Agent({
  pfx: pfxBuffer,
  passphrase: P12_PASSWORD,
  ca: caBuffer,
  minVersion: 'TLSv1.2'
});

// Axios-instans som använder agenten
const client = axios.create({ httpsAgent: agent });
const API_BASE = 'https://mss.cpc.getswish.net';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Bad Request' };
  }

  const { amount, message } = body;
  const instructionId = uuidv4().replace(/-/g, '').toUpperCase();

  const payload = {
    payeeAlias: MERCHANT_ALIAS,
    currency: 'SEK',
    callbackUrl: CALLBACK_URL,
    amount: amount.toString(),
    message
  };

  try {
    // Skicka betalningsförfrågan till Swish API
    await client.put(
      `${API_BASE}/swish-cpcapi/api/v2/paymentrequests/${instructionId}`,
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );

    // Skapa Swish-app-länk
    const swishUrl = `swish://paymentrequest?token=${instructionId}&callbackurl=${encodeURIComponent(CALLBACK_URL)}`;

    return {
      statusCode: 200,
      body: JSON.stringify({ id: instructionId, swishUrl })
    };

  } catch (err) {
    console.error('Swish error:', err.response?.data || err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'createPaymentRequest failed' })
    };
  }
};
