import { useEffect, useState } from "react";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { svgComponents } from "./svgs";

function App() {
  const [count, setCount] = useState(0);


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
        <button
          type="button"
          onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/* <div>
        {Object.values(svgComponents).map((src, index) => {
          console.log("Rendering SVG component:", src);
          return (
            <img
              src={src}
              key={`hello-${index}`}
              width={100}
              height={100}
              style={{ margin: 10 }}
              aria-label="SVG icon"
            />
          );
        })}
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {svgList.map((svg) => (
          <SVGRenderer
            key={svg.name}
            svgName={svg.name}
            content={svgContents[svg.name]}
          />
        ))}
      </div>
    </>
  );
}

export default App;
