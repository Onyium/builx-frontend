import React, { useState, useEffect } from 'react';

// --- SUB-COMPONENTE: El Panel Lateral (Drawer) de WhatsApp ---
const SidebarReserva = ({ item, telefonoHotel, primaryColor, onCancel }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [extras, setExtras] = useState({ almuerzo: false, transporte: false, spa: false });

  // Bloquear el scroll del fondo cuando el panel está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const calcularNoches = () => {
    if (!checkIn || !checkOut) return 0;
    const dias = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    return dias > 0 ? dias : 0;
  };

  const noches = calcularNoches();
  const costoAlmuerzo = extras.almuerzo ? (10 * noches) : 0;
  const costoTransporte = extras.transporte ? 15 : 0;
  const costoSpa = extras.spa ? 40 : 0; // Ejemplo de un extra más caro
  const total = (item.precio * noches) + costoAlmuerzo + costoTransporte + costoSpa;

  const enviarPorWhatsApp = () => {
    if (!checkIn || !checkOut) {
      alert("Por favor selecciona las fechas de tu estadía.");
      return;
    }
    let mensaje = `👋 Hola, vengo de la página web y quiero solicitar una reserva:\n\n`;
    mensaje += `🏨 *Habitación:* ${item.nombre}\n`;
    mensaje += `📅 *Check-in:* ${checkIn}\n`;
    mensaje += `📅 *Check-out:* ${checkOut} (${noches} noches)\n\n`;
    if (extras.almuerzo || extras.transporte || extras.spa) {
      mensaje += `✨ *Extras solicitados:*\n`;
      if (extras.almuerzo) mensaje += `- Almuerzos incluidos\n`;
      if (extras.transporte) mensaje += `- Transporte al aeropuerto\n`;
      if (extras.spa) mensaje += `- Sesión de Spa\n`;
      mensaje += `\n`;
    }
    mensaje += `💰 *Total estimado:* $${total}\n\n`;
    mensaje += `¿Tienen disponibilidad para estas fechas?`;

    window.open(`https://wa.me/${telefonoHotel}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  let detalles = {};
  try { detalles = item.detalles_extra ? JSON.parse(item.detalles_extra) : {}; } 
  catch (e) { }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Fondo oscuro con blur (Overlay) */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      ></div>

      {/* El Panel que desliza desde la derecha */}
      <div className="relative w-full max-w-md h-full bg-white dark:bg-[#121212] shadow-2xl flex flex-col animate-slide-left overflow-y-auto">
        
        {/* Header del Panel */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center sticky top-0 bg-white/90 dark:bg-[#121212]/90 backdrop-blur-md z-10">
          <h3 className="font-black text-xl text-gray-900 dark:text-white">Configurar Estadía</h3>
          <button onClick={onCancel} className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 hover:bg-gray-200 transition-colors font-bold">
            ✕
          </button>
        </div>

        {/* Contenido del Panel */}
        <div className="p-6 flex-1">
          {/* Info de la habitación seleccionada */}
          <div className="mb-8">
            {item.imagen_url && (
              <img src={`https://builx-api.onrender.com${item.imagen_url}`} alt={item.nombre} className="w-full h-40 object-cover rounded-2xl mb-4 shadow-sm" />
            )}
            <h4 className="font-black text-2xl text-gray-900 dark:text-white mb-2">{item.nombre}</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{item.descripcion}</p>
          </div>

          <div className="h-px w-full bg-gray-100 dark:bg-gray-800 mb-8"></div>

          {/* Calendario */}
          <h5 className="font-black text-lg mb-4 text-gray-900 dark:text-white">Fechas</h5>
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Llegada</label>
              <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Salida</label>
              <input type="date" value={checkOut} min={checkIn} onChange={(e) => setCheckOut(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white" />
            </div>
          </div>

          {/* Servicios Extra */}
          <h5 className="font-black text-lg mb-4 text-gray-900 dark:text-white">Añadir Servicios</h5>
          <div className="space-y-3 mb-8">
            <label className="flex items-center gap-3 p-4 border border-gray-100 dark:border-gray-800 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <input type="checkbox" checked={extras.almuerzo} onChange={(e) => setExtras({...extras, almuerzo: e.target.checked})} className="w-5 h-5 accent-blue-600" />
              <div className="flex-1 text-sm font-bold text-gray-700 dark:text-gray-300">Almuerzo incluido</div>
              <div className="text-sm font-black text-gray-500">+$10/día</div>
            </label>
            <label className="flex items-center gap-3 p-4 border border-gray-100 dark:border-gray-800 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <input type="checkbox" checked={extras.transporte} onChange={(e) => setExtras({...extras, transporte: e.target.checked})} className="w-5 h-5 accent-blue-600" />
              <div className="flex-1 text-sm font-bold text-gray-700 dark:text-gray-300">Transporte al aeropuerto</div>
              <div className="text-sm font-black text-gray-500">+$15</div>
            </label>
            <label className="flex items-center gap-3 p-4 border border-gray-100 dark:border-gray-800 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <input type="checkbox" checked={extras.spa} onChange={(e) => setExtras({...extras, spa: e.target.checked})} className="w-5 h-5 accent-blue-600" />
              <div className="flex-1 text-sm font-bold text-gray-700 dark:text-gray-300">Acceso VIP al Spa</div>
              <div className="text-sm font-black text-gray-500">+$40</div>
            </label>
          </div>
        </div>

        {/* Footer del Panel (Fijo abajo) */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#121212] sticky bottom-0">
          <div className="flex justify-between items-end mb-4">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Estimado</span>
            <span className="font-black text-3xl text-gray-900 dark:text-white">${total}</span>
          </div>
          <button onClick={enviarPorWhatsApp} className="w-full py-4 rounded-xl font-black text-white transition-transform active:scale-95 shadow-xl flex justify-center items-center gap-3 text-lg" style={{ backgroundColor: '#25D366' }}>
            Reservar por WhatsApp
          </button>
        </div>

      </div>
    </div>
  );
};


// --- COMPONENTE PRINCIPAL ---
export default function TemaBasico({ config, items }) {
    // 🚀 Ahora guardamos el objeto COMPLETO del ítem para mandarlo al Sidebar
    const [itemSeleccionado, setItemSeleccionado] = useState(null); 

    const { hotelIdentity, terminologia, contactChannels } = config;
    const isDark = hotelIdentity?.theme?.mode === 'dark';
    const primaryColor = hotelIdentity?.theme?.primaryAccent || '#000000';
    const secondaryColor = hotelIdentity?.theme?.secondaryAccent || '#f3f4f6';
    const telefonoHotel = contactChannels?.whatsapp?.phoneNumber || '';

    const tituloCatalogo = terminologia?.catalogo_plural || "Nuestro Catálogo";

    return (
        <div className={`font-sans min-h-screen selection:bg-blue-200 selection:text-blue-900 ${isDark ? 'text-gray-100 bg-[#0a0a0a]' : 'text-gray-800 bg-[#f8fafc]'}`}>
            
            {/* Si hay un ítem seleccionado, renderizamos el panel flotante encima de todo */}
            {itemSeleccionado && (
              <SidebarReserva 
                item={itemSeleccionado} 
                telefonoHotel={telefonoHotel} 
                primaryColor={primaryColor}
                onCancel={() => setItemSeleccionado(null)}
              />
            )}

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
                        catch (e) { }

                        return (
                            <div 
                                key={item.id} 
                                className="flex flex-col bg-white dark:bg-[#121212] rounded-[2rem] border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 overflow-hidden group"
                            >
                                {/* Imagen con zoom suave */}
                                {item.imagen_url && (
                                    <div className="h-56 overflow-hidden relative bg-gray-100">
                                        <img 
                                            src={`https://builx-api.onrender.com${item.imagen_url}`} 
                                            alt={item.nombre} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                )}

                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="font-black text-2xl leading-tight text-gray-900 dark:text-white mb-2">{item.nombre}</h3>
                                    
                                    <div className="flex items-baseline gap-2 mb-4">
                                        <p className="font-black text-3xl tracking-tighter" style={{ color: primaryColor }}>${item.precio}</p>
                                        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">/ noche</span>
                                    </div>

                                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {item.descripcion}
                                    </p>

                                    {/* Detalles Extra Resumidos */}
                                    {Object.keys(detalles).length > 0 && (
                                        <div className="mb-8 space-y-3">
                                            {Object.entries(detalles).map(([clave, valor]) => {
                                                if (!Array.isArray(valor)) {
                                                    return (
                                                        <div key={clave} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800/50 last:border-0">
                                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{clave.replace(/_/g, ' ')}</span>
                                                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{valor}</span>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>
                                    )}

                                    {/* BOTÓN LIMPIO QUE ABRE EL PANEL LATERAL */}
                                    <div className="mt-auto">
                                        <button 
                                            onClick={() => setItemSeleccionado(item)}
                                            className="w-full py-4 rounded-2xl font-black text-white transition-all hover:opacity-90 active:scale-95 shadow-lg flex justify-center items-center gap-2"
                                            style={{ backgroundColor: primaryColor, shadowColor: `${primaryColor}40` }}
                                        >
                                            {config.modules?.heroSection?.ctaText || "Solicitar Disponibilidad"}
                                        </button>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Necesitas agregar esta clase a tu archivo CSS global (ej. index.css) para que la animación funcione:
            @keyframes slide-left {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
            .animate-slide-left {
              animation: slide-left 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            */}
        </div>
    );
}