import { useEffect, useRef, useState } from 'react';
import { submitScan } from '../models/scan.model';
import { useAuth } from '../contexts/AuthContext';

/**
 * ============================================================
 *  useScanSubmit
 * ------------------------------------------------------------
 *  Auto-fires a POST to FastAPI once the full scan context is
 *  ready (user + location + order record + accessory data).
 *
 *  The `submittedKey` ref stops a single scan from being
 *  reported twice — even if React re-renders, even in StrictMode,
 *  even if accessory data races in slightly later than records.
 * ============================================================
 */

/**
 * @param {object} args
 * @param {string|number} args.order_id
 * @param {object} [args.records]   - Order record (NocoDB)
 * @param {object} [args.styleData] - Style/accessory data (Stylewise)
 * @param {boolean} [args.accessoryLoading]
 * @returns {{ status: 'idle'|'sending'|'sent'|'error', error: string|null }}
 */
export const useScanSubmit = ({ order_id, records, styleData, accessoryLoading }) => {
  const { user, location } = useAuth();
  const submittedKey = useRef(null);

  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !location) return;
    if (!order_id || !records?.style_number) return;
    // Wait for accessories to fully resolve before reporting,
    // otherwise we'd POST a payload with an empty array.
    if (accessoryLoading) return;
    if (!styleData || !Array.isArray(styleData.accessories)) return;

    // De-dupe: build a deterministic key for this scan and bail
    // if we already sent it.
    const key = `${order_id}::${records.style_number}::${records.size || ''}`;
    if (submittedKey.current === key) return;
    submittedKey.current = key;

    let cancelled = false;
    (async () => {
      try {
        setStatus('sending');
        setError(null);
        await submitScan({ user, location, order_id, records, styleData });
        if (!cancelled) setStatus('sent');
      } catch (err) {
        if (cancelled) return;
        // eslint-disable-next-line no-console
        console.error('Failed to POST scan to FastAPI ::', err);
        setStatus('error');
        setError('Could not record scan. Please retry.');
        // Allow retry on next render cycle.
        submittedKey.current = null;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, location, order_id, records, styleData, accessoryLoading]);

  // Reset the indicator whenever the user starts a fresh scan.
  useEffect(() => {
    if (!order_id) {
      setStatus('idle');
      setError(null);
      submittedKey.current = null;
    }
  }, [order_id]);

  return { status, error };
};
