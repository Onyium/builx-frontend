import React, { useState, useEffect } from 'react';

export default function PetMemorialLanding() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🪄 TRUCO PARA EL DESLIZAMIENTO SUAVE
  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth');
    return () => document.documentElement.classList.remove('scroll-smooth');
  }, []);

  // 📲 Enlace directo a tu WhatsApp
  const contactarWhatsApp = () => {
    window.open('https://wa.me/50364526988?text=Hola,%20vengo%20de%20los%20videos.%20Quiero%20inmortalizar%20a%20mi%20perrito%20en%20un%20tallado%20de%20madera.', '_blank');
  };

  return (
    // Paleta de colores cálidos: cremas, cafés y maderas
    <div className="bg-[#FAF7F2] text-[#2C1E16] font-sans selection:bg-amber-700 selection:text-white min-h-screen relative overflow-hidden">
      
      <div className="relative z-10">
        {/* NAVBAR MINIMALISTA */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#FAF7F2]/80 backdrop-blur-md border-b border-[#2C1E16]/10 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer group">
              <span className="text-2xl font-black tracking-tighter text-[#2C1E16] uppercase">
                Huellas <span className="text-amber-700 font-light">Eternas</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#proceso" className="text-sm font-semibold text-[#5A4334] hover:text-amber-700 transition-colors">El Proceso</a>
              <a href="#galeria" className="text-sm font-semibold text-[#5A4334] hover:text-amber-700 transition-colors">Galería</a>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={contactarWhatsApp}
                className="bg-[#2C1E16] hover:bg-amber-800 text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-all active:scale-95 hidden md:flex items-center justify-center shadow-lg"
              >
                Crear mi homenaje
              </button>

              {/* BOTÓN HAMBURGUESA PARA MÓVILES */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-[#2C1E16] p-2"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> 
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /> 
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* MENÚ MÓVIL */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 w-full bg-[#FAF7F2] border-b border-[#2C1E16]/10 px-6 py-8 flex flex-col gap-6 shadow-2xl transition-all">
              <a href="#proceso" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-[#2C1E16] border-b border-[#2C1E16]/10 pb-4">
                El Proceso
              </a>
              <a href="#galeria" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-[#2C1E16] border-b border-[#2C1E16]/10 pb-4">
                Galería
              </a>
              <button 
                onClick={() => {
                  contactarWhatsApp();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-[#2C1E16] text-white font-bold py-4 rounded-xl text-lg shadow-lg mt-2"
              >
                Crear mi homenaje
              </button>
            </div>
          )}
        </nav>

        {/* I. HERO SECTION - EL GANCHO EMOCIONAL */}
        <section className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto min-h-[85vh] flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            
            <div className="text-left pt-8">
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-amber-700/30 bg-amber-700/10 text-amber-800 text-xs font-bold tracking-widest uppercase">
                Hecho a medida
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6 text-[#2C1E16]">
                Inmortaliza su recuerdo <span className="text-amber-700">en madera.</span>
              </h1>
              
              <p className="text-xl text-[#5A4334] leading-relaxed mb-8 max-w-lg">
                Sabemos cuánto duele su partida. Transformamos la foto favorita de tu mejor amigo en una obra de arte tallada en madera maciza, para que su recuerdo te acompañe siempre.
              </p>
              
              <button 
                onClick={contactarWhatsApp}
                className="bg-[#2C1E16] hover:bg-amber-800 text-white font-black py-4 px-10 rounded-xl text-lg transition-all active:scale-95 flex items-center justify-center shadow-xl w-full sm:w-auto mb-6"
              >
                Subir su foto por WhatsApp
              </button>
              <p className="text-sm text-[#8B6E59] italic">
                *Diseñamos una prueba digital antes de tallar.
              </p>
            </div>

            {/* FOTO HERO PREMIUM (Puedes cambiar la URL por uno de tus mockups de IA) */}
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

        {/* II. EL PROCESO (Cómo funciona) */}
        <section className="py-24 relative overflow-hidden bg-white border-y border-[#2C1E16]/5" id="proceso">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-black mb-4 text-[#2C1E16]">Del recuerdo a la eternidad</h2>
            <p className="text-lg text-[#5A4334] mb-16">Un proceso sencillo, hecho con el respeto que merece.</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 border border-[#2C1E16]/10 rounded-2xl bg-[#FAF7F2]">
                <div className="text-amber-700 text-4xl mb-4">📷</div>
                <h3 className="text-xl font-bold mb-3 text-[#2C1E16]">1. Tu Foto Favorita</h3>
                <p className="text-[#5A4334]">Envíanos esa foto que te hace sonreír cuando lo recuerdas. Nuestro equipo la preparará para el tallado.</p>
              </div>
              <div className="p-8 border border-[#2C1E16]/10 rounded-2xl bg-[#FAF7F2]">
                <div className="text-amber-700 text-4xl mb-4">✨</div>
                <h3 className="text-xl font-bold mb-3 text-[#2C1E16]">2. Diseño Digital</h3>
                <p className="text-[#5A4334]">Te enviaremos una vista previa de cómo quedará el tallado. Solo avanzamos cuando estés 100% feliz con el diseño.</p>
              </div>
              <div className="p-8 border border-[#2C1E16]/10 rounded-2xl bg-[#FAF7F2]">
                <div className="text-amber-700 text-4xl mb-4">🪵</div>
                <h3 className="text-xl font-bold mb-3 text-[#2C1E16]">3. Tallado Artesanal</h3>
                <p className="text-[#5A4334]">Nuestra maquinaria de alta precisión talla la madera con cada detalle, empaquetado con amor y enviado a tu puerta.</p>
              </div>
            </div>
          </div>
        </section>

        {/* III. PRECIOS / INVERSIÓN (Validación directa) */}
        <section className="py-24 relative" id="inversion">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#2C1E16]">Un tributo que dura para siempre.</h2>
            </div>

            <div className="bg-white border border-[#2C1E16]/10 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-amber-700"></div>
              
              <div className="text-left mb-8 md:mb-0 md:mr-8 pl-4">
                <h3 className="text-3xl font-black text-[#2C1E16] mb-2">Retrato Personalizado en Madera</h3>
                <p className="text-[#5A4334] mb-6">Tamaño estándar (20x25 cm). Madera de pino tratada.</p>
                <ul className="space-y-3 text-[#2C1E16] font-medium">
                  <li className="flex gap-2 items-center"><span className="text-amber-700">✓</span> Diseño 3D a partir de tu foto</li>
                  <li className="flex gap-2 items-center"><span className="text-amber-700">✓</span> Tallado profundo de alta definición</li>
                  <li className="flex gap-2 items-center"><span className="text-amber-700">✓</span> Acabado protector brillante</li>
                </ul>
              </div>

              <div className="flex flex-col items-center justify-center bg-[#FAF7F2] p-8 rounded-2xl border border-[#2C1E16]/5 w-full md:w-auto">
                <span className="text-sm text-[#5A4334] uppercase tracking-widest font-bold mb-2">Precio de Validación</span>
                <span className="text-5xl font-black text-[#2C1E16] mb-6">$85</span>
                <button 
                  onClick={contactarWhatsApp}
                  className="bg-amber-700 hover:bg-amber-800 text-white font-black py-4 px-8 rounded-xl text-lg transition-all shadow-lg w-full"
                >
                  Pedir el mío
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-[#2C1E16]/10 bg-[#FAF7F2] pt-12 pb-8">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="text-2xl font-black tracking-tighter text-[#2C1E16] uppercase mb-4 block">
              Huellas <span className="text-amber-700 font-light">Eternas</span>
            </span>
            <div className="text-[#8B6E59] text-sm">
              © {new Date().getFullYear()} Huellas Eternas. Tallados con amor.
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}