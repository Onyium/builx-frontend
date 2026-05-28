import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

const GlobeVisualization = () => {
  const canvasRef = useRef();

  useEffect(() => {
    let phi = 0;
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2, // Aumentamos resolución
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.1],
      markerColor: [0.5, 0.2, 1], // Morado BuilX
      glowColor: [0.1, 0.1, 0.2],
      markers: [
        { location: [13.6929, -89.2182], size: 0.1 }, // El Salvador
        { location: [37.7749, -122.4194], size: 0.08 },
        { location: [40.7128, -74.0060], size: 0.08 },
        { location: [51.5074, -0.1278], size: 0.08 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.003; // Rotación suave
      },
    });

    return () => globe.destroy();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "600px",
          aspectRatio: "1",
          cursor: "grab",
        }}
      />
    </div>
  );
};

export default GlobeVisualization;