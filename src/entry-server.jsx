/**
 * Server-Side Entry Point for Vite SSR
 * ✅ CRITICAL: Enables static site generation (SSG) for Google crawlers [web:45][web:46][web:49]
 * ✅ Renders React components to HTML string on build time
 * ✅ Works with prerender script to generate static HTML files [web:49]
 * ✅ Required for AdSense approval (crawlers need fully-rendered content) [web:2]
 * 
 * Usage:
 * - Build: vite build --mode ssr
 * - Prerender: node scripts/prerender.js
 * 
 * References:
 * - https://vitejs.dev/guide/ssr.html
 * - https://react.dev/reference/react-dom/server
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';


/**
 * Render React app to HTML string for a given URL
 * Called by prerender.js during build time [web:49]
 * 
 * @param {string} url - Request URL path (e.g., '/', '/movie/abc123')
 * @returns {string} HTML string ready for disk write
 */
export async function render(url) {
  // Create helmet context for SSR (collects head tags) [web:45][web:46]
  const helmetContext = {};

  // Wrap App in StaticRouter for routing context [web:45][web:46]
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </React.StrictMode>
  );

  // Extract Helmet head tags (meta, title, scripts) [web:45][web:46]
  const { helmet } = helmetContext;

  // Build complete HTML document with head tags [web:45][web:46]
  return {
    html,
    head: helmet,
  };
}


/**
 * Alternative: Simple string render (if not using Helmet)
 * Faster but lacks meta tags [web:45]
 */
export function renderSimple(url) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}


export default render;
