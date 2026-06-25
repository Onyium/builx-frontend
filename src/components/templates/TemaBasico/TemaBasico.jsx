import React, { useState } from 'react';

// --- SUB-COMPONENTE: El Formulario Mágico de WhatsApp ---
// Lo dejamos aquí mismo para que no tengas que crear más archivos
const FormularioReserva = ({ item, telefonoHotel, primaryColor, onCancel }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [extras, setExtras] = useState({ almuerzo: false, transporte: false });

  const calcularNoches = () => {
    if (!checkIn || !checkOut) return 0;
    const dias = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    return dias > 0 ? dias : 0;
  };

  const noches = calcularNoches();
  const costoAlmuerzo = extras.almuerzo ? (10 * noches) : 0;
  const costoTransporte = extras.transporte ? 15 : 0;
  const total = (item.precio * noches) + costoAlmuerzo + costoTransporte;

  const enviarPorWhatsApp = () => {
    if (!checkIn || !checkOut) {
      alert("Por favor selecciona las fechas de tu estadía.");
      return;
    }
    let mensaje = `👋 Hola, vengo de la página web y quiero solicitar una reserva:\n\n`;
    mensaje += `🏨 *Habitación:* ${item.nombre}\n`;
    mensaje += `📅 *Check-in:* ${checkIn}\n`;
    mensaje += `📅 *Check-out:* ${checkOut} (${noches} noches)\n\n`;
    if (extras.almuerzo || extras.transporte) {
      mensaje += `✨ *Extras solicitados:*\n`;
      if (extras.almuerzo) mensaje += `- Almuerzos incluidos\n`;
      if (extras.transporte) mensaje += `- Transporte desde el aeropuerto\n`;
      mensaje += `\n`;
    }
    mensaje += `💰 *Total estimado:* $${total}\n\n`;
    mensaje += `¿Tienen disponibilidad para estas fechas?`;

    window.open(`https://wa.me/${telefonoHotel}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Llegada</label>
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Salida</label>
          <input type="date" value={checkOut} min={checkIn} onChange={(e) => setCheckOut(e.target.value)} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
        </div>
      </div>

      <div className="space-y-2 mb-5">
        <label className="flex items-center gap-3 text-sm cursor-pointer group">
          <input type="checkbox" checked={extras.almuerzo} onChange={(e) => setExtras({...extras, almuerzo: e.target.checked})} className="w-4 h-4 accent-blue-600" />
          <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Almuerzo incluido (+$10/noche)</span>
        </label>
        <label className="flex items-center gap-3 text-sm cursor-pointer group">
          <input type="checkbox" checked={extras.transporte} onChange={(e) => setExtras({...extras, transporte: e.target.checked})} className="w-4 h-4 accent-blue-600" />
          <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Transporte al aeropuerto (+$15)</span>
        </label>
      </div>

      <div className="flex justify-between items-end mb-5 bg-gray-50 p-3 rounded-lg">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total aprox:</span>
        <span className="font-black text-2xl text-gray-900">${total}</span>
      </div>

      <div className="flex gap-2">
        <button onClick={onCancel} className="px-4 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors text-sm">
          Cancelar
        </button>
        <button onClick={enviarPorWhatsApp} className="flex-1 py-3 rounded-xl font-bold text-white transition-transform active:scale-95 text-sm shadow-lg flex justify-center items-center gap-2" style={{ backgroundColor: '#25D366', shadowColor: 'rgba(37, 211, 102, 0.3)' }}>
          Reservar por WhatsApp
        </button>
      </div>
    </div>
  );
};


// --- COMPONENTE PRINCIPAL ---
export default function TemaBasico({ config, items }) {
    const [reservaActiva, setReservaActiva] = useState(null); // Controla qué tarjeta tiene el formulario abierto

    const { hotelIdentity, terminologia, contactChannels } = config;
    const isDark = hotelIdentity?.theme?.mode === 'dark';
    const primaryColor = hotelIdentity?.theme?.primaryAccent || '#342b2b';
    const secondaryColor = hotelIdentity?.theme?.secondaryAccent || '#f3f4f6';
    const telefonoHotel = contactChannels?.whatsapp?.phoneNumber || '';

    const tituloCatalogo = terminologia?.catalogo_plural || "Nuestro Catálogo";

    return (
        <div className={`font-sans min-h-screen selection:bg-blue-200 selection:text-blue-900 ${isDark ? 'text-gray-100 bg-[#0a0a0a]' : 'text-gray-800 bg-[#f8fafc]'}`}>
            
            {/* --- HEADER MINIMALISTA --- */}
            <header className="relative py-24 px-8 text-center overflow-hidden flex flex-col items-center justify-center min-h-[40vh]">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 z-10"></div>
                {config.modules?.heroSection?.backgroundImage ? (
                   <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${config.modules.heroSection.backgroundImage})` }} />
                ) : (
                   <div className="absolute inset-0" style={{ backgroundColor: primaryColor }} />
                )}
                
                <div className="relative z-20 max-w-3xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4 drop-shadow-lg">
                        {hotelIdentity?.name}
                    </h1>
                    <p className="text-lg md:text-2xl text-white/90 font-medium tracking-wide drop-shadow-md">
                        {hotelIdentity?.slogan}
                    </p>
                </div>
            </header>

            {/* --- CATÁLOGO --- */}
            <main className="max-w-6xl mx-auto p-6 md:p-12 -mt-10 relative z-30">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                        {tituloCatalogo}
                    </h2>
                    <div className="h-1 w-20 rounded-full" style={{ backgroundColor: primaryColor }}></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map(item => {
                        if (!item.esta_disponible) return null;

                        let detalles = {};
                        try { detalles = item.detalles_extra ? JSON.parse(item.detalles_extra) : {}; } 
                        catch (e) { console.warn("Error", e); }

                        const isReservaAbierta = reservaActiva === item.id;

                        return (
                            <div 
                                key={item.id} 
                                className="flex flex-col bg-white dark:bg-[#121212] rounded-[2rem] border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 overflow-hidden group"
                            >
                                {/* Imagen con zoom suave en hover */}
                                {item.imagen_url && (
                                    <div className="h-56 overflow-hidden relative bg-gray-100">
                                        <img 
                                            src={`https://builx-api.onrender.com${item.imagen_url}`} 
                                            alt={item.nombre} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {item.badge_oferta && (
                                           <span className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full tracking-widest uppercase shadow-lg">OFERTA</span>
                                        )}
                                    </div>
                                )}

                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start gap-4 mb-2">
                                        <h3 className="font-black text-2xl leading-tight text-gray-900 dark:text-white">{item.nombre}</h3>
                                    </div>
                                    
                                    <div className="flex items-baseline gap-2 mb-4">
                                        <p className="font-black text-3xl tracking-tighter" style={{ color: primaryColor }}>${item.precio}</p>
                                        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">/ noche</span>
                                    </div>

                                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                                        {item.descripcion}
                                    </p>

                                    {/* Detalles Extra (Diseño ultra limpio) */}
                                    {Object.keys(detalles).length > 0 && (
                                        <div className="mb-6 space-y-3">
                                            {Object.entries(detalles).map(([clave, valor]) => {
                                                if (Array.isArray(valor)) {
                                                    return (
                                                        <div key={clave} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl">
                                                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">{clave.replace(/_/g, ' ')}</span>
                                                            <ul className="text-sm space-y-1.5 text-gray-700 dark:text-gray-300">
                                                                {valor.map((v, i) => (
                                                                    <li key={i} className="flex items-center gap-2 font-medium">
                                                                        <span style={{ color: primaryColor }}>•</span> {v}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    );
                                                }
                                                return (
                                                    <div key={clave} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800/50 last:border-0">
                                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{clave.replace(/_/g, ' ')}</span>
                                                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{valor}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* CONTROLES DE RESERVA */}
                                    <div className="mt-auto">
                                        {!isReservaAbierta ? (
                                            <button 
                                                onClick={() => setReservaActiva(item.id)}
                                                className="w-full py-4 rounded-2xl font-black text-white transition-all hover:opacity-90 active:scale-95 shadow-lg"
                                                style={{ backgroundColor: primaryColor, shadowColor: `${primaryColor}40` }}
                                            >
                                                {config.modules?.heroSection?.ctaText || "Solicitar Disponibilidad"}
                                            </button>
                                        ) : (
                                            <FormularioReserva 
                                                item={item} 
                                                telefonoHotel={telefonoHotel} 
                                                primaryColor={primaryColor}
                                                onCancel={() => setReservaActiva(null)}
                                            />
                                        )}
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}