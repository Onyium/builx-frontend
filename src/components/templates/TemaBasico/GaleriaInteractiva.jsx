import React from 'react';
import Animacion from './components/Animacion';

export default function GaleriaInteractiva({ galeriaConfig, theme }) {
  if (!galeriaConfig || !galeriaConfig.imagenes) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <Animacion direccion="arriba">
          <h2 className="text-4xl md:text-5xl font-serif mb-4" style={{ color: theme.bgGreen }}>
            {galeriaConfig.titulo}
          </h2>
          <p className="text-gray-500 tracking-wide uppercase text-sm font-semibold">
            {galeriaConfig.subtitulo}
          </p>
          <div className="w-16 h-px mx-auto mt-6" style={{ backgroundColor: theme.accentOrange }}></div>
        </Animacion>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
        {galeriaConfig.imagenes.map((img, index) => {
          // Hacemos que la primera y la cuarta imagen sean más grandes para crear un diseño tipo mosaico
          const isLarge = index === 0 || index === 3; 
          return (
            <div 
              key={index} 
              className={`overflow-hidden rounded-md relative group cursor-pointer shadow-sm hover:shadow-xl transition-all ${isLarge ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`}
            >
              <Animacion direccion="fade" retraso={`delay-${index * 100}`} duracion="duration-700">
                <img 
                  src={img} 
                  alt={`Galería ${index + 1}`} 
                  className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </Animacion>
            </div>
          );
        })}
      </div>
    </div>
  );
}