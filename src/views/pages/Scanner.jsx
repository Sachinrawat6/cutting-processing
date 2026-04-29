import React, { useRef, useState } from 'react';
import Header from '../components/common/Header';
import Input from '../components/common/Input';
import AccessoryDetails from '../components/accessory/AccessoryDetails';
import AccessoryTable from '../components/accessory/AccessoryTable';
import ProductImage from '../components/product/ProductImage';
import { useAccessoryController } from '../../controllers/useAccessoryController';

/**
 * ============================================================
 *  Scanner Page (View)
 * ------------------------------------------------------------
 *  Top-level view for the order-scanning workflow. Owns the
 *  shared `order_id` / `records` state and composes the child
 *  components. Business logic is delegated to controllers.
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

  const { data, loading: accessoryLoading } = useAccessoryController(
    records?.style_number
  );

  /*
   * Hard guard: if there is no active order (failed scan, blank
   * input, etc.) the accessory table must receive empty data —
   * even if the controller's internal state hasn't caught up yet.
   * This eliminates the brief render where the previous order's
   * accessories would otherwise still be visible.
   */
  const accessoryData = records ? data : undefined;
  const accessoryIsLoading = Boolean(records) && accessoryLoading;

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

export default Scanner;
