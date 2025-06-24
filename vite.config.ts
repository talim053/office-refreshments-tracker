import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/office-refreshments-tracker/', // ✅ GitHub repo name
  plugins: [react()],
});
