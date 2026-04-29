import { useEffect, useState } from 'react';
import { fetchAccessoryDetails } from '../models/accessory.model';

/**
 * ============================================================
 *  useAccessoryController
 * ------------------------------------------------------------
 *  Fetches accessory details whenever the active style number
 *  changes. Keeps the async/effect dance out of the view.
 *
 *  Always resets `data` at the start of each effect cycle so the
 *  table never shows accessories from a previously-scanned order.
 * ============================================================
 */

/**
 * @param {string|number|undefined} style_number
 * @returns {{ data: object, loading: boolean, error: string|null }}
 */
export const useAccessoryController = (style_number) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    // Fresh slate on every style change — no stale rows.
    setData({});
    setError(null);

    if (!style_number) {
      setLoading(false);
      return () => {
        cancelled = true;
      };
    }

    (async () => {
      try {
        setLoading(true);
        const res = await fetchAccessoryDetails(style_number);
        if (cancelled) return;
        setData(res || {});
      } catch (err) {
        if (cancelled) return;
        // eslint-disable-next-line no-console
        console.log('Failed to fetch accessory details error :: ', err);
        setError('Failed to fetch accessory details');
        setData({});
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [style_number]);

  return { data, loading, error };
};
