// Onboarding page logic
// trackEvent comes from shared.js

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
  chrome.runtime.openOptionsPage();
  window.close();
});
