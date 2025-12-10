import React, { useEffect, useRef } from 'react';
import Viz from '@viz-js/viz';

function Visualizer({ dot }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!dot) return;

    // Create a Viz instance
    const viz = new Viz();

    viz.renderSVGElement(dot)
      .then((element) => {
        if (ref.current) {
          ref.current.innerHTML = '';
          ref.current.appendChild(element);
        }
      })
      .catch((err) => {
        console.error("Viz.js error:", err);
        viz.reset();
      });
  }, [dot]);

  return <div ref={ref} className="dfa-visual" />;
}

export default Visualizer;
