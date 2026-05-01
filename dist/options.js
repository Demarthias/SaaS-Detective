// SaaS Detective Options

const DEFAULT_OPTIONS = {
  enabledCategories: {
    'CMS': true,
    'E-Commerce': true,
    'Builder': true,
    'No-Code': true,
    'Analytics': true,
    'Data Platform': true,
    'Heatmap': true,
    'Session Replay': true,
    'Observability': true,
    'Error Tracking': true,
    'Chat': true,
    'CRM': true,
    'Marketing Auto': true,
    'Email': true,
    'Push Notifications': true,
    'Support': true,
    'Ads': true,
    'Native Ads': true,
    'Retargeting': true,
    'Framework': true,
    'Library': true,
    'CSS': true,
    'Payments': true,
    'CDN': true,
    'Storage': true,
    'Hosting': true,
    'Security': true,
    'Compliance': true,
    'Icons': true,
    'Fonts': true,
    'Comments': true,
    'Scheduling': true,
    'Video': true,
    'Forms': true,
    'A/B Testing': true,
    'Automation': true,
    'Maps': true,
    'Reviews': true,
    'Referral': true,
    'Sales Intelligence': true,
    'Customer Success': true,
    'Search': true,
    'Communications': true,
    'Courses': true,
    'Community': true,
  },
};

function setStatus(msg) {
  const el = document.getElementById('status');
  el.textContent = msg;
  setTimeout(() => { el.textContent = ''; }, 1200);
}

async function loadOptions() {
  const { sd_options } = await chrome.storage.sync.get({ sd_options: DEFAULT_OPTIONS });
  return sd_options;
}

async function saveOptions(options) {
  await chrome.storage.sync.set({ sd_options: options });
}

function renderCategories(container, options) {
  container.innerHTML = '';
  const cats = Object.keys(DEFAULT_OPTIONS.enabledCategories);
  cats.forEach(cat => {
    const label = document.createElement('label');
    label.className = 'switch';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = Boolean(options.enabledCategories?.[cat]);
    input.addEventListener('change', async () => {
      options.enabledCategories[cat] = input.checked;
      await saveOptions(options);
      setStatus('Saved');
    });
    const span = document.createElement('span');
    span.textContent = cat;
    label.appendChild(input);
    label.appendChild(span);
    container.appendChild(label);
  });
}

const VALIDATE_URL = 'https://saas-detective-licensing.kubegrayson.workers.dev/validate';
const LICENSE_TTL_MS = 48 * 60 * 60 * 1000;    // 48 hours before re-validation needed
const LICENSE_GRACE_MS = 7 * 24 * 60 * 60 * 1000; // 7 day grace if server unreachable

function isLicenseCurrentlyValid(lic) {
  if (!lic || !lic.valid || !lic.validated_at) return false;
  const grace = Date.now() < lic.validated_at + LICENSE_TTL_MS + LICENSE_GRACE_MS;
  return grace;
}

async function initLicense() {
  const input = document.getElementById('license-input');
  const btn = document.getElementById('activate-btn');
  const statusEl = document.getElementById('license-status');

  const { sd_license } = await chrome.storage.sync.get({ sd_license: null });

  if (isLicenseCurrentlyValid(sd_license)) {
    input.value = sd_license.key || '';
    input.disabled = true;
    btn.textContent = 'Remove';
    btn.style.background = '#e2e8f0';
    btn.style.color = '#0f172a';
    const plan = sd_license.plan ? ` · ${sd_license.plan}` : '';
    const email = sd_license.email ? ` (${sd_license.email})` : '';
    statusEl.textContent = `✓ License active${plan}${email}`;
    statusEl.style.color = '#16a34a';

    btn.addEventListener('click', async () => {
      await chrome.storage.sync.remove('sd_license');
      input.value = '';
      input.disabled = false;
      btn.textContent = 'Activate';
      btn.style.background = '';
      btn.style.color = '';
      statusEl.textContent = 'License removed.';
      statusEl.style.color = '#475569';
      // Re-attach activation listener so user can immediately re-enter a key
      attachActivationListener(input, btn, statusEl);
    }, { once: true });

    return;
  }

  attachActivationListener(input, btn, statusEl);
}

function attachActivationListener(input, btn, statusEl) {
  btn.addEventListener('click', async () => {
    const key = input.value.trim();
    if (!key) return;

    btn.textContent = 'Checking...';
    btn.disabled = true;
    statusEl.textContent = '';
    statusEl.style.color = '#475569';

    try {
      const res = await fetch(`${VALIDATE_URL}?key=${encodeURIComponent(key)}`, {
        cache: 'no-store',
      });

      if (!res.ok) throw new Error(`Server error ${res.status}`);

      const data = await res.json();

      if (data.valid) {
        const licenseData = {
          key,
          valid: true,
          plan: data.plan || 'Pro',
          email: data.email || '',
          validated_at: Date.now(),
        };
        await chrome.storage.sync.set({ sd_license: licenseData });
        // Google Analytics event for successful activation
        try {
          let clientId = (await chrome.storage.local.get('ga_client_id')).ga_client_id;
          if (!clientId) {
            clientId = `${Math.random().toString(36).slice(2)}.${Date.now()}`;
            await chrome.storage.local.set({ ga_client_id: clientId });
          }
          await fetch('https://saas-detective-licensing.kubegrayson.workers.dev/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ client_id: clientId, events: [{ name: 'checkout_complete', params: { plan: licenseData.plan, email: licenseData.email } }] }),
          });
        } catch (_) {}
        const plan = licenseData.plan ? ` · ${licenseData.plan}` : '';
        const email = licenseData.email ? ` (${licenseData.email})` : '';
        statusEl.textContent = `✓ License activated${plan}${email}`;
        statusEl.style.color = '#16a34a';
        input.disabled = true;
        btn.textContent = 'Remove';
        btn.style.background = '#e2e8f0';
        btn.style.color = '#0f172a';
        btn.disabled = false;
      } else {
        statusEl.textContent = '✗ Invalid or expired license key.';
        statusEl.style.color = '#dc2626';
        btn.textContent = 'Activate';
        btn.disabled = false;
      }
    } catch (e) {
      statusEl.textContent = '✗ Could not reach license server. Check your connection and try again.';
      statusEl.style.color = '#dc2626';
      btn.textContent = 'Activate';
      btn.disabled = false;
    }
  }, { once: true });
}

async function init() {
  const container = document.getElementById('category-list');
  const resetBtn = document.getElementById('reset');
  const openPopupBtn = document.getElementById('openPopup');

  let options = await loadOptions();

  renderCategories(container, options);

  resetBtn.addEventListener('click', async () => {
    options = JSON.parse(JSON.stringify(DEFAULT_OPTIONS));
    await saveOptions(options);
    renderCategories(container, options);
    setStatus('Defaults restored');
  });

  openPopupBtn.addEventListener('click', () => {
    window.open(chrome.runtime.getURL('popup.html'), '_blank');
  });
}

document.addEventListener('DOMContentLoaded', () => { init(); initLicense(); });
