import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Planes() {
    const navigate = useNavigate();

    // 🚨 LA MAGIA ESTÁ AQUÍ 🚨
    // Esta función guarda la elección en la memoria y te manda al Checkout
    const elegirPlanYIrAPagar = (plan_elegido) => {
        localStorage.setItem('selected_plan', plan_elegido);
        navigate('/checkout'); // Asegúrate de que esta sea la ruta de tu Imagen 2
    };

    return (
        <div className="min-h-screen bg-[#0a101d] text-white py-20 px-4 flex items-center justify-center font-sans">
            <div className="max-w-6xl w-full flex flex-col md:flex-row gap-8 items-stretch justify-center">
                
                {/* =========================================
                    TARJETA PLAN STARTER ($15)
                ========================================= */}
                <div className="w-full md:w-1/2 max-w-md bg-[#1a233a] rounded-3xl p-8 border border-white/5 flex flex-col shadow-xl">
                    <h2 className="text-2xl font-black tracking-tight mb-1">PLAN STARTER</h2>
                    <p className="text-slate-400 text-sm mb-6">(Ideal para emprendedores y negocios locales emergentes)</p>
                    
                    <div className="flex items-end gap-1 mb-6">
                        <span className="text-5xl font-black tracking-tighter">$15</span>
                        <span className="text-slate-400 font-medium mb-1">/ mes</span>
                    </div>

                    <p className="text-slate-300 text-sm mb-8 leading-relaxed">
                        Empieza a recibir pedidos o consultas hoy mismo sin complicaciones técnicas.
                    </p>

                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-start gap-3 text-sm text-slate-200">
                            <span className="text-green-500 mt-0.5">✅</span>
                            <span><strong>Diseño Automatizado con IA:</strong> Extracción de tu catálogo.</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-slate-200">
                            <span className="text-green-500 mt-0.5">✅</span>
                            <span><strong>Integración a WhatsApp:</strong> Botón directo para cerrar ventas.</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-slate-200">
                            <span className="text-green-500 mt-0.5">✅</span>
                            <span><strong>Panel de Control:</strong> Actualiza fotos y precios tú mismo.</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-slate-200">
                            <span className="text-green-500 mt-0.5">✅</span>
                            <span>Alojamiento en la nube (Hosting gratuito).</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-slate-400">
                            <span className="text-yellow-500 mt-0.5">⚠️</span>
                            <span><strong>Dominio compartido:</strong> Usará <em>tunegocio.builx.com</em>.</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-slate-400">
                            <span className="text-yellow-500 mt-0.5">⚠️</span>
                            <span><strong>Patrocinado:</strong> Incluye una discreta marca de agua.</span>
                        </li>
                    </ul>

                    {/* 👇 EL BOTÓN QUE ACTIVA LA FUNCIÓN Y MANDA 'starter' 👇 */}
                    <button 
                        onClick={() => elegirPlanYIrAPagar('starter')}
                        className="w-full bg-transparent border border-slate-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                        Elegir Plan Starter
                    </button>
                </div>

                {/* =========================================
                    TARJETA PLAN PRO ($39) - DESTACADA
                ========================================= */}
                <div className="w-full md:w-1/2 max-w-md bg-gradient-to-b from-[#0e172a] to-[#020617] rounded-3xl p-8 border border-blue-500/50 flex flex-col shadow-[0_0_40px_rgba(59,130,246,0.15)] relative transform md:-translate-y-4">
                    
                    {/* Badge Destacado */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs font-black px-6 py-1.5 rounded-full uppercase tracking-wider shadow-[0_0_15px_rgba(59,130,246,0.8)]">
                        La opción destacada 🔥
                    </div>

                    <h2 className="text-2xl font-black tracking-tight mb-1 mt-4">PLAN PRO</h2>
                    <p className="text-slate-400 text-sm mb-6">(El estándar B2B para hoteles, cabañas y negocios establecidos)</p>
                    
                    <div className="flex items-end gap-1 mb-6">
                        <span className="text-5xl font-black tracking-tighter">$39</span>
                        <span className="text-slate-400 font-medium mb-1">/ mes</span>
                    </div>

                    <p className="text-slate-300 text-sm mb-8 leading-relaxed font-medium">
                        Proyecta autoridad total y elimina a los intermediarios. Tu negocio, tu marca.
                    </p>

                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-start gap-3 text-sm text-slate-200">
                            <span className="text-green-500 mt-0.5">✅</span>
                            <span><strong>Todo lo del Plan Starter, más:</strong></span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-slate-200">
                            <span className="text-pink-500 mt-0.5">🚀</span>
                            <span><strong>Cero Comisiones por Venta:</strong> El 100% de la ganancia es tuya.</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-slate-200">
                            <span className="text-blue-400 mt-0.5">🌐</span>
                            <span><strong>Dominio Propio Incluido:</strong> Tu página será <em>www.tunegocio.com</em>.</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-slate-200">
                            <span className="text-purple-400 mt-0.5">🎨</span>
                            <span><strong>100% Marca Blanca:</strong> Tu marca es la única protagonista.</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-slate-200">
                            <span className="text-orange-400 mt-0.5">⚡</span>
                            <span><strong>Galería de Alta Velocidad:</strong> Optimización extrema.</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-slate-200">
                            <span className="text-gray-400 mt-0.5">🛠️</span>
                            <span><strong>Soporte Técnico Directo:</strong> Prioridad en atención y mantenimiento.</span>
                        </li>
                    </ul>

                    {/* 👇 EL BOTÓN QUE ACTIVA LA FUNCIÓN Y MANDA 'pro' 👇 */}
                    <button 
                        onClick={() => elegirPlanYIrAPagar('pro')}
                        className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all cursor-pointer"
                    >
                        Elegir Plan Pro
                    </button>
                </div>

            </div>
        </div>
    );
}