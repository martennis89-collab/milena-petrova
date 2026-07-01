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
 * Get Facebook Browser ID (_fbp cookie) for Conversions API
 */
export const getFacebookBrowserId = () => {
  if (typeof document === 'undefined') return null;
  
  const fbpCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('_fbp='));
  
  return fbpCookie ? fbpCookie.split('=')[1] : null;
};

/**
 * Get Facebook Click ID (_fbc cookie) for Conversions API
 */
export const getFacebookClickId = () => {
  if (typeof document === 'undefined') return null;
  
  const fbcCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('_fbc='));
  
  return fbcCookie ? fbcCookie.split('=')[1] : null;
};

/**
 * Send event to server for Facebook Conversions API
 */
export const sendServerSideEvent = async (eventName, eventData = {}) => {
  const apiUrl = process.env.REACT_APP_BACKEND_URL;
  
  if (!apiUrl) {
    console.warn('Backend URL not configured');
    return;
  }
  
  try {
    const fbp = getFacebookBrowserId();
    const fbc = getFacebookClickId();
    const eventId = `${eventName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const payload = {
      event_name: eventName,
      event_source_url: window.location.href,
      fbp,
      fbc,
      event_id: eventId,
      custom_data: eventData
    };
    
    const response = await fetch(`${apiUrl}/api/facebook/track-event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    if (response.ok) {
      console.log('✅ Server-side event sent:', eventName);
    } else {
      console.warn('⚠️ Server-side event failed:', eventName);
    }
  } catch (error) {
    console.error('Error sending server-side event:', error);
  }
};

/**
 * Track event (browser Pixel + server-side Conversions API)
 */
export const trackEvent = (eventName, eventData = {}) => {
  console.log('[Track Event]', eventName, eventData);
  
  // Browser-side: Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    const eventId = `${eventName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    window.fbq('track', eventName, eventData, { eventID: eventId });
  }
  
  // Server-side: Conversions API
  sendServerSideEvent(eventName, eventData);
  
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
  getFacebookBrowserId,
  getFacebookClickId,
  sendServerSideEvent,
};
