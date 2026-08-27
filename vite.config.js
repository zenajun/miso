import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, transformWithOxc } from 'vite'

const sourceJsx = /(^|[\\/])src[\\/].*\.js$/

function jsxInJavaScript() {
  return {
    name: 'jsx-in-javascript',
    enforce: 'pre',
    async transform(code, id) {
      if (!sourceJsx.test(id)) return

      return transformWithOxc(code, id, {
        lang: 'jsx',
        jsx: { runtime: 'automatic' },
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@/config.js',
        replacement: fileURLToPath(new URL('./config.js', import.meta.url)),
      },
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
      {
        find: '@component',
        replacement: fileURLToPath(new URL('./src/components', import.meta.url)),
      },
    ],
  },
  plugins: [jsxInJavaScript(), react()],
})
