import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const basePath = env.NODE_ENV === "production" ? "/pmex-events/" : "/";

  return {
    base: basePath,
    plugins: [vue()],
    // Allow imports from '@'
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
