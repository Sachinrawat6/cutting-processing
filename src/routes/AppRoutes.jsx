import React from 'react';
import Scanner from '../views/pages/Scanner';

/**
 * ============================================================
 *  AppRoutes
 * ------------------------------------------------------------
 *  Central place to wire together the application's pages.
 *  Currently the app only exposes a single Scanner page, but
 *  adding new routes (dashboard, history, etc.) should happen
 *  here so `App.jsx` stays a thin shell.
 * ============================================================
 */
const AppRoutes = () => {
  return <Scanner />;
};

export default AppRoutes;
