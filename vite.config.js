import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import critical from "vite-plugin-critical";

export default defineConfig({
  plugins: [
    react(),
    critical({
      criticalUrl: "",
      criticalBase: "./dist/",
      criticalPages: [{ uri: "", template: "index.html" }],
    }),
  ],
  build: {
    cssCodeSplit: true,
  },
});
