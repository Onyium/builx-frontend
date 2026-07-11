import React from 'react';

export default function BuscadorHorizontal({ theme }) {
  // En una versión final, estos estados estarían en el index para filtrar los items reales.
  // Por ahora construimos la Maquetación (UI) idéntica al video.
  
  return (
    <div className="w-full mb-16 animate-[fadeIn_0.5s_ease-out]">
      <div className="flex flex-wrap gap-4 items-center justify-center">
        
        {/* Barra de Búsqueda (Texto) */}
        <div className="w-full md:w-1/4 relative">
          <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-md text-sm focus:border-gray-400 focus:outline-none transition-colors"
          />
        </div>

        {/* Locación */}
        <div className="w-[47%] md:w-1/6">
          <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-sm text-gray-600 focus:border-gray-400 focus:outline-none appearance-none transition-colors">
            <option value="">Location</option>
            <option value="west-coast">West Coast</option>
            <option value="south-coast">South Coast</option>
          </select>
        </div>

        {/* Tipo de Propiedad */}
        <div className="w-[47%] md:w-1/6">
          <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-sm text-gray-600 focus:border-gray-400 focus:outline-none appearance-none transition-colors">
            <option value="">Property Type</option>
            <option value="condo">Condominium</option>
            <option value="villa">Villa</option>
          </select>
        </div>

        {/* Habitaciones */}
        <div className="w-[47%] md:w-[12%]">
          <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-sm text-gray-600 focus:border-gray-400 focus:outline-none appearance-none transition-colors">
            <option value="">Bedroom</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>

        {/* Baños */}
        <div className="w-[47%] md:w-[12%]">
          <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-sm text-gray-600 focus:border-gray-400 focus:outline-none appearance-none transition-colors">
            <option value="">Bathroom</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
          </select>
        </div>

        {/* Rango de Precio */}
        <div className="w-[47%] md:w-1/6">
          <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-sm text-gray-600 focus:border-gray-400 focus:outline-none appearance-none transition-colors">
            <option value="">Price range</option>
            <option value="1m">$1M - $3M</option>
            <option value="3m">$3M - $5M</option>
            <option value="5m">$5M+</option>
          </select>
        </div>

        {/* Botón Reset */}
        <div className="w-[47%] md:w-[12%]">
          <button className="w-full py-3 bg-[#1e293b] hover:bg-black text-white text-xs font-bold tracking-widest uppercase rounded-md transition-colors">
            Reset Filters
          </button>
        </div>

      </div>
    </div>
  );
}