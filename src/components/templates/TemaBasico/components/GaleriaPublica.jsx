import React, { useState } from 'react';

export default function GaleriaPublica({ imagenes, nombre }) {
  const [indiceActual, setIndiceActual] = useState(0);

  const siguienteImagen = (e) => {
    e.stopPropagation(); 
    setIndiceActual((prev) => (prev + 1 === imagenes.length ? 0 : prev + 1));
  };

  const anteriorImagen = (e) => {
    e.stopPropagation();
    setIndiceActual((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-full group/slider overflow-hidden">
      <img 
        src={imagenes[indiceActual]} 
        alt={`${nombre}-${indiceActual}`} 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover/slider:scale-105" 
      />
      {imagenes.length > 1 && (
        <>
          <button 
            onClick={anteriorImagen} 
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 text-gray-900 p-2 rounded-full shadow-lg z-10 transition-all active:scale-90 opacity-0 group-hover/slider:opacity-100 hover:bg-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={siguienteImagen} 
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 text-gray-900 p-2 rounded-full shadow-lg z-10 transition-all active:scale-90 opacity-0 group-hover/slider:opacity-100 hover:bg-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {imagenes.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 w-1.5 rounded-full transition-all ${i === indiceActual ? 'bg-white scale-125' : 'bg-white/50'}`} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}