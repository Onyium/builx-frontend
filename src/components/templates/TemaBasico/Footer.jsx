import React from 'react';
import Animacion from './components/Animacion';

export default function Footer({ footerConfig, theme, getUrl }) {
  return (
    <div 
      className="w-full h-full flex flex-col justify-center items-center px-6 text-center border-t border-gray-300/50" 
      style={{ backgroundColor: theme.bgBeige, color: theme.textDark }}
    >
      <Animacion direccion="arriba" retraso="delay-100">
        <h2 className="text-5xl md:text-7xl font-serif mb-12 text-[#2b4535]">
          {footerConfig.frase_final} <br/>
          <span className="italic font-light">{footerConfig.frase_cursiva}</span>
        </h2>
      </Animacion>

      <Animacion direccion="fade" retraso="delay-500">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-lg font-medium opacity-80">
          {footerConfig.enlaces.map((link, i) => (
            <a key={i} href="#" className="hover:text-[#d16b47] transition-colors relative group">
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#d16b47] transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>
      </Animacion>
    </div>
  );
}