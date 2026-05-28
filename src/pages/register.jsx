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
      const res = await axios.post('http://localhost:5000/api/auth/register', { email, password });
      
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
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 text-white">
      <form onSubmit={handleRegister} className="max-w-md w-full bg-[#1E293B] p-8 rounded-2xl border border-slate-800 shadow-xl">
        <h2 className="text-2xl font-black mb-6 text-center">Crear cuenta en BuilX</h2>
        
        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs mb-4">{error}</div>}

        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Correo Electrónico</label>
          <input 
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#0F172A] border border-slate-700 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500"
            placeholder="nombre@empresa.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Contraseña</label>
          <input 
            type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#0F172A] border border-slate-700 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500"
            placeholder="••••••••"
          />
        </div>

        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 font-bold py-3 rounded-xl text-sm transition-all shadow-lg shadow-emerald-600/20">
          Registrarme y Continuar ➡️
        </button>
      </form>
    </div>
  );
}