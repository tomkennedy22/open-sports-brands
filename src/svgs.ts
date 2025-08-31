import type { ComponentType, SVGProps } from "react";

export const svgComponents = import.meta.glob("../svgs/*.svg", {
	eager: true,
	import: "default",
}) as Record<string, ComponentType<SVGProps<SVGSVGElement>>>;

console.log(
	"Loaded SVG components:",
	svgComponents,
	Object.keys(svgComponents),
);
