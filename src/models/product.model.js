import { getProductByStyleNumber } from '../services/product.service';

/**
 * ============================================================
 *  Product Model
 * ------------------------------------------------------------
 *  Domain-level access to product/inventory data. Maps raw
 *  service responses into the shape expected by the views
 *  (e.g. the Myntra preview iframe needs `style_id`).
 * ============================================================
 */

/**
 * Fetch product metadata for a given style number.
 *
 * @param {string|number} style_number
 * @returns {Promise<object|undefined>}
 */
export const fetchProduct = async (style_number) => {
  try {
    return await getProductByStyleNumber(style_number);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Failed to fetch product details error :: ', error);
    return undefined;
  }
};
