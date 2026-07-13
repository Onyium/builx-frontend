import React from 'react';

export default function FooterMinimalista({ footerConfig, contacto, onNavigate }) {
  
  // Función para procesar a qué vista ir dependiendo del botón
  const manejarNavegacion = (destino) => {
    onNavigate(destino);
    window.scrollTo(0, 0); // Sube el scroll suavemente al cambiar de página
  };

  return (
    <footer className="w-full bg-white text-gray-900 border-t border-gray-200 py-16 px-6 md:px-12 font-sans relative z-10">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        
        {/* Lado Izquierdo: Marca */}
        <div className="flex-1">
          <h4 className="font-serif text-2xl uppercase tracking-[0.15em] mb-3">
            {footerConfig?.frase_final || "Stewart & Co."}
          </h4>
          <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase font-bold">
            {footerConfig?.frase_cursiva || "25 years of experience in luxury property."}
          </p>
        </div>

        {/* Centro: Enlaces de Navegación Dinámicos */}
        <div className="flex flex-1 justify-start md:justify-center flex-wrap gap-8 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500">
          <button onClick={() => manejarNavegacion('home')} className="hover:text-black transition-colors">
            Home
          </button>
          <button onClick={() => manejarNavegacion('about')} className="hover:text-black transition-colors">
            About Us
          </button>
          <button onClick={() => manejarNavegacion('contact')} className="hover:text-black transition-colors">
            Contact
          </button>
          
          {/* Enlaces extra que vengan del JSON (ej. Privacy Policy) */}
          {footerConfig?.enlaces?.map((link, index) => (
            <button key={index} className="hover:text-black transition-colors">{link}</button>
          ))}
        </div>

        {/* Lado Derecho: Contacto Directo */}
        <div className="flex-1 flex flex-col items-start md:items-end gap-3 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500">
          {contacto?.email && (
            <a href={`mailto:${contacto.email}`} className="hover:text-black transition-colors lowercase">
              {contacto.email}
            </a>
          )}
          {contacto?.telefono && (
            <a href={`tel:${contacto.telefono}`} className="hover:text-black transition-colors">
              {contacto.telefono}
            </a>
          )}
        </div>
        
      </div>
    </footer>
  );
}