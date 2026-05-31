import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base ('./') makes built asset paths relative to index.html, so the
// site works wherever it is served from — local dev/preview at '/', GitHub
// Pages at '/it/', or any other subpath. The app uses only in-page hash
// anchors (no client-side router), so a relative base is safe.
export default defineConfig({
  base: './',
  plugins: [react()],
})
