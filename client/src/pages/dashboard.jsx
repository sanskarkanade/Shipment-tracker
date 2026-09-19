import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getShipments
} from '../services/shipmentApi';

import ShipmentCard from '../components/shipmentCard.jsx';
import SearchFilter from '../components/searchfilter.jsx';
import Loading from '../components/loading.jsx';

const Dashboard = () => {
  const [shipments, setShipments] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchShipments = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getShipments(search, status);

console.log('API response:', data);
console.log('Is array:', Array.isArray(data));

setShipments(data);
    }
    catch (err) {
      setError(
        err.response?.data?.message ||
        'Unable to load shipments.'
      );
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  const handleClear = () => {
    setSearch('');
    setStatus('');

    setTimeout(() => {
      getShipments('', '')
        .then((data) => setShipments(data))
        .catch(() => setError('Unable to load shipments.'));
    }, 0);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-600">
              Operations
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Shipments
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Track and manage your shipments from one place.
            </p>
          </div>

          <Link
            to="/create"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
          >
            <span className="text-lg leading-none">+</span>
            Create shipment
          </Link>
        </div>

        {/* Search */}
        <SearchFilter
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          onSearch={fetchShipments}
          onClear={handleClear}
        />

        {/* Results heading */}
        <div className="mt-7 mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-700">
            {shipments.length} shipment
            {shipments.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white">
            <Loading text="Loading shipments..." />
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm font-semibold text-red-700">
              {error}
            </p>

            <button
              onClick={fetchShipments}
              className="mt-4 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700"
            >
              Try again
            </button>
          </div>
        ) : shipments.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M3 7h11v10H3z" />
                <path d="M14 10h4l3 3v4h-7z" />
                <circle cx="7.5" cy="18" r="1.5" />
                <circle cx="17.5" cy="18" r="1.5" />
              </svg>
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-900">
              No shipments found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filter.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {shipments.map((item) => (
              <ShipmentCard
                key={item._id}
                shipment={item}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;