import { Link } from 'react-router-dom';
import StatusBadge from './statusBadge.jsx';

const ShipmentCard = ({ shipment }) => {
  const deliveryDate = new Date(
    shipment.expectedDeliveryDate
  ).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <Link
      to={`/shipments/${shipment._id}`}
      className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="text-base font-bold text-slate-900">
              {shipment.referenceNumber}
            </span>

            <svg
              className="text-slate-400"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span>{shipment.origin}</span>

            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>

            <span>{shipment.destination}</span>
          </div>
        </div>

        <StatusBadge status={shipment.currentStatus} />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Expected delivery
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            {deliveryDate}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Origin
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            {shipment.origin}
          </p>
        </div>

        <div className="hidden sm:block">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Destination
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            {shipment.destination}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ShipmentCard;