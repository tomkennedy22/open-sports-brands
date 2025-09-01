import { useState } from "react";
import "./App.css";
import { Slider, Switch } from "@heroui/react";
import { hexToHsva, hsvaToHex } from "@uiw/color-convert";
import Chrome, { ChromeInputType } from "@uiw/react-color-chrome";
import { svgList } from "./svgs";

type ColorMap = {
  "color-1"?: string | false;
  "color-2"?: string | false;
  "color-3"?: string | false;
};

function recolorSvg(svgString: string, colorMap: ColorMap): string {
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
  const [hsva1, setHsva1] = useState(hexToHsva("#FF0000"));
  const [hsva2, setHsva2] = useState(hexToHsva("#00FF00"));
  const [hsva3, setHsva3] = useState(hexToHsva("#0000FF"));
  const [overrideColor1, setOverrideColor1] = useState(false);
  const [overrideColor2, setOverrideColor2] = useState(false);
  const [overrideColor3, setOverrideColor3] = useState(false);
  const [iconSize, setIconSize] = useState(150);

  const colorMap = {
    "color-1": overrideColor1 && hsvaToHex(hsva1),
    "color-2": overrideColor2 && hsvaToHex(hsva2),
    "color-3": overrideColor3 && hsvaToHex(hsva3),
  };

  return (
    <div className="flex flex-col h-screen px-8 items-center">
      <div className="flex gap-8 my-8 flex-shrink-0">
        <div>
          <Switch
            defaultSelected={false}
            isSelected={overrideColor1}
            onValueChange={setOverrideColor1}
          >
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
          <Switch
            defaultSelected={false}
            isSelected={overrideColor2}
            onValueChange={setOverrideColor2}
          >
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
        <div>
          <Switch
            defaultSelected={false}
            isSelected={overrideColor3}
            onValueChange={setOverrideColor3}
          >
            Override Color 3
          </Switch>
          <Chrome
            color={hsva3}
            showAlpha={false}
            inputType={ChromeInputType.HEXA}
            showEyeDropper={true}
            showTriangle={false}
            onChange={(color) => {
              setHsva3(color.hsva);
            }}
          />
        </div>
        <div>
          <Slider
            className="max-w-md"
            orientation="vertical"
            defaultValue={iconSize}
            value={iconSize}
            onChange={(val) => setIconSize(val as number)}
            label="Icon Size"
            maxValue={400}
            minValue={50}
            step={10}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 overflow-y-scroll justify-center">
        {svgList.map((svg) => (
          <div
            key={svg.name}
            className="border rounded-md p-4 flex flex-col items-center bg-slate-300"
          >
            <div
              className="relative aspect-square overflow-hidden rounded-md bg-white/40"
              style={{
                width: `calc(${iconSize}px + 16px)`, // iconSize + padding
                height: `calc(${iconSize}px + 16px)`, // iconSize + padding
              }}
            >
              <div className="absolute inset-0 grid place-items-center p-2">
                <div
                  className="max-w-full max-h-full *:max-w-full *:max-h-full content-center place-items-center"
                  style={{ width: iconSize, height: iconSize }}
                  dangerouslySetInnerHTML={{
                    __html: recolorSvg(svg.content, colorMap),
                  }}
                />
              </div>
            </div>
            <div className="mt-2 text-center break-all">{svg.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
