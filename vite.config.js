import svgr from "vite-plugin-svgr";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), 
    svgr({
      include: '**/*.svg',
      svgrOptions: {
        exportType: 'default',
      },
    }),
  ],
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'unsafe-none'
    },
  },
})
