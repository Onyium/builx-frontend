import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col relative overflow-hidden">
      
      {/* DECORACIÓN DE FONDO (Sutil estilo SaaS) */}
      <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* NAVBAR MINIMALISTA */}
      <nav className="w-full p-6 flex justify-between items-center z-10 max-w-7xl mx-auto">
        <div 
          onClick={() => navigate('/')} 
          className="cursor-pointer group"
        >
          <span className="text-3xl font-black tracking-tighter text-gray-900">
            Buil<span className="text-blue-600 transition-colors group-hover:text-blue-500">X</span>
          </span>
        </div>
        <button 
          onClick={() => navigate('/register')}
          className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
        >
          Crear una cuenta
        </button>
      </nav>

      {/* CONTENEDOR DEL FORMULARIO */}
      <div className="flex-1 flex items-center justify-center p-6 z-10">
        <div className="max-w-md w-full bg-white p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Bienvenido de vuelta</h1>
            <p className="text-gray-500 text-sm mt-3">Ingresa las credenciales de tu negocio para continuar.</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold mb-6 border border-red-100 flex items-center gap-2 animate-fade-in-down">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Correo de Administrador</label>
              <input 
                type="email" 
                required 
                className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-gray-800" 
                placeholder="ejemplo@negocio.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Contraseña del Mes</label>
              <input 
                type="password" 
                required 
                className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-gray-800" 
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-bold shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:bg-blue-700 hover:shadow-[0_8px_25px_rgba(37,99,235,0.35)] active:scale-[0.98] transition-all mt-2"
            >
              Ingresar al Panel
            </button>
          </form>

          {/* CALL TO ACTION PARA REGISTRO */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 font-medium">
              ¿Aún no tienes tu catálogo?{' '}
              <button 
                onClick={() => navigate('/register')}
                className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-all"
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