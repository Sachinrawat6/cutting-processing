import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Login from '../../pages/Login';

/**
 * Renders the login screen when the session is empty, otherwise
 * passes the children through. The brief `!ready` window prevents
 * a flash of the login screen while we hydrate from localStorage.
 */
const AuthGate = ({ children }) => {
  const { user, location, ready } = useAuth();

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 animate-pulse rounded-full bg-yellow-500" />
          <span className="h-3 w-3 animate-pulse rounded-full bg-yellow-500 [animation-delay:150ms]" />
          <span className="h-3 w-3 animate-pulse rounded-full bg-yellow-500 [animation-delay:300ms]" />
        </div>
      </div>
    );
  }

  if (!user || !location) return <Login />;

  return children;
};

export default AuthGate;
