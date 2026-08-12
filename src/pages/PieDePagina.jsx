import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-[#2C1E16]/10 bg-[#FAF7F2] pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-[#2C1E16] uppercase">
              Mi Memoria <span className="text-amber-700 font-light">Tallada</span>
            </span>
          </div>
          
          <div className="flex gap-8 text-[#5A4334] font-bold text-sm">
            <a href="#catalogo" className="hover:text-amber-700 transition-colors">Diseños</a>
            <a href="#" className="hover:text-amber-700 transition-colors">Preguntas Frecuentes</a>
            <a href="#" className="hover:text-amber-700 transition-colors">Contacto</a>
          </div>
        </div>
        
        <div className="border-t border-[#2C1E16]/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#8B6E59]">
          <p>© {new Date().getFullYear()} Mi Memoria Tallada. Todos los derechos reservados.</p>
          <p>Artesanía con propósito emocional.</p>
        </div>
      </div>
    </footer>
  );
}