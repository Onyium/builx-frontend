import React from 'react';

export default function Hero({ heroConfig }) {
  return (
    <div className="relative w-full h-full">
      <img src={heroConfig.fondo_url} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-8 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-8">
          <span className="block font-light">{heroConfig.titulo_principal}</span>
          <span className="block font-serif italic text-4xl md:text-6xl mt-2">{heroConfig.titulo_cursiva}</span>
        </h1>
      </div>
    </div>
  );
}