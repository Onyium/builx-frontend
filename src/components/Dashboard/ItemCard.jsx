import React, { useState, useEffect } from 'react';

// 🚀 EL FILTRO SUPREMO PARA EL LADO PÚBLICO
const formatearUrlItemCard = (url) => {
  if (!url) return 'https://via.placeholder.com/300x200?text=Sin+Imagen';
  const BACKEND_URL = "https://builx-api.onrender.com";
  
  let limpia = String(url).replace(/[\[\]"'\\]/g, '').trim();
  
  if (limpia.includes('cloudinary.com')) {
    const posicionRealHttp = limpia.lastIndexOf('http');
    if (posicionRealHttp !== -1) {
      limpia = limpia.substring(posicionRealHttp); 
    }
  }
  
  limpia = limpia.replace('https//', 'https://').replace('http//', 'http://');
  if (limpia.startsWith('http')) return limpia; 
  return limpia.startsWith('/') ? `${BACKEND_URL}${limpia}` : `${BACKEND_URL}/${limpia}`;
};

export default function ItemCard({ item, onToggle, onEdit, onDelete, onOpenReviews }) {
  const [indiceActual, setIndiceActual] = useState(0);

  // 🚀 EXTRACCIÓN SEGURA DE IMÁGENES
  let imagenes = [];
  if (item.todasLasFotos && Array.isArray(item.todasLasFotos) && item.todasLasFotos.length > 0) {
      imagenes = item.todasLasFotos.map(foto => formatearUrlItemCard(foto));
  }

  // Si después de todo no hay fotos en la galería, usamos la imagen principal o el placeholder
  if (imagenes.length === 0) {
    if (item.imagen_url) {
      imagenes = [formatearUrlItemCard(item.imagen_url)];
    } else {
      imagenes = ['https://via.placeholder.com/300x200?text=Sin+Imagen'];
    }
  }

  // 👻 SEGURO ANTI-FANTASMAS: Si la cantidad de fotos baja (porque borraste una), 
  // y el índice se quedó apuntando al vacío, lo reiniciamos a la foto 1 (índice 0).
  useEffect(() => {
    if (indiceActual >= imagenes.length) {
      setIndiceActual(0);
    }
  }, [imagenes.length, indiceActual]);

  const siguienteImagen = (e) => {
    e.stopPropagation(); 
    setIndiceActual((prev) => (prev + 1 >= imagenes.length ? 0 : prev + 1));
  };

  const anteriorImagen = (e) => {
    e.stopPropagation();
    setIndiceActual((prev) => (prev === 0 ? Math.max(0, imagenes.length - 1) : prev - 1));
  };

  // Asegurarnos de que el índice jamás sea inválido al renderizar
  const indiceSeguro = indiceActual >= imagenes.length ? 0 : indiceActual;

  return (
    <div className={`group p-4 rounded-3xl border transition-all duration-300 ${
      item.esta_disponible ? 'bg-white border-gray-100 shadow-sm' : 'bg-gray-50 border-gray-200 opacity-70'
    }`}>
      
      {/* --- CONTENEDOR DE IMAGEN CON FLECHAS --- */}
      <div className="w-full h-44 rounded-2xl bg-gray-100 mb-4 overflow-hidden relative group/slider">
        
        {/* Imagen Actual (Usando el índiceSeguro) */}
        <img 
          src={imagenes[indiceSeguro]} 
          alt={`${item.nombre}-${indiceSeguro}`} 
          className="w-full h-full object-cover transition-all duration-500"
        />

        {/* Flechas de Navegación */}
        {imagenes.length > 1 && (
          <>
            <button 
              onClick={anteriorImagen}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md z-10 transition-transform active:scale-90"
              title="Anterior"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button 
              onClick={siguienteImagen}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md z-10 transition-transform active:scale-90"
              title="Siguiente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Indicadores de posición */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {imagenes.map((_, i) => (
                <div key={i} className={`h-1.5 w-1.5 rounded-full transition-all ${i === indiceSeguro ? 'bg-white w-4' : 'bg-white/50'}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* --- INFORMACIÓN DEL ÍTEM --- */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-bold text-gray-800 line-clamp-1 text-lg">{item.nombre}</h4>
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md">
            {item.tipo_item}
          </span>
        </div>
        <span className="font-black text-gray-900 text-xl">${item.precio}</span>
      </div>
      
      <p className="text-sm text-gray-500 mb-4 line-clamp-2 h-10 italic">
        {item.descripcion || "Sin descripción disponible"}
      </p>
      
      {/* --- ACCIONES --- */}
      <div className="flex items-center justify-between border-t border-gray-50 pt-4">
        <div className="flex gap-1">
          <button 
            onClick={() => onEdit(item)}
            className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-blue-600 transition-colors"
            title="Editar"
          >
            ✏️
          </button>
            <button onClick={() => onOpenReviews(item)} className="p-2 hover:bg-amber-50 rounded-xl text-gray-400 hover:text-amber-500 transition-colors" title="Gestionar Reseñas">
              ⭐
            </button>
          <button 
            onClick={() => onDelete(item.id)}
            className="p-2 hover:bg-red-50 rounded-xl text-gray-400 hover:text-red-600 transition-colors"
            title="Eliminar"
          >
            🗑️
          </button>
        </div>

        <button 
          onClick={() => onToggle(item.id, !item.esta_disponible)}
          className={`text-xs font-bold px-4 py-2 rounded-xl transition-all active:scale-95 ${
            item.esta_disponible 
            ? 'bg-gray-900 text-white hover:bg-red-600 shadow-md shadow-gray-200' 
            : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          {item.esta_disponible ? 'Agotar' : 'Habilitar'}
        </button>
      </div>
    </div>
  );
}