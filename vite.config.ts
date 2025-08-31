import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import chokidar from "chokidar";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import { processSVGs } from "./tools/generateReadme";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      // exportAsDefault: true
    }),
    {
      name: "process-svgs",
      async config() {
        await processSVGs();
      },
      async configureServer() {
        chokidar
          .watch(
            [
              resolve(import.meta.dirname, "svgs"),
              resolve(import.meta.dirname, "tools"),
            ],
            {
              ignoreInitial: true,
            },
          )
          .on("all", (event: string, filePath: string) => {
            console.log(`Detected change in SVGs: ${event} ${filePath}`);
            processSVGs();
          });
      },
    },
  ],
});
