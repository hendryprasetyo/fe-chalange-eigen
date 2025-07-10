/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    setupFiles: '/src/__test__/setup.ts'
  },
  server: {
    port: 3000,
    watch: {
      usePolling: true
    }
  },
  preview: {
    port: 4173
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  base: '/'
})
