import React, { useEffect } from 'react';

export default function VistaPropiedad({ propiedad, onBack }) {
  // Cuando se abre esta "página", subimos el scroll al inicio automáticamente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white animate-[fadeIn_0.5s_ease-in-out]">
      
      {/* 1. HERO DE LA PROPIEDAD (Imagen gigante con título) */}
      <div className="relative w-full h-[80vh] flex items-end pb-12 px-6 md:px-12">
        {/* Botón para regresar al catálogo */}
        <button onClick={onBack} className="absolute top-24 left-6 md:left-12 z-20 bg-white/20 hover:bg-white text-white hover:text-black px-6 py-2 rounded-full backdrop-blur-md transition-all text-xs font-bold uppercase tracking-widest">
          ← Back to Properties
        </button>

        <img 
          src={propiedad.imagen_url} 
          alt={propiedad.nombre} 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="relative z-10 text-white w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif uppercase tracking-widest mb-4">
              {propiedad.nombre}
            </h1>
            <p className="text-2xl font-light tracking-wider">
              USD ${parseFloat(propiedad.precio).toLocaleString('en-US')}
            </p>
          </div>
          {/* Botón flotante de contacto (Como en el video) */}
          <button className="mt-6 md:mt-0 px-10 py-4 bg-[#2a3b4c] hover:bg-[#1a2530] text-white text-xs font-bold tracking-widest uppercase transition-colors">
            Contact Us
          </button>
        </div>
      </div>

      {/* 2. CONTENIDO PRINCIPAL (Descripción, Amenities, Mapa) */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-serif uppercase tracking-widest text-gray-800 mb-8 border-b border-gray-200 pb-4">
          Discover {propiedad.nombre}
        </h2>
        <p className="text-gray-600 font-light leading-loose mb-16 text-lg">
          {propiedad.descripcion_en || propiedad.descripcion}
        </p>

        {/* Aquí puedes agregar las otras secciones del video (Snapshot, Amenities, Slider) */}
        {/* ... */}
      </div>
    </div>
  );
}