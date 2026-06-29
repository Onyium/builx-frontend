import React from 'react';
import Animacion from './components/Animacion';

export default function InfoBooking({ infoConfig, theme }) {
  if (!infoConfig) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 text-[#1e293b]">
      
      {/* Título de la sección */}
      <div className="text-center mb-16">
        <Animacion direccion="arriba">
          <p className="text-xs tracking-widest uppercase mb-4 font-semibold opacity-60">
            {infoConfig.etiqueta}
          </p>
          <h2 className="text-4xl md:text-5xl font-serif" style={{ color: theme.bgGreen }}>
            {infoConfig.titulo}
          </h2>
        </Animacion>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* COLUMNA 1: Servicios (Estilo Check list) */}
        <Animacion direccion="arriba" retraso="delay-100">
          <div className="bg-white p-8 border border-gray-200 shadow-sm h-full">
            <h3 className="font-serif text-2xl mb-6" style={{ color: theme.bgGreen }}>Servicios</h3>
            <ul className="space-y-4">
              {infoConfig.servicios.map((srv, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                  <svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {srv.texto}
                </li>
              ))}
            </ul>
          </div>
        </Animacion>

        {/* COLUMNA 2: Normas de la Casa */}
        <Animacion direccion="arriba" retraso="delay-300">
          <div className="bg-white p-8 border border-gray-200 shadow-sm h-full">
            <h3 className="font-serif text-2xl mb-6" style={{ color: theme.bgGreen }}>Normas de la casa</h3>
            <div className="space-y-6">
              {infoConfig.normas.map((norma, i) => (
                <div key={i} className="flex flex-col border-l-2 pl-4" style={{ borderColor: theme.accentOrange }}>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    {norma.titulo}
                  </span>
                  <span className="text-sm font-medium text-gray-800">
                    {norma.detalle}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Animacion>

        {/* COLUMNA 3: Reseña y Puntuación (Estilo Booking premium) */}
        <Animacion direccion="arriba" retraso="delay-500">
          <div className="bg-[#2b4535] p-8 shadow-sm h-full flex flex-col text-white">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/20">
              <div className="bg-white text-[#2b4535] font-serif font-bold text-3xl px-3 py-2 rounded-sm">
                {infoConfig.puntuacion.nota}
              </div>
              <div>
                <div className="font-bold text-lg">{infoConfig.puntuacion.texto}</div>
                <div className="text-xs opacity-80">{infoConfig.puntuacion.comentarios} comentarios</div>
              </div>
            </div>
            
            <div className="flex-1">
              <p className="text-sm leading-relaxed italic mb-4 opacity-90">
                "{infoConfig.resena_destacada.texto}"
              </p>
              <div className="flex items-center gap-2 mt-auto">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                  {infoConfig.resena_destacada.autor.charAt(0)}
                </div>
                <div className="text-xs font-medium">
                  {infoConfig.resena_destacada.autor} <span className="opacity-70">({infoConfig.resena_destacada.pais})</span>
                </div>
              </div>
            </div>
          </div>
        </Animacion>

      </div>
    </div>
  );
}