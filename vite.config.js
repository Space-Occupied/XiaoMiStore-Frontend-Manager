import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: true,
    port: 5173,
    host: "localhost",
    //配置代理，实现跨域
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: url=>url.replace(/^\/api/,"")
      }
    }
  },
  resolve: {
    alias: [{
      find: "@",
      replacement: resolve(__dirname, "src")
    }]
  }
})
