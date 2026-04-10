// Onboarding page logic

document.getElementById('getStarted')?.addEventListener('click', () => {
  // Mark as onboarded
  chrome.storage.sync.set({ sd_onboarded: true }, () => {
    window.close();
  });
});

document.getElementById('openOptions')?.addEventListener('click', () => {
  chrome.runtime.openOptionsPage(() => {
    window.close();
  });
});
