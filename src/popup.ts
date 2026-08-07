import { getDomain } from 'tldts';
import { trackEvent, getClientId, withClientRef } from './analytics';
import { signatures } from './signatures';
import { SIGNATURE_URLS } from './signatureUrls';

const FREE_LIMIT = 50;
const NUDGE_THRESHOLD_SCANS = 1;
const NUDGE_COOLDOWN_MS = 24 * 60 * 60 * 1000;
const HISTORY_LIMIT_FREE = 25;
const HISTORY_LIMIT_PRO = 50;

const STRIPE_PLANS: Array<{ label: string; price: string; url: string; plan: string; badge?: string }> = [
  { label: 'Monthly', price: '$7.99/mo', url: 'https://venom-industries.com/checkout.html?plan=1mo', plan: 'monthly' },
  { label: 'Annual', price: '$90/yr', url: 'https://venom-industries.com/checkout.html?plan=12mo', plan: 'annual', badge: 'Best Value' },
];

const TRIAL_URL = 'https://venom-industries.com/saas-detective#trialCard';

const TRUST_CHECK_URL = 'https://saas-detective-licensing.kubegrayson.workers.dev/trust-check';

// Compact globalVar checks passed to MAIN world script injection
const globalVarChecks = signatures
  .filter(s => s.globalVar && s.globalVar.length > 0)
  .map(s => ({ id: s.id, name: s.name, category: s.category, vars: s.globalVar as string[] }));

let affiliateTable: Record<string, { status: string; url: string; program?: string }> = {};

async function loadAffiliates(): Promise<void> {
  try {
    const response = await fetch(chrome.runtime.getURL('affiliates.json'));
    affiliateTable = await response.json();
  } catch (_) {
    affiliateTable = {};
  }
}

interface LicenseData {
  valid?: boolean;
  validated_at?: number;
  plan?: string;
  email?: string;
  key?: string;
  trial?: boolean;
  expires_at?: number | null;
}

async function getLicense(): Promise<LicenseData | null> {
  const result = await chrome.storage.sync.get({ sd_license: null });
  return result['sd_license'] as LicenseData | null;
}

const LICENSE_KEY_RE = /^SD-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}$/;

async function isLicenseValid(license?: LicenseData | null): Promise<boolean> {
  const LICENSE_TTL_MS = 48 * 60 * 60 * 1000;
  const LICENSE_GRACE_MS = 7 * 24 * 60 * 60 * 1000;
  const sd_license = license !== undefined ? license : await getLicense();
  if (!sd_license || !sd_license.valid || !sd_license.validated_at) return false;
  // A license record must carry a key in the server-issued format. This is
  // not unspoofable (nothing client-side ever can be, in an unobfuscated
  // extension), but it closes the trivial "chrome.storage.sync.set" bypass
  // and forces background.ts's periodic revalidation to actually catch it.
  if (!sd_license.key || !LICENSE_KEY_RE.test(sd_license.key)) return false;
  if (sd_license.trial && typeof sd_license.expires_at === 'number' && Date.now() > sd_license.expires_at) {
    return false;
  }
  return Date.now() < sd_license.validated_at + LICENSE_TTL_MS + LICENSE_GRACE_MS;
}

function resolveLink(toolName: string, toolId?: string): { url: string; hasAffiliate: boolean; program: string | null } {
  const entry = affiliateTable[toolName];
  if (entry && entry.status === 'active' && entry.url) {
    return { url: entry.url, hasAffiliate: true, program: entry.program || null };
  }
  const homepage = toolId ? SIGNATURE_URLS[toolId] : undefined;
  if (homepage) {
    return { url: homepage, hasAffiliate: false, program: null };
  }
  return { url: `https://www.google.com/search?q=${encodeURIComponent(toolName)}`, hasAffiliate: false, program: null };
}

function setStatus(message: string, isError = false): void {
  const statusEl = document.getElementById('status');
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.classList.toggle('error', Boolean(isError));
}

function renderTools(tools: Array<{ id?: string; name: string; category: string }>, locked = 0): void {
  const resultsEl = document.getElementById('results');
  if (!resultsEl) return;
  resultsEl.innerHTML = '';

  if (!tools || tools.length === 0) {
    resultsEl.innerHTML = '<div class="empty">No common SaaS tools detected on this page.</div>';
    if (locked > 0) appendUpgradeBanner(resultsEl, locked);
    return;
  }

  const fragment = document.createDocumentFragment();

  tools.forEach((tool) => {
    const card = document.createElement('div');
    card.className = 'card';

    const info = document.createElement('div');
    const name = document.createElement('h4');
    name.textContent = tool.name;
    const category = document.createElement('div');
    category.className = 'category';
    category.textContent = tool.category;
    info.appendChild(name);
    info.appendChild(category);

    const { url: link, hasAffiliate, program } = resolveLink(tool.name, tool.id);

    if (hasAffiliate) {
      const badge = document.createElement('span');
      badge.className = 'aff-badge';
      badge.textContent = 'aff';
      badge.title = 'Affiliate link — we may earn a commission at no extra cost to you';
      category.appendChild(badge);
    }

    const button = document.createElement('button');
    button.className = 'visit-btn';
    button.textContent = 'Visit';
    button.addEventListener('click', () => {
      trackEvent('tool_visit_clicked', {
        tool: tool.name,
        category: tool.category,
        has_affiliate: hasAffiliate,
        affiliate_program: program,
      });
      chrome.tabs.create({ url: link });
    });

    card.appendChild(info);
    card.appendChild(button);
    fragment.appendChild(card);
  });

  resultsEl.appendChild(fragment);

  if (locked > 0) appendUpgradeBanner(resultsEl, locked);
}

function renderPlanGrid(): string {
  return STRIPE_PLANS.map((p) => {
    const badgeHtml = p.badge ? `<span class="plan-badge">${p.badge}</span>` : '';
    return `<button class="plan-btn" data-url="${p.url}" data-plan="${p.plan}" data-price="${p.price}">${p.label}<br><span class="plan-price">${p.price}</span>${badgeHtml}</button>`;
  }).join('');
}

function wirePlanButtons(banner: HTMLElement, location: string): void {
  trackEvent('view_pricing', { location });
  banner.querySelectorAll<HTMLButtonElement>('.plan-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      trackEvent('clicked_payment_link', {
        location,
        plan: btn.dataset.plan,
        price: btn.dataset.price,
      });
      const clientId = await getClientId();
      const { sd_license: lic } = await chrome.storage.sync.get({ sd_license: null }) as { sd_license: LicenseData | null };
      const url = withClientRef(btn.dataset.url!, clientId, lic?.email);
      trackEvent('checkout_begin', {
        location,
        plan: btn.dataset.plan,
        price: btn.dataset.price,
        source: 'extension',
      });
      chrome.tabs.create({ url });
    });
  });
  const trialLink = banner.querySelector<HTMLAnchorElement>('.banner-trial a');
  if (trialLink) {
    trialLink.addEventListener('click', (e) => {
      e.preventDefault();
      trackEvent('trial_clicked', { location });
      chrome.tabs.create({ url: TRIAL_URL });
    });
  }
}

function appendUpgradeBanner(container: HTMLElement, locked: number): void {
  const banner = document.createElement('div');
  banner.className = 'upgrade-banner';
  banner.innerHTML = `
    <div class="upgrade-count">You're missing ${locked} tool${locked !== 1 ? 's' : ''} on this page</div>
    <div class="upgrade-sub">Pro reveals them all · CSV export · Scan history</div>
    <div class="plan-grid">${renderPlanGrid()}</div>
    <div class="banner-trial"><a href="#">or try free for 7 days — no credit card</a></div>
    <div class="banner-guarantee">30-day money-back guarantee</div>
  `;
  wirePlanButtons(banner, 'popup_banner');
  container.appendChild(banner);
}

function appendUpgradeNudge(container: HTMLElement, visibleCount: number): void {
  const banner = document.createElement('div');
  banner.className = 'upgrade-banner';
  banner.innerHTML = `
    <div class="upgrade-count">Detected ${visibleCount} tool${visibleCount !== 1 ? 's' : ''} here</div>
    <div class="upgrade-sub">Pro unlocks all ${signatures.length} signatures · CSV export · Scan history</div>
    <div class="plan-grid">${renderPlanGrid()}</div>
    <div class="banner-trial"><a href="#">or try free for 7 days — no credit card</a></div>
    <div class="banner-guarantee">30-day money-back guarantee</div>
  `;
  wirePlanButtons(banner, 'popup_nudge');
  container.appendChild(banner);
}

function appendTrialBanner(container: HTMLElement, daysLeft: number, expired: boolean): void {
  const banner = document.createElement('div');
  banner.className = 'upgrade-banner';
  if (expired) {
    banner.innerHTML = `
      <div class="upgrade-count">Your Pro trial has ended</div>
      <div class="upgrade-sub">Keep your full stack analysis — pick a plan to continue</div>
      <div class="plan-grid">${renderPlanGrid()}</div>
    `;
    wirePlanButtons(banner, 'popup_trial_expired');
  } else {
    const dayLabel = daysLeft === 1 ? 'day' : 'days';
    banner.innerHTML = `
      <div class="upgrade-count">Pro trial · ${daysLeft} ${dayLabel} left</div>
      <div class="upgrade-sub">Lock in Pro before your trial ends</div>
      <div class="plan-grid">${renderPlanGrid()}</div>
    `;
    wirePlanButtons(banner, 'popup_trial_active');
  }
  container.appendChild(banner);
}

// ─── Scan History ────────────────────────────────────────────────────────────
interface ScanEntry {
  url: string;
  domain: string;
  title: string;
  timestamp: number;
  toolCount: number;
  tools: Array<{ id: string; name: string; category: string }>;
}

async function saveScanHistory(entry: ScanEntry, isPro: boolean): Promise<void> {
  if (entry.toolCount === 0) return;
  const limit = isPro ? HISTORY_LIMIT_PRO : HISTORY_LIMIT_FREE;
  const result = await chrome.storage.local.get({ sd_scan_history: [] });
  const history = (result['sd_scan_history'] as ScanEntry[]).filter(h => h.url !== entry.url);
  await chrome.storage.local.set({ sd_scan_history: [entry, ...history].slice(0, limit) });
}

// ─── Export ───────────────────────────────────────────────────────────────────
function exportTools(
  tools: Array<{ id?: string; name: string; category: string }>,
  format: 'csv' | 'json',
  domain: string
): void {
  let content: string;
  const filename = `saas-stack-${domain}-${new Date().toISOString().slice(0, 10)}`;

  if (format === 'csv') {
    const rows = [['Name', 'Category', 'Link'], ...tools.map(t => {
      const { url } = resolveLink(t.name, t.id);
      return [t.name, t.category, url];
    })];
    content = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\r\n');
  } else {
    content = JSON.stringify(tools.map(t => {
      const { url } = resolveLink(t.name, t.id);
      return { name: t.name, category: t.category, link: url };
    }), null, 2);
  }

  const mimeType = format === 'csv' ? 'text/csv' : 'application/json';
  const blob = new Blob([content], { type: mimeType });
  const objUrl = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), {
    href: objUrl,
    download: `${filename}.${format}`,
  });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(objUrl);
}

function wireExportBar(
  tools: Array<{ id: string; name: string; category: string; link?: string }>,
  isPro: boolean,
  domain: string
): void {
  const bar = document.getElementById('export-bar');
  if (!bar || tools.length === 0) return;
  bar.style.display = 'flex';

  const csvBtn = document.getElementById('exportCsvBtn') as HTMLButtonElement | null;
  const jsonBtn = document.getElementById('exportJsonBtn') as HTMLButtonElement | null;
  const lockedBtn = document.getElementById('exportLockedBtn') as HTMLButtonElement | null;

  if (isPro) {
    if (lockedBtn) lockedBtn.style.display = 'none';
    csvBtn?.addEventListener('click', () => {
      exportTools(tools, 'csv', domain);
      trackEvent('export_clicked', { format: 'csv', tool_count: tools.length });
    });
    jsonBtn?.addEventListener('click', () => {
      exportTools(tools, 'json', domain);
      trackEvent('export_clicked', { format: 'json', tool_count: tools.length });
    });
  } else {
    if (csvBtn) csvBtn.style.display = 'none';
    if (jsonBtn) jsonBtn.style.display = 'none';
    if (lockedBtn) {
      lockedBtn.style.display = '';
      lockedBtn.addEventListener('click', () => {
        trackEvent('export_locked_clicked');
        document.querySelector<HTMLElement>('.upgrade-banner')?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }
}

interface NudgeState {
  sd_scans_with_content: number;
  sd_last_nudge_at: number;
}

async function getNudgeState(): Promise<NudgeState> {
  const result = await chrome.storage.local.get({
    sd_scans_with_content: 0,
    sd_last_nudge_at: 0,
  });
  return {
    sd_scans_with_content: result['sd_scans_with_content'] as number,
    sd_last_nudge_at: result['sd_last_nudge_at'] as number,
  };
}

async function recordScanWithContent(): Promise<number> {
  const { sd_scans_with_content } = await getNudgeState();
  const next = sd_scans_with_content + 1;
  await chrome.storage.local.set({ sd_scans_with_content: next });
  return next;
}

async function markNudgeShown(): Promise<void> {
  await chrome.storage.local.set({ sd_last_nudge_at: Date.now() });
}

function sendMessageToTab(
  tabId: number
): Promise<{ tools?: Array<{ id: string; name: string; category: string; link?: string }> }> {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, { action: 'SCAN_PAGE' }, (response) => {
      if (chrome.runtime.lastError || !response) {
        reject(chrome.runtime.lastError || new Error('No response from content script'));
        return;
      }
      resolve(response);
    });
  });
}

async function sendScan(
  tabId: number
): Promise<{ tools?: Array<{ id: string; name: string; category: string; link?: string }> }> {
  try {
    return await sendMessageToTab(tabId);
  } catch (error) {
    if (chrome.scripting?.executeScript) {
      await chrome.scripting.executeScript({ target: { tabId }, files: ['content.js'] });
      return await sendMessageToTab(tabId);
    }
    throw error;
  }
}

// Run in MAIN world to access page's window globals — catches tools loaded
// asynchronously or via tag managers that don't leave HTML fingerprints.
async function getGlobalVarMatches(
  tabId: number
): Promise<Array<{ id: string; name: string; category: string }>> {
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN' as chrome.scripting.ExecutionWorld,
      func: (checks: Array<{ id: string; name: string; category: string; vars: string[] }>) => {
        return checks
          .filter(c => c.vars.some((v: string) => typeof (window as any)[v] !== 'undefined'))
          .map(({ id, name, category }) => ({ id, name, category }));
      },
      args: [globalVarChecks],
    });
    return (results[0]?.result as Array<{ id: string; name: string; category: string }>) || [];
  } catch (_) {
    return [];
  }
}

// Payments-category patterns only, matched directly against page HTML —
// independent of the user's enabledCategories toggle in Options. If someone
// hides "Payments" from their results view, the trust check must still see
// the processor; otherwise a hidden category silently reads as "no processor
// detected" and docks a legitimate checkout's trust score for no reason.
const paymentSignatures = signatures.filter(s => s.category === 'Payments');

async function getPaymentProcessor(tabId: number): Promise<string | null> {
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN' as chrome.scripting.ExecutionWorld,
      func: (paymentSigs: Array<{ name: string; patterns: string[]; globalVar: string[] }>) => {
        const html = document.documentElement.innerHTML.toLowerCase();
        const match = paymentSigs.find(s => {
          const patternMatch = s.patterns.some(p => html.includes(p.toLowerCase()));
          const globalMatch = s.globalVar.some(g => (window as any)[g] !== undefined);
          return patternMatch || globalMatch;
        });
        if (match) return match.name;

        // No named third-party processor matched. Browsers define standard
        // autocomplete hints for card forms so autofill works — virtually
        // every real checkout uses these regardless of which processor (or
        // in-house system) sits behind it. Treat this as evidence of a
        // genuine, self-hosted checkout rather than "nothing here at all."
        const hasCardForm = document.querySelector(
          'input[autocomplete="cc-number"], input[autocomplete="cc-exp"], ' +
          'input[autocomplete="cc-exp-month"], input[autocomplete="cc-exp-year"], ' +
          'input[autocomplete="cc-csc"], input[autocomplete="cc-name"]'
        ) !== null;
        return hasCardForm ? 'Self-hosted checkout' : null;
      },
      args: [paymentSignatures.map(s => ({ name: s.name, patterns: s.patterns || [], globalVar: s.globalVar || [] }))],
    });
    return (results[0]?.result as string | null) || null;
  } catch (_) {
    return null;
  }
}

interface TrustCheckResult {
  ok: boolean;
  domain: string;
  score: number;
  riskLevel: 'low' | 'medium' | 'high';
  reasons: string[];
  domainAgeDays: number | null;
  cached: boolean;
  facts: {
    ssl: string;
    paymentProcessor: string;
    domainAge: string;
  };
  verdict: {
    level: 'excellent' | 'ok' | 'caution' | 'high_risk' | 'danger';
    headline: string;
    summary: string;
  };
}

const VERDICT_STYLES: Record<string, { bg: string; border: string; text: string }> = {
  excellent: { bg: '#e8f5e9', border: '#2e7d32', text: '#1b5e20' },
  ok:        { bg: '#eef7ee', border: '#43a047', text: '#2e7d32' },
  caution:   { bg: '#fff8e1', border: '#f9a825', text: '#8d6e00' },
  high_risk: { bg: '#ffe9e0', border: '#e65100', text: '#bf360c' },
  danger:    { bg: '#fdecea', border: '#c62828', text: '#b71c1c' },
};

const TRUST_REASON_LABELS: Record<string, string> = {
  no_ssl: 'No SSL/HTTPS on this page',
  no_known_payment_processor: 'No recognized payment processor detected',
  domain_under_3_months: 'Domain registered less than 3 months ago',
  domain_age_unknown: 'Domain age could not be verified',
};

async function fetchTrustCheck(domain: string, sslValid: boolean, paymentProcessor: string | null): Promise<TrustCheckResult | null> {
  try {
    const res = await fetch(TRUST_CHECK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain, sslValid, paymentProcessor }),
    });
    if (!res.ok) return null;
    const data = await res.json() as TrustCheckResult;
    await chrome.storage.local.set({ sd_last_trust_check: data });
    return data;
  } catch (err) {
    console.error('[trust-check] request failed', err);
    return null;
  }
}

// Pro-only. Free users see a locked teaser and never trigger the actual
// request — keeps the Worker/RDAP cost tied to paying usage, not free traffic.
function riskLevelColor(riskLevel: string | null): string {
  if (riskLevel === 'low') return '#22c55e';
  if (riskLevel === 'medium') return '#f59e0b';
  if (riskLevel === 'high') return '#ef4444';
  return '#8a8a8a';
}

function renderTrustLocked(container: HTMLElement, riskLevel: string | null): void {
  const color = riskLevelColor(riskLevel);
  container.innerHTML = `
    <div class="trust-teaser">
      <div class="trust-teaser-text">
        <span class="trust-teaser-dot" style="background:${color}"></span>
        <div>
          <div class="trust-teaser-title">Checkout Trust Score</div>
          <div class="trust-teaser-sub">SSL, payment processor &amp; domain age — Pro feature</div>
        </div>
      </div>
      <button class="trust-teaser-btn" type="button">Unlock</button>
    </div>
  `;
  container.querySelector('.trust-teaser-btn')?.addEventListener('click', async () => {
    trackEvent('clicked_payment_link', { location: 'trust_teaser', plan: STRIPE_PLANS[0].plan, price: STRIPE_PLANS[0].price });
    const clientId = await getClientId();
    const { sd_license: lic } = await chrome.storage.sync.get({ sd_license: null }) as { sd_license: LicenseData | null };
    const url = withClientRef(STRIPE_PLANS[0].url, clientId, lic?.email);
    trackEvent('checkout_begin', { location: 'trust_teaser', plan: STRIPE_PLANS[0].plan, price: STRIPE_PLANS[0].price, source: 'extension' });
    chrome.tabs.create({ url });
  });
  trackEvent('trust_score_upsell_shown', { risk_level: riskLevel || 'unknown' });
}

function renderTrustChecking(container: HTMLElement): void {
  container.innerHTML = '<div class="trust-checking">Checking trust score&hellip;</div>';
}

function escapeHtml(str: unknown): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderTrustResult(container: HTMLElement, data: TrustCheckResult | null): void {
  if (!data || !data.ok) {
    container.innerHTML = '';
    return;
  }
  // Everything below is escaped even where the worker today only ever sends
  // fixed-vocabulary strings (verdict headline/summary, facts.ssl,
  // facts.domainAge) — `facts.paymentProcessor` in particular is echoed by
  // the worker from client-supplied input with no server-side allowlist, so
  // treat all of these as untrusted rather than relying on that invariant.
  const riskLabel = data.riskLevel === 'low' ? 'Low risk' : data.riskLevel === 'medium' ? 'Medium risk' : 'High risk';
  const reasonItems = (data.reasons || [])
    .map(r => `<li>${escapeHtml(TRUST_REASON_LABELS[r] || r)}</li>`)
    .join('');
  const factsList = data.facts
    ? `
      <ul class="trust-facts">
        <li><strong>SSL:</strong> ${escapeHtml(data.facts.ssl)}</li>
        <li><strong>Payment processor:</strong> ${escapeHtml(data.facts.paymentProcessor)}</li>
        <li><strong>Domain age:</strong> ${escapeHtml(data.facts.domainAge)}</li>
      </ul>`
    : '';
  const vStyle = data.verdict ? (VERDICT_STYLES[data.verdict.level] || VERDICT_STYLES.caution) : null;
  const verdictBlock = data.verdict && vStyle
    ? `
      <div class="trust-verdict trust-verdict-${escapeHtml(data.verdict.level)}" style="background:${vStyle.bg}; border-left:4px solid ${vStyle.border}; color:${vStyle.text}; padding:10px 12px; border-radius:6px; margin-bottom:10px;">
        <div style="font-weight:700; font-size:14px;">${escapeHtml(data.verdict.headline)}</div>
        <div style="font-size:12px; margin-top:4px; opacity:0.9;">${escapeHtml(data.verdict.summary)}</div>
      </div>`
    : '';
  container.innerHTML = `
    <div class="trust-card trust-${escapeHtml(data.riskLevel)}">
      ${verdictBlock}
      <div class="trust-card-head">
        <span class="trust-dot"></span>
        <span class="trust-score-num">${escapeHtml(data.score)}</span>
        <span class="trust-risk-label">${riskLabel}</span>
      </div>
      ${factsList}
      ${reasonItems ? `<ul class="trust-reasons">${reasonItems}</ul>` : '<div class="trust-clean">No issues detected</div>'}
    </div>
  `;
}

function isHttpUrl(url?: string): boolean {
  return Boolean(url && (url.startsWith('http://') || url.startsWith('https://')));
}

function updatePlanUI(licensed: boolean): void {
  const badge = document.getElementById('planStatus');
  if (badge) {
    badge.textContent = licensed ? 'PRO' : 'FREE';
    badge.classList.toggle('pro', licensed);
  }

  const strip = document.getElementById('upgrade-strip') as HTMLElement | null;
  if (strip) {
    strip.style.display = licensed ? 'none' : 'flex';
    if (!licensed) trackEvent('view_pricing', { location: 'upgrade_strip' });
  }

  const stripLink = document.getElementById('upgradeStripLink');
  if (stripLink && !licensed) {
    stripLink.addEventListener('click', async (e) => {
      e.preventDefault();
      trackEvent('clicked_payment_link', { location: 'upgrade_strip', plan: STRIPE_PLANS[0].plan, price: STRIPE_PLANS[0].price });
      const clientId = await getClientId();
      const { sd_license: lic } = await chrome.storage.sync.get({ sd_license: null }) as { sd_license: LicenseData | null };
      const url = withClientRef(STRIPE_PLANS[0].url, clientId, lic?.email);
      trackEvent('checkout_begin', { location: 'upgrade_strip', plan: STRIPE_PLANS[0].plan, price: STRIPE_PLANS[0].price, source: 'extension' });
      chrome.tabs.create({ url });
    });
  }

  const trialStripLink = document.getElementById('trialStripLink');
  if (trialStripLink && !licensed) {
    trialStripLink.addEventListener('click', (e) => {
      e.preventDefault();
      trackEvent('trial_clicked', { location: 'upgrade_strip' });
      chrome.tabs.create({ url: TRIAL_URL });
    });
  }
}

async function scanPage(): Promise<void> {
  setStatus('Scanning current tab...');
  const resultsEl = document.getElementById('results');
  if (resultsEl) resultsEl.innerHTML = '';

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab || !isHttpUrl(tab.url)) {
    setStatus('Open a website tab to scan.', true);
    return;
  }

  try {
    const [response, globalMatches, paymentProcessor] = await Promise.all([
      sendScan(tab.id!),
      getGlobalVarMatches(tab.id!),
      getPaymentProcessor(tab.id!),
    ]);

    const sslValid = tab.url!.startsWith('https://');
    const trustDomain = (() => { try { const hostname = new URL(tab.url!).hostname; return getDomain(hostname) || hostname; } catch { return ''; } })();

    const htmlTools = response.tools || [];
    const htmlIds = new Set(htmlTools.map(t => t.id));

    // Merge: add globalVar detections not already found by HTML patterns
    const allTools = [
      ...htmlTools,
      ...globalMatches.filter(t => !htmlIds.has(t.id)),
    ];

    const license = await getLicense();
    const licensed = await isLicenseValid(license);
    updatePlanUI(licensed);

    const trustSectionEl = document.getElementById('trust-section');
    if (trustSectionEl) {
      if (!licensed) {
        if (trustDomain) {
          renderTrustLocked(trustSectionEl, null);
          fetchTrustCheck(trustDomain, sslValid, paymentProcessor).then((data) => {
            const el = document.getElementById('trust-section');
            // Only riskLevel ever leaves this scope for free users — score,
            // reasons, and facts are discarded here and never reach render.
            const riskLevel = data?.ok ? data.riskLevel : null;
            if (el) renderTrustLocked(el, riskLevel);
          });
        } else {
          renderTrustLocked(trustSectionEl, null);
        }
      } else if (trustDomain) {
        renderTrustChecking(trustSectionEl);
        fetchTrustCheck(trustDomain, sslValid, paymentProcessor).then((data) => {
          const el = document.getElementById('trust-section');
          if (el) renderTrustResult(el, data);
        });
      } else {
        trustSectionEl.innerHTML = '';
      }
    }

    const onTrial = Boolean(license?.trial && licensed);
    const trialExpired = Boolean(license?.trial && !licensed);

    let visibleTools = allTools;
    let locked = 0;

    if (!licensed && allTools.length > FREE_LIMIT) {
      visibleTools = allTools.slice(0, FREE_LIMIT);
      locked = allTools.length - FREE_LIMIT;
      trackEvent('tool_limit_hit', {
        locked_count: locked,
        visible_count: visibleTools.length,
        top_locked: allTools.slice(FREE_LIMIT, FREE_LIMIT + 3).map(t => t.name).join(','),
      });
    }

    renderTools(visibleTools, locked);

    const hasContent = visibleTools.length > 0 || locked > 0;
    setStatus(hasContent ? 'Scan complete.' : 'Scan complete. Nothing detected.');

    const resultsAfter = document.getElementById('results');
    let nudgeShown = false;
    let trialBannerShown = false;

    if (onTrial && resultsAfter && typeof license?.expires_at === 'number') {
      const msLeft = license.expires_at - Date.now();
      const daysLeft = Math.max(1, Math.ceil(msLeft / (24 * 60 * 60 * 1000)));
      appendTrialBanner(resultsAfter, daysLeft, false);
      trialBannerShown = true;
      trackEvent('trial_banner_shown', { days_left: daysLeft });
    } else if (trialExpired && resultsAfter) {
      appendTrialBanner(resultsAfter, 0, true);
      trialBannerShown = true;
      trackEvent('trial_expired_banner_shown');
    } else if (!licensed && visibleTools.length > 0) {
      const scansWithContent = await recordScanWithContent();
      if (locked === 0) {
        const { sd_last_nudge_at } = await getNudgeState();
        const cooledDown = Date.now() - sd_last_nudge_at > NUDGE_COOLDOWN_MS;
        if (scansWithContent >= NUDGE_THRESHOLD_SCANS && cooledDown && resultsAfter) {
          appendUpgradeNudge(resultsAfter, visibleTools.length);
          await markNudgeShown();
          nudgeShown = true;
          trackEvent('upgrade_nudge_shown', {
            tools_detected: visibleTools.length,
            scans_with_content: scansWithContent,
          });
        }
      }
    }

    const siteHost = (() => { try { return new URL(tab.url!).hostname; } catch { return ''; } })();

    // Save scan to history and wire export bar
    await saveScanHistory({
      url: tab.url!,
      domain: siteHost,
      title: tab.title || siteHost,
      timestamp: Date.now(),
      toolCount: allTools.length,
      tools: allTools.map(({ id, name, category }) => ({ id, name, category })),
    }, licensed);
    wireExportBar(allTools, licensed, siteHost);

    trackEvent('scan_complete', {
      tools_detected: visibleTools.length,
      tools_locked: locked,
      domain: siteHost,
      licensed,
      nudge_shown: nudgeShown,
      trial: onTrial,
      trial_banner_shown: trialBannerShown,
      top_tools: allTools.slice(0, 5).map(t => t.name).join(',').slice(0, 95),
      top_categories: [...new Set(allTools.map(t => t.category))].slice(0, 5).join(',').slice(0, 95),
    });
  } catch (err) {
    const errDomain = (() => { try { return new URL(tab?.url ?? '').hostname; } catch { return ''; } })();
    trackEvent('scan_error', { error: (err as Error).message, domain: errDomain });
    setStatus('Unable to scan this page. Please refresh and try again.', true);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadAffiliates();
  trackEvent('popup_opened');

  const firstOpenResult = await chrome.storage.local.get({ sd_first_opened: false });
  if (!firstOpenResult['sd_first_opened']) {
    trackEvent('first_open');
    await chrome.storage.local.set({ sd_first_opened: true });
  }

  scanPage();

  document.getElementById('rescanBtn')?.addEventListener('click', () => {
    trackEvent('rescan_clicked');
    scanPage();
  });

  document.getElementById('onboardingLink')?.addEventListener('click', (event) => {
    event.preventDefault();
    chrome.tabs.create({ url: chrome.runtime.getURL('onboarding.html') });
  });

  document.getElementById('optionsLink')?.addEventListener('click', (event) => {
    event.preventDefault();
    chrome.runtime.openOptionsPage();
  });
});
