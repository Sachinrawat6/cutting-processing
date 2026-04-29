import { httpClient } from './httpClient';
import { FAST_API_USERS_URL } from '../constants';

/**
 * ============================================================
 *  Auth Service
 * ------------------------------------------------------------
 *  Thin HTTP layer for the FastAPI users-list endpoint.
 *  The endpoint returns:
 *    {
 *      status: "success",
 *      data: [
 *        {
 *          id: number,
 *          user_name: string,
 *          locations: [{ id: number, name: string }, ...]
 *        },
 *        ...
 *      ]
 *    }
 * ============================================================
 */

/**
 * Fetch every user with their assigned locations.
 * @returns {Promise<Array<object>>}
 */
export const getUsersWithLocations = async () => {
  const response = await httpClient.get(FAST_API_USERS_URL);
  const list = response?.data?.data;
  return Array.isArray(list) ? list : [];
};
