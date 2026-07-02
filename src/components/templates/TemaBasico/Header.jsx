import React, { useState } from 'react';

export default function Header({ config, empresa, getUrl, idiomaActual, cambiarIdioma }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  
  // Extraemos variables seguras con valores por defecto
  const { bgBeige = "#f2efe9", bgGreen = "#2b4535" } = config.theme || {};
  const social = config.contacto?.social || {};

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
        className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 shadow-sm"
        style={{ backgroundColor: bgBeige, color: bgGreen }}
      >
        {/* LOGO (Izquierda) */}
        <div className="flex-1">
          <div 
            className="text-2xl md:text-3xl font-serif tracking-widest cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => scrollToSection('hero')}
          >
            {config.nav?.logo_text || empresa?.nombre || "Hotel"}
          </div>
        </div>

        {/* NAVEGACIÓN DESKTOP (Centro) */}
        <nav className="hidden lg:flex flex-1 justify-center gap-8 font-medium text-[15px]">
          {config.nav?.links_mitte?.map((link, index) => (
            <button 
              key={index} 
              onClick={() => scrollToSection(link.target)}
              className="hover:opacity-60 transition-opacity tracking-wide"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* NAVEGACIÓN DESKTOP (Derecha) */}
        <div className="hidden lg:flex flex-1 justify-end items-center gap-6 font-medium text-[15px]">
          {config.nav?.links_rechts?.map((link, index) => (
            <button 
              key={index} 
              onClick={() => scrollToSection(link.target)}
              className="hover:opacity-60 transition-opacity tracking-wide"
            >
              {link.label}
            </button>
          ))}
          
          {/* SEPARADOR */}
          <div className="w-px h-5 bg-current opacity-30"></div>

          {/* REDES SOCIALES */}
          <div className="flex items-center gap-4">
            {social.instagram && (
              <a href={social.instagram} target="_blank" rel="noreferrer" className="hover:opacity-60 hover:scale-110 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            )}
            {social.facebook && (
              <a href={social.facebook} target="_blank" rel="noreferrer" className="hover:opacity-60 hover:scale-110 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            )}
          </div>

          {/* SELECTOR DE IDIOMA */}
          <div className="flex items-center gap-2 ml-2 text-xs font-bold tracking-widest border border-current rounded-full px-3 py-1">
            <button 
              onClick={() => cambiarIdioma('es')} 
              className={`transition-opacity ${idiomaActual === 'es' ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
            >
              ES
            </button>
            <span className="opacity-30">|</span>
            <button 
              onClick={() => cambiarIdioma('en')} 
              className={`transition-opacity ${idiomaActual === 'en' ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
            >
              EN
            </button>
          </div>
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
        {/* Links del Menú Móvil */}
        {[...(config.nav?.links_mitte || []), ...(config.nav?.links_rechts || [])].map((link, index) => (
          <button 
            key={index} 
            onClick={() => scrollToSection(link.target)}
            className="text-3xl font-serif hover:opacity-70 transition-opacity"
          >
            {link.label}
          </button>
        ))}

        {/* Redes e Idioma en Móvil */}
        <div className="flex flex-col items-center gap-6 mt-8">
          <div className="flex gap-6">
            {social.instagram && (
              <a href={social.instagram} target="_blank" rel="noreferrer" className="hover:opacity-70">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            )}
            {social.facebook && (
              <a href={social.facebook} target="_blank" rel="noreferrer" className="hover:opacity-70">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
            )}
          </div>
          
          <div className="flex gap-4 text-xl font-bold tracking-widest mt-4">
            <button 
              onClick={() => { cambiarIdioma('es'); setMenuAbierto(false); }} 
              className={`transition-opacity ${idiomaActual === 'es' ? 'opacity-100' : 'opacity-40'}`}
            >
              ES
            </button>
            <span className="opacity-30">|</span>
            <button 
              onClick={() => { cambiarIdioma('en'); setMenuAbierto(false); }} 
              className={`transition-opacity ${idiomaActual === 'en' ? 'opacity-100' : 'opacity-40'}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </>
  );
}