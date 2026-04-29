import { useEffect, useMemo, useState } from 'react';
import { fetchProduct } from '../models/product.model';
import {
  MARKETPLACE_CHANNELS,
  MYNTRA_PREVIEW_URL,
  SHOPIFY_PREVIEW_URL,
} from '../constants';

/**
 * ============================================================
 *  useProductController
 * ------------------------------------------------------------
 *  Resolves a style number into the product metadata required
 *  to render the product preview iframe.
 *
 *  Preview source rules (per product requirement):
 *    - If `marketPlaceDetails` contains Myntra → render Myntra
 *      using `${MYNTRA_PREVIEW_URL}/${myntra.product_id}`.
 *    - Else if it contains Shopify (only / no Myntra) → render
 *      Shopify using `${SHOPIFY_PREVIEW_URL}/${shopify.product_id}`.
 *    - Otherwise no preview is available.
 *
 *  Resets `product` on every effect cycle so the iframe never
 *  shows the previous order's preview while a new one loads.
 * ============================================================
 */

/**
 * @typedef {{ channel: string, product_id: string, price?: number, status?: string }} MarketplaceDetail
 */

/**
 * Pick the marketplace we should preview, with Myntra winning over Shopify.
 * @param {MarketplaceDetail[]} details
 * @returns {{ channel: string, url: string, productId: string } | null}
 */
const resolvePreview = (details) => {
  if (!Array.isArray(details) || details.length === 0) return null;

  const byChannel = (name) =>
    details.find((d) => d?.channel === name && d?.product_id);

  const myntra = byChannel(MARKETPLACE_CHANNELS.MYNTRA);
  if (myntra) {
    return {
      channel: MARKETPLACE_CHANNELS.MYNTRA,
      productId: myntra.product_id,
      url: `${MYNTRA_PREVIEW_URL}/${myntra.product_id}`,
    };
  }

  const shopify = byChannel(MARKETPLACE_CHANNELS.SHOPIFY);
  if (shopify) {
    return {
      channel: MARKETPLACE_CHANNELS.SHOPIFY,
      productId: shopify.product_id,
      url: `${SHOPIFY_PREVIEW_URL}/${shopify.product_id}`,
    };
  }

  return null;
};

/**
 * @param {string|number|undefined} style_number
 * @returns {{
 *   product: object,
 *   preview: { channel: string, url: string, productId: string } | null,
 *   loading: boolean,
 *   error: string|null,
 * }}
 */
export const useProductController = (style_number) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    // Wipe the previous product so the iframe blanks out instantly.
    setProduct({});
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
        const details = await fetchProduct(style_number);
        if (cancelled) return;
        setProduct(details || {});
      } catch (err) {
        if (cancelled) return;
        // eslint-disable-next-line no-console
        console.log('Failed to fetch product details error :: ', err);
        setError('Failed to fetch product details');
        setProduct({});
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [style_number]);

  const preview = useMemo(
    () => resolvePreview(product?.marketPlaceDetails),
    [product]
  );

  return { product, preview, loading, error };
};
