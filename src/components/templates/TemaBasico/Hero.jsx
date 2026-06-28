import React from 'react';
import Animacion from './components/Animacion';

export default function Hero({ heroConfig }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Imagen de fondo con un zoom lento muy premium */}
      <img 
        src={heroConfig.fondo_url} 
        alt="Hero Background" 
        className="absolute inset-0 w-full h-full object-cover animate-[pulse_20s_ease-in-out_infinite_alternate] scale-105" 
      />
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-8 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8">
          <Animacion direccion="derecha" retraso="delay-100" duracion="duration-1000">
            <span className="block font-light drop-shadow-lg">{heroConfig.titulo_principal}</span>
          </Animacion>
          <Animacion direccion="izquierda" retraso="delay-500" duracion="duration-[1500ms]">
            <span className="block font-serif italic text-4xl md:text-6xl lg:text-7xl mt-2 text-white/90 drop-shadow-md">
              {heroConfig.titulo_cursiva}
            </span>
          </Animacion>
        </h1>
      </div>
    </div>
  );
}