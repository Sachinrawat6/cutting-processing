import { getStyleDetailsByNumber } from '../services/stylewise.service';

/**
 * ============================================================
 *  Accessory Model
 * ------------------------------------------------------------
 *  Handles accessory/style-level data. Wraps the Stylewise
 *  service and swallows transport errors the same way the
 *  previous util function did, so controllers keep the existing
 *  behaviour of rendering "no data" on failure rather than
 *  crashing the whole page.
 * ============================================================
 */

/**
 * Fetch accessory details for the given style number.
 *
 * @param {string|number} style_number
 * @returns {Promise<object|undefined>}
 */
export const fetchAccessoryDetails = async (style_number) => {
  try {
    return await getStyleDetailsByNumber(style_number);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Failed to fetch accessory details error :: ', error);
    return undefined;
  }
};
