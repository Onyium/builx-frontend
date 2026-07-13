import React, { useEffect } from 'react';

export default function ModalContactoFull({ onClose, datosContacto }) {
  // Evitar que el fondo haga scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[999] flex animate-[fadeIn_0.3s_ease-out]">
      
      {/* Mitad Izquierda: Formulario (Fondo Crema) */}
      <div className="w-full md:w-1/2 h-full bg-[#f6f4f0] p-10 md:p-20 flex flex-col justify-center overflow-y-auto relative z-10">
        <h2 className="text-4xl font-serif tracking-widest uppercase text-[#1a202c] mb-12">
          Get in touch
        </h2>
        
        <form className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <input type="text" placeholder="Name*" className="w-full p-4 rounded-sm border border-gray-200 bg-white outline-none focus:border-gray-400 transition-colors" />
            <input type="email" placeholder="Email*" className="w-full p-4 rounded-sm border border-gray-200 bg-white outline-none focus:border-gray-400 transition-colors" />
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <input type="tel" placeholder="Phone number" className="w-full p-4 rounded-sm border border-gray-200 bg-white outline-none focus:border-gray-400 transition-colors" />
            <input type="text" placeholder="Country of origin" className="w-full p-4 rounded-sm border border-gray-200 bg-white outline-none focus:border-gray-400 transition-colors" />
          </div>
          <textarea placeholder="Message" rows="4" className="w-full p-4 rounded-sm border border-gray-200 bg-white outline-none focus:border-gray-400 transition-colors resize-none"></textarea>
          
          <label className="flex items-start gap-3 text-xs text-gray-500 mt-4 cursor-pointer">
            <input type="checkbox" className="mt-1 accent-black" />
            <span>By providing your contact information, you acknowledge and agree to our Privacy Policy.</span>
          </label>
        </form>
      </div>

      {/* Mitad Derecha: Imagen y Datos */}
      {/* 🚀 SOLUCIÓN AQUÍ: Agregamos bg-[#1a2530] como color sólido de respaldo */}
      <div className="hidden md:flex w-1/2 h-full relative text-white flex-col justify-center p-20 bg-[#1a2530] shadow-2xl z-20">
        
        {/* Botón de cerrar (X) */}
        <button onClick={onClose} className="absolute top-10 right-10 text-4xl hover:opacity-70 transition-opacity z-30">
          ✕
        </button>
        
        {/* Imagen de fondo (Si falla, se verá el fondo azul marino) */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200" 
            alt="Contact bg" 
            className="w-full h-full object-cover opacity-50" 
          />
        </div>

        {/* Texto sobre la imagen */}
        <div className="relative z-10">
          <h2 className="text-4xl font-serif tracking-widest uppercase mb-10 leading-snug drop-shadow-md">
            Stewart & Co Real Estate
          </h2>
          <p className="font-sans text-sm tracking-widest mb-4 drop-shadow-sm">
            {datosContacto?.email || "sean@stewartcorealty.com"}
          </p>
          <p className="font-sans text-sm tracking-widest mb-8 drop-shadow-sm">
            {datosContacto?.telefono || "+1 246 232 4444"}
          </p>
          <p className="font-sans text-sm tracking-widest drop-shadow-sm">Barbados</p>
        </div>
      </div>
      
      {/* Botón de cerrar en móvil (solo visible en pantallas pequeñas) */}
      <button onClick={onClose} className="md:hidden absolute top-6 right-6 text-3xl text-gray-800 z-50">
        ✕
      </button>
    </div>
  );
}