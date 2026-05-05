var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

var PRODUCT_PLAN_MAP = {
  "prod_UGkCu0KzxFHGCy": "pro",
  "prod_UGkCJ9KR5nVrhI": "business",
  "prod_UGkCao2ZT6DX9w": "agency",
  "prod_UGkCAvzpONr49G": "enterprise"
};
var CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" }
  });
}
__name(json, "json");

function generateLicenseKey() {
  const seg = __name(() => {
    const arr = new Uint16Array(1);
    crypto.getRandomValues(arr);
    return arr[0].toString(16).toUpperCase().padStart(4, "0");
  }, "seg");
  return `SD-${seg()}-${seg()}-${seg()}-${seg()}`;
}
__name(generateLicenseKey, "generateLicenseKey");

async function verifyStripeSignature(body, signature, secret) {
  const parts = Object.fromEntries(signature.split(",").map((p) => p.split("=")));
  const t = parts["t"];
  const v1 = parts["v1"];
  if (!t || !v1) return false;
  const now = Math.floor(Date.now() / 1e3);
  if (Math.abs(now - parseInt(t)) > 300) return false;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${t}.${body}`));
  const expected = Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return expected === v1;
}
__name(verifyStripeSignature, "verifyStripeSignature");

async function fetchStripeSubscription(subscriptionId, stripeKey) {
  const res = await fetch(`https://api.stripe.com/v1/subscriptions/${subscriptionId}?expand[]=items.data.price.product`, {
    headers: { Authorization: `Bearer ${stripeKey}` }
  });
  return res.ok ? res.json() : null;
}
__name(fetchStripeSubscription, "fetchStripeSubscription");

// Map Stripe amount_total (cents) to plan name for payment links
var AMOUNT_PLAN_MAP = {
  799:  "monthly",
  1999: "3mo",
  3499: "6mo",
  5999: "annual"
};

async function fireGA4Event(env, clientId, eventName, params) {
  const measurementId = env.GA_MEASUREMENT_ID || "G-HVECKYG478";
  const apiSecret = env.GA_API_SECRET;
  if (!apiSecret) return;
  fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ client_id: clientId, events: [{ name: eventName, params }] })
  }).catch(() => {});
}
__name(fireGA4Event, "fireGA4Event");

async function handleWebhook(request, env) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") || "";
  if (!await verifyStripeSignature(body, signature, env.STRIPE_WEBHOOK_SECRET)) {
    return new Response("Invalid signature", { status: 400 });
  }
  const event = JSON.parse(body);
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const sessionId = session.id;
    const subscriptionId = session.subscription;
    const customerId = session.customer;
    const email = session.customer_details?.email || session.customer_email || "";
    let plan = "pro";
    if (subscriptionId && env.STRIPE_SECRET_KEY) {
      const sub = await fetchStripeSubscription(subscriptionId, env.STRIPE_SECRET_KEY);
      if (sub) {
        const productId = sub.items?.data?.[0]?.price?.product?.id;
        plan = PRODUCT_PLAN_MAP[productId] || "pro";
      }
    }
    const licenseKey = generateLicenseKey();
    const licenseData = {
      plan,
      email,
      customerId,
      subscriptionId,
      sessionId,
      createdAt: (new Date()).toISOString(),
      active: true
    };
    await Promise.all([
      env.LICENSES.put(`license:${licenseKey}`, JSON.stringify(licenseData)),
      env.LICENSES.put(`session:${sessionId}`, JSON.stringify({ licenseKey, ...licenseData })),
      subscriptionId ? env.LICENSES.put(`sub:${subscriptionId}`, licenseKey) : Promise.resolve()
    ]);

    const valueUSD = session.amount_total ? session.amount_total / 100 : 0;
    const planByAmount = AMOUNT_PLAN_MAP[session.amount_total] || plan;
    await fireGA4Event(env, customerId || sessionId, "purchase", {
      transaction_id: sessionId,
      value: valueUSD,
      currency: "USD",
      plan: planByAmount,
      customer_id: customerId || "",
    });
  }
  if (event.type === "checkout.session.expired") {
    const session = event.data.object;
    const sessionId = session.id;
    const customerId = session.customer || sessionId;
    const planByAmount = AMOUNT_PLAN_MAP[session.amount_total] || "unknown";
    const valueUSD = session.amount_total ? session.amount_total / 100 : 0;
    await fireGA4Event(env, customerId, "checkout_abandoned", {
      session_id: sessionId,
      plan: planByAmount,
      value: valueUSD,
      currency: "USD",
    });
  }
  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object;
    const licenseKey = await env.LICENSES.get(`sub:${sub.id}`);
    if (licenseKey) {
      const raw = await env.LICENSES.get(`license:${licenseKey}`);
      if (raw) {
        const data = JSON.parse(raw);
        data.active = false;
        await env.LICENSES.put(`license:${licenseKey}`, JSON.stringify(data));
      }
    }
  }
  return new Response("OK", { status: 200 });
}
__name(handleWebhook, "handleWebhook");

async function handleGetLicense(url, env) {
  const sessionId = url.searchParams.get("session_id");
  if (!sessionId) return json({ error: "No session_id provided" }, 400);
  const raw = await env.LICENSES.get(`session:${sessionId}`);
  if (!raw) return json({ error: "Session not found. It may take a moment — please refresh." }, 404);
  const data = JSON.parse(raw);
  return json({ licenseKey: data.licenseKey, plan: data.plan, email: data.email });
}
__name(handleGetLicense, "handleGetLicense");

async function handleTrack(request, env) {
  try {
    const body = await request.json();
    const { client_id, events } = body;
    if (!client_id || !Array.isArray(events) || events.length === 0 || events.length > 25) {
      return json({ ok: false, error: "Invalid payload" }, 400);
    }
    const measurementId = env.GA_MEASUREMENT_ID || "G-HVECKYG478";
    const apiSecret = env.GA_API_SECRET;
    if (!apiSecret) return json({ ok: false, error: "Not configured" }, 500);
    const gaUrl = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;
    const gaRes = await fetch(gaUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client_id, events }),
    });
    return json({ ok: gaRes.ok });
  } catch (err) {
    return json({ ok: false, error: "Track failed" }, 500);
  }
}
__name(handleTrack, "handleTrack");

var PLAN_LABELS = {
  pro: "Pro",
  business: "Business",
  agency: "Agency",
  enterprise: "Enterprise"
};
var PLAN_FEATURES = {
  pro: "All 200+ tech signatures unlocked",
  business: "All 200+ signatures + CSV/JSON export & scan history",
  agency: "Business features + bulk scanning, 3 seats & API access",
  enterprise: "Agency features + unlimited seats, custom signatures & white-label"
};

function serveSuccessPage(sessionId) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to SaaS Detective</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, system-ui, sans-serif; background: #0f172a; color: #f1f5f9; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 16px; max-width: 520px; width: 100%; padding: 40px 36px; text-align: center; }
    .badge { display: inline-block; background: #16a34a; color: #fff; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 99px; margin-bottom: 20px; letter-spacing: 0.05em; }
    h1 { font-size: 26px; font-weight: 800; margin-bottom: 8px; }
    .plan-name { color: #60a5fa; }
    .tagline { color: #94a3b8; font-size: 14px; margin-bottom: 28px; }
    .key-box { background: #0f172a; border: 1px solid #334155; border-radius: 10px; padding: 16px 20px; margin-bottom: 8px; display: flex; align-items: center; gap: 12px; }
    .key-text { font-family: monospace; font-size: 18px; font-weight: 700; color: #f1f5f9; flex: 1; letter-spacing: 0.08em; }
    .copy-btn { background: #2563eb; color: #fff; border: none; padding: 8px 14px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; white-space: nowrap; transition: background 0.15s; }
    .copy-btn:hover { background: #1d4ed8; }
    .copy-btn.copied { background: #16a34a; }
    .hint { color: #64748b; font-size: 12px; margin-bottom: 28px; }
    .steps { text-align: left; background: #0f172a; border-radius: 10px; padding: 20px 22px; margin-bottom: 28px; }
    .steps h3 { font-size: 13px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 14px; }
    .step { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 12px; }
    .step:last-child { margin-bottom: 0; }
    .step-num { background: #2563eb; color: #fff; width: 22px; height: 22px; border-radius: 50%; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
    .step-text { font-size: 13px; color: #cbd5e1; line-height: 1.5; }
    .step-text strong { color: #f1f5f9; }
    .support { font-size: 12px; color: #64748b; }
    .support a { color: #60a5fa; text-decoration: none; }
    #loading { color: #94a3b8; font-size: 14px; padding: 20px 0; }
    #error { color: #f87171; font-size: 14px; padding: 20px 0; display: none; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">PAYMENT CONFIRMED</div>
    <h1>Welcome to<br><span class="plan-name" id="planName">SaaS Detective</span></h1>
    <p class="tagline" id="tagline">Loading your license...</p>
    <div id="loading">Retrieving your license key...</div>
    <div id="error">Could not retrieve your license key. Please <a href="mailto:grayson@venom-industries.com">contact support</a> with your order confirmation.</div>
    <div id="keySection" style="display:none">
      <div class="key-box">
        <span class="key-text" id="licenseKey">—</span>
        <button class="copy-btn" id="copyBtn" onclick="copyKey()">Copy</button>
      </div>
      <p class="hint">Save this key — you'll need it to activate the extension.</p>
      <div class="steps">
        <h3>Activate in 3 steps</h3>
        <div class="step"><div class="step-num">1</div><div class="step-text">Click the <strong>SaaS Detective</strong> icon in your browser toolbar</div></div>
        <div class="step"><div class="step-num">2</div><div class="step-text">Click <strong>Options</strong> at the bottom of the popup</div></div>
        <div class="step"><div class="step-num">3</div><div class="step-text">Paste your license key and click <strong>Activate</strong></div></div>
      </div>
      <p class="support">Need help? <a href="mailto:grayson@venom-industries.com">grayson@venom-industries.com</a></p>
    </div>
  </div>
  <script>
    const sessionId = ${JSON.stringify(sessionId)};
    const PLAN_LABELS = ${JSON.stringify(PLAN_LABELS)};
    const PLAN_FEATURES = ${JSON.stringify(PLAN_FEATURES)};
    async function fetchLicense(attempts = 0) {
      try {
        const res = await fetch('/license?session_id=' + sessionId);
        if (res.status === 404 && attempts < 5) {
          await new Promise(r => setTimeout(r, 2000));
          return fetchLicense(attempts + 1);
        }
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        document.getElementById('loading').style.display = 'none';
        document.getElementById('keySection').style.display = 'block';
        document.getElementById('licenseKey').textContent = data.licenseKey;
        document.getElementById('planName').textContent = 'SaaS Detective ' + (PLAN_LABELS[data.plan] || '');
        document.getElementById('tagline').textContent = PLAN_FEATURES[data.plan] || '';
      } catch {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'block';
      }
    }
    function copyKey() {
      const key = document.getElementById('licenseKey').textContent;
      navigator.clipboard.writeText(key).then(() => {
        const btn = document.getElementById('copyBtn');
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
      });
    }
    fetchLicense();
  <\/script>
</body>
</html>`;
  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
__name(serveSuccessPage, "serveSuccessPage");

var index_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }
    if (url.pathname === "/webhook" && request.method === "POST") {
      return handleWebhook(request, env);
    }
    if (url.pathname === "/validate" && request.method === "GET") {
      const key = url.searchParams.get("key");
      if (!key) return json({ valid: false, error: "No key provided" }, 400);
      const raw = await env.LICENSES.get(`license:${key}`);
      if (!raw) return json({ valid: false, error: "Key not found" });
      const license = JSON.parse(raw);
      return json({ valid: license.active, plan: license.plan, email: license.email });
    }
    if (url.pathname === "/license" && request.method === "GET") {
      return handleGetLicense(url, env);
    }
    if (url.pathname === "/success" && request.method === "GET") {
      const sessionId = url.searchParams.get("session_id") || "";
      return serveSuccessPage(sessionId);
    }
    if (url.pathname === "/track" && request.method === "POST") {
      return handleTrack(request, env);
    }
    return new Response("Not Found", { status: 404 });
  }
};
export { index_default as default };
