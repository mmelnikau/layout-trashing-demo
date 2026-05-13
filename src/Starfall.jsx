import { useEffect, useRef, useState } from "react";
import { createStarAndRemove } from "./shared/createStart.js";

// rendering pressure
// paint pressure
// DOM churn


export default function Starfall() {
  const starsRef = useRef(null);
  // const [layoutReads, setLayoutReads] = useState(0);
  // const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    let timeoutId;

    function _createStar() {
      const container = starsRef.current;
      if (!container) {
        return;
      }
      createStarAndRemove(container);

      // const rect = container.getBoundingClientRect();
      // setContainerWidth(rect.width);
      // setLayoutReads((value) => value + 1);
    }

    function loop() {
      _createStar();
      const next = 80 + Math.random() * 220;
      // const next = 30 + Math.random() * 80;
      timeoutId = setTimeout(loop, next);
    }

    loop();

    const starsElement = starsRef.current;
    return () => {
      clearTimeout(timeoutId);

      if (starsElement) {
        starsElement.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="space-container">
      <section ref={starsRef} />

      {/*<div className="debug-panel">*/}
      {/*  <div>Layout reads: {layoutReads}</div>*/}
      {/*  <div>Container width: {Math.round(containerWidth)}px</div>*/}
      {/*</div>*/}
    </div>
  );
}
