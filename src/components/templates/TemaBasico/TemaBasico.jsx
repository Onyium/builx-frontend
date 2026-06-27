import React, { useState, useEffect } from 'react';

// 🚀 FILTRO DE IMÁGENES (BuilX Core)
const formatearUrlPublica = (rawUrl) => {
  if (!rawUrl) return 'https://via.placeholder.com/600x400?text=Sin+Imagen';
  const BACKEND_URL = "https://builx-api.onrender.com";
  let limpia = String(rawUrl).replace(/[\[\]"'\\]/g, '').trim();
  if (limpia.includes('cloudinary.com')) {
    const posicionRealHttp = limpia.lastIndexOf('http');
    if (posicionRealHttp !== -1) limpia = limpia.substring(posicionRealHttp); 
  }
  limpia = limpia.replace('https//', 'https://').replace('http//', 'http://');
  if (limpia.startsWith('http')) return limpia; 
  return limpia.startsWith('/') ? `${BACKEND_URL}${limpia}` : `${BACKEND_URL}/${limpia}`;
};

// 🚀 GALERÍA PÚBLICA (Estilizada para el tema boutique)
const GaleriaPublica = ({ imagenes, nombre }) => {
  const [indiceActual, setIndiceActual] = useState(0);

  const siguienteImagen = (e) => {
    e.stopPropagation(); 
    setIndiceActual((prev) => (prev + 1 === imagenes.length ? 0 : prev + 1));
  };

  const anteriorImagen = (e) => {
    e.stopPropagation();
    setIndiceActual((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-full group/slider overflow-hidden">
      <img 
        src={imagenes[indiceActual]} 
        alt={`${nombre}-${indiceActual}`} 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover/slider:scale-105" 
      />
      {imagenes.length > 1 && (
        <>
          <button onClick={anteriorImagen} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 text-gray-900 p-2 rounded-full shadow-lg z-10 transition-all active:scale-90 opacity-0 group-hover/slider:opacity-100 hover:bg-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={siguienteImagen} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 text-gray-900 p-2 rounded-full shadow-lg z-10 transition-all active:scale-90 opacity-0 group-hover/slider:opacity-100 hover:bg-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {imagenes.map((_, i) => (
              <div key={i} className={`h-1.5 w-1.5 rounded-full transition-all ${i === indiceActual ? 'bg-white scale-125' : 'bg-white/50'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// 🚀 CALENDARIO (Adaptado al color de acento del tema)
const CalendarioPremium = ({ checkIn, checkOut, setCheckIn, setCheckOut, primaryColor }) => {
  const [fechaVista, setFechaVista] = useState(new Date());
  const diasSemana = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const obtenerDiasDelMes = (año, mes) => new Date(año, mes + 1, 0).getDate();
  const obtenerPrimerDiaDelMes = (año, mes) => new Date(año, mes, 1).getDay();

  const añoActual = fechaVista.getFullYear();
  const mesActual = fechaVista.getMonth();
  const diasEnMes = obtenerDiasDelMes(añoActual, mesActual);
  const primerDia = obtenerPrimerDiaDelMes(añoActual, mesActual);

  const handleSeleccionDia = (dia) => {
    const fecha = new Date(añoActual, mesActual, dia).toISOString().split('T')[0];
    const hoy = new Date().toISOString().split('T')[0];
    if (fecha < hoy) return; 

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(fecha); setCheckOut('');
    } else if (fecha > checkIn) {
      setCheckOut(fecha);
    } else {
      setCheckIn(fecha); setCheckOut('');
    }
  };

  const cuadricula = Array(primerDia).fill(null).concat(Array.from({length: diasEnMes}, (_, i) => i + 1));

  return (
    <div className="bg-white p-5 rounded-none border border-gray-200 shadow-sm w-full select-none font-sans">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => setFechaVista(new Date(añoActual, mesActual - 1, 1))} className="p-2 hover:bg-gray-50 transition-colors rounded-full">
           <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <span className="font-serif text-lg text-gray-900 tracking-wide">{meses[mesActual]} {añoActual}</span>
        <button onClick={() => setFechaVista(new Date(añoActual, mesActual + 1, 1))} className="p-2 hover:bg-gray-50 transition-colors rounded-full">
           <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-3 text-center">
        {diasSemana.map(dia => <div key={dia} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{dia}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {cuadricula.map((dia, index) => {
          if (!dia) return <div key={index} className="h-10"></div>;
          const fechaActual = new Date(añoActual, mesActual, dia).toISOString().split('T')[0];
          const hoy = new Date().toISOString().split('T')[0];
          const esPasado = fechaActual < hoy;
          const esCheckIn = fechaActual === checkIn;
          const esCheckOut = fechaActual === checkOut;
          const esRango = checkIn && checkOut && fechaActual > checkIn && fechaActual < checkOut;

          let estilos = { className: "h-10 w-full flex items-center justify-center text-sm transition-all cursor-pointer rounded-full " };
          
          if (esPasado) estilos.className += "text-gray-300 cursor-not-allowed";
          else if (esCheckIn || esCheckOut) estilos.className += "text-white font-bold shadow-md transform scale-105";
          else if (esRango) estilos.className += "bg-orange-50 text-orange-900 rounded-none";
          else estilos.className += "text-gray-700 hover:bg-gray-100";

          return (
            <div key={index} onClick={() => handleSeleccionDia(dia)} className={estilos.className} style={(esCheckIn || esCheckOut) ? { backgroundColor: primaryColor } : {}}>
              {dia}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 🚀 SIDEBAR RESERVA (Diseño limpio y editorial)
const SidebarReserva = ({ item, telefonoHotel, primaryColor, onCancel }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [extras, setExtras] = useState({ desayuno: false, transporte: false });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const noches = (!checkIn || !checkOut) ? 0 : Math.max(0, Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000));
  const total = (item.precio * noches) + (extras.desayuno ? 15 * noches : 0) + (extras.transporte ? 30 : 0);

  const enviarWhatsApp = () => {
    if (!checkIn || !checkOut) return alert("Por favor selecciona tus fechas.");
    const msj = `Hola, quiero reservar:\n🏨 ${item.nombre}\n📅 Check-in: ${checkIn}\n📅 Check-out: ${checkOut}\n💰 Total aprox: $${total}\n¿Tienen disponibilidad?`;
    window.open(`https://wa.me/${telefonoHotel}?text=${encodeURIComponent(msj)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onCancel}></div>
      <div className="relative w-full max-w-md h-full bg-[#f2efe9] shadow-2xl flex flex-col animate-[slideIn_0.3s_ease-out] overflow-y-auto">
        <div className="p-6 border-b border-gray-300 flex justify-between items-center sticky top-0 bg-[#f2efe9]/90 backdrop-blur-md z-10">
          <h3 className="font-serif text-2xl text-[#2b4535]">Reservar</h3>
          <button onClick={onCancel} className="text-gray-500 hover:text-black transition-colors text-xl">✕</button>
        </div>
        
        <div className="p-6 flex-1 font-sans text-gray-800">
          <div className="mb-8">
            {item.imagen_url && <img src={formatearUrlPublica(item.imagen_url)} alt={item.nombre} className="w-full h-48 object-cover mb-4 rounded-sm shadow-sm" />}
            <h4 className="font-serif text-3xl mb-2 text-[#2b4535]">{item.nombre}</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{item.descripcion}</p>
          </div>
          
          <h5 className="font-serif text-xl mb-4 text-[#2b4535]">Fechas de Estadía</h5>
          <div className="mb-8"><CalendarioPremium checkIn={checkIn} checkOut={checkOut} setCheckIn={setCheckIn} setCheckOut={setCheckOut} primaryColor={primaryColor} /></div>
          
          <h5 className="font-serif text-xl mb-4 text-[#2b4535]">Extras</h5>
          <div className="space-y-3 mb-8">
            {/* Opciones de extras simplificadas visualmente */}
            <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 cursor-pointer hover:border-gray-400 transition-colors">
              <input type="checkbox" checked={extras.desayuno} onChange={(e) => setExtras({...extras, desayuno: e.target.checked})} className="w-4 h-4 accent-[#d16b47]" />
              <div className="flex-1 text-sm font-medium">Desayuno Alpino</div><div className="text-sm text-gray-500">+$15/día</div>
            </label>
            <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 cursor-pointer hover:border-gray-400 transition-colors">
              <input type="checkbox" checked={extras.transporte} onChange={(e) => setExtras({...extras, transporte: e.target.checked})} className="w-4 h-4 accent-[#d16b47]" />
              <div className="flex-1 text-sm font-medium">Transfer Aeropuerto</div><div className="text-sm text-gray-500">+$30</div>
            </label>
          </div>
        </div>
        
        <div className="p-6 bg-white border-t border-gray-200 sticky bottom-0">
          <div className="flex justify-between items-end mb-4">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Estimado</span>
            <span className="font-serif text-3xl text-[#2b4535]">${total}</span>
          </div>
          <button onClick={enviarWhatsApp} className="w-full py-4 font-bold text-white transition-transform active:scale-95 shadow-md flex justify-center items-center gap-2" style={{ backgroundColor: primaryColor }}>
            Confirmar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

// 🚀 COMPONENTE PRINCIPAL (Orquestador)
export default function PlantillaJagerhof({ config, items, empresa }) {
  const [itemSeleccionado, setItemSeleccionado] = useState(null);
  
  // Variables del Theme desde config
  const { bgGreen, bgBeige, accentOrange, textLight, textDark } = config.theme;
  const telefonoHotel = "50300000000"; // Debería venir de config.contactChannels

  return (
    <div className="relative w-full font-sans antialiased pb-24 bg-[#f2efe9]">
      
      {/* Sidebar Overlay Condicional */}
      {itemSeleccionado && (
        <SidebarReserva 
          item={itemSeleccionado} 
          telefonoHotel={telefonoHotel} 
          primaryColor={accentOrange}
          onCancel={() => setItemSeleccionado(null)}
        />
      )}

      {/* HEADER TRANSPARENTE */}
      <header className="absolute top-0 left-0 w-full z-40 p-6 flex justify-between items-center text-white">
        <div className="text-2xl font-serif tracking-widest uppercase">{empresa?.nombre || "Jägerhof"}</div>
        <button aria-label="Menu" className="space-y-2">
          <div className="w-8 h-px bg-white"></div>
          <div className="w-8 h-px bg-white"></div>
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="relative w-full h-[85vh] min-h-[600px]">
        <img src={config.hero.fondo_url} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 w-full h-full flex flex-col justify-center px-8 max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-8">
            <span className="block font-light">{config.hero.titulo_principal}</span>
            <span className="block font-serif italic text-4xl md:text-6xl mt-2">{config.hero.titulo_cursiva}</span>
          </h1>
        </div>
      </section>

      {/* SECCIÓN INTRO VERDE */}
      <section className="w-full px-6 py-24 relative" style={{ backgroundColor: bgGreen, color: textLight }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-widest uppercase mb-8 font-semibold opacity-80">{config.seccion_intro.etiqueta}</p>
          <h2 className="text-3xl md:text-5xl font-serif leading-tight">{config.seccion_intro.texto_gigante}</h2>
        </div>
      </section>

      {/* CATÁLOGO DE HABITACIONES (Integración de `items` con estilo Jägerhof) */}
      <section className="w-full px-6 py-24" style={{ backgroundColor: bgBeige, color: textDark }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-[#2b4535]">Nuestras Habitaciones</h2>
            <div className="w-16 h-px mx-auto mt-6" style={{ backgroundColor: accentOrange }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {items.map(item => {
              if (!item.esta_disponible) return null;
              
              let imagenes = (item.todasLasFotos?.length > 0) 
                ? item.todasLasFotos.map(formatearUrlPublica) 
                : [formatearUrlPublica(item.imagen_url)];

              return (
                <article key={item.id} className="group flex flex-col bg-white border border-gray-200 transition-all duration-500 hover:shadow-xl">
                  {/* Galería Integrada */}
                  <div className="h-72 w-full overflow-hidden relative bg-gray-100">
                    <GaleriaPublica imagenes={imagenes} nombre={item.nombre} />
                  </div>
                  
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="font-serif text-2xl mb-3 text-[#2b4535]">{item.nombre}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">{item.descripcion}</p>
                    
                    <div className="mt-auto flex justify-between items-center pt-6 border-t border-gray-100">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase tracking-widest">Desde</span>
                        <span className="font-serif text-2xl text-[#2b4535]">${item.precio}</span>
                      </div>
                      
                      {/* Botón que dispara el Sidebar */}
                      <button 
                        onClick={() => setItemSeleccionado(item)}
                        className="px-6 py-2.5 text-white text-sm font-medium transition-transform active:scale-95"
                        style={{ backgroundColor: accentOrange }}
                      >
                        Verfügbarkeit
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full px-6 py-24 text-center border-t border-gray-200" style={{ backgroundColor: bgBeige, color: textDark }}>
         <h2 className="text-4xl md:text-5xl font-serif mb-8 text-[#2b4535]">
           {config.footer.frase_final} <br/><span className="italic">{config.footer.frase_cursiva}</span>
         </h2>
      </footer>

      {/* BARRA FLOTANTE INFERIOR */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex justify-between items-center bg-white/95 backdrop-blur-md rounded-full p-2 pr-2 shadow-2xl border border-gray-200 w-[90%] max-w-md">
        <div className="flex items-center space-x-3 px-4">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          <span className="text-gray-600 font-medium text-sm">{config.barra_flotante.temporada}</span>
        </div>
        <button 
          onClick={() => window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' })}
          className="px-6 py-3 rounded-full text-white font-bold text-sm shadow-md transition-transform active:scale-95"
          style={{ backgroundColor: accentOrange }}
        >
          {config.barra_flotante.btn_texto}
        </button>
      </div>

    </div>
  );
}