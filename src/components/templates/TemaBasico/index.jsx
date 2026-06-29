import React, { useState } from 'react';

// --- COMPONENTES FIJOS ---
import Header from './Header';
import BarraFlotante from './BarraFlotante';

// --- SECCIONES (SCROLL PAGES) ---
import Hero from './Hero';
import Intro from './Intro';
import GaleriaInteractiva from './components/GaleriaInteractiva'; // <-- Importamos la galería
import InfoBooking from './InfoBooking'; 
import CatalogoHabitaciones from './CatalogoHabitaciones';
import Contacto from './contacto'; // <-- Importamos la nueva sección de Contacto
import Footer from './Footer';

// --- MICRO-COMPONENTES (MODALES Y LÓGICA) ---
import SidebarReserva from './components/SidebarReserva';

export default function TemplateJagerhof({ config, items, empresa, paginaActual }) {
  // Estado para controlar qué habitación se está reservando
  const [itemSeleccionado, setItemSeleccionado] = useState(null);
  
  // Extraemos variables globales del tema desde el JSON
  const { accentOrange, bgBeige } = config.theme;
  
  // Extraemos el teléfono dinámicamente del JSON para el botón de WhatsApp
  const telefonoHotel = config.contacto?.telefono || "+51 84 000 000"; 

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
      
      {/* SOLUCIÓN AL ERROR: Pasamos config, empresa y getUrl */}
      <Header config={config} empresa={empresa} getUrl={getUrl} />
      
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
      
      {/* SECCIÓN 1: Hero (id="hero") */}
      <section id="hero" className="snap-start snap-always w-full h-screen relative">
        <Hero heroConfig={config.hero} />
      </section>

      {/* SECCIÓN 2: Intro (id="intro") */}
      <section id="intro" className="snap-start snap-always w-full min-h-screen flex items-center justify-center relative">
        <Intro introConfig={config.seccion_intro} theme={config.theme} />
      </section>

      {/* SECCIÓN 3: Galería Interactiva (id="galeria") */}
      <section id="galeria" className="snap-start w-full min-h-screen flex items-center relative bg-white">
        {/* Usamos config.galeria_interactiva que definiste en tu JSON */}
        <GaleriaInteractiva galeriaConfig={config.galeria_interactiva} theme={config.theme} />
      </section>

      {/* SECCIÓN 4: Info Tipo Booking (id="info_booking") */}
      <section id="info_booking" className="snap-start snap-always w-full min-h-screen flex items-center justify-center relative py-24">
        <InfoBooking infoConfig={config.info_booking} theme={config.theme} />
      </section>

      {/* SECCIÓN 5: Catálogo de Habitaciones (id="catalogo") */}
      <section id="catalogo" className="snap-start w-full min-h-screen py-24 flex items-center relative">
        <CatalogoHabitaciones 
          items={items} 
          theme={config.theme}
          configCatalogo={config.catalogo} 
          onSelect={setItemSeleccionado} 
        />
      </section>

      {/* SECCIÓN 6: Contacto Visual (id="contacto") */}
      <section id="contacto" className="snap-start w-full min-h-screen relative">
        <Contacto contactoConfig={config.contacto} theme={config.theme} />
      </section>

      {/* SECCIÓN 7: Footer Simplificado (id="footer") */}
      <section id="footer" className="snap-start snap-always w-full flex flex-col justify-end relative">
        <Footer 
          footerConfig={config.footer} 
          theme={config.theme} 
          faq={config.faq} 
          getUrl={getUrl} 
        />
      </section>

    </div>
  );
}