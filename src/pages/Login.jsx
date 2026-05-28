import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('https://builx-api.onrender.com/api/auth/login', { email, password });
      
      if (res.data.success) {
        localStorage.setItem('empresa_id', res.data.empresaId);
        // NUEVO: Guardamos la hora exacta en milisegundos en la que se logueó
        localStorage.setItem('login_time', Date.now()); 
        
        window.location.href = '/dashboard'; 
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al intentar ingresar');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Panel BuilX</h1>
          <p className="text-gray-500 text-sm mt-2">Ingresa las credenciales de tu negocio</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium mb-6 border border-red-100">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Correo de Administrador</label>
            <input 
              type="email" 
              required 
              className="w-full border p-3 rounded-xl outline-none focus:border-blue-500 transition-all" 
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
              className="w-full border p-3 rounded-xl outline-none focus:border-blue-500 transition-all" 
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 active:scale-95 transition-all mt-4"
          >
            Ingresar al Panel
          </button>
        </form>
      </div>
    </div>
  );
}