import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  test: {
    globals: true, // Enables global functions like `expect`
    environment: 'jsdom', // Simulates a browser-like environment for tests
  }
})
