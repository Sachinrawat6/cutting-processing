import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';

/**
 * App-level header with brand mark, current user / location chip,
 * and a logout button. The user chip is the most important piece
 * of information after login — it confirms which worker + station
 * the device is currently scanning for.
 */
const Header = () => {
  const { user, location, logout } = useAuth();

  return (
    <header className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white shadow-sm">
            CP
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold leading-tight text-gray-900">
              Cutting Processing
            </h1>
            <span className="text-xs text-gray-500">
              Order scan &amp; accessory lookup
            </span>
          </div>
        </div>

        {user && location && (
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-50 px-3 py-1.5 ring-1 ring-inset ring-emerald-200">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                Signed in
              </p>
              <p className="text-sm font-bold text-emerald-900">
                {user.user_name}
              </p>
              <p className="text-xs font-medium text-emerald-700">
                {location.name}
              </p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
