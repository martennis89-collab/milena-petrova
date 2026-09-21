// Configuration for "Любов без болка" sales page

import { ASSETS, SOCIAL_ASSETS, siteUrl } from './site';

export const LUBOV_BEZ_BOLKA_CONFIG = {
  // Checkout
  CHECKOUT_URL: 'https://omba-mp.systeme.io/1376f38f',
  
  // Pricing
  PRICE: '49 euro',
  PRICE_NUMERIC: 49,
  ORIGINAL_PRICE: '199 euro',
  ORIGINAL_PRICE_NUMERIC: 199,
  CURRENCY: 'EUR',
  
  // Discount campaign
  DISCOUNT_SPOTS_TOTAL: 20,
  DISCOUNT_SPOTS_REMAINING: 7, // Update this manually as sales come in
  
  // Access
  ACCESS_DURATION: 'Lifetime',
  
  // Refund policy
  REFUND_POLICY: 'Ако не намериш стойност в съдържанието, пълно възстановяване на парите без въпроси в рамките на 30 дни',
  
  // Assets (see config/site.js — still hosted on Emergent's CDN)
  WORKBOOK_PDF_URL: ASSETS.WORKBOOK_PDF,
  MILENA_PHOTO: ASSETS.MILENA_PORTRAIT,
  
  // Analytics
  META_PIXEL_ID: '1326425393018449',
  
  // Tracking events
  EVENTS: {
    CTA_CLICK: 'checkout_cta_click',
    FAQ_OPEN: 'faq_open',
    MODULE_VIEW: 'module_card_view',
    MODULE_CLICK: 'module_card_click',
    SCROLL_25: 'scroll_25',
    SCROLL_50: 'scroll_50',
    SCROLL_75: 'scroll_75',
    SCROLL_90: 'scroll_90',
  },
  
  // Content
  PROGRAM: {
    NAME: 'Любов без болка',
    SUBTITLE: 'Онлайн програма на Милена Петрова',
    VIDEO_COUNT: 14,
    MODULE_COUNT: 4,
    BONUS_MODULE_COUNT: 1,
  },
  
  // SEO
  SEO: {
    TITLE: 'Любов без болка - Онлайн програма за жени в болезнени връзки | Милена Петрова',
    DESCRIPTION: '14 видео урока + работна тетрадка + бонус частна сесия. Научи се да разпознаеш токсичните модели, да върнеш границите си и да избираш любов без болка. Специална цена 49€ за първите 20.',
    KEYWORDS: 'любов без болка, токсична връзка, емоционална зависимост, граници, здрави отношения, Милена Петрова',
    // Absolute: social crawlers do not resolve relative image paths.
    OG_IMAGE: SOCIAL_ASSETS.MILENA_PORTRAIT,
    // Previously pointed at the Emergent preview subdomain, which leaked a
    // non-canonical host into every share and search result.
    OG_URL: siteUrl('lubov-bez-bolka'),
  },
};

export default LUBOV_BEZ_BOLKA_CONFIG;
