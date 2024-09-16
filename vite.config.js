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
    // proxy: {
    //   '/api': {
    //     target: 'http://crwn-shop-db-dd60f.firebaseapp.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // }
  },
  build: {
    outDir: '/dist',
    emptyOutDir: true,
  }
})
