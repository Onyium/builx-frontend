import React from 'react';

export default function BarraFlotante({ barraConfig, color }) {
  const hacerScrollAlCatalogo = () => {
    // Buscamos la sección por su ID exacto en lugar de calcular alturas a ciegas
    const seccionCatalogo = document.getElementById('catalogo');
    
    if (seccionCatalogo) {
      seccionCatalogo.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex justify-between items-center bg-white/95 backdrop-blur-md rounded-full p-2 pr-2 shadow-2xl border border-gray-200 w-[90%] max-w-md animate-[slideUp_0.5s_ease-out]">
      <div className="flex items-center space-x-3 px-4">
        <svg className="w-5 h-5 text-[#d16b47]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <span className="text-gray-700 font-semibold text-sm tracking-wide">
          {barraConfig.temporada}
        </span>
      </div>
      
      <button 
        onClick={hacerScrollAlCatalogo}
        className="px-6 py-3 rounded-full text-white font-bold text-sm shadow-md transition-transform active:scale-95 hover:shadow-lg"
        style={{ backgroundColor: color }}
      >
        {barraConfig.btn_texto}
      </button>
    </div>
  );
}