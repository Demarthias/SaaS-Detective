// This script checks for SaaS products detected in signatures.ts that are missing from AFFILIATE_LINKS.
// Run with: ts-node scripts/check-affiliate-coverage.ts

import { signatures } from '../src/signatures.ts';
import { AFFILIATE_LINKS } from '../src/affiliateMap.ts';

const detectedNames = new Set(signatures.map(sig => sig.name));
const affiliateNames = new Set(Object.keys(AFFILIATE_LINKS));

const missingInAffiliateLinks = Array.from(detectedNames).filter(name => !affiliateNames.has(name));
const unusedAffiliateLinks = Array.from(affiliateNames).filter(name => !detectedNames.has(name));

console.log('=== SaaS detected but missing affiliate link ===');
if (missingInAffiliateLinks.length === 0) {
  console.log('All detected SaaS products have affiliate links.');
} else {
  missingInAffiliateLinks.forEach(name => console.log('- ' + name));
}

console.log('\n=== Affiliate links with no detected SaaS ===');
if (unusedAffiliateLinks.length === 0) {
  console.log('All affiliate links are used by detected SaaS products.');
} else {
  unusedAffiliateLinks.forEach(name => console.log('- ' + name));
}
