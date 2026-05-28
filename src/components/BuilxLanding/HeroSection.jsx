import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative pt-40 pb-32 px-6 overflow-hidden flex flex-col items-center text-center min-h-[90vh] justify-center">
      
      {/* 1. CONTENEDOR DEL VIDEO DE FONDO */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 opacity-90"
        >
          {/* Aquí pones la ruta de tu video. En Vite, si está en la carpeta 'public', lo llamas así: */}
          <source src="/world.mp4" type="video/mp4" />
          
        </video>
        
        {/* 2. OVERLAY OSCURO (Para que el texto resalte) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/50 to-[#0a0a0a]"></div>
      </div>

      {/* 3. CONTENIDO PRINCIPAL (Con z-10 para estar por encima del video) */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-gray-200 mb-8 backdrop-blur-sm animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          Versión 2.0 ya disponible
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight drop-shadow-lg">
          La infraestructura digital que tu negocio merece por <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 filter drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]">
            solo $15 al mes.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl leading-relaxed drop-shadow-md">
          Deja atrás la informalidad. Construimos, optimizamos y desplegamos tu presencia online a una velocidad brutal.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-lg transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:-translate-y-1">
            Comenzar ahora
            <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white font-semibold text-lg hover:bg-white/10 transition-colors">
            Ver portafolio
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;