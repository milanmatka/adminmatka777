import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    svgr({ exportAsDefault: true }),
  ],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/, // Include .js files as JSX
  },
  base: './',
});
