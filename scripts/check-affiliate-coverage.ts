// Checks affiliates.json against the live signature list for drift:
//   - detected tools with no affiliates.json entry at all
//   - affiliates.json entries that don't match any current signature name
//   - entries marked "active" that are actually unfinished placeholders —
//     an empty url, or a note starting with "Replace" (the exact pattern
//     that let 27 fake links go live with real "aff" disclosure badges).
//
// Run with: npx ts-node scripts/check-affiliate-coverage.ts
// Exits non-zero if any placeholder-marked-active entries are found, so it
// can be used as a CI gate.

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { signatures } from '../src/signatures.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const affiliates: Record<string, { status: string; url: string; program?: string; notes?: string }> =
  JSON.parse(readFileSync(path.join(__dirname, '../affiliates.json'), 'utf8'));

const detectedNames = new Set(signatures.map((sig) => sig.name));
const affiliateNames = new Set(Object.keys(affiliates));

const missingCoverage = Array.from(detectedNames).filter((name) => !affiliateNames.has(name));
const orphanedEntries = Array.from(affiliateNames).filter((name) => !detectedNames.has(name));

const fakeActiveEntries = Object.entries(affiliates).filter(
  ([, entry]) =>
    entry.status === 'active' &&
    (!entry.url || /^replace\b/i.test(entry.notes || ''))
);

console.log('=== Detected tools with no affiliates.json entry ===');
console.log(missingCoverage.length ? missingCoverage.map((n) => `- ${n}`).join('\n') : '(none)');

console.log('\n=== affiliates.json entries with no matching signature (stale/renamed) ===');
console.log(orphanedEntries.length ? orphanedEntries.map((n) => `- ${n}`).join('\n') : '(none)');

console.log('\n=== "active" entries that are actually unfinished placeholders ===');
if (fakeActiveEntries.length === 0) {
  console.log('(none — every "active" entry has a real url and no "Replace..." note)');
} else {
  fakeActiveEntries.forEach(([name, entry]) =>
    console.log(`- ${name}: url="${entry.url}" notes="${entry.notes || ''}"`)
  );
}

const activeCount = Object.values(affiliates).filter((e) => e.status === 'active').length;
console.log(
  `\n${activeCount} entries marked active, ${detectedNames.size} tools detectable, ` +
    `${fakeActiveEntries.length} of the active entries are placeholders.`
);

if (fakeActiveEntries.length > 0) {
  console.error(`\nFAIL: ${fakeActiveEntries.length} "active" affiliate link(s) are unfinished placeholders.`);
  process.exit(1);
}
