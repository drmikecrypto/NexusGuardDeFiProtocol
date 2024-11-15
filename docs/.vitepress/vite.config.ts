// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    hmr: { overlay: true },
    watch: {
      usePolling: true
    }
  },
  logLevel: 'info'
})
