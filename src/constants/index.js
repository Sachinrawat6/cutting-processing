/**
 * ============================================================
 *  Application-wide Constants
 * ------------------------------------------------------------
 *  Non-sensitive URLs and literals used by the models/services
 *  layer. Anything that varies per-environment should live in
 *  `src/config/env.config.js` instead.
 * ============================================================
 */

export const PRODUCT_PREVIEW_URL = 'https://inventorybackend-m1z8.onrender.com/api/product';

export const MYNTRA_PREVIEW_URL = 'https://www.myntra.com';

export const STYLEWISE_URL =
  'https://stylewise-backend-uqx8.onrender.com/api/v1/stylewise/regular-style/style-details';

export const ORDER_ID_VALID_LENGTHS = Object.freeze([5, 6, 7]);
