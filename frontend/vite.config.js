import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * `base` MUST stay in sync with the GitHub Pages project-site path
 * (https://sachindeepcleaning-coder.github.io/ai-tracker/).
 * All root-relative asset references in index.html use %BASE_URL% so the
 * favicon/asset URLs resolve under /ai-tracker/ after the build.
 */
export default defineConfig({
  plugins: [react()],
  base: '/ai-tracker/',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.js'],
  },
})
