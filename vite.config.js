import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

const customElements = new Set(["pinch-zoom"]);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => customElements.has(tag)
        }
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
