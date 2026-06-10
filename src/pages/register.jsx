import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  
  // ESTADOS DEL WIZARD
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  
  // ESTADOS DE VISIBILIDAD (Ojitos)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // TODOS LOS DATOS DEL LEAD
  const [formData, setFormData] = useState({
    empresaNombre: '',
    redSocialUrl: '',
    whatsapp: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const totalSteps = 4;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Limpiamos el error si el usuario empieza a escribir de nuevo
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setError('');
    }
  };

  // 🚨 TU LÓGICA DE REGISTRO INTEGRADA AQUÍ
  const handleGenerateStore = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Validar contraseñas
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden. Por favor, verifica.');
      return;
    }

    setIsGenerating(true);

    try {
      // 2. Enviamos TODO el objeto a tu backend (asegúrate de que tu API reciba los nuevos campos)
      const res = await axios.post('https://builx-api.onrender.com/api/auth/register', { 
        email: formData.email, 
        password: formData.password,
        empresaNombre: formData.empresaNombre,
        redSocialUrl: formData.redSocialUrl,
        whatsapp: formData.whatsapp
      });
      
      if (res.data && res.data.empresa_id) {
        // 3. Guardamos las llaves maestras en el navegador
        localStorage.setItem('empresa_id', res.data.empresa_id);
        localStorage.setItem('user_email', formData.email);
        localStorage.setItem('empresa_nombre', formData.empresaNombre);

        // 4. FLUJO PLG: Los mandamos a la pantalla de "Generando Tienda" en lugar del checkout
        navigate('/success-generation');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error al crear la cuenta. Intenta nuevamente.');
      setIsGenerating(false); // Volvemos a habilitar el botón
    }
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-white font-sans flex flex-col relative overflow-hidden selection:bg-cyan-500 selection:text-white">
      
      {/* FONDO AURORA MESH */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-600/10 rounded-full blur-[150px] animate-blob"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[180px] animate-blob animation-delay-2000"></div>
      </div>

      {/* NAVBAR */}
      <nav className="w-full p-6 flex justify-between items-center z-10 max-w-5xl mx-auto">
        <div 
          onClick={() => navigate('/')}
          className="text-2xl font-black tracking-tighter text-white cursor-pointer"
        >
          Buil<span className="text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]">X</span>
        </div>
        <button onClick={() => navigate('/login')} className="text-sm font-bold text-slate-400 hover:text-white transition-colors">
          Ya tengo cuenta
        </button>
      </nav>

      {/* CONTENEDOR DEL WIZARD */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 z-10 w-full max-w-2xl mx-auto">
        
        {/* Barra de progreso */}
        <div className="w-full mb-8">
          <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 px-1">
            <span>Paso {step} de {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}% Completado</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Cajas de los Pasos */}
        <div className="w-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[400px] flex flex-col justify-center">
          
          {/* PASO 1: Nombre de la Empresa */}
          {step === 1 && (
            <div className="animate-fade-in-right w-full">
              <div className="text-4xl mb-4">👋</div>
              <h2 className="text-3xl md:text-4xl font-black mb-2">¡Genial! Empecemos.</h2>
              <p className="text-slate-400 mb-8 text-lg">¿Cómo se llama tu negocio?</p>
              
              <input 
                type="text" 
                name="empresaNombre"
                value={formData.empresaNombre}
                onChange={handleInputChange}
                autoFocus
                placeholder="Ej. Tienda La Bendición" 
                className="w-full bg-black/30 border border-white/10 rounded-xl px-6 py-5 text-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-slate-600 mb-8"
              />
              
              <button 
                onClick={nextStep}
                disabled={formData.empresaNombre.length < 2}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black py-4 rounded-xl text-xl transition-all active:scale-95"
              >
                Continuar →
              </button>
            </div>
          )}

          {/* PASO 2: Link de Red Social */}
          {step === 2 && (
            <div className="animate-fade-in-right w-full">
              <button onClick={prevStep} className="text-slate-500 hover:text-white mb-4 flex items-center gap-2 text-sm font-bold transition-colors">
                ← Volver
              </button>
              <div className="text-4xl mb-4">✨</div>
              <h2 className="text-3xl md:text-4xl font-black mb-2">La magia de la IA.</h2>
              <p className="text-slate-400 mb-8 text-lg">Pega el link de tu Instagram o página principal para extraer tus productos.</p>
              
              <input 
                type="url" 
                name="redSocialUrl"
                value={formData.redSocialUrl}
                onChange={handleInputChange}
                autoFocus
                placeholder="https://instagram.com/tu_negocio" 
                className="w-full bg-black/30 border border-white/10 rounded-xl px-6 py-5 text-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-slate-600 mb-8"
              />
              
              <button 
                onClick={nextStep}
                disabled={formData.redSocialUrl.length < 5}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black py-4 rounded-xl text-xl transition-all active:scale-95"
              >
                Analizar Link →
              </button>
            </div>
          )}

          {/* PASO 3: WhatsApp */}
          {step === 3 && (
            <div className="animate-fade-in-right w-full">
              <button onClick={prevStep} className="text-slate-500 hover:text-white mb-4 flex items-center gap-2 text-sm font-bold transition-colors">
                ← Volver
              </button>
              <div className="text-4xl mb-4">💬</div>
              <h2 className="text-3xl md:text-4xl font-black mb-2">¿Dónde recibirás pedidos?</h2>
              <p className="text-slate-400 mb-8 text-lg">Ingresa el número de WhatsApp para cerrar tus ventas.</p>
              
              <div className="flex gap-4 mb-8">
                <input 
                  type="text" 
                  disabled
                  value="+503" // Puedes hacerlo dinámico si vendes en más países
                  className="w-24 bg-black/30 border border-white/10 rounded-xl px-4 py-5 text-xl text-slate-400 text-center"
                />
                <input 
                  type="tel" 
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  autoFocus
                  placeholder="7000 0000" 
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-6 py-5 text-xl text-white focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-all placeholder:text-slate-600"
                />
              </div>
              
              <button 
                onClick={nextStep}
                disabled={formData.whatsapp.length < 8}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl text-xl transition-all active:scale-95"
              >
                Confirmar WhatsApp →
              </button>
            </div>
          )}

          {/* PASO 4: Cuenta (Email y Contraseñas) */}
          {step === 4 && (
            <div className="animate-fade-in-right w-full">
              <button onClick={prevStep} className="text-slate-500 hover:text-white mb-4 flex items-center gap-2 text-sm font-bold transition-colors">
                ← Volver
              </button>
              <h2 className="text-3xl font-black mb-2">Guarda tu progreso 🚀</h2>
              <p className="text-slate-400 mb-6 text-sm">Crea tu cuenta para que la IA estructure tu catálogo ahora mismo.</p>
              
              {/* Alerta de Error */}
              {error && (
                <div className="bg-red-500/10 text-red-400 p-3 rounded-xl text-sm font-bold mb-4 border border-red-500/20 flex items-center gap-2 animate-fade-in-down">
                  <span>⚠️</span> {error}
                </div>
              )}

              <form onSubmit={handleGenerateStore} className="space-y-4 mb-6">
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Tu correo electrónico" 
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-slate-600"
                />
                
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Contraseña" 
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-3 pr-12 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-slate-600"
                  />
                  <button 
                    type="button" 
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "🙈"} {/* Puedes usar tus SVG aquí si prefieres */}
                  </button>
                </div>

                <div className="relative">
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirmar Contraseña" 
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-3 pr-12 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-slate-600"
                  />
                  <button 
                    type="button" 
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "👁️" : "🙈"}
                  </button>
                </div>

                <button 
                  type="submit"
                  disabled={!formData.email.includes('@') || formData.password.length < 6 || isGenerating}
                  className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl text-lg transition-all active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.3)] flex justify-center items-center gap-3"
                >
                  {isGenerating ? 'Construyendo con IA...' : 'Construir mi Tienda Gratis'}
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
      
      <style>{`
        .animate-fade-in-right { animation: fadeInRight 0.3s ease-out forwards; }
        .animate-fade-in-down { animation: fadeInDown 0.3s ease-out forwards; }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(15px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}