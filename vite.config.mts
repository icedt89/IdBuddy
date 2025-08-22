// Plugins
import components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import viteFonts from 'unplugin-fonts/vite'

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
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'

  return {
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),
      vuetify({
        autoImport: true,
        styles: {
          configFile: 'src/styles/app.scss',
        },
      }),
      components(),
      viteFonts({
        google: {
          families: [
            {
              name: 'Roboto',
              styles: 'wght@100;300;400;500;700;900',
            },
          ],
          preconnect: true,
        },
      }),
    ],
    resolve: {
      alias,
      extensions: ['.ts', '.vue'],
    },
    server: {
      port: 3001,
    },
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : undefined,
      legalComments: 'none',
    },
  }
})
