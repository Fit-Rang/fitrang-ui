import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@routes": "/src/routes",
      "@services": "/src/services",
      "@store": "/src/store",
      "@lib": "/src/lib",
      "@models": "/src/models",
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
});
