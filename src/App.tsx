import { useState } from "react";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Button } from "@heroui/react";
import Colorful from '@uiw/react-color-colorful';
import { svgList } from "./svgs";

function App() {
  const [count, setCount] = useState(0);
  const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 });

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button type="button" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Colorful
        color={hsva}
        disableAlpha={true}
        onChange={(color) => {
          setHsva(color.hsva);
        }}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {svgList.map((svg) => (
          <div
            key={svg.name}
            className="border rounded-md p-4 flex flex-col items-center bg-slate-300"
          >
            <div
              className="mb-2 "
              dangerouslySetInnerHTML={{ __html: svg.content }}
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
