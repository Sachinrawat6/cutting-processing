import React from 'react';

/**
 * Controlled numeric input used by the scanner. Purely
 * presentational — all behaviour is owned by the parent page.
 *
 * @param {object}   props
 * @param {string}   props.order_id
 * @param {Function} props.setOrderId
 * @param {object}   props.inputRef
 * @param {Function} props.handleSubmit
 */
const Input = ({ order_id, setOrderId, inputRef, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mx-auto w-full max-w-xl">
        <label htmlFor="orderId" className="mb-1.5 block text-sm font-medium text-gray-700">
          Order ID
        </label>

        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <rect x="3" y="4" width="4" height="16" />
              <rect x="9" y="4" width="2" height="16" />
              <rect x="13" y="4" width="3" height="16" />
              <rect x="18" y="4" width="3" height="16" />
            </svg>
          </span>

          <input
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            type="number"
            id="orderId"
            ref={inputRef}
            placeholder="Scan or enter order id..."
            value={order_id}
            onChange={(e) => setOrderId(e.target.value)}
          />
        </div>

        {/* <p className="mt-1.5 text-xs text-gray-500">
          Auto-submits when 5, 6 or 7 digits are entered.
        </p> */}
      </div>
    </form>
  );
};

export default Input;
