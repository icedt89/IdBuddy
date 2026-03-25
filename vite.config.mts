// Plugins
import components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import viteFonts from 'unplugin-fonts/vite'
import { version } from './package.json'
import { ViteMinifyPlugin } from 'vite-plugin-minify'

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
export default defineConfig(({ mode, command }) => {
  const isProductionBuild = mode === 'production' && command === 'build'

  return {
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),
      vuetify({
        autoImport: true,
      }),
      // Minify index.html
      isProductionBuild && ViteMinifyPlugin(),
      components(),
      viteFonts({
        fontsource: {
          families: [
            {
              name: 'Roboto',
              weights: [100, 300, 400, 500, 700, 900],
              styles: ['normal', 'italic'],
              subset: 'latin',
            },
          ],
        },
      }),
    ],
    define: {
      __APP_VERSION__: JSON.stringify(version),
    },
    resolve: {
      alias,
    },
    server: {
      port: 3001,
    },
    build: {
      sourcemap: !isProductionBuild,
      rolldownOptions: {
        output: {
          minify: {
            compress: {
              dropConsole: isProductionBuild,
              dropDebugger: isProductionBuild,
            },
          },
          comments: !isProductionBuild,
        },
      },
    },
  }
})
