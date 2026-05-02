// Shared constants and utilities
// Loaded by popup.html, options.html, onboarding.html via <script src="shared.js">
// Loaded by background.js via importScripts('shared.js')
// Do NOT include in content_scripts — content.js runs in web page context

const TRACK_URL = 'https://saas-detective-licensing.kubegrayson.workers.dev/track';
const VALIDATE_URL = 'https://saas-detective-licensing.kubegrayson.workers.dev/validate';
const LICENSE_TTL_MS = 48 * 60 * 60 * 1000;
const LICENSE_GRACE_MS = 7 * 24 * 60 * 60 * 1000;

async function trackEvent(name, params = {}) {
  try {
    let clientId = (await chrome.storage.local.get('ga_client_id')).ga_client_id;
    if (!clientId) {
      clientId = `${Math.random().toString(36).slice(2)}.${Date.now()}`;
      await chrome.storage.local.set({ ga_client_id: clientId });
    }
    await fetch(TRACK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: clientId, events: [{ name, params }] }),
    });
  } catch (_) {}
}
