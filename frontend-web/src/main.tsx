/**
 * Entry point for the web frontend.
 *
 * This is where React mounts to the DOM and all the top-level providers
 * are wrapped around the app. Providers set up shared context that every
 * component lower in the tree can access — the router, the server state
 * cache, and the API client.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';

// The QueryClient holds the cache for all server data fetched with TanStack Query.
// Configured once here and shared with every component through the provider below.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // If a query fails, retry once before showing an error.
      retry: 1,
      // Consider server data stale after 5 minutes.
      staleTime: 5 * 60 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* QueryClientProvider makes the server state cache available everywhere. */}
    <QueryClientProvider client={queryClient}>
      {/* BrowserRouter enables client-side navigation without full page reloads. */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
