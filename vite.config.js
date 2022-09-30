import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";

export default defineConfig(({ mode }) => {
  const basePath = mode === "production" ? "/pmex-events/" : "/";
  const useSourceMap = mode === "production";

  return {
    base: basePath,
    plugins: [vue()],
    // Allow imports from '@'
    resolve: {
      alias: {
        // eslint-disable-next-line no-undef
        "@": path.resolve(__dirname, "./src"),
      },
    },
    /*
      Define variables for scripts:
      https://vitejs.dev/config/shared-options.html#define

      Important notice: strings will be interpolated, as mentioned in the guide.
      In order to avoid this, we need double quoting for strings.
    */
    define: {
      // JSON.stringify does the trick too, but I like this more
      BASE_URL: `"${basePath}"`,
    },
    /* Enable sourcemaps for easier debugging */
    build: {
      sourcemap: useSourceMap,
    },
  };
});
