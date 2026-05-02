import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../models/auth.model';
import { useAuth } from '../../contexts/AuthContext';

/**
 * ============================================================
 *  Login Page
 * ------------------------------------------------------------
 *  Two-step login designed for shop-floor use:
 *    1. Type your user ID (the number printed on your badge)
 *    2. Pick the location you're working at today
 *       - Auto-completes when the user has only one location
 *
 *  No password / email — the FastAPI users payload has no auth
 *  credentials. We rely on the worker knowing their numeric ID.
 *
 *  Implementation note: we fetch the full users list once on
 *  mount and look up the entered ID client-side. Faster than a
 *  per-id round-trip, and the list is small (~100 users).
 * ============================================================
 */
const Login = () => {
  const { login } = useAuth();

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState(null);

  const [idInput, setIdInput] = useState('');
  const [idError, setIdError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setUsersLoading(true);
        setUsersError(null);
        const list = await fetchUsers();
        if (cancelled) return;
        setUsers(list);
      } catch {
        if (cancelled) return;
        setUsersError('Could not load users. Check your connection and retry.');
      } finally {
        if (!cancelled) setUsersLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-complete login if the resolved user has exactly ONE location.
  useEffect(() => {
    if (!selectedUser) return;
    const locs = selectedUser.locations || [];
    if (locs.length === 1) login(selectedUser, locs[0]);
  }, [selectedUser, login]);

  const handleIdSubmit = (e) => {
    e?.preventDefault();
    setIdError(null);

    const trimmed = idInput.trim();
    if (!trimmed) {
      setIdError('Please enter your user ID.');
      return;
    }
    const numericId = Number(trimmed);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      setIdError('User ID must be a positive number.');
      return;
    }

    const match = users.find((u) => Number(u?.id) === numericId);
    if (!match) {
      setIdError(`No user found with ID ${numericId}.`);
      return;
    }

    setSelectedUser(match);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-[Poppins]">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-4 py-8">
        <Brand />

        <div className="mt-6 overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-sm">
          {!selectedUser ? (
            <UserIdStep
              idInput={idInput}
              setIdInput={setIdInput}
              idError={idError}
              onSubmit={handleIdSubmit}
              usersLoading={usersLoading}
              usersError={usersError}
            />
          ) : (
            <LocationStep
              user={selectedUser}
              onBack={() => {
                setSelectedUser(null);
                setIdInput('');
                setIdError(null);
              }}
              onPick={(loc) => login(selectedUser, loc)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Brand strip                                                        */
/* ------------------------------------------------------------------ */

const Brand = () => (
  <div className="flex items-center gap-3">
    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600 text-lg font-bold text-white shadow-sm">
      CP
    </div>
    <div>
      <h1 className="text-xl font-bold text-gray-900">Cutting Processing</h1>
      <p className="text-sm text-gray-500">Sign in to start scanning</p>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Step 1 — enter user ID                                             */
/* ------------------------------------------------------------------ */

const UserIdStep = ({ idInput, setIdInput, idError, onSubmit, usersLoading, usersError }) => (
  <>
    <div className="border-b-2 border-gray-100 bg-gray-50 px-5 py-3">
      <h2 className="text-lg font-bold text-gray-900">1. Enter your User ID</h2>
      <p className="text-sm text-gray-500">The number printed on your badge</p>
    </div>

    <form onSubmit={onSubmit} className="px-5 py-5">
      <label
        htmlFor="user-id"
        className="block text-xs font-semibold uppercase tracking-widest text-gray-500"
      >
        User ID
      </label>
      <input
        id="user-id"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
        autoFocus
        placeholder="e.g. 123"
        value={idInput}
        onChange={(e) => setIdInput(e.target.value.replace(/\D/g, ''))}
        disabled={usersLoading || Boolean(usersError)}
        className="mt-2 w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-4 text-3xl font-bold text-gray-900 outline-none transition focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-400"
      />

      {idError && (
        <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-800">
          {idError}
        </p>
      )}

      {usersLoading && (
        <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-yellow-800">
          <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-500" />
          Loading users...
        </p>
      )}

      {usersError && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-800">
          {usersError}
        </p>
      )}

      <button
        type="submit"
        disabled={usersLoading || Boolean(usersError) || !idInput}
        className="mt-5 w-full rounded-lg bg-indigo-600 px-4 py-4 text-lg font-bold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        Continue
      </button>
    </form>
  </>
);

/* ------------------------------------------------------------------ */
/*  Step 2 — pick location                                             */
/* ------------------------------------------------------------------ */

const LocationStep = ({ user, onBack, onPick }) => {
  const locations = user.locations || [];
  return (
    <>
      <div className="border-b-2 border-gray-100 bg-gray-50 px-5 py-3">
        <button
          type="button"
          onClick={onBack}
          className="mb-1 text-xs font-semibold uppercase tracking-wide text-indigo-600 hover:text-indigo-700"
        >
          &larr; Change ID
        </button>
        <h2 className="text-lg font-bold text-gray-900">
          2. {user.user_name}, where are you working?
        </h2>
        <p className="text-sm text-gray-500">Pick today's location</p>
      </div>

      <div className="max-h-[60vh] overflow-y-auto">
        {locations.length === 0 ? (
          <div className="px-5 py-12 text-center text-base font-semibold text-gray-400">
            No locations assigned. Ask admin to add one.
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {locations.map((loc) => (
              <li key={loc.id}>
                <button
                  type="button"
                  onClick={() => onPick(loc)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-emerald-50"
                >
                  <p className="text-lg font-bold text-gray-900">{loc.name}</p>
                  <ChevronRight />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

const ChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-gray-400"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default Login;
