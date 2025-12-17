import React, { useEffect, useRef } from 'react';
import { instance } from '@viz-js/viz';

function Visualizer({ dot }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!dot) return;

    let vizInstance;

    instance()
      .then((viz) => {
        vizInstance = viz;
        return viz.renderSVGElement(dot);
      })
      .then((element) => {
        if (ref.current) {
          ref.current.innerHTML = '';
          ref.current.appendChild(element);
        }
      })
      .catch((err) => {
        console.error('Viz.js error:', err);
        if (vizInstance?.reset) vizInstance.reset();
      });

  }, [dot]);

  return <div ref={ref} className="dfa-visual" />;
}

export default Visualizer;
