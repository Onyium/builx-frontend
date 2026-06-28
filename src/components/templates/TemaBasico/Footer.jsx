import React from 'react';
import Animacion from './components/Animacion';

export default function Footer({ footerConfig, theme, contacto }) {
  if (!footerConfig || !theme) return null;

  return (
    <footer 
      id="footer"
      className="w-full min-h-screen flex flex-col justify-between pt-24 pb-32 px-6 lg:px-20 border-t border-gray-300/50" 
      style={{ backgroundColor: theme.bgBeige, color: theme.textDark }}
    >
      <div className="flex flex-col justify-center items-center text-center flex-1">
        <Animacion direccion="arriba" retraso="delay-100">
          <h2 className="text-5xl md:text-7xl font-serif mb-6 text-[#2b4535] leading-tight">
            {footerConfig.frase_final} <br/>
            <span className="italic font-light">{footerConfig.frase_cursiva}</span>
          </h2>
        </Animacion>

        <Animacion direccion="fade" retraso="delay-300">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-lg font-medium opacity-80 mt-10">
            {footerConfig.enlaces.map((link, i) => (
              <button key={i} className="hover:text-[#d16b47] transition-colors relative group">
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#d16b47] transition-all group-hover:w-full"></span>
              </button>
            ))}
          </div>
        </Animacion>
      </div>

      {/* Información de Contacto */}
      {contacto && (
        <div className="w-full max-w-7xl mx-auto mt-20 pt-10 border-t border-gray-300/50 flex flex-col md:flex-row justify-between items-center gap-4 opacity-80 text-sm">
          <div>{contacto.direccion}</div>
          <div>{contacto.telefono} | {contacto.email}</div>
        </div>
      )}
    </footer>
  );
}