import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Tu endpoint donde creas el usuario/empresa en MySQL
      const res = await axios.post('https://builx-api.onrender.com/api/auth/register', { email, password });
      
      if (res.data && res.data.empresa_id) {
        // 🚨 PASO CRUCIAL: Guardamos ambas llaves en el navegador
        localStorage.setItem('empresa_id', res.data.empresa_id);
        localStorage.setItem('user_email', email); // <-- Aquí se guarda el correo obligatorio

        // Los mandamos directo a pagar, sin escalas en el Dashboard
        navigate('/checkout');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error al crear la cuenta');
    }
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-white font-sans selection:bg-blue-500 selection:text-white flex flex-col relative overflow-hidden">
      
      {/* FONDO AURORA MESH */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[120px] md:blur-[150px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-500/20 rounded-full blur-[120px] md:blur-[180px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[10%] w-[50vw] h-[50vw] bg-blue-700/30 rounded-full blur-[120px] md:blur-[150px] animate-blob animation-delay-4000"></div>
      </div>

      {/* NAVBAR MINIMALISTA */}
      <nav className="w-full p-6 flex justify-between items-center z-10 max-w-7xl mx-auto">
        <div 
          onClick={() => navigate('/')} 
          className="cursor-pointer group"
        >
          <span className="text-3xl font-black tracking-tighter text-white">
            Buil<span className="text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)] group-hover:text-blue-300 transition-colors">X</span>
          </span>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="text-sm font-bold text-slate-300 hover:text-white transition-colors"
        >
          Iniciar sesión
        </button>
      </nav>

      {/* CONTENEDOR DEL FORMULARIO */}
      <div className="flex-1 flex items-center justify-center p-6 z-10">
        <div className="max-w-md w-full bg-white/[0.03] backdrop-blur-xl p-10 rounded-[2rem] shadow-2xl border border-white/10">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-white tracking-tight">Crea tu cuenta</h1>
            <p className="text-slate-400 text-sm mt-3">Estás a un paso de tener tu negocio en línea.</p>
          </div>

          {error && (
            <div className="bg-red-500/10 text-red-400 p-4 rounded-xl text-sm font-bold mb-6 border border-red-500/20 flex items-center gap-2 animate-fade-in-down">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Correo Electrónico</label>
              <input 
                type="email" 
                required 
                className="w-full bg-black/20 border border-white/10 p-4 rounded-xl outline-none focus:bg-black/40 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-white placeholder-slate-500" 
                placeholder="nombre@negocio.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Contraseña</label>
              <input 
                type="password" 
                required 
                className="w-full bg-black/20 border border-white/10 p-4 rounded-xl outline-none focus:bg-black/40 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-white placeholder-slate-500" 
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            {/* BOTÓN (Mismo estilo que el Login para mantener la uniformidad) */}
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] active:scale-[0.98] transition-all mt-2 flex items-center justify-center gap-2"
            >
              Registrarme y Continuar 🚀
            </button>
          </form>

          {/* CALL TO ACTION PARA LOGIN */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-400 font-medium">
              ¿Ya tienes una cuenta?{' '}
              <button 
                onClick={() => navigate('/login')}
                className="text-cyan-400 font-bold hover:text-cyan-300 hover:underline transition-all"
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}