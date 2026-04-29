import { httpClient } from './httpClient';
import { FAST_API_URL } from '../constants';

/**
 * ============================================================
 *  Scan Service
 * ------------------------------------------------------------
 *  Reports a completed order scan to the FastAPI backend.
 *  Called from `useScanSubmit` once the order details and
 *  accessory metadata have both successfully loaded.
 * ============================================================
 */

/**
 * @param {object} payload
 * @param {string|number} payload.user_id
 * @param {string|number} payload.user_location_id
 * @param {string|number} payload.order_id
 * @param {string|number} [payload.style_number]
 * @param {string}        [payload.size]
 * @param {Array}         [payload.accessories]
 * @param {string}        [payload.scanned_at] - ISO timestamp
 * @returns {Promise<object>}
 */
export const postScan = async (payload) => {
  const response = await httpClient.post(FAST_API_URL, payload);
  return response.data;
};
