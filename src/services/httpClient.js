import axios from 'axios';
import { NOCODB_CONFIG } from '../config/env.config';

/**
 * ============================================================
 *  HTTP Client Factory
 * ------------------------------------------------------------
 *  Centralized axios instance creation. Each downstream service
 *  (NocoDB, Stylewise, Google Sheets, Product/Inventory) imports
 *  its own pre-configured client from this module.
 *
 *  Benefits:
 *    - Single place to add interceptors (auth, logging, retries)
 *    - Request/response shape is consistent across the app
 * ============================================================
 */

/**
 * Pre-configured axios instance for the NocoDB REST API.
 * Attaches the XC auth token to every outgoing request.
 */
export const nocodbAxios = axios.create({
  baseURL: NOCODB_CONFIG.baseUrl,
  headers: { 'xc-token': NOCODB_CONFIG.token },
});

/** Bare axios instance for ad-hoc external calls */
export const httpClient = axios;

export default httpClient;
