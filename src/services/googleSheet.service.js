import { httpClient } from './httpClient';
import { GOOGLE_SHEET_CONFIG } from '../config/env.config';

/**
 * ============================================================
 *  Google Sheet Service
 * ------------------------------------------------------------
 *  Thin wrapper around the Google Sheets v4 `values.get`
 *  endpoint. Returns the raw 2-D value matrix; the models layer
 *  is responsible for shaping it into domain objects.
 * ============================================================
 */

/**
 * Fetch the pattern rate / colour pairs from the configured Sheet.
 *
 * @returns {Promise<Array<Array<string>>>} 2-D array, e.g. [[number, colour], ...]
 */
export const getSheetValues = async () => {
  const { sheetId, apiKey, range } = GOOGLE_SHEET_CONFIG;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
  const response = await httpClient.get(url);
  const data = response.data?.values || [];

  const transformed = data.map((row) => {
    let [accessory_number, accessory_name, accessory_type, accessory_image, accessory_color] = row;
    const isAccessoryNumberValid = /^\d+$/.test(accessory_number);
    if (!isAccessoryNumberValid) {
      console.warn(`[googleSheet.service] Invalid accessory number: ${accessory_number}`);
      return null; // Skip rows with invalid accessory numbers
    }

    accessory_number = parseInt(accessory_number, 10);

    return { accessory_number, accessory_name, accessory_type, accessory_image, accessory_color };
  });

  return transformed;
};
