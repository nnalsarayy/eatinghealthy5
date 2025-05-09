const fs    = require('fs');
const path  = require('path');
const https = require('https');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

// ===== Fyll i dina värden nedan =====
const MERCHANT_ALIAS = '1232005668';           // Ditt Swish-nummer
const P12_PASSWORD   = 'DITT_P12_LÖSENORD';    // Lösenordet till din .p12-fil
const CALLBACK_URL   = 'https://din-domän.se/bekraftelse'; // Din tack-sida URL
// =====================================

const agent = new https.Agent({
  pfx: fs.readFileSync(path.join(__dirname, 'swish_certificate.p12')),
  passphrase: P12_PASSWORD,
  ca: fs.readFileSync(path.join(__dirname, 'swish_root_ca.pem')),
  minVersion: 'TLSv1.2'
});
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
  const id = uuidv4().replace(/-/g, '').toUpperCase();
  const payload = {
    payeeAlias: MERCHANT_ALIAS,
    currency: 'SEK',
    callbackUrl: CALLBACK_URL,
    amount: amount.toString(),
    message
  };

  try {
    await client.put(
      `${API_BASE}/swish-cpcapi/api/v2/paymentrequests/${id}`,
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );
    const swishUrl = `swish://paymentrequest?token=${id}&callbackurl=${encodeURIComponent(CALLBACK_URL)}`;
    return { statusCode: 200, body: JSON.stringify({ id, swishUrl }) };
  } catch (err) {
    console.error(err.response?.data || err.message);
    return { statusCode: 500, body: JSON.stringify({ error: 'createPaymentRequest failed' }) };
  }
};
