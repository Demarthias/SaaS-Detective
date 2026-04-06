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

async function validateLicenseKey(key) {
  const res = await fetch(`${VALIDATE_URL}?key=${encodeURIComponent(key)}`);
  return res.json();
}

async function loadLicense() {
  const { sd_license } = await chrome.storage.sync.get({ sd_license: null });
  return sd_license;
}

async function saveLicense(data) {
  await chrome.storage.sync.set({ sd_license: data });
}

async function removeLicense() {
  await chrome.storage.sync.remove('sd_license');
}

function setLicenseStatus(msg, isValid) {
  const el = document.getElementById('licenseStatus');
  el.textContent = msg;
  el.className = 'license-status' + (isValid === true ? ' valid' : isValid === false ? ' invalid' : '');
}

async function initLicense() {
  const keyInput = document.getElementById('licenseKey');
  const activateBtn = document.getElementById('activateBtn');
  const removeBtn = document.getElementById('removeBtn');
  const proBadge = document.getElementById('proBadge');

  const existing = await loadLicense();
  if (existing?.valid) {
    keyInput.value = existing.key;
    keyInput.disabled = true;
    activateBtn.style.display = 'none';
    removeBtn.style.display = '';
    proBadge.style.display = '';
    setLicenseStatus(`Active — ${existing.plan} plan (${existing.email})`, true);
  }

  activateBtn.addEventListener('click', async () => {
    const key = keyInput.value.trim();
    if (!key) {
      setLicenseStatus('Please enter a license key.', false);
      return;
    }
    activateBtn.textContent = 'Checking...';
    activateBtn.disabled = true;
    try {
      const result = await validateLicenseKey(key);
      if (result.valid) {
        await saveLicense({ key, valid: true, plan: result.plan, email: result.email });
        keyInput.disabled = true;
        activateBtn.style.display = 'none';
        removeBtn.style.display = '';
        proBadge.style.display = '';
        setLicenseStatus(`Active — ${result.plan} plan (${result.email})`, true);
      } else {
        setLicenseStatus('Invalid or inactive key. Please check and try again.', false);
        activateBtn.textContent = 'Activate';
        activateBtn.disabled = false;
      }
    } catch {
      setLicenseStatus('Could not reach license server. Check your connection.', false);
      activateBtn.textContent = 'Activate';
      activateBtn.disabled = false;
    }
  });

  removeBtn.addEventListener('click', async () => {
    await removeLicense();
    keyInput.value = '';
    keyInput.disabled = false;
    activateBtn.style.display = '';
    activateBtn.textContent = 'Activate';
    activateBtn.disabled = false;
    removeBtn.style.display = 'none';
    proBadge.style.display = 'none';
    setLicenseStatus('License removed.', null);
  });
}

async function init() {
  const container = document.getElementById('category-list');
  const resetBtn = document.getElementById('reset');
  const openPopupBtn = document.getElementById('openPopup');

  let options = await loadOptions();

  renderCategories(container, options);
  await initLicense();

  resetBtn.addEventListener('click', async () => {
    options = JSON.parse(JSON.stringify(DEFAULT_OPTIONS));
    await saveOptions(options);
    renderCategories(container, options);
    setStatus('Defaults restored');
  });

  openPopupBtn.addEventListener('click', () => {
    chrome.runtime.openOptionsPage ? window.open('popup.html', '_blank') : window.open('popup.html', '_blank');
  });
}

document.addEventListener('DOMContentLoaded', init);
