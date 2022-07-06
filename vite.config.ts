import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      optimize: true,
      libList: [
        {
          libName: 'antd',
          libDirectory: 'es',
          style: name => `antd/es/${name}/style`,
        },
      ],
    }),
    tsconfigPaths(),
    svgr(),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'text-color': '#1C1C1C',
          'text-color-secondary': '#8C8C8C',
        },
        javascriptEnabled: true,
      },
    },
  },
})
