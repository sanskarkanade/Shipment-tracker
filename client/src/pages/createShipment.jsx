import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createShipment } from '../services/shipmentApi';
import { SHIPMENT_STATUSES } from '../utils/status';

const CreateShipment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    referenceNumber: '',
    origin: '',
    destination: '',
    currentStatus: 'Booked',
    expectedDeliveryDate: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');

      await createShipment(formData);

      navigate('/');
    }
    catch (err) {
      setError(
        err.response?.data?.message ||
        'Unable to create shipment.'
      );
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <span>←</span>
          Back to shipments
        </Link>

        <div className="mb-7">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-600">
            Shipment Management
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Create shipment
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Add a new shipment to the tracking system.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-100 px-6 py-5">
            <h2 className="text-sm font-bold text-slate-900">
              Shipment information
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Enter the basic details for this shipment.
            </p>
          </div>

          <div className="grid gap-5 p-6 sm:grid-cols-2">
            
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Reference number
              </label>

              <input
                type="text"
                name="referenceNumber"
                value={formData.referenceNumber}
                onChange={handleChange}
                placeholder="e.g. SHP-1001"
                required
                className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Origin
              </label>

              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                placeholder="e.g. Mumbai"
                required
                className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Destination
              </label>

              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="e.g. Dubai"
                required
                className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Current status
              </label>

              <select
                name="currentStatus"
                value={formData.currentStatus}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              >
                {SHIPMENT_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Expected delivery date
              </label>

              <input
                type="date"
                name="expectedDeliveryDate"
                value={formData.expectedDeliveryDate}
                onChange={handleChange}
                required
                className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
            </div>
          </div>

          {error && (
            <div className="mx-6 mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-5">
            <Link
              to="/"
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Creating...' : 'Create shipment'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateShipment;