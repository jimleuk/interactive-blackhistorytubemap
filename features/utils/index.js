export const isMobileViewport = () => window.innerWidth <= 480;

export const getBaseUrl = () => `${window.location.origin}${window.location.pathname}`;