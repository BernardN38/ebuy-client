import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import fs from 'fs';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('./ssl/cert-key.pem'),
      cert: fs.readFileSync('./ssl/cert.pem'),
    },
  },
  plugins: [react()],
})

