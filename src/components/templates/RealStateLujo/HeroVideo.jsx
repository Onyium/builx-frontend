import React from 'react';

export default function HeroVideo({ heroConfig }) {
  const fondoUrl = heroConfig?.fondo_url || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000";
  
  return (
    <section className="relative w-full h-[75vh] md:h-[85vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Imagen / Fondo */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={fondoUrl} 
          alt="Luxury Property Hero" 
          className="w-full h-full object-cover opacity-80"
        />
        {/* Capa oscura sutil para que el texto blanco sea siempre legible */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Texto Central Estilo Barbados */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto flex flex-col items-center mt-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif uppercase tracking-[0.1em] leading-snug mb-8 drop-shadow-lg">
          {heroConfig?.titulo_principal || "Luxury Properties For Sale"}
        </h1>
        
        {/* Línea divisoria elegante */}
        <div className="w-24 h-px bg-white/70 mb-8"></div>
        
        <p className="text-xs md:text-sm font-sans font-light tracking-[0.25em] uppercase drop-shadow-md max-w-2xl">
          {heroConfig?.titulo_cursiva || "A curated selection of exceptional estates, presented exclusively for discerning buyers."}
        </p>
      </div>
    </section>
  );
}