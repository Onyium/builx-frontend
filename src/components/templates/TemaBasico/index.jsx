import React, { useState } from 'react';

import Header from './Header';
import BarraFlotante from './BarraFlotante';
import Hero from './Hero';
import Intro from './Intro';
import InfoBooking from './InfoBooking'; // <-- NUEVO COMPONENTE
import CatalogoHabitaciones from './CatalogoHabitaciones';
import Footer from './Footer';
import SidebarReserva from './components/SidebarReserva';

export default function TemplateJagerhof({ config, items, empresa, paginaActual }) {
  const [itemSeleccionado, setItemSeleccionado] = useState(null);
  
  const { accentOrange, bgBeige } = config.theme;
  const telefonoHotel = config.contacto?.telefono || "50300000000"; 

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
      <Header config={config} empresa={empresa} getUrl={getUrl} />
      <BarraFlotante barraConfig={config.barra_flotante} color={accentOrange} />
      
      {itemSeleccionado && (
        <SidebarReserva 
          item={itemSeleccionado} 
          telefonoHotel={telefonoHotel} 
          primaryColor={accentOrange}
          onCancel={() => setItemSeleccionado(null)}
        />
      )}

      {/* 1. HERO */}
      <section id="hero" className="snap-start snap-always w-full h-screen relative">
        <Hero heroConfig={config.hero} />
      </section>

      {/* 2. INTRODUCCIÓN */}
      <section id="intro" className="snap-start snap-always w-full min-h-screen flex items-center justify-center relative">
        <Intro introConfig={config.seccion_intro} theme={config.theme} />
      </section>

      {/* 3. NUEVA SECCIÓN TIPO BOOKING (Integrada elegantemente) */}
      <section id="info_booking" className="snap-start snap-always w-full min-h-screen flex items-center justify-center relative py-24">
        <InfoBooking infoConfig={config.info_booking} theme={config.theme} />
      </section>

      {/* 4. CATÁLOGO DE HABITACIONES */}
      <section id="catalogo" className="snap-start w-full min-h-screen py-24 flex items-center relative">
        <CatalogoHabitaciones 
          items={items} 
          theme={config.theme}
          configCatalogo={config.catalogo} 
          onSelect={setItemSeleccionado} 
        />
      </section>

      {/* 5. FOOTER */}
      <section id="footer" className="snap-start snap-always w-full min-h-screen flex flex-col justify-end relative">
        <Footer 
          footerConfig={config.footer} 
          theme={config.theme} 
          contacto={config.contacto}
          getUrl={getUrl} 
        />
      </section>
    </div>
  );
}