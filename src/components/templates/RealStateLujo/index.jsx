import React, { useState, useEffect } from 'react';

// --- COMPONENTES DE LUJO (Nuevos para esta plantilla) ---
//import HeaderInmobiliaria from './HeaderInmobiliaria'; 
//import HeroVideo from './HeroVideo'; // El hero grande del principio
import BuscadorHorizontal from './BuscadorHorizontal'; // El filtro que sale en el video
import GridPropiedades from './GridPropiedades'; // El catálogo en cuadrícula
//import FooterMinimalista from './FooterMinimalista';

// --- MODALES ---
// En vez de "Reservar", en bienes raíces se "Agenda una cita" o se "Pide información"
//import SidebarContactoPropiedad from './components/SidebarContactoPropiedad'; 

export default function TemplatePremiumRealEstate({ config, items, empresa }) {
  // =========================================
  // 🚀 EL CEREBRO DE BUILX (Reciclado y perfecto)
  // =========================================
  const [idioma, setIdioma] = useState('es'); 
  const datosIdioma = config[idioma] || config.es || config;
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState(null);
  
  // Colores de lujo por defecto (Blanco puro, texto oscuro, acentos en oro/gris)
  const { bgWhite = "#ffffff", textDark = "#1a1a1a", accentGold = "#b89b5e" } = datosIdioma.theme || {};
  const telefonoAsesor = datosIdioma.contacto?.telefono || "+1 000 000 0000"; 

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

  return (
    // 🚀 NOTA: Quitamos el "snap-y snap-mandatory" para un scroll libre y fluido como en el video
    <div 
      className="relative w-full min-h-screen font-sans antialiased selection:bg-[#b89b5e] selection:text-white"
      style={{ backgroundColor: bgWhite, color: textDark }}
    >
      {/* 1. HEADER FLOTANTE (Transparente que se vuelve sólido al bajar) */}
      <HeaderInmobiliaria 
        config={datosIdioma} 
        empresa={empresa} 
        idiomaActual={idioma} 
        cambiarIdioma={setIdioma} 
      />

      {/* 2. HERO PRINCIPAL (Foto o Video de la casa) */}
      <HeroVideo heroConfig={datosIdioma.hero} />

      {/* 3. CONTENEDOR CENTRAL: Filtros y Catálogo */}
      <main className="w-full max-w-[1600px] mx-auto px-6 py-20 md:py-32">
        
        {/* Título de la sección como en el video */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif tracking-wide text-gray-900 mb-4 uppercase">
            {datosIdioma.catalogo?.titulo || "Explore Our Properties"}
          </h2>
          <p className="text-sm md:text-base text-gray-400 tracking-widest uppercase">
            {datosIdioma.catalogo?.subtitulo || "Please click Reset Filters before new search"}
          </p>
        </div>

        {/* El buscador horizontal que vimos en el video (Cuartos, Baños, Precio, Locación) */}
        <BuscadorHorizontal theme={datosIdioma.theme} />

        {/* El catálogo de propiedades en cuadrícula limpia de 2 o 3 columnas */}
        <GridPropiedades 
          items={items} 
          theme={datosIdioma.theme}
          onSelect={setPropiedadSeleccionada} 
        />
      </main>

      {/* 4. FOOTER MINIMALISTA (Blanco, logos limpios y datos de contacto) */}
      <FooterMinimalista 
        footerConfig={datosIdioma.footer} 
        contacto={datosIdioma.contacto} 
      />

      {/* 5. SIDEBAR PARA AGENDAR CITA O PEDIR INFO */}
      {propiedadSeleccionada && (
        <SidebarContactoPropiedad 
          propiedad={propiedadSeleccionada} 
          telefonoAsesor={telefonoAsesor} 
          primaryColor={accentGold}
          onCancel={() => setPropiedadSeleccionada(null)}
        />
      )}
    </div>
  );
}