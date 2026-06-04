import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaginaLegal({ titulo, contenido }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050B14] text-white py-20 px-6 font-sans selection:bg-blue-500">
      <div className="max-w-4xl mx-auto bg-white/[0.03] backdrop-blur-xl p-10 md:p-16 rounded-[2rem] border border-white/10 shadow-2xl">
        <button onClick={() => navigate('/')} className="text-cyan-400 font-bold hover:underline mb-8 flex items-center gap-2">
          ← Volver al inicio
        </button>
        <h1 className="text-3xl md:text-5xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          {titulo}
        </h1>
        <div 
          className="prose prose-invert max-w-none text-slate-300 space-y-6 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: contenido }}
        />
      </div>
    </div>
  );
}