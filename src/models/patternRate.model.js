import { getSheetValues } from '../services/googleSheet.service';

/**
 * ============================================================
 *  Pattern-Rate Model
 * ------------------------------------------------------------
 *  Wraps the Google Sheet service and (when needed) shapes the
 *  raw 2-D cell matrix into domain objects. Views/controllers
 *  should depend on this module rather than the sheet service
 *  directly.
 * ============================================================
 */

/**
 * Fetch the raw accessory -> colour pairs from the Google Sheet.
 *
 * @returns {Promise<Array<Array<string>>>} 2-D array of cells
 */
export const fetchPatternRatesFromSheet = async () => {
  return getSheetValues();
};
