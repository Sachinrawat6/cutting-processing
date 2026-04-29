import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';
import AuthGate from './views/components/auth/AuthGate';

/**
 * Root application shell.
 *
 * Wraps the route tree with:
 *   - AuthProvider — owns the current user / location session
 *   - AuthGate     — shows Login until both are populated
 */
const App = () => {
  return (
    <AuthProvider>
      <AuthGate>
        <AppRoutes />
      </AuthGate>
    </AuthProvider>
  );
};

export default App;
