import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr'; // Use the Vite-compatible version

export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
  plugins: [
    svgr({
      exportAsDefault: true,
    }),
    react(),
  ],
  base: './', // This ensures correct routing in Vercel deployment
});
