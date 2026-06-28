import React, { useState } from 'react';

export default function Header({ config }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { bgBeige, bgGreen } = config.theme;

  // Función mágica para el scroll suave
  const scrollToSection = (targetId) => {
    setMenuAbierto(false); // Cierra el menú en móvil si estaba abierto
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header 
        className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-300"
        style={{ backgroundColor: bgBeige, color: bgGreen }}
      >
        {/* LOGO (Izquierda) */}
        <div className="flex-1">
          <div 
            className="text-3xl font-serif tracking-widest cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            {config.nav.logo_text}
          </div>
        </div>

        {/* NAVEGACIÓN DESKTOP (Centro) */}
        <nav className="hidden lg:flex flex-1 justify-center gap-8 font-medium text-[15px]">
          {config.nav.links_mitte.map((link, index) => (
            <button 
              key={index} 
              onClick={() => scrollToSection(link.target)}
              className="hover:opacity-60 transition-opacity"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* NAVEGACIÓN DESKTOP (Derecha) */}
        <div className="hidden lg:flex flex-1 justify-end gap-6 font-medium text-[15px]">
          {config.nav.links_rechts.map((link, index) => (
            <button 
              key={index} 
              onClick={() => scrollToSection(link.target)}
              className="hover:opacity-60 transition-opacity"
            >
              {link.label}
            </button>
          ))}
          <button className="flex items-center gap-1 hover:opacity-60 transition-opacity">
            EN 
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>

        {/* BOTÓN HAMBURGUESA (Solo Móvil) */}
        <button 
          className="lg:hidden space-y-1.5 p-2 z-[60]" 
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <div className={`w-8 h-0.5 bg-current transition-transform duration-300 ${menuAbierto ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-8 h-0.5 bg-current transition-opacity duration-300 ${menuAbierto ? 'opacity-0' : ''}`}></div>
          <div className={`w-8 h-0.5 bg-current transition-transform duration-300 ${menuAbierto ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </header>

      {/* OVERLAY DEL MENÚ MÓVIL */}
      <div 
        className={`fixed inset-0 z-40 flex flex-col justify-center items-center gap-8 transition-transform duration-500 lg:hidden ${menuAbierto ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ backgroundColor: bgGreen, color: bgBeige }}
      >
        {[...config.nav.links_mitte, ...config.nav.links_rechts].map((link, index) => (
          <button 
            key={index} 
            onClick={() => scrollToSection(link.target)}
            className="text-3xl font-serif hover:opacity-70 transition-opacity"
          >
            {link.label}
          </button>
        ))}
      </div>
    </>
  );
}