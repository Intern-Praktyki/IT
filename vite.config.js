import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match the GitHub Pages project path: https://intern-praktyki.github.io/it/
export default defineConfig({
  base: '/it/',
  plugins: [react()],
})
