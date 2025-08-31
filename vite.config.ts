import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { processSVGs } from "./tools/generateReadme";
import { resolve } from "node:path";
import chokidar from "chokidar";
import svgr from "vite-plugin-svgr";

export default defineConfig({
	plugins: [
		react(),
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
							resolve(import.meta.dirname, "src", "svgTools"),
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
