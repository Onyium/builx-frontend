import React from 'react';

export default function CatalogSection({ breeds, onSelectBreed }) {
  return (
    <section id="catalogo" className="py-16 bg-white border-t border-[#2C1E16]/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-[#2C1E16]">Encuentra a tu mejor amigo</h2>
        
        <p className="text-[#5A4334] mt-2 block md:hidden">
          Desliza la imagen de cada perrito para ver cómo queda el tallado final.
        </p>
        <p className="text-[#5A4334] mt-2 hidden md:block">
          Pasa el cursor sobre la imagen para ver el tallado final en madera.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6 pb-8">
        {breeds.map((breed) => (
          <div key={breed.id} className="w-full flex flex-col group cursor-pointer bg-white p-3 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
            
            {/* 📱 VERSIÓN MÓVIL */}
            <div className="md:hidden w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4 relative">
              <div className="flex w-full h-full overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="w-full h-full flex-shrink-0 snap-center relative">
                  <img src={breed.image} alt={breed.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full">
                    Foto Real
                  </div>
                </div>
                <div className="w-full h-full flex-shrink-0 snap-center relative">
                  <img src={breed.woodImage} alt={`${breed.name} en madera`} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-amber-700/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                    En Madera
                  </div>
                </div>
              </div>

              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md rounded-full p-1.5 shadow pointer-events-none animate-bounce flex gap-1 items-center">
                <span className="text-[10px] font-black text-[#2C1E16] pl-2 uppercase tracking-wide">Desliza</span>
                <svg className="w-4 h-4 text-[#2C1E16]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* 💻 VERSIÓN DESKTOP */}
            <div className="hidden md:block w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4 relative">
              
              <img 
                src={breed.image} 
                alt={breed.name} 
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0"
              />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                Foto Real
              </div>

              <img 
                src={breed.woodImage} 
                alt={`${breed.name} en madera`} 
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-110"
              />
              <div className="absolute top-3 left-3 bg-amber-700/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                En Madera
              </div>

              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md rounded-full p-1.5 shadow pointer-events-none flex gap-1 items-center transition-opacity duration-300 group-hover:opacity-0">
                <span className="text-[10px] font-black text-[#2C1E16] pl-2 uppercase tracking-wide">Ver madera</span>
                <svg className="w-4 h-4 text-[#2C1E16]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
            
            <div className="px-1 pb-1">
              <h3 className="text-xl font-black text-[#2C1E16] mb-3">{breed.name}</h3>
              
              {/* ✨ ESTE ES EL NUEVO BOTÓN SÚPER VISIBLE ✨ */}
              <button 
                onClick={() => onSelectBreed(breed)}
                className="w-full bg-[#2C1E16] hover:bg-amber-800 text-white font-bold py-3.5 px-4 rounded-xl transition-all active:scale-95 flex items-center justify-between shadow-md"
              >
                <span>Encargar diseño</span>
                <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
}