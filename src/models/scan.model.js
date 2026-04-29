import { postScan } from '../services/scan.service';

/**
 * ============================================================
 *  Scan Model
 * ------------------------------------------------------------
 *  Composes the standard scan payload from the pieces the
 *  controller already has (auth session + order record + style
 *  details), and forwards it to the service.
 * ============================================================
 */

/**
 * Build and POST a scan event to FastAPI.
 *
 * @param {object} args
 * @param {{ id:number, user_name:string }} args.user
 * @param {{ id:number, name:string }} args.location
 * @param {string|number} args.order_id
 * @param {object} [args.records]    - Order record returned from NocoDB
 * @param {object} [args.styleData]  - Style/accessory details from Stylewise
 * @returns {Promise<object>}
 */
export const submitScan = async ({ user, location, order_id, records, styleData }) => {
  const payload = {
    user_id: user.id,
    user_location_id: location.id,
    order_id,
    style_number: records?.style_number,
    size: records?.size,
    accessories: Array.isArray(styleData?.accessories) ? styleData.accessories : [],
    scanned_at: new Date().toISOString(),
  };
  return postScan(payload);
};
