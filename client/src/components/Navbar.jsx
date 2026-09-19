import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium ${
      isActive
        ? 'bg-slate-100 text-slate-900'
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`;

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 7h11v10H3z" />
              <path d="M14 10h4l3 3v4h-7z" />
              <circle cx="7.5" cy="18" r="1.5" />
              <circle cx="17.5" cy="18" r="1.5" />
            </svg>
          </div>

          <div>
            <p className="text-sm font-bold tracking-tight text-slate-900">
              ShipTrack
            </p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
              Shipment Management
            </p>
          </div>
        </NavLink>

        <nav className="flex items-center gap-1">
          <NavLink to="/" className={navClass}>
            Shipments
          </NavLink>

          <NavLink to="/create" className={navClass}>
            Create Shipment
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;