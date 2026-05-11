import { trackEvent } from './analytics';

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
    chrome.alarms.create(ALARM_NAME, { delayInMinutes: 60 * 24, periodInMinutes: 60 * 24 });
  } else if (details.reason === 'update') {
    trackEvent('extension_updated', { version: chrome.runtime.getManifest().version });
    chrome.alarms.get(ALARM_NAME, (alarm) => {
      if (!alarm) {
        chrome.alarms.create(ALARM_NAME, { delayInMinutes: 60 * 24, periodInMinutes: 60 * 24 });
      }
    });
  }
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== ALARM_NAME) return;

  const result = await chrome.storage.sync.get({ sd_license: null });
  const sd_license = result['sd_license'] as LicenseData | null;

  if (!sd_license?.valid || !sd_license?.key) return;

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
    } else if (data.reason === 'trial_expired') {
      trackEvent('trial_expired', { plan: sd_license.plan });
    } else {
      trackEvent('license_expired', { plan: sd_license.plan });
    }
  } catch (_) {
    // fail silently — grace period covers temporary outages
  }
});
