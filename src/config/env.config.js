/**
 * ============================================================
 *  Environment Configuration
 * ------------------------------------------------------------
 *  Centralized access point for all environment variables.
 *  Vite statically replaces any `VITE_*` prefixed variable at
 *  build time (see `.env` / `.env.example`).
 *
 *  Keeping this file as the single source of truth prevents
 *  env-vars from being scattered across the codebase and makes
 *  misconfiguration easy to spot early.
 * ============================================================
 */

const env = import.meta.env;

/**
 * Fail fast (in dev) if a required env var is missing, so mis-
 * configuration is caught immediately instead of surfacing as a
 * cryptic 401/404 later in a network call.
 *
 * @param {string} key - The VITE_ prefixed env variable name
 * @returns {string|undefined}
 */
const required = (key) => {
  const value = env[key];
  if (!value) {
    // eslint-disable-next-line no-console
    console.warn(`[env.config] Missing env var: ${key}. Check your .env file.`);
  }
  return value;
};

/** NocoDB configuration block */
export const NOCODB_CONFIG = Object.freeze({
  baseUrl: required('VITE_NOCODB_BASE_URL'),
  token: required('VITE_NOCODB_TOKEN'),
  recordsTable: required('VITE_NOCODB_RECORDS_TABLE'),
});

/** Stylewise backend endpoint (list-all-styles) */
export const STYLEWISE_API = required('VITE_STYLEWISE_API');

/** Google Sheet configuration block (accessory data) */
export const GOOGLE_SHEET_CONFIG = Object.freeze({
  sheetId: required('VITE_GOOGLE_SHEET_ID'),
  apiKey: required('VITE_GOOGLE_SHEET_API_KEY'),
  range: 'accessory db!A2:E',
});

export default {
  NOCODB_CONFIG,
  STYLEWISE_API,
  GOOGLE_SHEET_CONFIG,
};
