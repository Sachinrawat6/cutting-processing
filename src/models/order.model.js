import { getRecordsByOrderId } from '../services/nocodb.service';

/**
 * ============================================================
 *  Order Model
 * ------------------------------------------------------------
 *  Domain-level wrapper around raw NocoDB responses. Controllers
 *  (and components) should depend on this module rather than
 *  hitting the service layer directly. Keeps the shape of a
 *  "record" consistent regardless of how it is sourced.
 * ============================================================
 */

/**
 * Fetch the first matching record for a given `order_id`.
 *
 * Preserves the `{ record }` envelope used by the existing
 * controller code while moving the response normalisation out
 * of the service layer.
 *
 * @param {string|number} order_id
 * @returns {Promise<{ record: Array<object> }>}
 */
export const fetchOrderIdRecord = async (order_id) => {
  const data = await getRecordsByOrderId(order_id);
  const record = data?.list || [];
  return { record };
};
