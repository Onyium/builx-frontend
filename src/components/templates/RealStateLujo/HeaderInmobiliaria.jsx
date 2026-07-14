import React from 'react';

export default function HeaderInmobiliaria({ config, empresa, idiomaActual, cambiarIdioma, onNavigate }) {
  const navConfig = config.nav || {};
  
  // 🚀 Función inteligente para decidir a dónde ir según el texto del menú
  const manejarNavegacion = (label) => {
    const texto = label.toLowerCase();
    
    if (texto.includes('about') || texto.includes('nosotros')) {
      onNavigate('about');
      window.scrollTo(0, 0);
    } else if (texto.includes('contact') || texto.includes('contacto')) {
      // 🚀 Ahora manda a la página completa en lugar del modal
      onNavigate('contact');
      window.scrollTo(0, 0); 
    } else {
      onNavigate('home');
      window.scrollTo(0, 0); // Sube el scroll al inicio
    }
  };

  return (
    <header className="absolute top-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center text-white drop-shadow-md">
      {/* LOGO */}
      <div 
        onClick={() => manejarNavegacion('home')}
        className="text-2xl md:text-3xl font-serif tracking-[0.15em] uppercase cursor-pointer hover:opacity-80 transition-opacity"
      >
        {navConfig.logo_text || empresa?.nombre || "Luxury Real Estate"}
      </div>

      {/* NAVEGACIÓN DESKTOP (Centro) */}
      <nav className="hidden lg:flex gap-10 font-sans text-xs font-bold tracking-[0.2em] uppercase">
        {navConfig.links_mitte?.map((link, index) => (
          <button 
            key={index} 
            onClick={() => manejarNavegacion(link.label)} 
            className="hover:text-gray-300 transition-colors tracking-[0.2em]"
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* NAVEGACIÓN DERECHA Y SELECTOR DE IDIOMA */}
      <div className="hidden lg:flex items-center gap-8 font-sans text-xs font-bold tracking-[0.2em] uppercase">
        {navConfig.links_rechts?.map((link, index) => (
          <button 
            key={index} 
            onClick={() => manejarNavegacion(link.label)} 
            className="hover:text-gray-300 transition-colors tracking-[0.2em]"
          >
            {link.label}
          </button>
        ))}
        
        {/* Separador */}
        <div className="w-px h-4 bg-white/40"></div>
        
        {/* Idioma */}
        <div className="flex gap-3">
          <button 
            onClick={() => cambiarIdioma('es')} 
            className={`transition-opacity ${idiomaActual === 'es' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
          >
            ES
          </button>
          <span className="opacity-30">|</span>
          <button 
            onClick={() => cambiarIdioma('en')} 
            className={`transition-opacity ${idiomaActual === 'en' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}