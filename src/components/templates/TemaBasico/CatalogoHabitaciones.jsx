import React from 'react';
import Animacion from './components/Animacion';
import GaleriaPublica from './components/GaleriaPublica';
import { formatearUrlPublica } from './components/UtilidadesCatalogo';

export default function CatalogoHabitaciones({ items, theme, configCatalogo, onSelect }) {
  return (
    <div className="w-full h-full overflow-y-auto px-6 py-24" style={{ backgroundColor: theme.bgBeige, color: theme.textDark }}>
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <Animacion direccion="arriba">
            <h2 className="text-4xl md:text-5xl font-serif text-[#2b4535]">
              {configCatalogo?.titulo || "Nuestras Habitaciones"}
            </h2>
            <div className="w-16 h-px mx-auto mt-6" style={{ backgroundColor: theme.accentOrange }}></div>
          </Animacion>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((item, index) => {
            if (!item.esta_disponible) return null;
            
            let imagenes = (item.todasLasFotos?.length > 0) 
              ? item.todasLasFotos.map(formatearUrlPublica) 
              : [formatearUrlPublica(item.imagen_url)];

            return (
              <div key={item.id} style={{ transitionDelay: `${index * 150}ms` }} className="h-full">
                <Animacion direccion="arriba" duracion="duration-700">
                  <article className="group flex flex-col h-full bg-white border border-gray-200 transition-all duration-500 hover:shadow-2xl">
                    
                    <div className="h-72 w-full overflow-hidden relative bg-gray-100">
                      <GaleriaPublica imagenes={imagenes} nombre={item.nombre} />
                    </div>
                    
                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="font-serif text-2xl mb-3 text-[#2b4535]">{item.nombre}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">{item.descripcion}</p>
                      
                      <div className="mt-auto flex justify-between items-center pt-6 border-t border-gray-100">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-400 uppercase tracking-widest">Desde</span>
                          <span className="font-serif text-2xl text-[#2b4535]">${item.precio}</span>
                        </div>
                        
                        <button 
                          onClick={() => onSelect(item)}
                          className="px-6 py-2.5 text-white text-sm font-medium transition-transform active:scale-95 shadow-sm hover:shadow-md"
                          style={{ backgroundColor: theme.accentOrange }}
                        >
                          Reservar
                        </button>
                      </div>
                    </div>

                  </article>
                </Animacion>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}