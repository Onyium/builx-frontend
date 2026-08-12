import React, { useState, useEffect } from 'react';

// 🐕 ARREGLO TEMPORAL: Tu base de datos falsa para validar
const dogBreeds = [
  { id: 1, name: 'Golden Retriever', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=80' },
  { id: 2, name: 'Husky Siberiano', image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=500&q=80' },
  { id: 3, name: 'Pug / Carlino', image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=500&q=80' },
  { id: 4, name: 'Pastor Alemán', image: 'https://images.unsplash.com/photo-1589952283406-b53a7d1347e8?auto=format&fit=crop&w=500&q=80' },
  { id: 5, name: 'Chihuahua', image: 'https://images.unsplash.com/photo-1605639156481-244775d6f803?auto=format&fit=crop&w=500&q=80' },
  { id: 6, name: 'Bulldog Francés', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=500&q=80' },
];

export default function MiMemoriaTalladaLanding() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Estados para el Panel Deslizante (Drawer)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Nuevo estado del formulario enfocado en la personalización de texto
  const [formData, setFormData] = useState({
    ownerName: '',
    whatsapp: '',
    petName: '',
    birthYear: '',
    deathYear: ''
  });

  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth');
    return () => document.documentElement.classList.remove('scroll-smooth');
  }, []);

  const openDrawer = (breed = null) => {
    setSelectedBreed(breed);
    setIsDrawerOpen(true);
    setIsSubmitted(false);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setSelectedBreed(null);
      setIsSubmitted(false);
    }, 300); // Espera a que termine la animación para limpiar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulación de envío a n8n o Formspree
      await new Promise(resolve => setTimeout(resolve, 800));
      
      console.log("✅ Pedido capturado:", {
        raza: selectedBreed ? selectedBreed.name : 'Personalizado',
        ...formData
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error al enviar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF7F2] text-[#2C1E16] font-sans selection:bg-amber-700 selection:text-white min-h-screen relative overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#2C1E16]/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
            <span className="text-2xl font-black tracking-tighter text-[#2C1E16] uppercase">
              Mi Memoria <span className="text-amber-700 font-light">Tallada</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => openDrawer()}
              className="bg-[#2C1E16] hover:bg-amber-800 text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-all active:scale-95 hidden md:flex items-center justify-center shadow-lg"
            >
              Homenaje Especial
            </button>

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
      </nav>

      {/* HERO SECTION */}
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

      {/* SECCIÓN DEL CATÁLOGO DE RAZAS (Scroll Horizontal) */}
      <section id="catalogo" className="py-16 bg-white border-y border-[#2C1E16]/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-[#2C1E16]">Encuentra a tu mejor amigo</h2>
          <p className="text-[#5A4334] mt-2">Nuestros diseños base, listos para ser personalizados con su nombre.</p>
        </div>

        {/* Carrusel Deslizable */}
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 px-6 gap-6 max-w-7xl mx-auto" style={{ scrollbarWidth: 'none' }}>
          {dogBreeds.map((breed) => (
            <div 
              key={breed.id} 
              onClick={() => openDrawer(breed)}
              className="snap-start shrink-0 w-64 group cursor-pointer"
            >
              <div className="w-64 h-64 rounded-2xl overflow-hidden bg-gray-100 mb-4 shadow-md group-hover:shadow-xl transition-all border border-[#2C1E16]/10 relative">
                <img 
                  src={breed.image} 
                  alt={breed.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <h3 className="text-xl font-bold text-[#2C1E16]">{breed.name}</h3>
              <p className="text-amber-700 font-bold text-sm mt-1 group-hover:underline">Personalizar diseño →</p>
            </div>
          ))}
        </div>
      </section>

      {/* OVERLAY DEL DRAWER (Fondo oscuro al abrir el panel) */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
          onClick={closeDrawer}
        ></div>
      )}

      {/* PANEL DESLIZANTE (DRAWER) LATERAL */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 md:p-8">
          {/* Cabecera del Drawer */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-[#2C1E16]">Tu Pedido</h2>
            <button onClick={closeDrawer} className="text-gray-400 hover:text-gray-800 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {!isSubmitted ? (
            <>
              {/* Resumen del producto seleccionado */}
              {selectedBreed && (
                <div className="flex items-center gap-4 bg-[#FAF7F2] p-4 rounded-xl border border-[#2C1E16]/10 mb-8">
                  <img src={selectedBreed.image} alt={selectedBreed.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <span className="text-xs text-amber-700 font-bold uppercase tracking-wider">Diseño Base</span>
                    <h3 className="text-lg font-bold text-[#2C1E16]">{selectedBreed.name}</h3>
                  </div>
                </div>
              )}

              <p className="text-sm text-[#5A4334] mb-6 bg-amber-50 p-4 rounded-xl border border-amber-100">
                ⚠️ Debido a la alta demanda de nuestros videos, tenemos lista de espera. Déjanos los datos del tallado y te contactaremos para confirmar tu lugar.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Datos del Cliente */}
                <div className="space-y-4">
                  <h4 className="font-bold text-[#2C1E16] border-b pb-2">Tus Datos de Contacto</h4>
                  <div>
                    <label className="block text-sm font-bold text-[#2C1E16] mb-1">Tu Nombre</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl border bg-gray-50 focus:border-amber-700 focus:outline-none" placeholder="Ej. Carlos Mendoza" onChange={(e) => setFormData({...formData, ownerName: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#2C1E16] mb-1">WhatsApp</label>
                    <input type="tel" required className="w-full px-4 py-3 rounded-xl border bg-gray-50 focus:border-amber-700 focus:outline-none" placeholder="+503 0000-0000" onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} />
                  </div>
                </div>

                {/* Datos de Personalización */}
                <div className="space-y-4 pt-4">
                  <h4 className="font-bold text-[#2C1E16] border-b pb-2">Personalización en la Madera</h4>
                  <div>
                    <label className="block text-sm font-bold text-[#2C1E16] mb-1">Nombre de la Mascota</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl border bg-gray-50 focus:border-amber-700 focus:outline-none" placeholder="Ej. Max, Luna, Toby..." onChange={(e) => setFormData({...formData, petName: e.target.value})} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-[#2C1E16] mb-1">Año de Nacimiento</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border bg-gray-50 focus:border-amber-700 focus:outline-none" placeholder="Ej. 2012" onChange={(e) => setFormData({...formData, birthYear: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#2C1E16] mb-1">Año de Partida</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border bg-gray-50 focus:border-amber-700 focus:outline-none" placeholder="Ej. 2023" onChange={(e) => setFormData({...formData, deathYear: e.target.value})} />
                    </div>
                  </div>
                </div>
                
                <button 
                  type="submit"
                  disabled={isLoading}
                  className={`w-full text-white font-bold py-4 rounded-xl mt-8 transition-all ${isLoading ? 'bg-amber-500 cursor-wait' : 'bg-amber-700 hover:bg-amber-800'}`}
                >
                  {isLoading ? 'Guardando pedido...' : 'Unirme a la lista de espera'}
                </button>
              </form>
            </>
          ) : (
            <div className="py-12 text-center animate-fade-in-up">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl text-green-600">✓</span>
              </div>
              <h3 className="text-2xl font-black text-[#2C1E16] mb-3">¡Diseño Registrado!</h3>
              <p className="text-[#5A4334] mb-8 leading-relaxed">
                Hemos anotado a <strong className="text-[#2C1E16]">{formData.petName}</strong> en nuestra lista. Te escribiremos pronto a tu WhatsApp ({formData.whatsapp}) para confirmar disponibilidad y procesar el pago.
              </p>
              <button 
                onClick={closeDrawer}
                className="bg-[#2C1E16] text-white font-bold py-3 px-8 rounded-xl hover:bg-black transition-all"
              >
                Volver al catálogo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}