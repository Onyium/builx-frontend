import React from 'react';
import Animacion from './components/Animacion';

export default function Contacto({ contactoConfig, theme }) {
  if (!contactoConfig) return null;

  return (
    <div className="w-full">
      
      {/* BLOQUE 1: Datos y Formulario (Estilo Imagen 1) */}
      <div className="w-full flex justify-center py-24 px-6" style={{ backgroundColor: theme.bgBeige, color: theme.textDark }}>
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Textos y Datos */}
          <Animacion direccion="izquierda">
            <h2 className="text-4xl md:text-5xl font-serif mb-6" style={{ color: theme.bgGreen }}>
              {contactoConfig.titulo_formulario}
            </h2>
            <p className="text-lg opacity-80 mb-12">
              {contactoConfig.subtitulo_formulario}
            </p>

            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <svg className="w-6 h-6 opacity-60 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <div>
                  <h4 className="text-sm font-semibold opacity-60 uppercase tracking-widest">Teléfono / WhatsApp</h4>
                  <p className="font-serif text-xl">{contactoConfig.telefono}</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <svg className="w-6 h-6 opacity-60 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <div>
                  <h4 className="text-sm font-semibold opacity-60 uppercase tracking-widest">Correo</h4>
                  <p className="font-serif text-xl">{contactoConfig.email}</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <svg className="w-6 h-6 opacity-60 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <div>
                  <h4 className="text-sm font-semibold opacity-60 uppercase tracking-widest">Dirección</h4>
                  <p className="font-serif text-xl max-w-xs">{contactoConfig.direccion}</p>
                </div>
              </div>
            </div>
          </Animacion>

          {/* Formulario Visual */}
          <Animacion direccion="derecha" retraso="delay-100">
            <div className="p-10 shadow-lg rounded-sm" style={{ backgroundColor: theme.accentOrange, color: '#ffffff' }}>
              <h3 className="text-3xl font-serif mb-8">Déjanos tus datos aquí</h3>
              <form className="space-y-6 flex flex-col">
                <input type="text" placeholder="Nombres*" className="w-full bg-transparent border-b border-white/40 py-3 text-white placeholder-white/70 focus:outline-none focus:border-white transition-colors" />
                <input type="text" placeholder="Apellidos*" className="w-full bg-transparent border-b border-white/40 py-3 text-white placeholder-white/70 focus:outline-none focus:border-white transition-colors" />
                <input type="email" placeholder="Correo*" className="w-full bg-transparent border-b border-white/40 py-3 text-white placeholder-white/70 focus:outline-none focus:border-white transition-colors" />
                <input type="tel" placeholder="Teléfono*" className="w-full bg-transparent border-b border-white/40 py-3 text-white placeholder-white/70 focus:outline-none focus:border-white transition-colors" />
                <button type="button" className="mt-8 bg-white text-gray-900 font-bold py-3 px-8 rounded-sm hover:opacity-90 transition-opacity self-start">
                  Enviar mensaje
                </button>
              </form>
            </div>
          </Animacion>

        </div>
      </div>

      {/* BLOQUE 2: Ubicación y Mapa (Estilo Imagen 2) */}
      <div className="w-full flex justify-center py-24 px-6" style={{ backgroundColor: '#4a2f1d', color: '#ffffff' }}>
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <Animacion direccion="arriba">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-4">
                {contactoConfig.titulo_ubicacion}
              </h2>
              <div className="mb-8">
                <h4 className="text-sm font-bold opacity-80">Horario de recepción</h4>
                <p className="text-lg">{contactoConfig.horario_recepcion}</p>
              </div>
              <div className="rounded-md overflow-hidden shadow-2xl h-80 w-full max-w-sm">
                <img 
                  src={contactoConfig.imagen_fachada} 
                  alt="Fachada del hotel" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Animacion>

          <Animacion direccion="arriba" retraso="delay-300">
            <div className="h-[500px] w-full rounded-md overflow-hidden shadow-2xl bg-white">
              {contactoConfig.mapa_embed_url && (
                <iframe 
                  src={contactoConfig.mapa_embed_url} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy"
                  title="Mapa de ubicación"
                ></iframe>
              )}
            </div>
          </Animacion>

        </div>
      </div>

    </div>
  );
}