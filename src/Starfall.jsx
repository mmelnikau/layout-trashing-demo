import { useEffect, useRef } from "react";
import { createStarAndRemove } from "./shared/createStart.js";

export default function Starfall() {
  const starsRef = useRef(null);

  useEffect(() => {
    let timeoutId;

    function _createStar() {
      const container = starsRef.current;
      if (!container) {
        return;
      }
      createStarAndRemove(container);
    }

    function loop() {
      _createStar();
      const next = 80 + Math.random() * 220;
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
    </div>
  );
}
