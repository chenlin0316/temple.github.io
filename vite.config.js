import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/temple.github.io/'// <--- 這裡一定要改成你的 GitHub Repository 名稱
})