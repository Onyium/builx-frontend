import React from 'react';

export default function CatalogSection({ breeds, onSelectBreed }) {
  return (
    <section id="catalogo" className="py-16 bg-white border-t border-[#2C1E16]/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-[#2C1E16]">Encuentra a tu mejor amigo</h2>
        <p className="text-[#5A4334] mt-2">Nuestros diseños base. Pasa el cursor para ver el tallado final.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6 pb-8">
        {breeds.map((breed) => (
          <div 
            key={breed.id} 
            onClick={() => onSelectBreed(breed)}
            className="w-full group cursor-pointer flex flex-col"
          >
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4 shadow-md group-hover:shadow-xl transition-all border border-[#2C1E16]/10 relative">
              <img 
                src={breed.image} 
                alt={breed.name} 
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0"
              />
              <img 
                src={breed.woodImage} 
                alt={`${breed.name} en madera`} 
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-110"
              />
              <div className="absolute top-3 right-3 bg-[#2C1E16]/70 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                Ver madera
              </div>
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none"></div>
            </div>
            
            <h3 className="text-xl font-bold text-[#2C1E16]">{breed.name}</h3>
            <p className="text-amber-700 font-bold text-sm mt-1 group-hover:underline">Personalizar con su nombre →</p>
          </div>
        ))}
      </div>
    </section>
  );
}