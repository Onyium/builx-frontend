// npm install cobe
import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

const GlobalInfrastructure = () => {
  const canvasRef = useRef();

  useEffect(() => {
    let phi = 0;
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0,
      dark: 1, // 1 = Dark mode activado
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.1], // Color del globo (oscuro)
      markerColor: [0.5, 0.2, 1], // Color de los pines (Morado/Cyan)
      glowColor: [0.2, 0.1, 0.5], // Resplandor alrededor
      markers: [
        // Aquí puedes poner las coordenadas [Latitud, Longitud] de los puntos brillantes
        { location: [13.6929, -89.2182], size: 0.1 }, // San Salvador
        { location: [37.7749, -122.4194], size: 0.1 }, // San Francisco
        { location: [40.7128, -74.0060], size: 0.1 }, // New York
      ],
      onRender: (state) => {
        // Esto hace que el globo gire automáticamente
        state.phi = phi;
        phi += 0.005;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <section className="py-24 bg-[#0a0a0a] overflow-hidden flex flex-col items-center">
      <div className="text-center z-10 mb-10 relative">
        <h2 className="text-4xl font-bold text-white mb-4">Infraestructura Global</h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Despliegues ultrarrápidos y redundancia en servidores de todo el mundo.
        </p>
      </div>
      
      {/* Contenedor del Globo */}
      <div className="w-full max-w-[800px] aspect-square relative flex justify-center items-center">
        <canvas
          ref={canvasRef}
          style={{
            width: 800,
            height: 800,
            maxWidth: "100%",
            aspectRatio: 1,
          }}
        />
      </div>
    </section>
  );
};

export default GlobalInfrastructure;