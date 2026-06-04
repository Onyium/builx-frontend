import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // <-- Nuevo estado para el ojito
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('https://builx-api.onrender.com/api/auth/login', { email, password });
      
      if (res.data.success) {
        localStorage.setItem('empresa_id', res.data.empresaId);
        // Guardamos la hora exacta en milisegundos en la que se logueó
        localStorage.setItem('login_time', Date.now()); 
        
        window.location.href = '/dashboard'; 
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al intentar ingresar');
    }
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-white font-sans selection:bg-blue-500 selection:text-white flex flex-col relative overflow-hidden">
      
      {/* FONDO AURORA MESH (Igual al de tu Landing Page) */}
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
          onClick={() => navigate('/register')}
          className="text-sm font-bold text-slate-300 hover:text-white transition-colors"
        >
          Crear una cuenta
        </button>
      </nav>

      {/* CONTENEDOR DEL FORMULARIO */}
      <div className="flex-1 flex items-center justify-center p-6 z-10">
        <div className="max-w-md w-full bg-white/[0.03] backdrop-blur-xl p-10 rounded-[2rem] shadow-2xl border border-white/10">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-white tracking-tight">Bienvenido de vuelta</h1>
            <p className="text-slate-400 text-sm mt-3">Ingresa las credenciales de tu negocio para continuar.</p>
          </div>

          {error && (
            <div className="bg-red-500/10 text-red-400 p-4 rounded-xl text-sm font-bold mb-6 border border-red-500/20 flex items-center gap-2 animate-fade-in-down">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Correo de Administrador</label>
              <input 
                type="email" 
                required 
                className="w-full bg-black/20 border border-white/10 p-4 rounded-xl outline-none focus:bg-black/40 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-white placeholder-slate-500" 
                placeholder="ejemplo@negocio.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Contraseña del Mes</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  className="w-full bg-black/20 border border-white/10 p-4 pr-12 rounded-xl outline-none focus:bg-black/40 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-white placeholder-slate-500" 
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                
                {/* BOTÓN DEL OJITO */}
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* ENLACE PARA RECUPERAR CONTRASEÑA */}
              <div className="flex justify-end mt-2">
                <a 
                  href="mailto:soporte@builxapp.com?subject=Solicitud%20de%20Recuperación%20de%20Contraseña&body=Hola%20equipo%20de%20BuilX,%0A%0AOlvidé%20mi%20contraseña.%20El%20correo%20con%20el%20que%20me%20registré%20es:%20[ESCRIBE_AQUI_TU_CORREO]%0A%0A¡Gracias!"
                  className="text-xs font-medium text-slate-400 hover:text-cyan-400 hover:underline transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] active:scale-[0.98] transition-all mt-2"
            >
              Ingresar al Panel
            </button>
          </form>

          {/* CALL TO ACTION PARA REGISTRO */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-400 font-medium">
              ¿Aún no tienes tu catálogo?{' '}
              <button 
                onClick={() => navigate('/register')}
                className="text-cyan-400 font-bold hover:text-cyan-300 hover:underline transition-all"
              >
                Regístrate aquí
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}