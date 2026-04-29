import React, { useEffect, useMemo, useState } from 'react';
import { getSheetValues } from '../../../services/googleSheet.service';

/**
 * Accessory list for the active style.
 *
 * Two async sources feed this component:
 *   1. `data` prop — accessories for the current style, fetched
 *      by the parent via `useAccessoryController`.
 *   2. Internal Google Sheet fetch — gives us the human-readable
 *      `accessory_name` and `accessory_color` for each number.
 *
 * Both sources are surfaced through one combined loading state
 * so the worker never sees half-rendered cards (e.g. accessories
 * with missing names because the sheet is still loading).
 *
 * @param {object} props
 * @param {{ accessories?: Array, washCare?: string }} [props.data]
 * @param {boolean} [props.loading] - True while accessories are being fetched
 */
const AccessoryTable = ({ data, loading = false }) => {
  const [accessoryData, setAccessoryData] = useState([]);
  const [sheetLoading, setSheetLoading] = useState(true);
  const [sheetError, setSheetError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setSheetLoading(true);
    setSheetError(null);
    (async () => {
      try {
        const values = await getSheetValues();
        if (!cancelled) setAccessoryData(values || []);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching values from Google Sheet:', error);
        if (!cancelled) setSheetError('Could not load accessory reference data');
      } finally {
        if (!cancelled) setSheetLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const accessoryByNumber = useMemo(() => {
    const map = new Map();
    (accessoryData || []).forEach((item) => {
      if (item?.accessory_number != null) {
        map.set(Number(item.accessory_number), item);
      }
    });
    return map;
  }, [accessoryData]);

  const getMatched = (number) =>
    accessoryByNumber.get(parseInt(number, 10)) || {};

  const accessories = Array.isArray(data?.accessories) ? data.accessories : [];
  const washCare = data?.washCare;

  // Combined loading: either the API call (parent) or the sheet
  // (internal) is still in flight. We block render in both cases
  // because rendering accessories without sheet data would show
  // them with empty Name/Color columns.
  const isLoading = loading || sheetLoading;

  return (
    <div className="w-full overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-sm font-[Poppins]">
      {/* Title strip */}
      <div className="flex items-center justify-between border-b-2 border-gray-100 bg-gray-50 px-5 py-3">
        <h3 className="text-xl font-bold text-gray-900">Accessories</h3>
        {!isLoading && accessories.length > 0 && (
          <span className="text-lg font-bold text-gray-700">
            Total: {accessories.length}
          </span>
        )}
      </div>

      {/* Wash Care — shown once, only when we actually have data */}
      {!isLoading && washCare && (
        <div className="border-b-2 border-gray-100 bg-blue-50 px-5 py-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-700">
            Wash Care
          </p>
          <p className="mt-0.5 text-xl font-bold text-blue-900">{washCare}</p>
        </div>
      )}

      {/* Body — one of: loading / sheet error / cards / empty */}
      <div className="p-5">
        {isLoading ? (
          <LoadingState
            message={
              loading && sheetLoading
                ? 'Loading accessories...'
                : loading
                ? 'Loading accessories...'
                : 'Loading reference data...'
            }
          />
        ) : sheetError ? (
          <ErrorState message={sheetError} />
        ) : accessories.length > 0 ? (
          <div className="flex flex-col gap-4">
            {accessories.map((ac, idx) => {
              const matched = getMatched(ac.number);
              return (
                <AccessoryCard
                  key={`${ac.number}-${idx}`}
                  index={idx + 1}
                  number={ac.number}
                  type={ac.type}
                  name={matched.accessory_name}
                  quantity={ac.quantity}
                  color={matched.accessory_color}
                />
              );
            })}
          </div>
        ) : (
          <div className="px-5 py-12 text-center text-lg font-semibold text-gray-400">
            Scan an order to see accessories.
          </div>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  States                                                             */
/* ------------------------------------------------------------------ */

const LoadingState = ({ message }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-10">
    <div className="flex items-center gap-2">
      <span className="h-3 w-3 animate-pulse rounded-full bg-yellow-500" />
      <span className="h-3 w-3 animate-pulse rounded-full bg-yellow-500 [animation-delay:150ms]" />
      <span className="h-3 w-3 animate-pulse rounded-full bg-yellow-500 [animation-delay:300ms]" />
    </div>
    <p className="text-lg font-semibold text-yellow-800">{message}</p>
    {/* Skeleton cards so the layout doesn't jump when data arrives */}
    <div className="mt-2 flex w-full flex-col gap-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-24 animate-pulse rounded-lg border-2 border-gray-100 bg-gray-50"
        />
      ))}
    </div>
  </div>
);

const ErrorState = ({ message }) => (
  <div className="rounded-lg bg-red-50 px-4 py-6 text-center text-lg font-semibold text-red-800">
    {message}
  </div>
);

/* ------------------------------------------------------------------ */
/*  Accessory card                                                     */
/* ------------------------------------------------------------------ */

const AccessoryCard = ({ index, number, type, name, quantity, color }) => {
  const fields = [
    { label: 'Accessory No.', value: number },
    { label: 'Type', value: type },
    { label: 'Name', value: name },
    { label: 'Quantity', value: quantity },
    { label: 'Color', value: color },
  ].filter((f) => f.value !== undefined && f.value !== null && f.value !== '');

  return (
    <section className="flex gap-4 rounded-lg border-2 border-gray-200 bg-white p-4">
      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-3xl font-extrabold text-white">
        {index}
      </div>

      <div className="flex-1 divide-y divide-gray-100">
        {fields.map((f) => (
          <div
            key={f.label}
            className="flex items-baseline gap-3 py-2 first:pt-0 last:pb-0"
          >
            <span className="w-40 text-sm font-semibold uppercase tracking-wide text-gray-500">
              {f.label}
            </span>
            <span className="text-2xl font-bold text-gray-900">{f.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AccessoryTable;
