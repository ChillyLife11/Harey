import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from "path";
import crypto from 'crypto';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/vars.scss" as *;`
      },
    },
  },
})
