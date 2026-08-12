import React, { useState } from 'react';

export default function Navbar({ onOpenDrawer }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#2C1E16]/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
          <span className="text-2xl font-black tracking-tighter text-[#2C1E16] uppercase">
            Mi Memoria <span className="text-amber-700 font-light">Tallada</span>
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onOpenDrawer(null)}
            className="bg-[#2C1E16] hover:bg-amber-800 text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-all active:scale-95 hidden md:flex items-center justify-center shadow-lg"
          >
            Homenaje Especial
          </button>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#2C1E16] p-2"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> 
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /> 
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* MENÚ MÓVIL */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#FAF7F2] border-b border-[#2C1E16]/10 px-6 py-8 flex flex-col gap-6 shadow-2xl">
          <button 
            onClick={() => {
              onOpenDrawer(null);
              setIsMobileMenuOpen(false);
            }}
            className="w-full bg-[#2C1E16] text-white font-bold py-4 rounded-xl text-lg shadow-lg"
          >
            Crear mi homenaje
          </button>
        </div>
      )}
    </nav>
  );
}