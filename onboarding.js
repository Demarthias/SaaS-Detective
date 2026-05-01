// Onboarding page logic

const TRACK_URL = 'https://saas-detective-licensing.kubegrayson.workers.dev/track';

async function trackEvent(name, params = {}) {
  try {
    let { ga_client_id: clientId } = await chrome.storage.local.get('ga_client_id');
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

// Track that the onboarding page was seen
trackEvent('onboarding_viewed');

document.getElementById('getStarted')?.addEventListener('click', () => {
  trackEvent('onboarding_completed');
  chrome.storage.sync.set({ sd_onboarded: true }, () => {
    window.close();
  });
});

document.getElementById('openOptions')?.addEventListener('click', () => {
  trackEvent('onboarding_options_clicked');
  chrome.runtime.openOptionsPage(() => {
    window.close();
  });
});
