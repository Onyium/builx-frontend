import React, { useEffect, useState } from 'react';

export default function VistaContact({ config }) {
  const [enviando, setEnviando] = useState(false);

  // Subir el scroll al inicio cuando cargue la vista
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const manejarEnvio = (e) => {
    e.preventDefault();
    setEnviando(true);
    
    setTimeout(() => {
      setEnviando(false);
      alert("Thank you! Your inquiry has been sent successfully. An agent will contact you shortly.");
      // Aquí podrías limpiar el formulario si quisieras
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-[#f6f4f0] animate-[fadeIn_0.5s_ease-in-out]">
      
      {/* 1. HERO DE CONTACTO */}
      <div className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        <img 
          // Usando una foto similar al muelle del video
          src="https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&q=80&w=2000" 
          alt="Contact Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-70" 
        />
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 text-center text-white px-6 mt-16">
          <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-widest mb-6 drop-shadow-md">
            Contact
          </h1>
          <p className="text-sm md:text-base font-sans font-light tracking-wide drop-shadow-md max-w-2xl mx-auto">
            Have questions or need assistance? Our team is ready to help you with all your real estate needs. Contact us today!
          </p>
        </div>
      </div>

      {/* 2. CONTENIDO PRINCIPAL (Formulario + Datos) */}
      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row gap-16 md:gap-24">
        
        {/* Lado Izquierdo: Formulario */}
        <div className="w-full md:w-[60%]">
          <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase text-[#1a202c] mb-12">
            Get in touch
          </h2>
          
          <form onSubmit={manejarEnvio} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <input type="text" required placeholder="Name*" className="w-full p-4 rounded-full border border-gray-200 bg-white outline-none focus:border-gray-400 transition-colors" />
              <input type="email" required placeholder="Email*" className="w-full p-4 rounded-full border border-gray-200 bg-white outline-none focus:border-gray-400 transition-colors" />
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <input type="tel" placeholder="Phone number" className="w-full p-4 rounded-full border border-gray-200 bg-white outline-none focus:border-gray-400 transition-colors" />
              <input type="text" placeholder="Country of origin" className="w-full p-4 rounded-full border border-gray-200 bg-white outline-none focus:border-gray-400 transition-colors" />
            </div>
            <textarea required placeholder="Message" rows="5" className="w-full p-4 rounded-3xl border border-gray-200 bg-white outline-none focus:border-gray-400 transition-colors resize-none"></textarea>
            
            <label className="flex items-start gap-3 text-xs text-gray-500 mt-4 cursor-pointer">
              <input type="checkbox" required className="mt-1 accent-black" />
              <span>By providing your contact information, you acknowledge and agree to our Privacy Policy and consent to receiving marketing communications.</span>
            </label>

            <button 
              type="submit"
              disabled={enviando}
              className="mt-8 px-12 py-4 bg-[#1a202c] hover:bg-black text-white text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-md rounded-full disabled:bg-gray-400 cursor-pointer"
            >
              {enviando ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>

        {/* Lado Derecho: Datos de Contacto */}
        <div className="w-full md:w-[40%] flex flex-col gap-12 pt-4 md:pt-20">
          
          <div>
            <h3 className="text-xl font-serif tracking-widest uppercase text-gray-800 mb-4">
              Call Us
            </h3>
            <p className="font-sans text-gray-600 tracking-wider">
              {config.contacto?.telefono || "+1 246 232 4444"}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-serif tracking-widest uppercase text-gray-800 mb-4">
              Email Address
            </h3>
            <a 
              href={`mailto:${config.contacto?.email || "sean@stewartcorealty.com"}`} 
              className="font-sans text-gray-600 tracking-wider hover:text-black hover:underline transition-all"
            >
              {config.contacto?.email || "sean@stewartcorealty.com"}
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}