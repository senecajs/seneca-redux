import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 51601,
    proxy: {
      '/api': 'http://127.0.0.1:51600'
    }
  },
  build: {
    minify: false,
    commonjsOptions: {
    },
  }

})
