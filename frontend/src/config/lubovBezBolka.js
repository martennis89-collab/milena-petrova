// Configuration for "Любов без болка" sales page

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
  
  // Assets
  WORKBOOK_PDF_URL: 'https://customer-assets.emergentagent.com/job_guided-sessions-2/artifacts/1hbxuxty_%D0%94%D0%BD%D0%B5%D0%B2%D0%BD%D0%B8%D0%BA%20%D0%92%D1%80%D0%B5%D0%BC%D0%B5%20%D0%B7%D0%B0%20%D1%81%D0%B5%D0%B1%D0%B5%20%D1%81%D0%B8-1.pdf',
  MILENA_PHOTO: 'https://customer-assets.emergentagent.com/job_guided-sessions-2/artifacts/z6q4f8xp_00BBF565-6315-4EAC-864A-B5832736105D.jpeg',
  
  // Analytics
  META_PIXEL_ID: null, // Will be provided later
  
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
    OG_IMAGE: 'https://customer-assets.emergentagent.com/job_guided-sessions-2/artifacts/z6q4f8xp_00BBF565-6315-4EAC-864A-B5832736105D.jpeg',
    OG_URL: 'https://guided-sessions-2.preview.emergentagent.com/lubov-bez-bolka',
  },
};

export default LUBOV_BEZ_BOLKA_CONFIG;
