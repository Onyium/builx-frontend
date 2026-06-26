import React, { useState } from 'react';
import axios from 'axios';

export default function FacturacionManager({ empresa }) {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [motivo, setMotivo] = useState('');
    const [enviando, setEnviando] = useState(false);

    // Identificamos el plan actual
    const planActual = empresa?.plan_actual || 'starter';
    const esPro = planActual === 'pro';

    const handleGestionarSuscripcion = async () => {
        setEnviando(true);
        
        // 🚀 TRUCO MAESTRO: Abrimos una pestaña en blanco INMEDIATAMENTE
        // al hacer clic. Así engañamos al bloqueador de pop-ups.
        const nuevaPestana = window.open('about:blank', '_blank');

        try {
            // Pedimos el link al backend
            const res = await axios.post('https://builx-api.onrender.com/api/pagos/generar-portal', { 
                empresaId: empresa.id 
            });
            
            console.log("📦 Paquete recibido del backend:", res.data);

            if (res.data && res.data.url) {
                // 🚀 Inyectamos la URL real en la pestaña que ya teníamos abierta
                nuevaPestana.location.href = res.data.url;
            } else {
                nuevaPestana.close(); // Si algo sale mal, cerramos la pestaña fantasma
                console.error("El backend no mandó la URL correctamente", res.data);
                alert("Hubo un problema al generar el enlace seguro.");
            }

        } catch (error) {
            nuevaPestana.close(); // Cerramos si hubo error en el backend
            console.error("❌ Error al abrir portal:", error.response?.data || error.message);
            alert("Aún no tienes una suscripción activa o hubo un error de conexión.");
        }
        
        setEnviando(false);
        setMostrarModal(false);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-black text-gray-800 mb-2">Facturación y Plan</h2>
            <p className="text-gray-500 mb-8">Gestiona tu suscripción, métodos de pago y facturas.</p>

            {/* Tarjeta del Plan Actual */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Plan Actual</span>
                        {esPro ? (
                            <span className="bg-blue-100 text-blue-700 text-xs font-black px-3 py-1 rounded-full">PRO 🔥</span>
                        ) : (
                            <span className="bg-gray-100 text-gray-700 text-xs font-black px-3 py-1 rounded-full">STARTER</span>
                        )}
                    </div>
                    <h3 className="text-2xl font-black text-gray-900">
                        BuilX {esPro ? 'Pro' : 'Starter'}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2">
                        {esPro 
                            ? "Tienes acceso total sin comisiones y marca blanca activa." 
                            : "Estás en el plan básico con dominio compartido."}
                    </p>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-auto">
                    <button 
                        onClick={() => setMostrarModal(true)}
                        className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-colors shadow-lg"
                    >
                        Gestionar Suscripción
                    </button>
                    {!esPro && (
                        <button 
                            onClick={() => window.location.href = '/checkout'}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors shadow-lg text-center"
                        >
                            Mejorar a Pro
                        </button>
                    )}
                </div>
            </div>

            {/* Modal de Cancelación/Gestión */}
            {mostrarModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
                        <button 
                            onClick={() => setMostrarModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                        <h3 className="text-xl font-black text-gray-900 mb-2">Portal de Facturación</h3>
                        <p className="text-gray-500 text-sm mb-6">
                            Serás redirigido a nuestro portal seguro para actualizar tu tarjeta, descargar facturas o cancelar tu plan.
                        </p>
                        
                        <div className="mb-6">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                                (Opcional) ¿Hay algo que podamos mejorar?
                            </label>
                            <textarea 
                                value={motivo}
                                onChange={(e) => setMotivo(e.target.value)}
                                placeholder="Si piensas cancelar, cuéntanos brevemente por qué..."
                                className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors resize-none h-24"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button 
                                onClick={() => setMostrarModal(false)}
                                className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                Volver
                            </button>
                            <button 
                                onClick={handleGestionarSuscripcion}
                                disabled={enviando}
                                className="flex-1 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors flex justify-center items-center gap-2"
                            >
                                {enviando ? 'Cargando...' : 'Ir a Paddle 💳'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}