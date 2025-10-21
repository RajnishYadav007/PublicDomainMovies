import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App';

/**
 * ✅ FIXED: Router sirf main.jsx mein hai
 * TanStack Query v5 configuration with proper gcTime
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // ✅ gcTime (not cacheTime)
      refetchOnWindowFocus: false,
      retry: 2,
      refetchOnMount: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        {/* ✅ Router yahan ek baar define kiya */}
        <Router>
          <App />
        </Router>
      </HelmetProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </React.StrictMode>
);
