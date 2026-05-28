import React from 'react';
import { Zap, Shield, Smartphone } from 'lucide-react';

const BenefitsGrid = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ingeniería de élite, a tu alcance</h2>
          <p className="text-gray-400 text-lg">Tecnología de punta diseñada para maximizar tu conversión.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tarjeta 1 */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3">Velocidad de Carga</h3>
            <p className="text-gray-400">Infraestructura optimizada para que tu sitio cargue en milisegundos. Sin esperas, sin rebotes.</p>
          </div>
          
          {/* Tarjeta 2 */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
              <Shield className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3">Seguridad 24/7</h3>
            <p className="text-gray-400">Protocolos SSL de grado bancario y protección contra ataques. Tu negocio blindado siempre.</p>
          </div>
          
          {/* Tarjeta 3 */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-pink-500/50 hover:bg-white/10 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-6 text-pink-400 group-hover:scale-110 transition-transform">
              <Smartphone className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3">Mobile-First</h3>
            <p className="text-gray-400">Diseño responsivo quirúrgico. Tu plataforma se verá y operará perfecta en cualquier dispositivo móvil.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsGrid;