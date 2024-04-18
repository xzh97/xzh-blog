import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import md from 'vite-raw-plugin';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    md({
      fileRegex: /\.md$/,
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: apiPath => apiPath.replace('/api', ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
