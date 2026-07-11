import React from 'react';
import { formatearUrlPublica } from './components/UtilidadesCatalogo';

export default function GridPropiedades({ items, theme, onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {items.map((item) => {
        // Extraemos la primera imagen para la portada
        const imagenPortada = (item.todasLasFotos && item.todasLasFotos.length > 0) 
          ? formatearUrlPublica(item.todasLasFotos[0]) 
          : formatearUrlPublica(item.imagen_url);

        // Extraemos detalles del JSON (Cuartos, Baños, Área)
        let detalles = {};
        try {
          detalles = typeof item.detalles_extra === 'string' 
            ? JSON.parse(item.detalles_extra) 
            : (item.detalles_extra || {});
        } catch (e) {}

        const cuartos = detalles.Max_Adultos || detalles.Cuartos || "03";
        const banos = detalles.Banos || "03";
        const area = detalles.Area || "3,600";

        return (
          <article 
            key={item.id} 
            onClick={() => onSelect(item)}
            className="group relative w-full h-[350px] md:h-[450px] overflow-hidden cursor-pointer rounded-sm"
          >
            {/* Imagen de Fondo (con efecto zoom al pasar el mouse) */}
            <img 
              src={imagenPortada} 
              alt={item.nombre} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            
            {/* Degradado Oscuro en la parte inferior para que resalte el texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Contenido (Texto sobre la imagen) */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-end text-white z-10">
              
              {/* Lado Izquierdo: Título y Precio */}
              <div className="flex-1 mb-4 md:mb-0 pr-4">
                <h3 className="font-serif text-2xl md:text-3xl uppercase tracking-wider mb-2 leading-tight">
                  {item.nombre}
                </h3>
                <p className="font-sans text-lg md:text-xl font-light text-gray-200">
                  <span className="text-sm uppercase tracking-widest mr-2">From USD</span>
                  ${parseFloat(item.precio).toLocaleString('en-US', {minimumFractionDigits: 2})}
                </p>
              </div>

              {/* Lado Derecho: Metadatos (Cuartos, Baños, Sq Ft) */}
              <div className="flex flex-col items-start md:items-end text-xs md:text-sm font-sans tracking-widest uppercase text-gray-300 gap-1">
                <div className="flex gap-4">
                  <span>{cuartos} Bedrooms</span>
                  <span>{banos} Bathrooms</span>
                </div>
                <div>
                  <span>Floor Area {area} sq ft</span>
                </div>
              </div>

            </div>
          </article>
        );
      })}
    </div>
  );
}