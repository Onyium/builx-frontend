import React, { useState } from 'react';

// --- COMPONENTES FIJOS ---
import Header from './Header';
import BarraFlotante from './BarraFlotante';

// --- SECCIONES (SCROLL PAGES) ---
import Hero from './Hero';
import Intro from './Intro';
import CatalogoHabitaciones from './CatalogoHabitaciones';
import Footer from './Footer';

// --- MICRO-COMPONENTES (MODALES Y LÓGICA) ---
import SidebarReserva from './components/SidebarReserva';

export default function TemplateJagerhof({ config, items, empresa, paginaActual }) {
  // Estado para controlar qué habitación se está reservando
  const [itemSeleccionado, setItemSeleccionado] = useState(null);
  
  // Extraemos variables globales del tema desde el JSON
  const { accentOrange, bgBeige } = config.theme;
  
  // Teléfono del hotel (en un entorno real, extraerías esto de config.contactChannels)
  const telefonoHotel = "50300000000"; 

  // FUNCIÓN CRÍTICA DE ENRUTAMIENTO (Regla estricta de BuilX)
  const getUrl = (ruta) => {
    const urlParams = new URLSearchParams(window.location.search);
    const isPreview = urlParams.get('preview') === 'true';
    return `/v/${empresa.slug}/${ruta}${isPreview ? '?preview=true' : ''}`;
  };

  return (
    <div 
      className="relative w-full h-screen overflow-y-auto snap-y snap-mandatory font-sans antialiased scroll-smooth"
      style={{ backgroundColor: bgBeige }}
    >
      {/* =========================================
          1. ELEMENTOS FIJOS (Superpuestos)
      ========================================= */}
      <Header empresa={empresa} getUrl={getUrl} />
      <BarraFlotante barraConfig={config.barra_flotante} color={accentOrange} />
      
      {/* Modal / Sidebar de Reserva Condicional */}
      {itemSeleccionado && (
        <SidebarReserva 
          item={itemSeleccionado} 
          telefonoHotel={telefonoHotel} 
          primaryColor={accentOrange}
          onCancel={() => setItemSeleccionado(null)}
        />
      )}

      {/* =========================================
          2. SECCIONES CON SCROLL SNAP
      ========================================= */}
      
      {/* SECCIÓN 1: Hero (Ocupa exactamente 100vh) */}
      <section className="snap-start snap-always w-full h-screen relative">
        <Hero heroConfig={config.hero} />
      </section>

      {/* SECCIÓN 2: Intro (Ocupa mínimo 100vh) */}
      <section className="snap-start snap-always w-full min-h-screen flex items-center justify-center relative">
        <Intro introConfig={config.seccion_intro} theme={config.theme} />
      </section>

      {/* SECCIÓN 3: Catálogo de Habitaciones */}
      <section className="snap-start w-full min-h-screen py-24 flex items-center relative">
        <CatalogoHabitaciones 
          items={items} 
          theme={config.theme}
          configCatalogo={config.catalogo} 
          onSelect={setItemSeleccionado} 
        />
      </section>

      {/* SECCIÓN 4: Footer */}
      <section className="snap-start snap-always w-full h-screen flex flex-col justify-end relative">
        <Footer footerConfig={config.footer} theme={config.theme} getUrl={getUrl} />
      </section>

    </div>
  );
}