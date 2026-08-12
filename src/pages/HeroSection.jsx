import React from 'react';

export default function HeroSection({ onOpenDrawer }) {
  return (
    <section className="relative pt-32 pb-12 px-6 max-w-7xl mx-auto flex items-center">
      <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
        <div className="text-left pt-8">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-amber-700/30 bg-amber-700/10 text-amber-800 text-xs font-bold tracking-widest uppercase">
            Hecho a medida
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6 text-[#2C1E16]">
            Inmortaliza su recuerdo <span className="text-amber-700">en madera.</span>
          </h1>
          
          <p className="text-xl text-[#5A4334] leading-relaxed mb-8 max-w-lg">
            Sabemos cuánto duele su partida. Selecciona su raza y nosotros tallaremos una pieza de madera maciza con su nombre, para que te acompañe siempre.
          </p>
          
          <button 
            onClick={() => document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#2C1E16] hover:bg-amber-800 text-white font-black py-4 px-10 rounded-xl text-lg transition-all active:scale-95 flex items-center justify-center shadow-xl w-full sm:w-auto mb-6"
          >
            Ver Catálogo de Razas
          </button>
        </div>

        <div className="relative flex justify-center items-center w-full mt-8 lg:mt-0">
          <div className="relative w-full aspect-square bg-[#E8DFD5] border-8 border-white rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Perro recordado en madera" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}