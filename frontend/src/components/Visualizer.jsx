import React, { useEffect, useRef } from 'react';
import Viz from '@viz-js/viz';
import { Module, render } from '@viz-js/viz/full.render.js';

function Visualizer({ dot }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!dot) return;

    const viz = new Viz({ Module, render });

    viz.renderSVGElement(dot)
      .then(element => {
        if (ref.current) {
          ref.current.innerHTML = '';
          ref.current.appendChild(element);
        }
      })
      .catch(err => {
        console.error("Viz.js error:", err);
        viz.reset();
      });
  }, [dot]);

  return <div ref={ref} className="dfa-visual" />;
}

export default Visualizer;
