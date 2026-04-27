import { useEffect, useState } from 'react';
import { fetchAccessoryDetails } from '../models/accessory.model';

/**
 * ============================================================
 *  useAccessoryController
 * ------------------------------------------------------------
 *  Fetches accessory details whenever the active style number
 *  changes. Keeps the async/effect dance out of the view.
 * ============================================================
 */

/**
 * @param {string|number|undefined} style_number
 * @returns {{ data: object|Array, loading: boolean, error: string|null }}
 */
export const useAccessoryController = (style_number) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAccessory = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchAccessoryDetails(style_number);
      setData(res);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Failed to fetch accesory details error :: ', err);
      setError('Failed to fetch accessory details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (style_number) loadAccessory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style_number]);

  return { data, loading, error };
};
