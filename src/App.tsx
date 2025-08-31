import { useState } from "react";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Button, Switch } from "@heroui/react";
import { hsvaToHex } from "@uiw/color-convert";
import Chrome, { ChromeInputType } from "@uiw/react-color-chrome";
import { svgList } from "./svgs";

function recolorSvg(
  svgString: string,
  colorMap: Record<string, string>,
): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");

  Object.entries(colorMap).forEach(([colorName, newFill]) => {
    if (!newFill) return;
    const elements = doc.querySelectorAll(`[data-color="${colorName}"]`);
    elements.forEach((el) => {
      el.setAttribute("fill", newFill);
    });
  });

  return new XMLSerializer().serializeToString(doc.documentElement);
}

function App() {
  const [hsva1, setHsva1] = useState({ h: 0, s: 0, v: 68, a: 1 });
  const [hsva2, setHsva2] = useState({ h: 0, s: 0, v: 68, a: 1 });
  const [overrideColor1, setOverrideColor1] = useState(false);
  const [overrideColor2, setOverrideColor2] = useState(false);

  const colorMap = { "color-1": overrideColor1 && hsvaToHex(hsva1), "color-2": overrideColor2 && hsvaToHex(hsva2) };

  return (
    <>
      <div className="flex gap-8 my-8">
        <div>
          <Switch defaultSelected={false} isSelected={overrideColor1} onValueChange={setOverrideColor1} >
            Override Color 1
          </Switch>
          <Chrome
            color={hsva1}
            showAlpha={false}
            inputType={ChromeInputType.HEXA}
            showEyeDropper={true}
            showTriangle={false}
            onChange={(color) => {
              setHsva1(color.hsva);
            }}
          />
        </div>
        <div>
          <Switch defaultSelected={false} isSelected={overrideColor2} onValueChange={setOverrideColor2} >
            Override Color 2
          </Switch>
          <Chrome
            color={hsva2}
            showAlpha={false}
            inputType={ChromeInputType.HEXA}
            showEyeDropper={true}
            showTriangle={false}
            onChange={(color) => {
              setHsva2(color.hsva);
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-scroll">
        {svgList.map((svg) => (
          <div
            key={svg.name}
            className="border rounded-md p-4 flex flex-col items-center bg-slate-300"
          >
            <div
              className="mb-2 "
              dangerouslySetInnerHTML={{
                __html: recolorSvg(svg.content, colorMap),
              }}
              style={{ width: 200, height: 200 }}
            />
            <div className="text-center break-all">{svg.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
