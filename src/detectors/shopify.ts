export const isShopifyPlus = (): boolean => {
  const hasPlusCheckout = !!(window as any).Shopify?.Checkout?.OrderStatus;
  const hasCheckoutExtensibility = !!document.querySelector('script[src*="checkout_extension"]');
  const hasPlusGlobal = (window as any).Shopify?.isPlus === true;

  return hasPlusCheckout || hasCheckoutExtensibility || hasPlusGlobal;
};

export const getStoreTier = (): string => {
  return isShopifyPlus() ? 'Shopify Plus' : 'Shopify Basic/Advanced';
};
