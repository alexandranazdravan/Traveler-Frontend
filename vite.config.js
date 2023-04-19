import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    // Set the base directory for serving static assets
    baseDir: 'src',

    // Serve static files from the 'assets' directory
    serveStatic: {
      '/assets': 'assets',
    },
  },
})
