import { getStatusStyles } from '../utils/status';

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyles(
        status
      )}`}
    >
      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-current"></span>
      {status}
    </span>
  );
};

export default StatusBadge;