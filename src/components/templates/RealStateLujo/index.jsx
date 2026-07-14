import React, { useState, useEffect } from 'react';

// --- COMPONENTES DE LUJO ---
import HeaderInmobiliaria from './HeaderInmobiliaria'; 
import HeroVideo from './HeroVideo'; 
import BuscadorHorizontal from './BuscadorHorizontal'; 
import GridPropiedades from './GridPropiedades'; 
import FooterMinimalista from './FooterMinimalista';
import VistaContact from './VistaContact';

// --- NUEVAS VISTAS Y MODALES ---
import VistaPropiedad from './VistaPropiedad'; 
import VistaAboutUs from './VistaAboutUs'; // 🚀 Importamos la nueva vista
import ModalContactoFull from './components/ModalContactoFull'; 

export default function TemplatePremiumRealEstate({ config, items, empresa }) {
  // =========================================
  // 🚀 EL CEREBRO DE BUILX 
  // =========================================
  const [idioma, setIdioma] = useState('es'); 
  const datosIdioma = config[idioma] || config.es || config;
  
  // 🚀 ESTADOS DEL ENRUTADOR INTERNO
  const [vistaActual, setVistaActual] = useState('home'); // 'home', 'detalle', o 'about'
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState(null);
  const [mostrarContacto, setMostrarContacto] = useState(false); 
  
  const { bgWhite = "#ffffff", textDark = "#1a1a1a", accentGold = "#b89b5e" } = datosIdioma.theme || {};

  useEffect(() => {
    document.title = datosIdioma.nav?.logo_text || empresa.nombre || "Luxury Properties";
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = config.logo_url || datosIdioma.logo_url || '/favicon.svg';
  }, [datosIdioma, empresa, config]);

  const verDetalleCasa = (casa) => {
    setPropiedadSeleccionada(casa);
    setVistaActual('detalle');
  };

  const regresarAlInicio = () => {
    setPropiedadSeleccionada(null);
    setVistaActual('home');
  };

  return (
    <div 
      className="relative w-full min-h-screen font-sans antialiased selection:bg-[#b89b5e] selection:text-white"
      style={{ backgroundColor: bgWhite, color: textDark }}
    >
      {/* 1. HEADER FLOTANTE */}
      <HeaderInmobiliaria 
        config={datosIdioma} 
        empresa={empresa} 
        idiomaActual={idioma} 
        cambiarIdioma={setIdioma} 
        onContactClick={() => setMostrarContacto(true)} 
        onNavigate={(vista) => setVistaActual(vista)} // 🚀 Le pasamos el control de rutas al Header
      />

      {/* ========================================= */}
      {/* 🚀 RUTAS CONDICIONALES */}
      {/* ========================================= */}
      
      {vistaActual === 'home' && (
        <>
          <HeroVideo heroConfig={datosIdioma.hero} />
          <main className="w-full max-w-[1600px] mx-auto px-6 py-20 md:py-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-serif tracking-wide text-gray-900 mb-4 uppercase">
                {datosIdioma.catalogo?.titulo || "Explore Our Properties"}
              </h2>
              <p className="text-sm md:text-base text-gray-400 tracking-widest uppercase">
                {datosIdioma.catalogo?.subtitulo || "Please click Reset Filters before new search"}
              </p>
            </div>
            <BuscadorHorizontal theme={datosIdioma.theme} />
            <GridPropiedades 
              items={items} 
              theme={datosIdioma.theme}
              onSelect={verDetalleCasa} 
            />
          </main>
        </>
      )}

      {vistaActual === 'detalle' && (
        <VistaPropiedad 
          propiedad={propiedadSeleccionada} 
          onBack={regresarAlInicio} 
        />
      )}

      {/* 🚀 NUEVA RUTA: ABOUT US */}
      {vistaActual === 'about' && (
        <VistaAboutUs config={datosIdioma} />
      )}

      {vistaActual === 'contact' && (
        <VistaContact config={datosIdioma} />
      )}

      {/* 4. FOOTER MINIMALISTA */}
      {/* 4. FOOTER MINIMALISTA */}
      <FooterMinimalista 
        footerConfig={datosIdioma.footer} 
        contacto={datosIdioma.contacto} 
        onNavigate={(vista) => setVistaActual(vista)} // 🚀 ESTO ES LO NUEVO
      />

      {/* 5. MODAL DE CONTACTO GIGANTE */}
      {mostrarContacto && (
        <ModalContactoFull 
          datosContacto={datosIdioma.contacto}
          onClose={() => setMostrarContacto(false)} 
        />
      )}

      {/* 🚀 6. BOTÓN FLOTANTE PERMANENTE */}
      

    </div>
  );
}