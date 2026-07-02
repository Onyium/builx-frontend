import React, { useState, useEffect } from 'react';

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
  const datosIdioma = config[idioma] || config.es || config;

  // Estado para controlar qué habitación se está reservando
  const [itemSeleccionado, setItemSeleccionado] = useState(null);
  
  // Extraemos variables globales del tema desde los datos del idioma actual
  const { accentOrange = "#7e3547", bgBeige = "#f2efe9" } = datosIdioma.theme || {};
  
  // Extraemos el teléfono dinámicamente del JSON para el botón de WhatsApp
  const telefonoHotel = datosIdioma.contacto?.telefono || "+51 84 000 000"; 

  // FUNCIÓN CRÍTICA DE ENRUTAMIENTO (Regla estricta de BuilX)
  const getUrl = (ruta) => {
    const urlParams = new URLSearchParams(window.location.search);
    const isPreview = urlParams.get('preview') === 'true';
    return `/v/${empresa.slug}/${ruta}${isPreview ? '?preview=true' : ''}`;
  };

  // =========================================
  // 🚀 MAGIA: CAMBIAR FAVICON Y TÍTULO DINÁMICAMENTE
  // =========================================
  useEffect(() => {
    // 1. Cambiamos el título de la pestaña dinámicamente
    document.title = datosIdioma.nav?.logo_text || empresa.nombre || "Catálogo";

    // 2. Buscamos la etiqueta <link rel="icon"> en el HTML
    let link = document.querySelector("link[rel~='icon']");
    
    // Si por alguna razón no existe, la creamos al vuelo
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    // 3. Le inyectamos el logo del cliente. 
    // Busca en la raíz del config primero, y si no, en el idioma, con fallback a favicon.svg
    link.href = config.logo_url || datosIdioma.logo_url || '/favicon.svg';
    
  }, [datosIdioma, empresa, config]);

  return (
    <div 
      className="relative w-full h-screen overflow-y-auto snap-y snap-mandatory font-sans antialiased scroll-smooth"
      style={{ backgroundColor: bgBeige }}
    >
      {/* =========================================
          1. ELEMENTOS FIJOS (Superpuestos)
      ========================================= */}
      
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