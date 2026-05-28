import React, { useState, useEffect } from 'react';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/70 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-2xl font-bold tracking-tighter cursor-pointer">
          Buil<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">X</span>
        </div>
        <button className="px-6 py-2.5 rounded-full text-sm font-medium bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
          Iniciar Sesión
        </button>
      </div>
    </nav>
  );
};

export default NavBar;