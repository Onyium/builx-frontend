import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RegisterWizard() {
  const navigate = useNavigate();
  
  // ESTADOS DEL WIZARD
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  
  // ESTADOS DE VISUALIZACIÓN
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mostrarLinkExtra, setMostrarLinkExtra] = useState(false);
  
  // TODOS LOS DATOS DEL LEAD
  const [formData, setFormData] = useState({
    empresaNombre: '',
    redSocialUrl: '',
    linkExtra: '',
    nicho: '',
    nichoPersonalizado: '',
    estiloVisual: '',
    whatsapp: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const totalSteps = 6; 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); 
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

  const handleGenerateStore = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden. Por favor, verifica.');
      return;
    }

    setIsGenerating(true);

    try {
      // Determinamos el rubro final
      const rubroFinal = formData.nicho === 'Otro' ? formData.nichoPersonalizado : formData.nicho;

      // 🚨 PASO MÁGICO: Enviamos los datos con los nombres EXACTOS de tu tabla MySQL
      const res = await axios.post('https://builx-api.onrender.com/api/auth/register', { 
        email_administrador: formData.email, 
        password_mensual: formData.password,
        nombre: formData.empresaNombre,
        rubro: rubroFinal,
        whatsapp_pedidos: formData.whatsapp,
        tema_visual: formData.estiloVisual,
        link_instagram: formData.redSocialUrl,
        link_facebook: formData.linkExtra
      });
      
      if (res.data && res.data.empresa_id) {
        localStorage.setItem('empresa_id', res.data.empresa_id);
        localStorage.setItem('user_email', formData.email);
        localStorage.setItem('empresa_nombre', formData.empresaNombre);

        // Los mandamos a la pantalla de éxito
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error al crear la cuenta. Intenta nuevamente.');
      setIsGenerating(false); 
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
        <div onClick={() => navigate('/')} className="text-2xl font-black tracking-tighter text-white cursor-pointer">
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
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Cajas de los Pasos */}
        <div className="w-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[400px] flex flex-col justify-center transition-all">
          
          {/* PASO 1: Nombre */}
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

          {/* PASO 2: Links */}
          {step === 2 && (
            <div className="animate-fade-in-right w-full">
              <button onClick={prevStep} className="text-slate-500 hover:text-white mb-4 flex items-center gap-2 text-sm font-bold">← Volver</button>
              <div className="text-4xl mb-4">✨</div>
              <h2 className="text-3xl md:text-4xl font-black mb-2">La fuente de la magia.</h2>
              <p className="text-slate-400 mb-6 text-lg">Pega tu Instagram o página principal para que la IA extraiga tus productos.</p>
              
              <input 
                type="url" 
                name="redSocialUrl"
                value={formData.redSocialUrl}
                onChange={handleInputChange}
                autoFocus
                placeholder="https://instagram.com/tu_negocio" 
                className="w-full bg-black/30 border border-white/10 rounded-xl px-6 py-4 text-lg text-white focus:outline-none focus:border-cyan-400 mb-4"
              />

              {mostrarLinkExtra ? (
                <div className="animate-fade-in-down">
                  <p className="text-sm text-slate-400 mb-2">Enlace secundario (Opcional)</p>
                  <input 
                    type="url" 
                    name="linkExtra"
                    value={formData.linkExtra}
                    onChange={handleInputChange}
                    placeholder="TikTok, Facebook, Web actual..." 
                    className="w-full bg-black/20 border border-white/5 rounded-xl px-6 py-4 text-lg text-white focus:outline-none focus:border-cyan-400 mb-6"
                  />
                </div>
              ) : (
                <button 
                  onClick={() => setMostrarLinkExtra(true)}
                  className="text-cyan-400 text-sm font-bold flex items-center gap-2 mb-8 hover:text-cyan-300"
                >
                  + Añadir otro enlace 
                </button>
              )}
              
              <button 
                onClick={nextStep}
                disabled={formData.redSocialUrl.length < 5}
                className="w-full mt-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-black py-4 rounded-xl text-xl transition-all active:scale-95"
              >
                Analizar Link →
              </button>
            </div>
          )}

          {/* PASO 3: Nicho de Mercado */}
          {step === 3 && (
            <div className="animate-fade-in-right w-full">
              <button onClick={prevStep} className="text-slate-500 hover:text-white mb-4 flex items-center gap-2 text-sm font-bold">← Volver</button>
              <h2 className="text-3xl font-black mb-2">¿Qué vendes? 🎯</h2>
              <p className="text-slate-400 mb-6">Esto ayuda a nuestra IA a estructurar tus categorías correctamente.</p>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                {['🍔 Comida y Bebida', '👕 Ropa y Moda', '💅 Salud y Belleza', '🛠️ Servicios', '📦 Electrónica', 'Otro'].map((opcion) => (
                  <button
                    key={opcion}
                    onClick={() => setFormData(prev => ({ ...prev, nicho: opcion }))}
                    className={`py-4 px-2 rounded-xl text-sm font-bold transition-all border ${
                      formData.nicho === opcion 
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' 
                        : 'bg-black/30 border-white/10 hover:border-white/30 text-slate-300'
                    }`}
                  >
                    {opcion}
                  </button>
                ))}
              </div>

              {formData.nicho === 'Otro' && (
                <input 
                  type="text" 
                  name="nichoPersonalizado"
                  value={formData.nichoPersonalizado}
                  onChange={handleInputChange}
                  placeholder="Escribe tu rubro (Ej. Venta de repuestos)" 
                  className="w-full animate-fade-in-down bg-black/30 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 mb-6"
                />
              )}
              
              <button 
                onClick={nextStep}
                disabled={!formData.nicho || (formData.nicho === 'Otro' && formData.nichoPersonalizado.length < 2)}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-black py-4 rounded-xl text-xl transition-all"
              >
                Continuar →
              </button>
            </div>
          )}

          {/* PASO 4: Estilo Visual */}
          {step === 4 && (
            <div className="animate-fade-in-right w-full">
              <button onClick={prevStep} className="text-slate-500 hover:text-white mb-4 flex items-center gap-2 text-sm font-bold">← Volver</button>
              <h2 className="text-3xl font-black mb-2">Elige la vibra de tu tienda 🎨</h2>
              <p className="text-slate-400 mb-6">Selecciona un estilo visual inicial. (Podrás cambiarlo después).</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* Opcion Minimalista */}
                <div 
                  onClick={() => setFormData(prev => ({ ...prev, estiloVisual: 'Minimalista' }))}
                  className={`cursor-pointer rounded-2xl p-4 border-2 transition-all ${formData.estiloVisual === 'Minimalista' ? 'border-cyan-400 bg-white/10' : 'border-white/10 bg-black/40 hover:border-white/30'}`}
                >
                  <div className="h-16 bg-white rounded-lg mb-3 flex items-center justify-center">
                    <div className="w-8 h-1 bg-slate-200 rounded"></div>
                  </div>
                  <p className="font-bold text-center text-sm">Minimalista</p>
                </div>

                {/* Opcion Elegante */}
                <div 
                  onClick={() => setFormData(prev => ({ ...prev, estiloVisual: 'Elegante' }))}
                  className={`cursor-pointer rounded-2xl p-4 border-2 transition-all ${formData.estiloVisual === 'Elegante' ? 'border-cyan-400 bg-white/10' : 'border-white/10 bg-black/40 hover:border-white/30'}`}
                >
                  <div className="h-16 bg-gradient-to-br from-[#d4af37] to-[#8a7322] rounded-lg mb-3"></div>
                  <p className="font-bold text-center text-sm">Elegante Boutique</p>
                </div>

                {/* Opcion Oscuro */}
                <div 
                  onClick={() => setFormData(prev => ({ ...prev, estiloVisual: 'Oscuro' }))}
                  className={`cursor-pointer rounded-2xl p-4 border-2 transition-all ${formData.estiloVisual === 'Oscuro' ? 'border-cyan-400 bg-white/10' : 'border-white/10 bg-black/40 hover:border-white/30'}`}
                >
                  <div className="h-16 bg-slate-900 border border-slate-700 rounded-lg mb-3 flex items-center justify-center">
                    <div className="w-8 h-1 bg-purple-500 rounded shadow-[0_0_8px_#a855f7]"></div>
                  </div>
                  <p className="font-bold text-center text-sm">Modo Oscuro</p>
                </div>

                {/* Opcion Vibrante */}
                <div 
                  onClick={() => setFormData(prev => ({ ...prev, estiloVisual: 'Vibrante' }))}
                  className={`cursor-pointer rounded-2xl p-4 border-2 transition-all ${formData.estiloVisual === 'Vibrante' ? 'border-cyan-400 bg-white/10' : 'border-white/10 bg-black/40 hover:border-white/30'}`}
                >
                  <div className="h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg mb-3"></div>
                  <p className="font-bold text-center text-sm">Vibrante</p>
                </div>
              </div>
              
              <button 
                onClick={nextStep}
                disabled={!formData.estiloVisual}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-black py-4 rounded-xl text-xl transition-all"
              >
                Me gusta este estilo →
              </button>
            </div>
          )}

          {/* PASO 5: WhatsApp */}
          {step === 5 && (
            <div className="animate-fade-in-right w-full">
              <button onClick={prevStep} className="text-slate-500 hover:text-white mb-4 flex items-center gap-2 text-sm font-bold">← Volver</button>
              <div className="text-4xl mb-4">📱</div>
              <h2 className="text-3xl md:text-4xl font-black mb-2">¿Dónde cerramos ventas?</h2>
              <p className="text-slate-400 mb-8 text-lg">Ingresa el número de WhatsApp al que llegarán los pedidos.</p>
              
              <div className="flex gap-4 mb-8">
                <input 
                  type="text" 
                  disabled
                  value="+503" 
                  className="w-24 bg-black/30 border border-white/10 rounded-xl px-4 py-5 text-xl text-slate-400 text-center"
                />
                <input 
                  type="tel" 
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  autoFocus
                  placeholder="7000 0000" 
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-6 py-5 text-xl text-white focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-all"
                />
              </div>
              
              <button 
                onClick={nextStep}
                disabled={formData.whatsapp.length < 8}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-50 text-white font-black py-4 rounded-xl text-xl transition-all active:scale-95"
              >
                Confirmar WhatsApp →
              </button>
            </div>
          )}

          {/* PASO 6: Cuenta */}
          {step === 6 && (
            <div className="animate-fade-in-right w-full">
              <button onClick={prevStep} className="text-slate-500 hover:text-white mb-4 flex items-center gap-2 text-sm font-bold">← Volver</button>
              <div className="text-4xl mb-4">🚀</div>
              <h2 className="text-3xl font-black mb-2">Guarda tu progreso.</h2>
              <p className="text-slate-400 mb-6 text-sm">Crea tu cuenta y en breve nuestra IA armará tu catálogo.</p>
              
              {error && (
                <div className="bg-red-500/10 text-red-400 p-3 rounded-xl text-sm font-bold mb-4 border border-red-500/20">
                  ⚠️ {error}
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
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-cyan-400"
                />
                
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Contraseña" 
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-3 pr-12 text-white focus:outline-none focus:border-cyan-400"
                  />
                  <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "👁️" : "🙈"} 
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
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-3 pr-12 text-white focus:outline-none focus:border-cyan-400"
                  />
                  <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? "👁️" : "🙈"}
                  </button>
                </div>

                <button 
                  type="submit"
                  disabled={!formData.email.includes('@') || formData.password.length < 6 || isGenerating}
                  className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-black py-4 rounded-xl text-lg transition-all active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.3)] flex justify-center items-center gap-3"
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