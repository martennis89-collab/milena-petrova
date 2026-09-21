// Single source of truth for the site's own URL and for externally hosted media.
//
// ⚠️ MIGRATION NOTE — the binary assets below are still served from Emergent's
// customer-asset CDN. Nothing in this repository can keep them alive: if that
// Emergent project is torn down, the portrait, the workbook PDF and the Open
// Graph image all start returning 404. Rehost them (S3 + CloudFront, Cloudflare
// R2, or simply frontend/public/) and then either point
// REACT_APP_ASSET_BASE_URL at the new location or replace DEFAULT_ASSET_BASE.
//
// Both values are overridable at build time, because Create React App inlines
// REACT_APP_* variables when the bundle is built, not when it is served.

const DEFAULT_SITE_URL = 'https://milenapetrova.bg';
const DEFAULT_ASSET_BASE =
  'https://customer-assets.emergentagent.com/job_guided-sessions-2/artifacts';

const stripTrailingSlash = (value) => String(value).replace(/\/+$/, '');

/** Canonical public origin, used for canonical links and og:url. */
export const SITE_URL = stripTrailingSlash(
  process.env.REACT_APP_SITE_URL || DEFAULT_SITE_URL
);

/** Base URL that all media below is resolved against. */
export const ASSET_BASE_URL = stripTrailingSlash(
  process.env.REACT_APP_ASSET_BASE_URL || DEFAULT_ASSET_BASE
);

/** Build a URL for a media file. Relative when ASSET_BASE_URL is relative. */
export const asset = (path) => `${ASSET_BASE_URL}/${String(path).replace(/^\/+/, '')}`;

/**
 * Always-absolute URL for a media file.
 *
 * Open Graph and Twitter Card images must be absolute — crawlers do not resolve
 * relative paths — so this is what social meta tags use. It matters as soon as
 * the assets are rehosted inside the app and REACT_APP_ASSET_BASE_URL becomes
 * something like "/assets".
 */
export const absoluteAsset = (path) => {
  const url = asset(path);
  return /^https?:\/\//i.test(url) ? url : `${SITE_URL}/${url.replace(/^\/+/, '')}`;
};

/** Build an absolute URL on this site, e.g. siteUrl('book'). */
export const siteUrl = (path = '') => {
  const clean = String(path).replace(/^\/+/, '');
  return clean ? `${SITE_URL}/${clean}` : SITE_URL;
};

/**
 * Named media assets. Filenames are the opaque keys Emergent's CDN assigned;
 * keep them as-is when rehosting, or update both sides together.
 */
const PORTRAIT = 'z6q4f8xp_00BBF565-6315-4EAC-864A-B5832736105D.jpeg';
const PORTRAIT_ALT = 'iqmzyaot_0d9fb4c0-41c8-4c7b-bc02-488dd6b229ca.JPG';
const WORKBOOK =
  '1hbxuxty_%D0%94%D0%BD%D0%B5%D0%B2%D0%BD%D0%B8%D0%BA%20%D0%92%D1%80%D0%B5%D0%BC%D0%B5%20%D0%B7%D0%B0%20%D1%81%D0%B5%D0%B1%D0%B5%20%D1%81%D0%B8-1.pdf';

/** Media used in the page body. */
export const ASSETS = {
  // Portrait of Milena used on the webinar and sales pages.
  MILENA_PORTRAIT: asset(PORTRAIT),
  // Second portrait used in the testimonials/mock data.
  MILENA_PORTRAIT_ALT: asset(PORTRAIT_ALT),
  // "Дневник: Време за себе си" workbook handed out with the programme.
  WORKBOOK_PDF: asset(WORKBOOK),
};

/** The same media, absolute, for social meta tags. */
export const SOCIAL_ASSETS = {
  MILENA_PORTRAIT: absoluteAsset(PORTRAIT),
};

export default { SITE_URL, ASSET_BASE_URL, ASSETS, SOCIAL_ASSETS, asset, absoluteAsset, siteUrl };
