import React, { useState, useEffect } from 'react';

// --- COMPONENTES DE LUJO ---
import HeaderInmobiliaria from './HeaderInmobiliaria'; 
import HeroVideo from './HeroVideo'; // El hero grande del principio
import BuscadorHorizontal from './BuscadorHorizontal'; // El filtro que sale en el video
import GridPropiedades from './GridPropiedades'; // El catálogo en cuadrícula
import FooterMinimalista from './FooterMinimalista';

// --- NUEVAS VISTAS Y MODALES ---
import VistaPropiedad from './VistaPropiedad'; 
import ModalContactoFull from './components/ModalContactoFull'; 

export default function TemplatePremiumRealEstate({ config, items, empresa }) {
  // =========================================
  // 🚀 EL CEREBRO DE BUILX (Actualizado con Enrutador)
  // =========================================
  const [idioma, setIdioma] = useState('es'); 
  const datosIdioma = config[idioma] || config.es || config;
  
  // 🚀 ESTADOS DEL "ENRUTADOR" INTERNO
  const [vistaActual, setVistaActual] = useState('home'); // Puede ser 'home' o 'detalle'
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState(null);
  const [mostrarContacto, setMostrarContacto] = useState(false); // Controla el modal gigante
  
  // Colores de lujo por defecto (Blanco puro, texto oscuro, acentos en oro/gris)
  const { bgWhite = "#ffffff", textDark = "#1a1a1a", accentGold = "#b89b5e" } = datosIdioma.theme || {};

  const getUrl = (ruta) => {
    const urlParams = new URLSearchParams(window.location.search);
    const isPreview = urlParams.get('preview') === 'true';
    return `/v/${empresa.slug}/${ruta}${isPreview ? '?preview=true' : ''}`;
  };

  // Magia del Favicon y Título (Marca Blanca)
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

  // =========================================
  // 🚀 FUNCIONES DE NAVEGACIÓN
  // =========================================
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
      {/* 1. HEADER FLOTANTE (Le pasamos la función para abrir el modal de contacto) */}
      <HeaderInmobiliaria 
        config={datosIdioma} 
        empresa={empresa} 
        idiomaActual={idioma} 
        cambiarIdioma={setIdioma} 
        onContactClick={() => setMostrarContacto(true)} 
      />

      {/* ========================================= */}
      {/* 🚀 RUTAS CONDICIONALES */}
      {/* ========================================= */}
      
      {vistaActual === 'home' ? (
        // SI ESTAMOS EN EL INICIO (Catálogo)
        <>
          {/* 2. HERO PRINCIPAL */}
          <HeroVideo heroConfig={datosIdioma.hero} />

          {/* 3. CONTENEDOR CENTRAL: Filtros y Catálogo */}
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
      ) : (
        // SI ESTAMOS VIENDO UNA PROPIEDAD
        <VistaPropiedad 
          propiedad={propiedadSeleccionada} 
          onBack={regresarAlInicio} 
        />
      )}

      {/* 4. FOOTER MINIMALISTA (Siempre visible al fondo) */}
      <FooterMinimalista 
        footerConfig={datosIdioma.footer} 
        contacto={datosIdioma.contacto} 
      />

      {/* 5. MODAL DE CONTACTO FULL SCREEN (Flota por encima de todo) */}
      {mostrarContacto && (
        <ModalContactoFull 
          datosContacto={datosIdioma.contacto}
          onClose={() => setMostrarContacto(false)} 
        />
      )}
    </div>
  );
}