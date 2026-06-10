import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SuccessGeneration() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  // Recuperamos el correo que guardamos en el localStorage en el paso anterior
  useEffect(() => {
    const savedEmail = localStorage.getItem('user_email');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#050B14] text-white font-sans flex flex-col relative overflow-hidden selection:bg-cyan-500 selection:text-white items-center justify-center p-6">
      
      {/* FONDO AURORA MESH */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-cyan-500/20 rounded-full blur-[150px] animate-blob"></div>
        <div className="absolute bottom-[10%] right-[20%] w-[40vw] h-[40vw] bg-blue-600/20 rounded-full blur-[150px] animate-blob animation-delay-2000"></div>
      </div>

      {/* NAVBAR SIMPLE (Opcional, pero da confianza) */}
      <nav className="absolute top-0 left-0 w-full p-6 flex justify-center z-10">
        <div className="text-2xl font-black tracking-tighter text-white">
          Buil<span className="text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]">X</span>
        </div>
      </nav>

      {/* TARJETA DE ÉXITO */}
      <div className="z-10 max-w-lg w-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 md:p-14 text-center shadow-[0_0_50px_rgba(34,211,238,0.05)] animate-fade-in-up">
        
        {/* Ícono animado (Puedes cambiarlo por un SVG o Lottie) */}
        <div className="text-7xl mb-8 animate-bounce">✨</div>
        
        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
          ¡Estamos horneando <br /> tu catálogo!
        </h1>
        
        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
          Nuestra IA ya está analizando tus redes sociales y estructurando tus productos. Este proceso suele tardar unos minutos.
        </p>

        <div className="bg-black/30 border border-white/5 rounded-2xl p-6 mb-8">
          <p className="text-sm text-slate-400 mb-2 font-bold uppercase tracking-wider">Próximo paso:</p>
          <p className="text-white">Revisa tu bandeja de entrada. Te enviaremos un enlace mágico a:</p>
          <p className="text-cyan-400 font-bold mt-2 text-lg break-all">
            {email || 'tu correo electrónico'}
          </p>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 rounded-xl transition-all"
        >
          Volver al inicio
        </button>

        <p className="text-slate-500 text-xs mt-6">
          ¿No recibes el correo en 10 minutos? Revisa tu carpeta de Spam.
        </p>

      </div>

      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}