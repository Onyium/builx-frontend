import React from 'react';

export default function Navbar() {
  // Función para hacer scroll suave directo al catálogo
  const scrollToCatalog = () => {
    const catalogElement = document.getElementById('catalogo');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#2C1E16]/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo interactivo (Regresa arriba) */}
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="text-2xl font-black tracking-tighter text-[#2C1E16] uppercase">
            Mi Memoria <span className="text-amber-700 font-light">Tallada</span>
          </span>
        </div>
        
        {/* Botón directo al catálogo */}
        <button 
          onClick={scrollToCatalog}
          className="bg-[#2C1E16] hover:bg-amber-800 text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-all active:scale-95 flex items-center justify-center shadow-md"
        >
          Ver Diseños
        </button>
        
      </div>
    </nav>
  );
}