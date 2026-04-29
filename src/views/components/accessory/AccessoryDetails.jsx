import React from 'react';
import { useOrderController } from '../../../controllers/useOrderController';

/**
 * Order details card — designed for the cutting-room floor.
 * Optimised for at-a-glance reading:
 *   - Big values, small labels
 *   - One colour = one meaning (green = ready, red = problem,
 *     yellow = waiting, grey = nothing yet)
 *   - No decorative icons or hover effects that distract
 */
const AccessoryDetails = ({ order_id, handleSubmit, setRecords, records }) => {
  const { loading, error } = useOrderController({
    order_id,
    setRecords,
    onFetched: handleSubmit,
  });

  // Decide which single state to render — one at a time, never overlap.
  let body;
  if (loading) body = <Banner color="yellow" text="Loading order..." />;
  else if (error) body = <Banner color="red" text={error} />;
  else if (!records) body = <Banner color="gray" text="Scan an order to begin" />;
  else body = <Values records={records} />;

  return (
    <div className="mx-auto mt-4 w-full font-[Poppins]">
      <div className="overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-sm">
        {/* Order ID strip — always visible so the worker knows which order
            they are looking at. */}
        <div className="flex items-baseline justify-between border-b-2 border-gray-100 bg-gray-50 px-5 py-3">
          <span className="text-sm font-semibold uppercase tracking-wide text-gray-500">Order</span>
          <span className="text-2xl font-bold text-gray-900">{order_id || '—'}</span>
        </div>

        <div className="px-5 py-5">{body}</div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Big-value display — the success state                              */
/* ------------------------------------------------------------------ */

/**
 * Two huge stat blocks side by side. Chosen sizes (text-5xl) are
 * deliberately large so the numbers can be read from across a
 * cutting table, not just from a desk.
 */
const Values = ({ records }) => (
  <div className="grid grid-cols-2 gap-4">
    <Stat label="Style" value={records?.style_number} />
    <Stat label="Size" value={records?.size} />
  </div>
);

const Stat = ({ label, value }) => {
  const display = value !== undefined && value !== null && value !== '' ? value : '—';
  return (
    <div className="rounded-lg bg-emerald-50 px-4 py-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">{label}</p>
      <p className="mt-1 text-3xl font-extrabold text-emerald-900">{display}</p>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Single-line message banner — shared by loading/error/empty         */
/* ------------------------------------------------------------------ */

const COLORS = {
  yellow: 'bg-yellow-50 text-yellow-800',
  red: 'bg-red-50 text-red-800',
  gray: 'bg-gray-50 text-gray-600',
};

const Banner = ({ color, text }) => (
  <div className={`rounded-lg ${COLORS[color]} px-4 py-6 text-center text-xl font-semibold`}>
    {text}
  </div>
);

export default AccessoryDetails;
