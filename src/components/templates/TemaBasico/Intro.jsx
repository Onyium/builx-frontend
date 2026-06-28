import React from 'react';
import Animacion from './components/Animacion'; // Importamos nuestro nuevo superpoder

export default function Intro({ introConfig, theme }) {
  return (
    <div 
      className="w-full h-full relative overflow-hidden flex items-center justify-center px-6"
      style={{ backgroundColor: theme.bgGreen, color: theme.textLight }}
    >
      {/* IMÁGENES FLOTANTES CON ANIMACIÓN LATERAL */}
      <div className="absolute top-10 right-4 md:right-20 w-24 h-24 md:w-40 md:h-40">
        <Animacion direccion="izquierda" retraso="delay-300" duracion="duration-[1500ms]">
          <img src={introConfig.img_1} alt="Intro 1" className="w-full h-full object-cover shadow-2xl" />
        </Animacion>
      </div>

      <div className="absolute bottom-20 left-4 md:left-20 w-32 h-24 md:w-56 md:h-40">
        <Animacion direccion="derecha" retraso="delay-500" duracion="duration-[1500ms]">
          <img src={introConfig.img_2} alt="Intro 2" className="w-full h-full object-cover shadow-2xl" />
        </Animacion>
      </div>

      {/* CONTENIDO CENTRAL CON ANIMACIÓN HACIA ARRIBA */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Animacion direccion="arriba" retraso="delay-100">
          <p className="text-xs md:text-sm tracking-widest uppercase mb-8 font-semibold opacity-80">
            {introConfig.etiqueta}
          </p>
        </Animacion>
        
        <Animacion direccion="arriba" retraso="delay-300">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight">
            {introConfig.texto_gigante}
          </h2>
        </Animacion>
      </div>
    </div>
  );
}