// UTM tracking utilities

/**
 * Get all UTM parameters from current URL
 */
export const getUTMParams = () => {
  if (typeof window === 'undefined') return {};
  
  const searchParams = new URLSearchParams(window.location.search);
  const utmParams = {};
  
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  
  utmKeys.forEach(key => {
    const value = searchParams.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });
  
  return utmParams;
};

/**
 * Append UTM parameters to a URL
 */
export const appendUTMParams = (baseUrl, utmParams = null) => {
  const params = utmParams || getUTMParams();
  
  if (Object.keys(params).length === 0) {
    return baseUrl;
  }
  
  try {
    const url = new URL(baseUrl);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    return url.toString();
  } catch (e) {
    console.error('Error appending UTM params:', e);
    return baseUrl;
  }
};

/**
 * Store UTM params in sessionStorage for persistence
 */
export const storeUTMParams = () => {
  if (typeof window === 'undefined') return;
  
  const utmParams = getUTMParams();
  
  if (Object.keys(utmParams).length > 0) {
    sessionStorage.setItem('lubov_utm_params', JSON.stringify(utmParams));
  }
};

/**
 * Retrieve stored UTM params from sessionStorage
 */
export const getStoredUTMParams = () => {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = sessionStorage.getItem('lubov_utm_params');
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    return {};
  }
};

/**
 * Get UTM params with fallback to stored params
 */
export const getUTMParamsWithFallback = () => {
  const currentParams = getUTMParams();
  
  if (Object.keys(currentParams).length > 0) {
    return currentParams;
  }
  
  return getStoredUTMParams();
};

/**
 * Track event (console log for now, will integrate with Meta Pixel)
 */
export const trackEvent = (eventName, eventData = {}) => {
  console.log('[Track Event]', eventName, eventData);
  
  // Meta Pixel integration (when pixel ID is provided)
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, eventData);
  }
  
  // Google Analytics (if exists)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData);
  }
};

/**
 * Track CTA click with UTM params
 */
export const trackCTAClick = (ctaLocation) => {
  const utmParams = getUTMParamsWithFallback();
  
  trackEvent('checkout_cta_click', {
    location: ctaLocation,
    ...utmParams,
  });
};

/**
 * Setup scroll depth tracking
 */
export const setupScrollTracking = () => {
  if (typeof window === 'undefined') return;
  
  const scrollDepths = [25, 50, 75, 90];
  const tracked = new Set();
  
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    
    scrollDepths.forEach(depth => {
      if (scrollPercent >= depth && !tracked.has(depth)) {
        tracked.add(depth);
        trackEvent(`scroll_${depth}`, { depth });
      }
    });
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

export default {
  getUTMParams,
  appendUTMParams,
  storeUTMParams,
  getStoredUTMParams,
  getUTMParamsWithFallback,
  trackEvent,
  trackCTAClick,
  setupScrollTracking,
};
