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
  return response.data?.values || [];
};
