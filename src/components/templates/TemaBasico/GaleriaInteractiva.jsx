import React from 'react';
// Quitamos la importación de Animacion para la galería para forzar el renderizado directo de las fotos
// import Animacion from './components/Animacion'; 

export default function GaleriaInteractiva({ galeriaConfig, theme }) {
  if (!galeriaConfig) return null;

  // Extraemos las URLs válidas (ignorando título y subtítulo)
  const imagenes = Object.keys(galeriaConfig)
    .filter(key => key.startsWith('img') && typeof galeriaConfig[key] === 'string' && galeriaConfig[key].trim() !== '')
    .map(key => galeriaConfig[key]);

  if (imagenes.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24">
      
      {/* Título de la sección */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif mb-4 transition-all duration-700 opacity-100 translate-y-0" style={{ color: theme.bgGreen }}>
          {galeriaConfig.titulo}
        </h2>
        <p className="text-gray-500 tracking-wide uppercase text-sm font-semibold opacity-100">
          {galeriaConfig.subtitulo}
        </p>
        <div className="w-16 h-px mx-auto mt-6" style={{ backgroundColor: theme.accentOrange }}></div>
      </div>

      {/* Grid de Imágenes (Mosaico) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
        {imagenes.map((imgUrl, index) => {
          // Hacemos que la primera y cuarta imagen sean más grandes (2x2)
          const isLarge = index === 0 || index === 3; 
          
          return (
            <div 
              key={index} 
              className={`overflow-hidden rounded-md relative group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 bg-gray-100 ${isLarge ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`}
            >
              {/* Imagen cargando de forma directa */}
              <img 
                src={imgUrl} 
                alt={`Galería Espacio ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                // Añadimos loading="lazy" por rendimiento, pero aseguramos que el navegador la pida
                loading="lazy"
                onError={(e) => {
                  // Si el link se rompe, mostramos un fondo gris en lugar de un icono roto feo
                  e.target.style.display = 'none';
                  e.target.parentElement.classList.add('flex', 'items-center', 'justify-center');
                  e.target.parentElement.innerHTML = '<span class="text-gray-400 text-sm">Imagen no disponible</span>';
                }}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}