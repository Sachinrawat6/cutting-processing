import { httpClient } from './httpClient';
import { PRODUCT_PREVIEW_URL } from '../constants';

/**
 * ============================================================
 *  Product Service
 * ------------------------------------------------------------
 *  Thin HTTP layer for the inventory-backend product endpoint
 *  (used to resolve a style number into the Myntra style_id
 *  required for preview iframes).
 * ============================================================
 */

/**
 * Fetch product metadata for a given style number.
 *
 * @param {string|number} style_number
 * @returns {Promise<object|undefined>}
 */
export const getProductByStyleNumber = async (style_number) => {
  const response = await httpClient.get(`${PRODUCT_PREVIEW_URL}?style_code=${style_number}`);
  return response.data?.[0];
};
