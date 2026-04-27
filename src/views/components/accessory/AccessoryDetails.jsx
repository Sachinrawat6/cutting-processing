import React from 'react';
import { useOrderController } from '../../../controllers/useOrderController';

/**
 * Thin view component that delegates all data-fetching logic to
 * the `useOrderController` hook and renders loading / error /
 * empty / success states for the active order.
 *
 * @param {object}   props
 * @param {string}   props.order_id
 * @param {Function} props.handleSubmit
 * @param {object}   props.records
 * @param {Function} props.setRecords
 */
const AccessoryDetails = ({ order_id, handleSubmit, setRecords, records }) => {
  const { loading, error } = useOrderController({
    order_id,
    setRecords,
    onFetched: handleSubmit,
  });

  return (
    <div className="mx-auto w-full ">
      {loading && (
        <div className="flex items-center gap-2 rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-2.5 text-sm text-indigo-700">
          <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-500"></span>
          Loading order details...
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !records && !error && (
        <div className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-500">
          No records found.
        </div>
      )}

      {!loading && records && !error && (
        <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-2.5 text-sm">
          <div className="flex items-center  gap-3">
            {records?.style_number && (
              <>
                <span className="rounded-full bg-white px-2.5 py-0.5 text-3xl font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                  Style: {records.style_number}
                </span>
                <span className="rounded-full bg-white px-2.5 py-0.5 text-3xl font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                  Size: {records.size}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessoryDetails;
