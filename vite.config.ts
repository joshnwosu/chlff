import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [], // No external modules
      input: 'src/main.tsx', // Ensure entry point is correct
    },
  },
});
