import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => ({
  plugins: [
    react(),
    // Sitemap plugin temporarily commented out
    // Install separately: npm install -D vite-plugin-sitemap
  ],
  build: {
    // Enable SSR build when mode is 'ssr' for prerendering [web:49]
    ssr: mode === 'ssr',
    outDir: mode === 'ssr' ? 'dist/server' : 'dist/client',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'helmet': ['react-helmet-async']
        }
      }
    }
  }
}));
