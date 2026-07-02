import React, { useState } from 'react';

// --- COMPONENTES FIJOS ---
import Header from './Header';
import BarraFlotante from './BarraFlotante';

// --- SECCIONES (SCROLL PAGES) ---
import Hero from './Hero';
import Intro from './Intro';
import GaleriaInteractiva from './GaleriaInteractiva';
import InfoBooking from './InfoBooking'; 
import CatalogoHabitaciones from './CatalogoHabitaciones';
import Contacto from './contacto'; 
import Footer from './Footer';

// --- MICRO-COMPONENTES (MODALES Y LÓGICA) ---
import SidebarReserva from './components/SidebarReserva';

export default function TemplateJagerhof({ config, items, empresa, paginaActual }) {
  // =========================================
  // 🚀 ESTADO DEL IDIOMA (El Interruptor Maestro)
  // =========================================
  const [idioma, setIdioma] = useState('es'); // Por defecto en español

  // Extraemos SOLO la parte del JSON que corresponde al idioma seleccionado.
  // El "|| config" al final es un escudo por si alguna vez le pasas un JSON viejo que no tenga "es" ni "en".
  const datosIdioma = config[idioma] || config.es || config;

  // Estado para controlar qué habitación se está reservando
  const [itemSeleccionado, setItemSeleccionado] = useState(null);
  
  // Extraemos variables globales del tema desde los datos del idioma actual
  // Le ponemos valores por defecto porsiacaso para blindar la app de errores
  const { accentOrange = "#7e3547", bgBeige = "#f2efe9" } = datosIdioma.theme || {};
  
  // Extraemos el teléfono dinámicamente del JSON para el botón de WhatsApp
  const telefonoHotel = datosIdioma.contacto?.telefono || "+51 84 000 000"; 

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
      
      {/* 
        Le pasamos "datosIdioma" en vez de config entero para que el Header cambie su texto.
        También le pasamos el estado "idioma" y "setIdioma" para que el botón de la barra de navegación pueda cambiar el idioma general.
      */}
      <Header 
        config={datosIdioma} 
        empresa={empresa} 
        getUrl={getUrl} 
        idiomaActual={idioma} 
        cambiarIdioma={setIdioma} 
      />
      
      <BarraFlotante barraConfig={datosIdioma.barra_flotante} color={accentOrange} />
      
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
        <Hero heroConfig={datosIdioma.hero} />
      </section>

      {/* SECCIÓN 2: Intro (id="intro") */}
      <section id="intro" className="snap-start snap-always w-full min-h-screen flex items-center justify-center relative">
        <Intro introConfig={datosIdioma.seccion_intro} theme={datosIdioma.theme} />
      </section>

      {/* SECCIÓN 3: Galería Interactiva (id="galeria") */}
      <section id="galeria" className="snap-start w-full min-h-screen flex items-center relative bg-white">
        <GaleriaInteractiva galeriaConfig={datosIdioma.galeria_interactiva} theme={datosIdioma.theme} />
      </section>

      {/* SECCIÓN 4: Info Tipo Booking (id="info_booking") */}
      <section id="info_booking" className="snap-start snap-always w-full min-h-screen flex items-center justify-center relative py-24">
        <InfoBooking infoConfig={datosIdioma.info_booking} theme={datosIdioma.theme} />
      </section>

      {/* SECCIÓN 5: Catálogo de Habitaciones (id="catalogo") */}
      {/* 
        ¡Aquí está la solución definitiva al error del color! 
        Ya le estamos pasando datosIdioma.theme de forma correcta. 
      */}
      <section id="catalogo" className="snap-start w-full min-h-screen flex items-center relative">
        <CatalogoHabitaciones 
          items={items} 
          theme={datosIdioma.theme}
          configCatalogo={datosIdioma.catalogo} 
          onSelect={setItemSeleccionado} 
        />
      </section>

      {/* SECCIÓN 6: Contacto Visual (id="contacto") */}
      <section id="contacto" className="snap-start w-full min-h-screen relative">
        <Contacto contactoConfig={datosIdioma.contacto} theme={datosIdioma.theme} />
      </section>

      {/* SECCIÓN 7: Footer Simplificado (id="footer") */}
      <section id="footer" className="snap-start snap-always w-full flex flex-col justify-end relative">
        <Footer 
          footerConfig={datosIdioma.footer} 
          theme={datosIdioma.theme} 
          faq={datosIdioma.faq} 
          getUrl={getUrl} 
        />
      </section>

    </div>
  );
}