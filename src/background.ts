import { trackEvent, identifyUser, getClientId, invalidateLicenseCache } from './analytics';

const VALIDATE_URL = 'https://saas-detective-licensing.kubegrayson.workers.dev/validate';
const ALARM_NAME = 'license_revalidate';

interface LicenseData {
  valid?: boolean;
  key?: string;
  plan?: string;
  email?: string;
  validated_at?: number;
  trial?: boolean;
  expires_at?: number | null;
}

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    trackEvent('extension_installed');
    chrome.tabs.create({ url: chrome.runtime.getURL('onboarding.html') });
    chrome.alarms.create(ALARM_NAME, { delayInMinutes: 60 * 6, periodInMinutes: 60 * 6 });
  } else if (details.reason === 'update') {
    trackEvent('extension_updated', { version: chrome.runtime.getManifest().version });
    chrome.alarms.get(ALARM_NAME, (alarm) => {
      if (!alarm) {
        chrome.alarms.create(ALARM_NAME, { delayInMinutes: 60 * 6, periodInMinutes: 60 * 6 });
      }
    });
  }
});

chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.get(ALARM_NAME, (alarm) => {
    if (!alarm) {
      chrome.alarms.create(ALARM_NAME, { delayInMinutes: 1, periodInMinutes: 60 * 6 });
    }
  });
  revalidateLicense();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name !== ALARM_NAME) return;
  revalidateLicense();
});

async function revalidateLicense(): Promise<void> {
  const result = await chrome.storage.sync.get({ sd_license: null });
  const sd_license = result['sd_license'] as LicenseData | null;

  if (!sd_license) return;

  // A locally-set license claiming validity with no key (or a key that
  // doesn't match the format the server issues) can only be the result of
  // a user editing chrome.storage.sync directly — it was never validated
  // server-side and never will be, so the alarm-based revalidation loop
  // below would otherwise skip it forever. Reset it rather than trust it.
  if (!sd_license.key || !/^SD-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}$/.test(sd_license.key)) {
    await chrome.storage.sync.set({ sd_license: null });
    invalidateLicenseCache();
    return;
  }

  try {
    const res = await fetch(`${VALIDATE_URL}?key=${encodeURIComponent(sd_license.key)}`, {
      cache: 'no-store',
    });
    if (!res.ok) return;

    const data = await res.json();
    const updated: LicenseData = {
      ...sd_license,
      valid: Boolean(data.valid),
      plan: data.plan || sd_license.plan,
      trial: Boolean(data.trial),
      expires_at: typeof data.expires_at === 'number' ? data.expires_at : null,
      validated_at: Date.now(),
    };
    await chrome.storage.sync.set({ sd_license: updated });

    if (data.valid) {
      trackEvent('license_revalidated', { plan: data.plan || sd_license.plan, trial: Boolean(data.trial) });
      if (updated.email) {
        const clientId = await getClientId();
        identifyUser(clientId, updated.email, updated.plan || 'pro', Boolean(updated.trial));
      }
    } else {
      invalidateLicenseCache();
      if (data.reason === 'trial_expired') {
        trackEvent('trial_expired', { plan: sd_license.plan });
        chrome.notifications.create('trial_expired', {
          type: 'basic',
          iconUrl: 'icons/icon128.png',
          title: 'Your SaaS Detective trial has ended',
          message: 'Upgrade to keep Pro features — scan unlimited sites and access all 800+ signatures.',
        });
      } else {
        trackEvent('license_expired', { plan: sd_license.plan });
      }
    }
  } catch (_) {
    // fail silently — grace period covers temporary outages
  }
}
