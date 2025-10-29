import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
  import viteImagemin from 'vite-plugin-imagemin'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    viteImagemin({
        gifsicle: { optimizationLevel: 7 },
        mozjpeg: { quality: 80 },
        pngquant: { quality: [0.8, 0.9] },
        webp: { quality: 75 }
      })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  base: process.env.NODE_ENV === 'production' ? './' : '/', // Use relative paths for GitHub Pages deployment
})
