import React, { useEffect } from 'react';

export default function SidebarContactoPropiedad({ propiedad, telefonoAsesor, primaryColor, onCancel }) {
  // Bloquear el scroll de la página de fondo cuando el panel está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const contactarPorWhatsApp = () => {
    let mensaje = `Hello, I would like to request more information about the property: *${propiedad.nombre}*.\n\n`;
    mensaje += `Listed Price: $${parseFloat(propiedad.precio).toLocaleString('en-US')}\n\n`;
    mensaje += `Could we schedule a private consultation?`;
    
    const numeroLimpio = telefonoAsesor.replace(/\D/g, '');
    window.open(`https://wa.me/${numeroLimpio}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Fondo borroso */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onCancel}></div>
      
      {/* Panel Lateral Blanco */}
      <div className="relative w-full max-w-md h-[100dvh] bg-white shadow-2xl flex flex-col">
        
        {/* HEADER DEL PANEL */}
        <div className="shrink-0 p-8 flex justify-between items-center border-b border-gray-100 z-20">
          <h3 className="font-sans text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Inquire Details</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-black transition-colors text-xl">✕</button>
        </div>
        
        {/* BODY CON FOTO Y DESCRIPCIÓN */}
        <div className="flex-1 overflow-y-auto p-8 font-sans">
          <div className="mb-10">
            <img 
              src={propiedad.imagen_url || (propiedad.todasLasFotos && propiedad.todasLasFotos[0])} 
              alt={propiedad.nombre} 
              className="w-full h-64 object-cover mb-6 rounded-sm" 
            />
            <h4 className="font-serif text-3xl mb-3 text-gray-900 uppercase tracking-widest leading-tight">
              {propiedad.nombre}
            </h4>
            <p className="text-xl font-light text-gray-600 mb-6 border-b border-gray-100 pb-6">
              USD ${parseFloat(propiedad.precio).toLocaleString('en-US', {minimumFractionDigits: 2})}
            </p>
            <p className="text-sm text-gray-500 leading-relaxed font-light">
              {propiedad.descripcion}
            </p>
          </div>
        </div>
        
        {/* FOOTER - BOTÓN DE CONTACTO */}
        <div className="shrink-0 p-8 bg-gray-50 border-t border-gray-100 z-20">
          <button 
            onClick={contactarPorWhatsApp} 
            className="w-full py-4 text-white text-xs font-bold tracking-[0.2em] uppercase transition-transform active:scale-95 shadow-sm rounded-sm" 
            style={{ backgroundColor: primaryColor || '#1a1a1a' }}
          >
            Contact Agent
          </button>
        </div>

      </div>
    </div>
  );
}