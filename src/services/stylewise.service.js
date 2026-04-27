import { httpClient } from './httpClient';
import { STYLEWISE_API } from '../config/env.config';
import { STYLEWISE_URL } from '../constants';

/**
 * ============================================================
 *  Stylewise Service
 * ------------------------------------------------------------
 *  Handles all HTTP communication with the Stylewise backend.
 *  Exposes two endpoints:
 *    - list-all-styles  (bulk fetch used by dashboards)
 *    - style-details    (single-style lookup by style number)
 * ============================================================
 */

/**
 * Fetch the full list of styles from the Stylewise backend.
 *
 * @returns {Promise<Array<object>>}
 */
export const getAllStyles = async () => {
  const response = await httpClient.get(STYLEWISE_API);
  return response.data?.data || [];
};

/**
 * Fetch accessory / style detail for a single style number.
 *
 * @param {string|number} style_number
 * @returns {Promise<object|undefined>}
 */
export const getStyleDetailsByNumber = async (style_number) => {
  const response = await httpClient.get(
    `${STYLEWISE_URL}?styleNumber=${style_number}`
  );
  return response.data?.data?.[0];
};
