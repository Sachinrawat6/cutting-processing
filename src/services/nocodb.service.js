import { nocodbAxios } from './httpClient';
import { NOCODB_CONFIG } from '../config/env.config';

/**
 * ============================================================
 *  NocoDB Service
 * ------------------------------------------------------------
 *  Thin HTTP wrapper around the NocoDB REST API. This layer is
 *  intentionally dumb — it only knows how to make a request and
 *  return the response payload. Any business-level normalisation
 *  belongs in the models layer (see `src/models/order.model.js`).
 * ============================================================
 */

const DEFAULT_VIEW_ID = 'vwwsae9mswybppcm';

/**
 * Fetch raw NocoDB records that match a given `order_id`.
 *
 * @param {string|number} order_id
 * @returns {Promise<{ list: Array<object> }>} raw NocoDB list envelope
 */
export const getRecordsByOrderId = async (order_id) => {
  const response = await nocodbAxios.get(
    `/tables/${NOCODB_CONFIG.recordsTable}/records`,
    {
      params: {
        offset: '0',
        where: `(order_id,eq,${order_id})`,
        viewId: DEFAULT_VIEW_ID,
      },
      // NocoDB requires the `where` filter to stay un-encoded.
      paramsSerializer: (params) =>
        Object.entries(params)
          .map(([key, val]) => `${key}=${val}`)
          .join('&'),
    }
  );

  return response.data;
};
