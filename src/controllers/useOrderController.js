import { useEffect, useState } from 'react';
import { fetchOrderIdRecord } from '../models/order.model';
import { ORDER_ID_VALID_LENGTHS } from '../constants';

/**
 * ============================================================
 *  useOrderController
 * ------------------------------------------------------------
 *  Custom hook that owns all the "order lookup" business logic:
 *    - validates the scanned `order_id` length
 *    - calls the order model when the id is valid
 *    - exposes loading / error state for the view layer
 *    - fires an `onFetched` callback (to re-focus the scanner
 *      input) when a record successfully loads
 * ============================================================
 */

/**
 * @param {object}   params
 * @param {string}   params.order_id      - Currently scanned order id
 * @param {Function} params.setRecords    - State setter from the parent view
 * @param {Function} [params.onFetched]   - Optional callback after a successful fetch
 * @returns {{ loading: boolean, error: string|null }}
 */
export const useOrderController = ({ order_id, setRecords, onFetched }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getOrderDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const { record } = await fetchOrderIdRecord(order_id);
      setRecords(record[0]);
      if (typeof onFetched === 'function') onFetched();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch nocodb order details error is ::', err);
      setError('Failed to fetch details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const len = order_id?.toString().length;
    if (ORDER_ID_VALID_LENGTHS.includes(len)) getOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order_id]);

  return { loading, error };
};
