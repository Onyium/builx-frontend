import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import GlobeSpline from './GlobeSpline'; // Importamos el nuevo mundo

const FeaturesAI = () => {
  return (
    <section className="py-24 px-6 border-y border-white/5 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* TEXTO IZQUIERDA */}
        <div className="flex-1 space-y-8 z-10">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Más que una web, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              una máquina de ventas.
            </span>
          </h2>
          {/* ... resto de tu contenido de texto ... */}
        </div>

        {/* MUNDO SPLINE DERECHA */}
        <div className="flex-1 w-full relative">
          {/* El resplandor detrás para que se vea de lujo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <GlobeSpline />
        </div>

      </div>
    </section>
  );
};

export default FeaturesAI;