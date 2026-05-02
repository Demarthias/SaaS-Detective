(()=>{"use strict";

importScripts('shared.js');

const REVALIDATE_ALARM = 'sd_revalidate';

async function revalidateLicense() {
  const { sd_license } = await chrome.storage.sync.get({ sd_license: null });
  if (!sd_license?.key || !sd_license?.valid) return;

  // Only re-validate if TTL has expired
  if (sd_license.validated_at && Date.now() < sd_license.validated_at + LICENSE_TTL_MS) return;

  try {
    const res = await fetch(`${VALIDATE_URL}?key=${encodeURIComponent(sd_license.key)}`, {
      cache: 'no-store',
    });
    if (!res.ok) return; // server error — stay in grace period, don't invalidate

    const data = await res.json();
    if (data.valid) {
      await chrome.storage.sync.set({
        sd_license: {
          ...sd_license,
          valid: true,
          plan: data.plan || sd_license.plan,
          email: data.email || sd_license.email,
          validated_at: Date.now(),
        },
      });
    } else {
      // Server explicitly rejected the key — revoke
      await chrome.storage.sync.remove('sd_license');
    }
  } catch (_) {
    // Network error — leave license intact (grace period in content.js handles expiry)
  }
}

function scheduleRevalidation() {
  chrome.alarms.create(REVALIDATE_ALARM, {
    delayInMinutes: 60,        // first check in 1 hour
    periodInMinutes: 60 * 12,  // then every 12 hours
  });
}

chrome.runtime.onInstalled.addListener(e => {
  scheduleRevalidation();
  if (e.reason === 'install') {
    trackEvent('extension_installed');
    chrome.tabs.create({ url: chrome.runtime.getURL('onboarding.html') });
  } else if (e.reason === 'update') {
    trackEvent('extension_updated', { version: chrome.runtime.getManifest().version });
  }
});

chrome.runtime.onStartup.addListener(() => {
  scheduleRevalidation();
});

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === REVALIDATE_ALARM) {
    revalidateLicense();
  }
});

})();
