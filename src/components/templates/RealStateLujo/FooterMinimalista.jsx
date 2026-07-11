import React from 'react';

export default function FooterMinimalista({ footerConfig, contacto }) {
  return (
    <footer className="w-full bg-white text-gray-900 border-t border-gray-200 py-16 px-6 md:px-12 font-sans">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        
        {/* Marca */}
        <div className="flex-1">
          <h4 className="font-serif text-2xl uppercase tracking-[0.15em] mb-3">
            {footerConfig?.frase_final || "Real Estate Co."}
          </h4>
          <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase font-bold">
            {footerConfig?.frase_cursiva || "Exclusive Properties"}
          </p>
        </div>

        {/* Enlaces (Policies, Terms, etc.) */}
        <div className="flex flex-1 justify-start md:justify-center flex-wrap gap-8 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500">
          {footerConfig?.enlaces?.map((link, index) => (
            <a key={index} href="#" className="hover:text-black transition-colors">{link}</a>
          ))}
        </div>

        {/* Contacto Directo */}
        <div className="flex-1 flex flex-col items-start md:items-end gap-3 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500">
          {contacto?.email && (
            <a href={`mailto:${contacto.email}`} className="hover:text-black transition-colors">
              {contacto.email}
            </a>
          )}
          {contacto?.telefono && (
            <a href={`tel:${contacto.telefono}`} className="hover:text-black transition-colors">
              {contacto.telefono}
            </a>
          )}
        </div>
        
      </div>
    </footer>
  );
}