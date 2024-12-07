/** @type {import('vite').UserConfig} */
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        pr01: resolve(__dirname, "pr01/index.html"),
        pr02: resolve(__dirname, "pr02/index.html"),
        pr03: resolve(__dirname, "pr03/index.html"),
      },
    },
  },
});
