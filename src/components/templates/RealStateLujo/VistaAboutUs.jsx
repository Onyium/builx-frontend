import React, { useEffect } from 'react';

export default function VistaAboutUs({ config }) {
  // Subir el scroll al inicio cuando cargue
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white animate-[fadeIn_0.5s_ease-in-out]">
      
      {/* 1. HERO DE ABOUT US */}
      <div className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        <img 
          src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=2000" 
          alt="About Us Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-60" 
        />
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="relative z-10 text-center text-white px-6 mt-16">
          <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-widest mb-6 drop-shadow-md">
            About Us
          </h1>
          <p className="text-xs md:text-sm font-sans font-light tracking-[0.15em] uppercase drop-shadow-md max-w-3xl mx-auto leading-loose">
            Committed to connecting you with exceptional properties and providing personalized service every step of the way.
          </p>
        </div>
      </div>

      {/* 2. CONTENIDO (Biografía) */}
      <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row gap-16 md:gap-24">
        
        {/* Foto del Agente */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-end">
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600" 
            alt="Real Estate Agent" 
            className="w-full max-w-[400px] object-cover grayscale hover:grayscale-0 transition-all duration-500 shadow-xl"
          />
        </div>

        {/* Texto de la Biografía */}
        <div className="w-full md:w-2/3 flex flex-col justify-center">
          <h2 className="text-3xl font-serif uppercase tracking-widest text-gray-800 mb-8">
            About The Founder
          </h2>
          <div className="space-y-6 text-gray-600 font-light leading-relaxed text-sm md:text-base">
            <p>
              Having resided in the U.K., Canada, and Barbados, along with a brief period in South Africa, we bring a wealth of international real estate experience, specializing in luxury and second-home destinations.
            </p>
            <p>
              Known for an engaging personality and natural charisma, our team is committed to fostering a team culture that reflects the passion and integrity we consider vital for second-home markets.
            </p>
            <p>
              Transparency and client satisfaction remain central to our approach, earning respect in the industry.
            </p>
          </div>
          
          <div className="mt-12 text-sm text-gray-800 font-sans tracking-widest uppercase">
            <p className="font-bold mb-2">{config.nav?.logo_text || "Stewart & Co Real Estate"}</p>
            <p className="text-gray-500 mb-1">{config.contacto?.email || "sean@stewartcorealty.com"}</p>
            <p className="text-gray-500">{config.contacto?.telefono || "+1 246 232 4444"}</p>
          </div>
        </div>
      </div>

      {/* 3. TESTIMONIOS (Opcional, estilo minimalista) */}
      <div className="w-full bg-[#f9f8f6] py-24 px-6 text-center">
        <h3 className="text-2xl font-serif uppercase tracking-widest text-gray-800 mb-12">
          Testimonials
        </h3>
        <p className="max-w-3xl mx-auto text-xl md:text-2xl font-serif italic text-gray-600 leading-relaxed mb-8">
          "I want to thank you from the bottom of my heart for all your time, patience, good advice, and company, you really made a dreary task quite an enjoyable experience."
        </p>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
          - M.R.
        </p>
      </div>
    </div>
  );
}