import React, { useState, useEffect } from 'react';

// Importación de componentes
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import CatalogSection from './CatalogSection';
import Drawer from './Drawer';
import Footer from './Footer';

// Importación de datos
import { dogBreeds } from './data';

export default function LandingPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState(null);

  // Truco para deslizamiento suave
  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth');
    return () => document.documentElement.classList.remove('scroll-smooth');
  }, []);

  const handleOpenDrawer = (breed = null) => {
    setSelectedBreed(breed);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setSelectedBreed(null);
    }, 300); // Espera la animación para limpiar la raza
  };

  return (
    <div className="bg-[#FAF7F2] text-[#2C1E16] font-sans selection:bg-amber-700 selection:text-white min-h-screen relative overflow-x-hidden flex flex-col">
      
      <Navbar onOpenDrawer={handleOpenDrawer} />

      <main className="flex-grow">
        <HeroSection onOpenDrawer={handleOpenDrawer} />
        <CatalogSection breeds={dogBreeds} onSelectBreed={handleOpenDrawer} />
      </main>

      <Footer />

      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={handleCloseDrawer} 
        selectedBreed={selectedBreed} 
      />

    </div>
  );
}