import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Allows importing from @castcreel/shared using its package name
      // instead of a relative path like ../../frontend-shared/src.
      '@castcreel/shared': resolve(__dirname, '../frontend-shared/src'),
    },
  },
  server: {
    port: 3000,
    // Proxy API calls to the Go backend during development so we don't
    // have to deal with CORS issues on the dev machine.
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
