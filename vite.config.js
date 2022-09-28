import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";

export default defineConfig(({ mode }) => {
  const basePath = mode === "production" ? "/pmex-events/" : "/";

  return {
    base: basePath,
    plugins: [vue()],
    // Allow imports from '@'
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      BASE_URL: basePath,
    },
  };
});
