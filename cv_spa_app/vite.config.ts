import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // '/src' é resolvido a partir da raiz do projeto pelo Vite
      '@': '/src',
    },
  },
})
