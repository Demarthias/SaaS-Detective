// Google Analytics tracking for Stripe plan button clicks
import { trackEvent } from './src/analytics.js';

document.addEventListener('DOMContentLoaded', () => {
  const plans = [
    { selector: 'a[href*="aFaaEZ76edBi8aQ5wD1Jm00"]', plan: 'monthly' },
    { selector: 'a[href*="3cIdRb76e9l28aQcZ51Jm04"]', plan: '3mo' },
    { selector: 'a[href*="6oU00lduC54M0Io5wD1Jm05"]', plan: '6mo' },
    { selector: 'a[href*="8x2bJ3bmu8gYgHm1gn1Jm06"]', plan: 'annual' },
  ];
  plans.forEach(({ selector, plan }) => {
    document.querySelectorAll(selector).forEach(btn => {
      btn.addEventListener('click', () => {
        trackEvent('checkout_begin', { plan });
      });
    });
  });
});
