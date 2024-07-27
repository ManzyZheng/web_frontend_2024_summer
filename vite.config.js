import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
  },
  test: {
		reporters: ['default', 'html'],
		coverage: {
			enabled: true,
			provider: 'v8',
			cleanOnRerun: true,
			reporter: ['text', 'json', 'html'],
		},
	},
})
