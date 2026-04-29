import { getUsersWithLocations } from '../services/auth.service';

/**
 * ============================================================
 *  Auth Model
 * ------------------------------------------------------------
 *  Wraps the auth service so views/controllers depend on a
 *  stable interface even if the underlying transport changes.
 * ============================================================
 */

/**
 * Fetch the user directory. Returns [] on transport failure so
 * the login screen can show a friendly error instead of crashing.
 *
 * @returns {Promise<Array<{ id:number, user_name:string, locations:Array<{id:number,name:string}> }>>}
 */
export const fetchUsers = async () => {
  try {
    return await getUsersWithLocations();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch users error :: ', error);
    throw error;
  }
};
