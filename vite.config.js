import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig(({ mode }) => {
  const isDev = mode !== "production";
  const basePath = isDev ? "/" : "/pmex-events/";

  return {
    base: basePath,
    plugins: [
      vue(),
      VitePWA({
        includeAssets: [
          "img/icons/favicon.ico",
          "img/pmex.png",
          "img/icons/apple-touch-icon.png",
        ],
        manifest: {
          name: "Pokémon Masters EX Events",
          short_name: "PMEX Events",
          description:
            "App tracking all the events happening in Pokémon Masters EX",
          theme_color: "#f97f2c",
          background_color: "#363434",
          id: "io.github.itachisan.pmex_events",
          icons: [
            {
              src: "./img/icons/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "./img/icons/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "./img/icons/android-chrome-maskable-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "maskable",
            },
            {
              src: "./img/icons/android-chrome-maskable-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        },
        workbox: {
          cleanupOutdatedCaches: true,
        },
      }),
    ],
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
      sourcemap: isDev,
    },
  };
});
