import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

const viteConfig = defineConfig({
  base: "/",
  server: {
    host: "localhost",
    port: 3000,
    open: false,
  },
  plugins: [react()],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".scss", ".css"],
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  build: {
    outDir: "docs",
  },
});

export default viteConfig;
