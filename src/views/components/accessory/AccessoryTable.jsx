import React from 'react';

/**
 * Renders the accessory list for the active style. The data
 * shape mirrors the Stylewise `/style-details` response — an
 * object with an `accessories` array on it.
 *
 * @param {object} props
 * @param {{ accessories?: Array }} [props.data]
 */
const AccessoryTable = ({ data }) => {
  const accessories = Array.isArray(data?.accessories) ? data.accessories : [];
  const washCare = data?.washCare;
  return (
    <div className="w-full overflow-hidden rounded-xl border font-[Poppins] font-bold border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Accessories</h3>
          <p className="text-xs text-gray-500">Items required for the active style</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200">
          {accessories.length} item{accessories.length === 1 ? '' : 's'}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
            <tr>
              <th className="px-5 py-3 text-left  text-2xl font-bold ">Number</th>
              <th className="px-5 py-3 text-left  text-2xl font-bold ">Name</th>
              <th className="px-5 py-3 text-left  text-2xl font-bold ">Quantity</th>
              <th className="px-5 py-3 text-left  text-2xl font-bold ">Color</th>
              <th className="px-5 py-3 text-left  text-2xl font-bold ">Wash Care</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-800">
            {accessories.length > 0 ? (
              accessories.map((ac, idx) => (
                <tr key={ac.number + idx} className="transition  hover:bg-gray-50">
                  <td className="px-5 py-3  text-2xl  text-gray-500">({ac.number})</td>
                  <td className="px-5 py-3  text-2xl font-bold text-gray-900">{ac.type}</td>
                  <td className="px-5 text-2xl  py-3">{ac.quantity}</td>
                  <td className="px-5 text-2xl  py-3">
                    {ac?.color ? (
                      <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                        {ac.color}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>

                  <td className="px-5 py-3  text-2xl">{washCare}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-sm text-gray-400">
                  Scan an order to view accessories.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccessoryTable;
