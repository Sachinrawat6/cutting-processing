/**
 * ============================================================
 *  Application-wide Constants
 * ------------------------------------------------------------
 *  Non-sensitive URLs and literals used by the models/services
 *  layer. Anything that varies per-environment should live in
 *  `src/config/env.config.js` instead.
 * ============================================================
 */

export const PRODUCT_PREVIEW_URL = 'https://pattern-tracker-backend.onrender.com/api/v1/products';

export const MYNTRA_PREVIEW_URL = 'https://www.myntra.com';

export const SHOPIFY_PREVIEW_URL = 'https://qurvii.com/products';

/**
 * Marketplace channel identifiers as returned by the products API
 * inside `marketPlaceDetails[].channel`. Centralised so string
 * comparisons (which are case-sensitive) cannot drift across files.
 */
export const MARKETPLACE_CHANNELS = Object.freeze({
  MYNTRA: 'Myntra',
  SHOPIFY: 'Shopify',
  NYKAA: 'Nykaa',
});

export const STYLEWISE_URL =
  'https://stylewise-backend-uqx8.onrender.com/api/v1/stylewise/regular-style/style-details';

export const ORDER_ID_VALID_LENGTHS = Object.freeze([5, 6, 7]);
