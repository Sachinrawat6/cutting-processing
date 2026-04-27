import React from 'react';

/**
 * App-level header with brand mark, title, and a subtle shadow.
 * Purely presentational.
 */
const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold shadow-sm">
            CP
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold leading-tight text-gray-900">
              Cutting Processing
            </h1>
            <span className="text-xs text-gray-500">Order scan &amp; accessory lookup</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-200">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          Live
        </div>
      </div>
    </header>
  );
};

export default Header;
