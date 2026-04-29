import React from 'react';
import { useProductController } from '../../../controllers/useProductController';

/**
 * Renders a product preview iframe for the scanned style.
 *
 * Source selection lives in `useProductController`:
 *   - Myntra wins if listed
 *   - else Shopify (qurvii.com) is used
 *
 * @param {object} props
 * @param {{ style_number?: string|number }} [props.records]
 */
const ProductImage = ({ records }) => {
  const { preview, loading } = useProductController(records?.style_number);
  // Hard guard — without an active order, never show a preview,
  // even if the controller still holds the previous order's data.
  const hasPreview = Boolean(records) && Boolean(preview?.url);

  const subtitle = hasPreview
    ? `${preview.channel} · #${preview.productId}`
    : 'Live product preview';

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Product Preview</h3>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
        {loading && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500"></span>
            Loading
          </span>
        )}
      </div>

      <div className="relative w-full overflow-hidden bg-gray-50">
        {hasPreview ? (
          <iframe
            title={`Product preview - ${preview.channel}`}
            className="h-175 w-full scale-[1.15] -mt-40 origin-top"
            src={preview.url}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center text-sm text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-2 h-10 w-10 text-gray-300"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <p>Scan an order to load the preview.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImage;
