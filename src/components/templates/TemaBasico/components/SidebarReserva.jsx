import React, { useState, useEffect } from 'react';
import CalendarioPremium from './CalendarioPremium';
import { formatearUrlPublica } from './UtilidadesCatalogo';

export default function SidebarReserva({ item, telefonoHotel, primaryColor, onCancel }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [extras, setExtras] = useState({ desayuno: false, transporte: false });
  
  // 🚀 ESTADO PARA EL CARRUSEL DE IMÁGENES
  const [indiceActual, setIndiceActual] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  // === LÓGICA DE EXTRACCIÓN DE FOTOS (Igual que en tu ItemCard) ===
  let imagenes = [];
  if (item.todasLasFotos && Array.isArray(item.todasLasFotos) && item.todasLasFotos.length > 0) {
    imagenes = item.todasLasFotos.map(foto => formatearUrlPublica(foto));
  } else if (item.imagen_url) {
    imagenes = [formatearUrlPublica(item.imagen_url)];
  }

  const siguienteImagen = (e) => {
    e.stopPropagation(); 
    setIndiceActual((prev) => (prev + 1 >= imagenes.length ? 0 : prev + 1));
  };

  const anteriorImagen = (e) => {
    e.stopPropagation();
    setIndiceActual((prev) => (prev === 0 ? Math.max(0, imagenes.length - 1) : prev - 1));
  };

  const indiceSeguro = indiceActual >= imagenes.length ? 0 : indiceActual;
  // =================================================================

  const calcularNoches = () => {
    if (!checkIn || !checkOut) return 0;
    const dias = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    return dias > 0 ? dias : 0;
  };

  const noches = calcularNoches();
  const costoDesayuno = extras.desayuno ? (15 * noches) : 0;
  const costoTransporte = extras.transporte ? 30 : 0;
  const total = (item.precio * noches) + costoDesayuno + costoTransporte;

  const enviarPorWhatsApp = () => {
    if (!checkIn || !checkOut) {
      alert("Por favor selecciona las fechas de tu estadía.");
      return;
    }
    let mensaje = `👋 Hola, vengo de la página web y quiero solicitar una reserva:\n\n`;
    mensaje += `🏨 *Habitación:* ${item.nombre}\n`;
    mensaje += `📅 *Check-in:* ${checkIn}\n`;
    mensaje += `📅 *Check-out:* ${checkOut} (${noches} noches)\n\n`;
    if (extras.desayuno || extras.transporte) {
      mensaje += `✨ *Extras solicitados:*\n`;
      if (extras.desayuno) mensaje += `- Desayuno Alpino incluido\n`;
      if (extras.transporte) mensaje += `- Transfer Aeropuerto\n`;
      mensaje += `\n`;
    }
    mensaje += `💰 *Total estimado:* $${total}\n\n`;
    mensaje += `¿Tienen disponibilidad para estas fechas?`;

    window.open(`https://wa.me/${telefonoHotel}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onCancel}></div>
      
      <div className="relative w-full max-w-md h-[100dvh] bg-[#f2efe9] shadow-2xl flex flex-col">
        
        {/* HEADER */}
        <div className="shrink-0 p-6 border-b border-gray-300 flex justify-between items-center bg-[#f2efe9] z-20">
          <h3 className="font-serif text-2xl text-[#2b4535]">Reservar</h3>
          <button onClick={onCancel} className="text-gray-500 hover:text-black transition-colors text-xl">✕</button>
        </div>
        
        {/* BODY CON SCROLL */}
        <div className="flex-1 overflow-y-auto p-6 font-sans text-gray-800">
          <div className="mb-8">
            
            {/* 📸 NUEVO CONTENEDOR DE GALERÍA CON FLECHAS */}
            {imagenes.length > 0 && (
              <div className="w-full h-48 mb-4 rounded-md overflow-hidden relative group">
                <img 
                  src={imagenes[indiceSeguro]} 
                  alt={`${item.nombre}-${indiceSeguro}`} 
                  className="w-full h-full object-cover transition-all duration-500"
                />
                
                {imagenes.length > 1 && (
                  <>
                    <button onClick={anteriorImagen} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md z-10 transition-transform active:scale-90 text-black">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    <button onClick={siguienteImagen} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md z-10 transition-transform active:scale-90 text-black">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                    </button>

                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                      {imagenes.map((_, i) => (
                        <div key={i} className={`h-1.5 w-1.5 rounded-full transition-all ${i === indiceSeguro ? 'bg-white w-4' : 'bg-white/50'}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <h4 className="font-serif text-3xl mb-2 text-[#2b4535]">{item.nombre}</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{item.descripcion}</p>
          </div>
          
          <h5 className="font-serif text-xl mb-4 text-[#2b4535]">Fechas de Estadía</h5>
          <div className="mb-8">
            <CalendarioPremium 
              checkIn={checkIn} 
              checkOut={checkOut} 
              setCheckIn={setCheckIn} 
              setCheckOut={setCheckOut} 
              primaryColor={primaryColor} 
            />
          </div>
          
          <h5 className="font-serif text-xl mb-4 text-[#2b4535]">Extras</h5>
          <div className="space-y-3 mb-8">
            <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 cursor-pointer hover:border-gray-400 transition-colors rounded-md">
              <input type="checkbox" checked={extras.desayuno} onChange={(e) => setExtras({...extras, desayuno: e.target.checked})} className="w-4 h-4 accent-[#d16b47]" />
              <div className="flex-1 text-sm font-medium">Desayuno Alpino</div>
              <div className="text-sm text-gray-500">+$15/día</div>
            </label>
            <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 cursor-pointer hover:border-gray-400 transition-colors rounded-md">
              <input type="checkbox" checked={extras.transporte} onChange={(e) => setExtras({...extras, transporte: e.target.checked})} className="w-4 h-4 accent-[#d16b47]" />
              <div className="flex-1 text-sm font-medium">Transfer Aeropuerto</div>
              <div className="text-sm text-gray-500">+$30</div>
            </label>
          </div>
        </div>
        
        {/* FOOTER */}
        <div className="shrink-0 p-6 bg-white border-t border-gray-200 z-20">
          <div className="flex justify-between items-end mb-4">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Estimado</span>
            <span className="font-serif text-3xl text-[#2b4535]">${total}</span>
          </div>
          <button onClick={enviarPorWhatsApp} className="w-full py-4 font-bold text-white transition-transform active:scale-95 shadow-md flex justify-center items-center gap-2 rounded-xl" style={{ backgroundColor: primaryColor }}>
            Confirmar por WhatsApp
          </button>
        </div>

      </div>
    </div>
  );
}