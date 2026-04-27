import { useEffect, useState } from 'react';
import { fetchProduct } from '../models/product.model';

/**
 * ============================================================
 *  useProductController
 * ------------------------------------------------------------
 *  Resolves a style number into the product metadata required
 *  to render the Myntra preview iframe. Mirrors the original
 *  inline logic from `ProductImage` but pulled out into the
 *  controllers layer.
 * ============================================================
 */

/**
 * @param {string|number|undefined} style_number
 * @returns {{ styleId: object, loading: boolean, error: string|null }}
 */
export const useProductController = (style_number) => {
  const [styleId, setStyleId] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const styleDetails = await fetchProduct(style_number);
      setStyleId(styleDetails || {});
      // eslint-disable-next-line no-console
      console.log('Style details', styleDetails);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Failed to fetch product details error :: ', err);
      setError('Failed to fetch product details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (style_number) loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style_number]);

  return { styleId, loading, error };
};
