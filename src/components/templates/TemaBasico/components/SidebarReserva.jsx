import React, { useState, useEffect } from 'react';
import CalendarioPremium from './CalendarioPremium';
import { formatearUrlPublica } from './UtilidadesCatalogo';

export default function SidebarReserva({ item, telefonoHotel, primaryColor, onCancel }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  
  // 🚀 ESTADOS PARA LOS HUÉSPEDES
  const [adultos, setAdultos] = useState(2);
  const [ninos, setNinos] = useState(0);
  
  const [extras, setExtras] = useState({ desayuno: false, transporte: false });
  const [indiceActual, setIndiceActual] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  // === LÓGICA DE EXTRACCIÓN DE FOTOS ===
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

  // === EXTRACCIÓN DINÁMICA DEL JSON ===
  let detalles = {};
  try {
    detalles = typeof item.detalles_extra === 'string' 
      ? JSON.parse(item.detalles_extra) 
      : (item.detalles_extra || {});
  } catch (e) {}

  const precioDesayuno = parseFloat(detalles.Precio_Desayuno_Extra) || 0;
  const precioTransfer = parseFloat(detalles.Precio_Transfer_Extra) || 0;
  const nombreDesayuno = detalles.Nombre_Desayuno_Extra || "Desayuno Extra";
  const nombreTransfer = detalles.Nombre_Transfer_Extra || "Transfer Aeropuerto";
  
  // Extraemos las limitantes de la habitación
  const tipoCobro = (detalles.Cobro_Por || "noche").toLowerCase();
  const maxAdultos = parseInt(detalles.Max_Adultos) || parseInt(detalles.Capacidad_Maxima) || 4;
  const maxNinos = parseInt(detalles.Max_Ninos) || 4;

  // 🚀 VARIABLES DE OCUPACIÓN
  const ocupacionBase = parseInt(detalles.Ocupacion_Base_Incluida) || 1;
  const cobroPorPersonaExtra = parseFloat(detalles.Cobro_Persona_Extra) || 0;

  const calcularNoches = () => {
    if (!checkIn || !checkOut) return 0;
    const dias = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    return dias > 0 ? dias : 0;
  };

  const noches = calcularNoches();
  
  // ==========================================
  // 🚀 CALCULADORA BASADA EN OCUPACIÓN
  // ==========================================
  const totalHuespedes = adultos + ninos;
  
  // Calculamos si hay personas "extra" que superen la ocupación base
  const huespedesExtra = Math.max(0, totalHuespedes - ocupacionBase);
  
  // Calculamos el precio real por noche
  const precioBaseHabitacion = parseFloat(item.precio) || 0;
  const precioFinalPorNoche = precioBaseHabitacion + (huespedesExtra * cobroPorPersonaExtra);

  // Multiplicamos por la cantidad de noches
  const costoHabitacion = precioFinalPorNoche * noches;
  
  // El desayuno extra normalmente se cobra por persona por día
  const costoDesayuno = extras.desayuno ? (precioDesayuno * noches * totalHuespedes) : 0;
  const costoTransporte = extras.transporte ? precioTransfer : 0;
  
  const total = costoHabitacion + costoDesayuno + costoTransporte;
  // ==========================================

  const enviarPorWhatsApp = () => {
    if (!checkIn || !checkOut) {
      alert("Por favor selecciona las fechas de tu estadía.");
      return;
    }

    // Armamos el texto perfecto para los huéspedes
    let huespedesTexto = `${adultos} Adulto(s)`;
    if (ninos > 0) huespedesTexto += `, ${ninos} Niño(s)`;

    let mensaje = `\uD83D\uDC4B Hola, vengo de la página web y quiero solicitar una reserva:\n\n`;
    mensaje += `\uD83C\uDFE8 *Habitación:* ${item.nombre}\n`;
    mensaje += `\uD83D\uDC65 *Huéspedes:* ${huespedesTexto}\n`;
    mensaje += `\uD83D\uDCC5 *Check-in:* ${checkIn}\n`;
    mensaje += `\uD83D\uDCC5 *Check-out:* ${checkOut} (${noches} noches)\n\n`;
    
    if (extras.desayuno || extras.transporte) {
      mensaje += `\u2728 *Extras solicitados:*\n`;
      if (extras.desayuno) mensaje += `- ${nombreDesayuno}\n`;
      if (extras.transporte) mensaje += `- ${nombreTransfer}\n`;
      mensaje += `\n`;
    }
    mensaje += `\uD83D\uDCB0 *Total estimado:* $${total.toFixed(2)}\n\n`;
    mensaje += `¿Tienen disponibilidad para estas fechas?`;

    const numeroLimpio = telefonoHotel.replace(/\D/g, '');
    window.open(`https://wa.me/${numeroLimpio}?text=${encodeURIComponent(mensaje)}`, '_blank');
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
          <div className="mb-6">
            {imagenes.length > 0 && (
              <div className="w-full h-48 mb-4 rounded-md overflow-hidden relative group">
                <img src={imagenes[indiceSeguro]} alt={`${item.nombre}-${indiceSeguro}`} className="w-full h-full object-cover transition-all duration-500" />
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
            
            {/* 🚀 DESGLOSE DE PRECIO Y PERSONAS EXTRA */}
            <div className="flex flex-col gap-1 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#2b4535]">${precioFinalPorNoche.toFixed(2)}</span>
                <span className="text-xs text-gray-500 uppercase">/ {tipoCobro}</span>
              </div>
              
              {huespedesExtra > 0 && (
                <span className="text-[11px] font-bold text-[#d16b47]">
                  (Incluye ${cobroPorPersonaExtra} por {huespedesExtra} huésped(es) extra)
                </span>
              )}
            </div>
          </div>
          
          <h5 className="font-serif text-xl mb-4 text-[#2b4535]">Estadía y Huéspedes</h5>
          
          {/* SELECTORES DE HUÉSPEDES */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Adultos</label>
              <select 
                value={adultos} 
                onChange={(e) => setAdultos(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-md bg-white focus:border-[#2b4535] outline-none"
              >
                {[...Array(maxAdultos)].map((_, i) => (
                  <option key={i+1} value={i+1}>{i+1}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Niños</label>
              <select 
                value={ninos} 
                onChange={(e) => setNinos(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-md bg-white focus:border-[#2b4535] outline-none"
              >
                {[...Array(maxNinos + 1)].map((_, i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-8">
            <CalendarioPremium checkIn={checkIn} checkOut={checkOut} setCheckIn={setCheckIn} setCheckOut={setCheckOut} primaryColor={primaryColor} />
          </div>
          
          {(precioDesayuno > 0 || precioTransfer > 0) && (
            <>
              <h5 className="font-serif text-xl mb-4 text-[#2b4535]">Extras</h5>
              <div className="space-y-3 mb-8">
                {precioDesayuno > 0 && (
                  <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 cursor-pointer hover:border-gray-400 transition-colors rounded-md">
                    <input type="checkbox" checked={extras.desayuno} onChange={(e) => setExtras({...extras, desayuno: e.target.checked})} className="w-4 h-4 accent-[#d16b47]" style={{ accentColor: primaryColor }} />
                    <div className="flex-1 text-sm font-medium">{nombreDesayuno}</div>
                    <div className="text-sm text-gray-500">+${precioDesayuno} <span className="text-[10px]">x persona</span></div>
                  </label>
                )}
                {precioTransfer > 0 && (
                  <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 cursor-pointer hover:border-gray-400 transition-colors rounded-md">
                    <input type="checkbox" checked={extras.transporte} onChange={(e) => setExtras({...extras, transporte: e.target.checked})} className="w-4 h-4 accent-[#d16b47]" style={{ accentColor: primaryColor }} />
                    <div className="flex-1 text-sm font-medium">{nombreTransfer}</div>
                    <div className="text-sm text-gray-500">+${precioTransfer}</div>
                  </label>
                )}
              </div>
            </>
          )}

        </div>
        
        {/* FOOTER */}
        <div className="shrink-0 p-6 bg-white border-t border-gray-200 z-20">
          <div className="flex justify-between items-end mb-4">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Estimado</span>
            <span className="font-serif text-3xl text-[#2b4535]">${total.toFixed(2)}</span>
          </div>
          <button onClick={enviarPorWhatsApp} className="w-full py-4 font-bold text-white transition-transform active:scale-95 shadow-md flex justify-center items-center gap-2 rounded-xl" style={{ backgroundColor: primaryColor }}>
            Confirmar por WhatsApp
          </button>
        </div>

      </div>
    </div>
  );
}