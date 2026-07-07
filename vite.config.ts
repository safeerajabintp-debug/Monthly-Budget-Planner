import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Monthly-Budget-Planner/',
  plugins: [
    tailwindcss(),
  ],
})