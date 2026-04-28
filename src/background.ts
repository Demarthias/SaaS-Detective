import { trackEvent } from './analytics';

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    trackEvent('extension_installed');
    chrome.tabs.create({ url: chrome.runtime.getURL('onboarding.html') });
  } else if (details.reason === 'update') {
    trackEvent('extension_updated', { version: chrome.runtime.getManifest().version });
  }
});
