import React from 'react';
import AppRoutes from './routes/AppRoutes';

/**
 * Root application shell. Kept intentionally thin — all page
 * composition lives in `routes/AppRoutes`.
 */
const App = () => {
  return (
    <div>
      <AppRoutes />
    </div>
  );
};

export default App;
