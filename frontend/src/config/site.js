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

/** Build an absolute URL for a media file. */
export const asset = (path) => `${ASSET_BASE_URL}/${String(path).replace(/^\/+/, '')}`;

/** Build an absolute URL on this site, e.g. siteUrl('book'). */
export const siteUrl = (path = '') => {
  const clean = String(path).replace(/^\/+/, '');
  return clean ? `${SITE_URL}/${clean}` : SITE_URL;
};

/**
 * Named media assets. Filenames are the opaque keys Emergent's CDN assigned;
 * keep them as-is when rehosting, or update both sides together.
 */
export const ASSETS = {
  // Portrait of Milena used on the webinar and sales pages.
  MILENA_PORTRAIT: asset('z6q4f8xp_00BBF565-6315-4EAC-864A-B5832736105D.jpeg'),
  // Second portrait used in the testimonials/mock data.
  MILENA_PORTRAIT_ALT: asset('iqmzyaot_0d9fb4c0-41c8-4c7b-bc02-488dd6b229ca.JPG'),
  // "Дневник: Време за себе си" workbook handed out with the programme.
  WORKBOOK_PDF: asset(
    '1hbxuxty_%D0%94%D0%BD%D0%B5%D0%B2%D0%BD%D0%B8%D0%BA%20%D0%92%D1%80%D0%B5%D0%BC%D0%B5%20%D0%B7%D0%B0%20%D1%81%D0%B5%D0%B1%D0%B5%20%D1%81%D0%B8-1.pdf'
  ),
};

export default { SITE_URL, ASSET_BASE_URL, ASSETS, asset, siteUrl };
