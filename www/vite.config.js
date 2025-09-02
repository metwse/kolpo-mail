import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { config } from 'dotenv';

config({ quiet: true });


export default defineConfig({
  plugins: [react()],
  define: {
    'BACKEND_URL': JSON.stringify(process.env.BACKEND_URL),
  },
});
