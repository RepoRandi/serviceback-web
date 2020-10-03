export const isClient = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const useIsClient = () => isClient;
