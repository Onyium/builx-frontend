import React, { useState, useEffect } from 'react';

export default function Drawer({ isOpen, onClose, selectedBreed }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: '',
    whatsapp: '',
    petName: '',
    birthYear: '',
    deathYear: ''
  });

  // Limpiar el formulario cada vez que se abre/cierra el panel
  useEffect(() => {
    if (!isOpen) {
      setIsSubmitted(false);
      setFormData({ ownerName: '', whatsapp: '', petName: '', birthYear: '', deathYear: '' });
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // 🔴 REEMPLAZA ESTO CON EL ENLACE QUE TE DIO FORMSPREE
      const FORMSPREE_URL = 'https://formspree.io/f/mzeprqlz';

      const payload = {
        "1. Raza Seleccionada": selectedBreed ? selectedBreed.name : 'Personalizado',
        "2. Nombre del Cliente": formData.ownerName,
        "3. WhatsApp": formData.whatsapp,
        "4. Nombre de la Mascota": formData.petName,
        "5. Año de Nacimiento": formData.birthYear,
        "6. Año de Partida": formData.deathYear,
      };

      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log("✅ Pedido enviado al correo con éxito");
        setIsSubmitted(true);
      } else {
        alert("Ocurrió un problema al enviar los datos. Intenta nuevamente.");
      }
      
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Hubo un error de conexión. Revisa tu internet e intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Overlay Oscuro */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity" 
          onClick={onClose}
        ></div>
      )}

      {/* Panel Lateral */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-[#2C1E16]">Tu Pedido</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-800 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {!isSubmitted ? (
            <>
              {selectedBreed && (
                <div className="flex items-center gap-4 bg-[#FAF7F2] p-4 rounded-xl border border-[#2C1E16]/10 mb-8">
                  <img src={selectedBreed.woodImage} alt={selectedBreed.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <span className="text-xs text-amber-700 font-bold uppercase tracking-wider">Diseño Seleccionado</span>
                    <h3 className="text-lg font-bold text-[#2C1E16]">{selectedBreed.name}</h3>
                  </div>
                </div>
              )}

              <p className="text-sm text-[#5A4334] mb-6 bg-amber-50 p-4 rounded-xl border border-amber-100">
                ⚠️ Debido a la alta demanda de nuestros videos, tenemos lista de espera. Déjanos tus datos y te contactaremos para confirmar tu lugar.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-4">
                  <h4 className="font-bold text-[#2C1E16] border-b pb-2">Contacto</h4>
                  <input 
                    type="text" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border bg-gray-50 focus:border-amber-700 focus:outline-none" 
                    placeholder="Tu Nombre" 
                    value={formData.ownerName} 
                    onChange={(e) => setFormData({...formData, ownerName: e.target.value})} 
                  />
                  <input 
                    type="tel" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border bg-gray-50 focus:border-amber-700 focus:outline-none" 
                    placeholder="WhatsApp" 
                    value={formData.whatsapp} 
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} 
                  />
                </div>

                <div className="space-y-4 pt-4">
                  <h4 className="font-bold text-[#2C1E16] border-b pb-2">Personalización</h4>
                  <input 
                    type="text" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border bg-gray-50 focus:border-amber-700 focus:outline-none" 
                    placeholder="Nombre de la Mascota" 
                    value={formData.petName} 
                    onChange={(e) => setFormData({...formData, petName: e.target.value})} 
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border bg-gray-50 focus:border-amber-700 focus:outline-none" 
                      placeholder="Año Nacimiento" 
                      value={formData.birthYear} 
                      onChange={(e) => setFormData({...formData, birthYear: e.target.value})} 
                    />
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border bg-gray-50 focus:border-amber-700 focus:outline-none" 
                      placeholder="Año Partida" 
                      value={formData.deathYear} 
                      onChange={(e) => setFormData({...formData, deathYear: e.target.value})} 
                    />
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
              <p className="text-[#5A4334] mb-8">
                Hemos anotado a <strong className="text-[#2C1E16]">{formData.petName}</strong> en nuestra lista. Te escribiremos pronto a tu WhatsApp para confirmar disponibilidad.
              </p>
              <button 
                onClick={onClose} 
                className="bg-[#2C1E16] text-white font-bold py-3 px-8 rounded-xl hover:bg-black transition-all"
              >
                Volver al catálogo
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}