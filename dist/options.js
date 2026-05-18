// SaaS Detective Options
// trackEvent, TRACK_URL, VALIDATE_URL, LICENSE_TTL_MS, LICENSE_GRACE_MS come from shared.js

// SYNC REQUIRED: This must match DEFAULT_OPTIONS in content.js exactly.
// content.js cannot import shared.js (content script context restriction).
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
      trackEvent('category_toggled', { category: cat, enabled: input.checked });
      setStatus('Saved');
    });
    const span = document.createElement('span');
    span.textContent = cat;
    label.appendChild(input);
    label.appendChild(span);
    container.appendChild(label);
  });
}

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function isLicenseCurrentlyValid(lic) {
  if (!lic || !lic.valid || !lic.validated_at) return false;
  if (lic.trial && typeof lic.expires_at === 'number' && Date.now() > lic.expires_at) return false;
  return Date.now() < lic.validated_at + LICENSE_TTL_MS + LICENSE_GRACE_MS;
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
      trackEvent('license_removed', { plan: sd_license.plan || 'Pro' });
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

    trackEvent('license_activation_attempted');
    btn.textContent = 'Checking...';
    btn.disabled = true;
    statusEl.textContent = '';
    statusEl.style.color = '#475569';

    try {
      let res;
      try {
        res = await fetch(`${VALIDATE_URL}?key=${encodeURIComponent(key)}`, { cache: 'no-store' });
      } catch (_) {
        res = await fetch(`${VALIDATE_URL}?key=${encodeURIComponent(key)}`, { cache: 'no-store' });
      }
      if (!res.ok) throw new Error(`Server error ${res.status}`);

      const data = await res.json();

      if (data.valid) {
        const licenseData = {
          key,
          valid: true,
          plan: data.plan || 'Pro',
          email: data.email || '',
          trial: Boolean(data.trial),
          expires_at: data.expires_at || null,
          validated_at: Date.now(),
          trial: data.trial || false,
          expires_at: data.expires_at || null,
        };
        await chrome.storage.sync.set({ sd_license: licenseData });
        if (licenseData.trial) {
          const msLeft = (licenseData.expires_at || 0) - Date.now();
          const daysLeft = Math.max(1, Math.ceil(msLeft / (24 * 60 * 60 * 1000)));
          trackEvent('trial_activated', { days_remaining: daysLeft, email: licenseData.email });
        } else {
          trackEvent('license_activated', { plan: licenseData.plan, email: licenseData.email });
        }
        const plan = licenseData.plan ? ` · ${licenseData.plan}` : '';
        const trialNote = licenseData.trial && licenseData.expires_at
          ? ` · trial expires ${new Date(licenseData.expires_at).toLocaleDateString()}` : '';
        const email = licenseData.email ? ` (${licenseData.email})` : '';
        statusEl.textContent = `✓ License activated${plan}${trialNote}${email}`;
        statusEl.style.color = '#16a34a';
        input.disabled = true;
        btn.textContent = 'Remove';
        btn.style.background = '#e2e8f0';
        btn.style.color = '#0f172a';
        btn.disabled = false;
      } else {
        trackEvent('license_activation_failed', { reason: 'invalid_key' });
        statusEl.textContent = '✗ Invalid or expired license key.';
        statusEl.style.color = '#dc2626';
        btn.textContent = 'Activate';
        btn.disabled = false;
      }
    } catch (e) {
      trackEvent('license_activation_failed', { reason: 'server_error' });
      statusEl.textContent = '✗ Could not reach license server. Check your connection and try again.';
      statusEl.style.color = '#dc2626';
      btn.textContent = 'Activate';
      btn.disabled = false;
    }
  }, { once: true });
}

function exportHistory(entry, format) {
  let blob, filename;
  if (format === 'csv') {
    const rows = [['Name', 'Category', 'URL', 'Scanned At']];
    entry.tools.forEach(t => rows.push([
      `"${t.name.replace(/"/g, '""')}"`,
      `"${(t.category || '').replace(/"/g, '""')}"`,
      `"${entry.url}"`,
      `"${new Date(entry.timestamp).toISOString()}"`,
    ]));
    blob = new Blob([rows.map(r => r.join(',')).join('\n')], { type: 'text/csv' });
    filename = `saas-detective-${entry.domain}-${Date.now()}.csv`;
  } else {
    blob = new Blob([JSON.stringify(entry, null, 2)], { type: 'application/json' });
    filename = `saas-detective-${entry.domain}-${Date.now()}.json`;
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  trackEvent('history_exported', { domain: entry.domain, format, tool_count: entry.toolCount });
}

function renderHistory() {
  chrome.storage.local.get({ sd_scan_history: [] }, ({ sd_scan_history }) => {
    const list = document.getElementById('history-list');
    list.innerHTML = '';
    if (!sd_scan_history.length) {
      list.innerHTML = '<div class="history-empty">No scans yet. Visit a site and click the extension to scan it.</div>';
      return;
    }
    sd_scan_history.forEach(entry => {
      const item = document.createElement('div');
      item.className = 'history-item';

      const date = new Date(entry.timestamp);
      const dateStr = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
      const timeStr = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

      item.innerHTML = `
        <div class="history-header">
          <div class="history-left">
            <span class="history-domain">${escapeHtml(entry.domain)}</span>
            <span class="history-date">${dateStr} ${timeStr}</span>
          </div>
          <div class="history-right">
            <span class="history-count">${entry.toolCount} tool${entry.toolCount !== 1 ? 's' : ''}</span>
            <span class="history-arrow">&#9658;</span>
          </div>
        </div>
        <div class="history-tools">
          <div class="history-chip-grid">
            ${(entry.tools || []).map(t => `<span class="history-chip">${escapeHtml(t.name)}<span class="chip-cat"> ${escapeHtml(t.category || '')}</span></span>`).join('')}
          </div>
          <div class="history-export-row">
            <button class="history-export-btn" data-fmt="csv">&#8595; CSV</button>
            <button class="history-export-btn" data-fmt="json">&#8595; JSON</button>
          </div>
        </div>
      `;

      item.querySelector('.history-header').addEventListener('click', () => {
        item.classList.toggle('open');
      });
      item.querySelectorAll('.history-export-btn').forEach(btn => {
        btn.addEventListener('click', e => {
          e.stopPropagation();
          exportHistory(entry, btn.dataset.fmt);
        });
      });

      list.appendChild(item);
    });
  });
}

function clearHistory() {
  if (!confirm('Clear all scan history? This cannot be undone.')) return;
  chrome.storage.local.remove('sd_scan_history', () => {
    trackEvent('history_cleared');
    renderHistory();
  });
}

async function init() {
  trackEvent('options_opened');

  const container = document.getElementById('category-list');
  const resetBtn = document.getElementById('reset');

  document.querySelectorAll('a[data-plan]').forEach(link => {
    attachClientRef(link);
    link.addEventListener('click', (e) => {
      e.preventDefault();
      trackEvent('upgrade_clicked', {
        location: 'options_pricing',
        plan: link.dataset.plan,
        price: link.dataset.price,
      });
      chrome.tabs.create({ url: link.href });
    });
  });

  let options = await loadOptions();

  renderCategories(container, options);

  resetBtn.addEventListener('click', async () => {
    options = JSON.parse(JSON.stringify(DEFAULT_OPTIONS));
    await saveOptions(options);
    renderCategories(container, options);
    setStatus('Defaults restored');
  });

  renderHistory();
  document.getElementById('clear-history-btn').addEventListener('click', clearHistory);
}

document.addEventListener('DOMContentLoaded', () => { init(); initLicense(); });
