import React, { useState } from 'react';

// Importación de tus micro-componentes (asegúrate de crear estos archivos en tu carpeta)
import Header from './Header';
import Hero from './Hero';
import Intro from './Intro';
import CatalogoHabitaciones from './CatalogoHabitaciones';
import Footer from './Footer';
import BarraFlotante from './BarraFlotante';
import SidebarReserva from './components/SidebarReserva';

export default function TemplateJagerhof({ config, items, empresa, paginaActual }) {
  // Estado para controlar qué habitación se está reservando
  const [itemSeleccionado, setItemSeleccionado] = useState(null);
  
  // Extraemos variables globales del tema desde el JSON
  const { accentOrange, bgBeige } = config.theme;
  
  // Idealmente esto viene de config.contactChannels, lo dejamos por defecto para la demo
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
      {/* ELEMENTOS FIJOS (Superpuestos, no se ven afectados por el scroll snap)
      */}
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

      {/* SECCIONES CON SCROLL SNAP (Cada section actúa como una "página" completa)
      */}
      
      {/* SECCIÓN 1: Hero (Ocupa exactamente 100vh) */}
      <section className="snap-start snap-always w-full h-screen relative">
        <Hero heroConfig={config.hero} />
      </section>

      {/* SECCIÓN 2: Intro (Ocupa mínimo 100vh, permite crecer si el texto es muy largo) */}
      <section className="snap-start snap-always w-full min-h-screen flex items-center justify-center relative">
        <Intro introConfig={config.seccion_intro} theme={config.theme} />
      </section>

      {/* SECCIÓN 3: Catálogo de Habitaciones (Requiere espacio para el grid de items) */}
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