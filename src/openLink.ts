import { AFFILIATE_LINKS } from './affiliateMap';

export const openAffiliateLink = (key: string): void => {
  const url = AFFILIATE_LINKS[key as keyof typeof AFFILIATE_LINKS];
  if (url) {
    window.open(url, '_blank');
  }
};

// Backwards-compatible alias
export const openLink = openAffiliateLink;
