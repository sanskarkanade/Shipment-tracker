import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  getShipmentById,
  getShipmentHistory,
  updateShipmentStatus
} from '../services/shipmentApi';

import StatusBadge from '../components/statusBadge.jsx';
import Loading from '../components/loading.jsx';
import { SHIPMENT_STATUSES } from '../utils/status';

const ShipmentDetails = () => {
  const { id } = useParams();

  const [shipment, setShipment] = useState(null);
  const [history, setHistory] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      const [shipmentData, historyData] = await Promise.all([
        getShipmentById(id),
        getShipmentHistory(id)
      ]);

      setShipment(shipmentData);
      setHistory(historyData);
      setSelectedStatus(shipmentData.currentStatus);
    }
    catch (err) {
      setError(
        err.response?.data?.message ||
        'Unable to load shipment.'
      );
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleStatusUpdate = async () => {
    if (!selectedStatus || selectedStatus === shipment.currentStatus) {
      return;
    }

    try {
      setUpdating(true);
      setError('');
      setSuccess('');

      const updatedShipment = await updateShipmentStatus(
        id,
        selectedStatus
      );

      const updatedHistory = await getShipmentHistory(id);

      setShipment(updatedShipment);
      setHistory(updatedHistory);
      setSuccess('Shipment status updated successfully.');
    }
    catch (err) {
      setError(
        err.response?.data?.message ||
        'Unable to update shipment status.'
      );
    }
    finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-slate-50">
        <Loading text="Loading shipment..." />
      </div>
    );
  }

  if (error && !shipment) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-xl rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-semibold text-red-700">
            {error}
          </p>

          <Link
            to="/"
            className="mt-4 inline-block text-sm font-semibold text-slate-700 underline"
          >
            Back to shipments
          </Link>
        </div>
      </div>
    );
  }

  const deliveryDate = new Date(
    shipment.expectedDeliveryDate
  ).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <span>←</span>
          Back to shipments
        </Link>

        {/* Header */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
            
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-600">
                Shipment details
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {shipment.referenceNumber}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span>{shipment.origin}</span>

                <span>→</span>

                <span>{shipment.destination}</span>
              </div>
            </div>

            <StatusBadge status={shipment.currentStatus} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          
          {/* Shipment information */}
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
              <h2 className="text-sm font-bold text-slate-900">
                Shipment information
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-6 p-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Reference number
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {shipment.referenceNumber}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Status
                </p>

                <div className="mt-1">
                  <StatusBadge status={shipment.currentStatus} />
                </div>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Origin
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {shipment.origin}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Destination
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {shipment.destination}
                </p>
              </div>

              <div className="col-span-2">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Expected delivery
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {deliveryDate}
                </p>
              </div>
            </div>
          </section>

          {/* Update status */}
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
              <h2 className="text-sm font-bold text-slate-900">
                Update status
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Change the current shipment status.
              </p>
            </div>

            <div className="p-6">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                New status
              </label>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              >
                {SHIPMENT_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <button
                onClick={handleStatusUpdate}
                disabled={
                  updating ||
                  selectedStatus === shipment.currentStatus
                }
                className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {updating ? 'Updating...' : 'Update status'}
              </button>

              {error && (
                <p className="mt-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              {success && (
                <p className="mt-3 text-sm text-emerald-600">
                  {success}
                </p>
              )}
            </div>
          </section>
        </div>

        {/* History */}
        <section className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-5">
            <h2 className="text-sm font-bold text-slate-900">
              Shipment history
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Complete status timeline for {shipment.referenceNumber}.
            </p>
          </div>

          <div className="p-6">
            {history.length === 0 ? (
              <p className="py-6 text-center text-sm text-slate-500">
                No history available.
              </p>
            ) : (
              <div className="space-y-0">
                {history.map((item, index) => {
                  const date = new Date(
                    item.timestamp
                  ).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  });

                  const time = new Date(
                    item.timestamp
                  ).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <div
                      key={item._id}
                      className="relative flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white">
                          <div className="h-2.5 w-2.5 rounded-full bg-slate-700"></div>
                        </div>

                        {index !== history.length - 1 && (
                          <div className="h-full min-h-12 w-px bg-slate-200"></div>
                        )}
                      </div>

                      <div className="pb-7">
                        <StatusBadge status={item.status} />

                        <p className="mt-2 text-xs text-slate-400">
                          {date} · {time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ShipmentDetails;