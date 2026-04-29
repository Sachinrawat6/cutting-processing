import { AUTH_STORAGE_KEY } from '../constants';

/**
 * ============================================================
 *  Auth Storage
 * ------------------------------------------------------------
 *  Tiny wrapper around localStorage so the rest of the app
 *  doesn't have to know the storage key, JSON parsing, or
 *  defensive try/catch boilerplate.
 *
 *  Persisted shape:
 *    {
 *      user:     { id: number, user_name: string },
 *      location: { id: number, name: string }
 *    }
 * ============================================================
 */

/**
 * Read the persisted session.
 * @returns {{ user: object, location: object } | null}
 */
export const readSession = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.user?.id || !parsed?.location?.id) return null;
    return parsed;
  } catch {
    return null;
  }
};

/**
 * Persist a session. Silently no-ops if either field is missing —
 * we never want to write a half-baked record.
 * @param {{ user: object, location: object }} session
 */
export const writeSession = (session) => {
  if (!session?.user?.id || !session?.location?.id) return;
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[authStorage] Failed to persist session:', err);
  }
};

/** Clear the persisted session (logout). */
export const clearSession = () => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    /* ignore */
  }
};
