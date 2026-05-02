import React, { useRef, useState } from 'react';
import Header from '../components/common/Header';
import Input from '../components/common/Input';
import AccessoryDetails from '../components/accessory/AccessoryDetails';
import AccessoryTable from '../components/accessory/AccessoryTable';
import ProductImage from '../components/product/ProductImage';
import { useAccessoryController } from '../../controllers/useAccessoryController';
import { useScanSubmit } from '../../controllers/useScanSubmit';

/**
 * ============================================================
 *  Scanner Page (View)
 * ------------------------------------------------------------
 *  Top-level view for the order-scanning workflow. Owns the
 *  shared `order_id` / `records` state and composes the child
 *  components. Business logic is delegated to controllers.
 *
 *  Once a scan resolves successfully (order record + accessory
 *  data both ready), `useScanSubmit` automatically POSTs the
 *  scan event to FastAPI, tagged with the logged-in user and
 *  their selected location.
 * ============================================================
 */
const Scanner = () => {
  const [order_id, setOrderId] = useState('');
  const [records, setRecords] = useState();
  const inputRef = useRef();

  const handleSubmit = () => {
    inputRef.current.focus();
    inputRef.current.select();
  };

  const { data, loading: accessoryLoading } = useAccessoryController(records?.style_number);

  /*
   * Hard guard: if there is no active order (failed scan, blank
   * input, etc.) the accessory table must receive empty data —
   * even if the controller's internal state hasn't caught up yet.
   */
  const accessoryData = records ? data : undefined;
  const accessoryIsLoading = Boolean(records) && accessoryLoading;

  // Auto-POST the scan to FastAPI once everything is ready.
  const { status: scanStatus, error: scanError } = useScanSubmit({
    order_id,
    records,
    styleData: accessoryData,
    accessoryLoading: accessoryIsLoading,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="w-full mx-auto px-4 py-6">
        <section className="flex flex-col gap-4">
          <Input
            order_id={order_id}
            setOrderId={setOrderId}
            inputRef={inputRef}
            handleSubmit={handleSubmit}
          />
          <ScanStatus status={scanStatus} error={scanError} />
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="w-full">
            <AccessoryDetails
              order_id={order_id}
              handleSubmit={handleSubmit}
              setRecords={setRecords}
              records={records}
            />
            <AccessoryTable data={accessoryData} loading={accessoryIsLoading} />
          </div>
          <div className="w-full">
            <ProductImage records={records} />
          </div>
        </section>
      </main>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Scan submission status — small inline strip under the input        */
/* ------------------------------------------------------------------ */

const ScanStatus = ({ status, error }) => {
  if (status === 'idle') return null;

  if (status === 'sending') {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-800">
        <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-500" />
        Saving scan to server...
      </div>
    );
  }

  if (status === 'sent') {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        Scan saved
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-800">
      <span className="h-2 w-2 rounded-full bg-red-500" />
      {error || 'Could not save scan'}
    </div>
  );
};

export default Scanner;
