// Onboarding page logic
// trackEvent comes from shared.js

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

// Track pricing link clicks from onboarding
document.querySelectorAll('a[href*="buy.stripe.com"]').forEach(link => {
  link.addEventListener('click', () => {
    const url = link.href;
    let plan = 'yearly';
    if (url.includes('aFaaEZ76')) plan = 'monthly';
    else if (url.includes('3cIdRb76')) plan = '3mo';
    else if (url.includes('6oU00ldu')) plan = '6mo';
    else if (url.includes('8x2bJ3bm')) plan = 'yearly';
    trackEvent('upgrade_clicked', { plan, location: 'onboarding' });
  });
});
