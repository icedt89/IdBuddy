// Plugins
import Components from 'unplugin-vue-components/vite'
import Vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export const alias = {
  '@': fileURLToPath(new URL('./src', import.meta.url)),
  '@generators': fileURLToPath(
    new URL('./src/components/generators', import.meta.url)
  ),
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/app.scss',
      },
    }),
    Components(),
    ViteFonts({
      google: {
        families: [
          {
            name: 'Roboto',
            styles: 'wght@100;300;400;500;700;900',
          },
        ],
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias,
    extensions: ['.ts', '.vue'],
  },
  server: {
    port: 3001,
  },
})
