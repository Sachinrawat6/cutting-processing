import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { readSession, writeSession, clearSession } from '../utils/authStorage';

/**
 * ============================================================
 *  AuthContext
 * ------------------------------------------------------------
 *  Single source of truth for the current logged-in user and
 *  their selected location. Backed by localStorage so a browser
 *  restart doesn't kick the worker out (per product decision).
 *
 *  Consumers:
 *    - <AuthGate />      decides login screen vs. app
 *    - <Header />        renders the user / location chip
 *    - <Scanner />       passes user_id / location_id into POST
 * ============================================================
 */

const AuthContext = createContext({
  user: null,
  location: null,
  ready: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  // `ready` lets the gate avoid a flash of the login screen
  // while we synchronously hydrate from localStorage on mount.
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readSession();
    if (stored) setSession(stored);
    setReady(true);
  }, []);

  const login = useCallback((user, location) => {
    if (!user?.id || !location?.id) return;
    const next = {
      user: { id: user.id, user_name: user.user_name },
      location: { id: location.id, name: location.name },
    };
    setSession(next);
    writeSession(next);
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    clearSession();
  }, []);

  const value = useMemo(
    () => ({
      user: session?.user || null,
      location: session?.location || null,
      ready,
      login,
      logout,
    }),
    [session, ready, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/** Hook for accessing the current auth state from any component. */
export const useAuth = () => useContext(AuthContext);
