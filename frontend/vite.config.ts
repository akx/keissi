import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../backend/static",
    emptyOutDir: false,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8181",
        changeOrigin: true,
      },
    },
  },
});
