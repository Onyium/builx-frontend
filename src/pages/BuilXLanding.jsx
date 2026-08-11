import React, { useState, useEffect } from 'react';

export default function PetMemorialLanding() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estados para el formulario de validación
  const [formData, setFormData] = useState({
    nombre: '',
    whatsapp: '',
    foto: null
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth');
    return () => document.documentElement.classList.remove('scroll-smooth');
  }, []);

  // Manejo del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes hacer un POST a tu backend en Node o a un Webhook
    console.log("Lead capturado para validación:", formData);
    setIsSubmitted(true);
  };

  return (
    <div className="bg-[#FAF7F2] text-[#2C1E16] font-sans selection:bg-amber-700 selection:text-white min-h-screen relative overflow-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#2C1E16]/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group">
            <span className="text-2xl font-black tracking-tighter text-[#2C1E16] uppercase">
              Huellas <span className="text-amber-700 font-light">Eternas</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#2C1E16] hover:bg-amber-800 text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-all active:scale-95 hidden md:flex items-center justify-center shadow-lg"
            >
              Crear mi homenaje
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
              onClick={() => setIsModalOpen(true)}
              className="bg-[#2C1E16] hover:bg-amber-800 text-white font-black py-4 px-10 rounded-xl text-lg transition-all active:scale-95 flex items-center justify-center shadow-xl w-full sm:w-auto mb-6 animate-pulse"
            >
              Iniciar mi pedido
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

      {/* MODAL DE VALIDACIÓN (Agotado / Lista de espera) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative animate-fade-in-up">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {!isSubmitted ? (
              <div className="p-8">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⚠️</span>
                </div>
                <h3 className="text-2xl font-black text-center text-[#2C1E16] mb-2">Pedidos Agotados</h3>
                <p className="text-center text-[#5A4334] mb-6 text-sm">
                  Debido a la alta demanda por nuestros videos, la capacidad del taller está llena esta semana. Déjanos tus datos y la foto de tu perrito para asegurarte un lugar en la lista de espera prioritaria.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-[#2C1E16] mb-1">Tu Nombre</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-amber-700 bg-gray-50"
                      placeholder="Ej. Carlos Mendoza"
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#2C1E16] mb-1">WhatsApp</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-amber-700 bg-gray-50"
                      placeholder="+503 0000-0000"
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#2C1E16] mb-1">Foto de tu perrito</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      required
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-50 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200"
                      onChange={(e) => setFormData({...formData, foto: e.target.files[0]})}
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 rounded-xl mt-4 transition-all"
                  >
                    Unirme a la lista de espera
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-10 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl text-green-600">✓</span>
                </div>
                <h3 className="text-2xl font-black text-[#2C1E16] mb-2">¡Estás en la lista!</h3>
                <p className="text-[#5A4334]">
                  Hemos recibido la foto. Te contactaremos por WhatsApp en cuanto liberemos espacio en nuestro taller para comenzar tu diseño.
                </p>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="mt-6 text-amber-700 font-bold hover:underline"
                >
                  Volver al inicio
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}