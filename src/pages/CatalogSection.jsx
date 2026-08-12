import React from 'react';

export default function CatalogSection({ breeds, onSelectBreed }) {
  return (
    <section id="catalogo" className="py-16 bg-white border-t border-[#2C1E16]/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-[#2C1E16]">Encuentra a tu mejor amigo</h2>
        <p className="text-[#5A4334] mt-2">Desliza la imagen de cada perrito para ver cómo queda el tallado final.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6 pb-8">
        {breeds.map((breed) => (
          <div key={breed.id} className="w-full flex flex-col group">
            
            {/* Contenedor de imágenes deslizable (Mini Carrusel) */}
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4 shadow-md border border-[#2C1E16]/10 relative">
              
              <div 
                className="flex w-full h-full overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {/* IMAGEN 1: Foto Real */}
                <div className="w-full h-full flex-shrink-0 snap-center relative">
                  <img 
                    src={breed.image} 
                    alt={breed.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full">
                    Foto Real
                  </div>
                </div>
                
                {/* IMAGEN 2: Diseño en Madera */}
                <div className="w-full h-full flex-shrink-0 snap-center relative">
                  <img 
                    src={breed.woodImage} 
                    alt={`${breed.name} en madera`} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-amber-700/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                    En Madera
                  </div>
                </div>
              </div>

              {/* Indicador visual para que sepan que pueden deslizar en el celular */}
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md rounded-full p-1.5 shadow pointer-events-none animate-bounce flex gap-1 items-center">
                <span className="text-[10px] font-black text-[#2C1E16] pl-2 uppercase tracking-wide">Desliza</span>
                <svg className="w-4 h-4 text-[#2C1E16]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            
            {/* Textos y Botón de Acción */}
            <h3 className="text-xl font-bold text-[#2C1E16]">{breed.name}</h3>
            
            {/* El evento onClick ahora está solo aquí para no interferir con el deslizamiento */}
            <button 
              onClick={() => onSelectBreed(breed)}
              className="text-left text-amber-700 font-bold text-sm mt-1 hover:underline w-fit"
            >
              Personalizar con su nombre →
            </button>
            
          </div>
        ))}
      </div>
    </section>
  );
}