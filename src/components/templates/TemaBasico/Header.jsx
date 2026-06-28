import React from 'react';

export default function Header({ empresa, getUrl }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center text-white mix-blend-difference pointer-events-none">
      <div className="text-2xl font-serif tracking-widest uppercase pointer-events-auto">
        {empresa?.nombre || "Jägerhof"}
      </div>
      
      <button aria-label="Menu" className="space-y-2 pointer-events-auto hover:opacity-70 transition-opacity">
        <div className="w-8 h-px bg-white"></div>
        <div className="w-8 h-px bg-white"></div>
      </button>
    </header>
  );
}