import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializePaddle } from '@paddle/paddle-js';
import axios from 'axios'; // 🚨 IMPORTANTE: Añadimos axios para hablar con la BD

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [paddle, setPaddle] = useState(null);
  
  const empresaId = localStorage.getItem('empresa_id') || '1';
  const userEmail = localStorage.getItem('user_email') || ''; 

  useEffect(() => {
    // Si no hay sesión, lo mandamos a registrarse
    if (!userEmail) {
      navigate('/register');
      return;
    }

    // 🚀 Inicialización directa y limpia de Paddle
    initializePaddle({ 
      token: 'live_b21a2a43266ffbf7e65f3d7ddbd', // Tu token real de pruebas
      eventCallback: async function(event) { // 🚨 Lo hacemos ASYNC
        console.log("📡 Señal de Paddle detectada:", event.name); 

        if (event.name === 'checkout.completed') {
          console.log('🎉 ¡Pago exitoso detectado por el frontend!');
          
          try {
            // 🚨 LA MAGIA: Rescatamos el plan que eligió y el ID de transacción de Paddle
            const planComprado = event.data?.custom_data?.plan_elegido || 'starter';
            const transaccionId = event.data?.transaction_id || 'sub_paddle';

            // Le avisamos a tu backend que actualice el Lead a PAGADO
            await axios.post('https://builx-api.onrender.com/api/pagos/confirmar-paddle-rapido', {
              empresa_id: empresaId,
              suscripcion_id: transaccionId,
              plan_elegido: planComprado
            });
            console.log("✅ Base de datos actualizada a PAGADO");
          } catch (error) {
            console.error("❌ Error actualizando la BD desde el frontend:", error);
          }
          
          // 🚀 Redirección nativa del navegador al panel después del confeti
          setTimeout(() => {
            window.location.href = '/dashboard'; 
          }, 2500);
        }
      }
    }).then((paddleInstance) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });

  }, [navigate, userEmail, empresaId]);

  // 🚀 El lanzador dinámico de Paddle
  const openPaddleCheckout = (plan) => {
    if (!paddle) {
      alert("El sistema de pagos está cargando, intenta en un segundo.");
      return;
    }

    // Asignamos el ID correcto según el botón que presionó
    const priceId = plan === 'pro' 
      ? 'pri_01kx1df5azcw72rgnc52peb9kt' // ID del Plan Pro ($39)
      : 'pri_01kx1d4rwcxw5zw2hbhp4z9v2v'; // ID del Plan Starter ($15)

    // Construimos el objeto customer solo si tenemos el email
    const customerConfig = userEmail ? { email: userEmail } : undefined;

    paddle.Checkout.open({
      items: [{ priceId: priceId, quantity: 1 }],
      customer: customerConfig,
      customData: {
        empresa_id: empresaId,
        plan_elegido: plan // 👈 Aquí viaja 'starter' o 'pro' hacia el eventCallback
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-white font-sans selection:bg-blue-500 flex flex-col relative overflow-hidden pb-12">
      
      {/* FONDO AURORA MESH */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[120px] md:blur-[150px] animate-blob"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-500/20 rounded-full blur-[120px] md:blur-[180px] animate-blob animation-delay-2000"></div>
      </div>

      {/* HEADER DE LA PANTALLA DE PAGO */}
      <nav className="w-full p-6 flex justify-between items-center z-10 max-w-5xl mx-auto">
        <div className="text-3xl font-black tracking-tighter text-white">
          Buil<span className="text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]">X</span>
        </div>
        <button 
          onClick={() => navigate(-1)} // Regresa al Dashboard de forma fluida
          className="text-slate-400 hover:text-white font-bold transition-colors text-sm px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5"
        >
          Volver al Panel
        </button>
      </nav>

      <div className="text-center z-10 mt-4 mb-10 px-4">
        <h2 className="text-3xl md:text-4xl font-black mb-3">Estás a un paso de lanzar tu sitio</h2>
        <p className="text-slate-400 font-medium">Selecciona el plan que mejor se adapte al momento de tu negocio.</p>
      </div>

      {/* CONTENEDOR DE TARJETAS */}
      <div className="flex-1 flex items-center justify-center p-4 z-10">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
          
          {/* Tarjeta 1: PLAN STARTER */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col backdrop-blur-sm transition-transform hover:-translate-y-1">
            <h3 className="text-2xl font-black text-white mb-2">PLAN STARTER</h3>
            <p className="text-slate-400 text-sm mb-6 min-h-[40px]">(Ideal para emprendedores y negocios locales emergentes)</p>
            <div className="mb-8">
              <span className="text-5xl font-black text-white">$15</span>
              <span className="text-slate-400 font-medium"> / mes</span>
            </div>
            <p className="text-slate-300 mb-8 font-medium">Empieza a recibir pedidos o consultas hoy mismo sin complicaciones técnicas.</p>
            
            <ul className="space-y-5 mb-10 flex-1 text-slate-300">
              <li className="flex gap-3 items-start"><span className="text-emerald-400 text-xl mt-0.5">✅</span> <span><strong>Diseño Automatizado con IA:</strong> Extracción de tu catálogo.</span></li>
              <li className="flex gap-3 items-start"><span className="text-emerald-400 text-xl mt-0.5">✅</span> <span><strong>Integración a WhatsApp:</strong> Botón directo para cerrar ventas.</span></li>
              <li className="flex gap-3 items-start"><span className="text-emerald-400 text-xl mt-0.5">✅</span> <span><strong>Panel de Control:</strong> Actualiza fotos y precios tú mismo.</span></li>
              <li className="flex gap-3 items-start"><span className="text-emerald-400 text-xl mt-0.5">✅</span> <span>Alojamiento en la nube de alta disponibilidad.</span></li>
              <li className="flex gap-3 items-start"><span className="text-yellow-500 text-xl mt-0.5">⚠️</span> <span><strong>Dominio compartido:</strong> Usará <em>tunegocio.builxapp.com</em>.</span></li>
              <li className="flex gap-3 items-start"><span className="text-yellow-500 text-xl mt-0.5">⚠️</span> <span><strong>Patrocinado:</strong> Incluye una discreta marca de agua.</span></li>
            </ul>
            
            <button 
              onClick={() => openPaddleCheckout('starter')}
              className="w-full py-4 rounded-xl font-bold border border-white/20 hover:bg-white/10 transition-colors text-white text-lg flex justify-center items-center gap-2">
              Lanzar con Starter
            </button>
          </div>

          {/* Tarjeta 2: PLAN PRO */}
          <div className="bg-gradient-to-b from-blue-900/40 to-[#050B14] border-2 border-blue-500/50 rounded-3xl p-8 md:p-10 flex flex-col relative shadow-[0_0_50px_rgba(37,99,235,0.15)] transform md:-translate-y-4">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-black px-6 py-1.5 rounded-full text-sm shadow-[0_0_20px_rgba(59,130,246,0.5)] tracking-wide whitespace-nowrap">
              LA OPCIÓN DESTACADA 🔥
            </div>
            <h3 className="text-2xl font-black text-white mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">PLAN PRO</h3>
            <p className="text-blue-200/70 text-sm mb-6 min-h-[40px]">(El estándar B2B para hoteles, cabañas y negocios establecidos)</p>
            <div className="mb-8">
              <span className="text-6xl font-black text-white">$39</span>
              <span className="text-slate-400 font-medium"> / mes</span>
            </div>
            <p className="text-white mb-8 font-medium">Proyecta autoridad total y elimina a los intermediarios. Tu negocio, tu marca.</p>
            
            <ul className="space-y-5 mb-10 flex-1 text-slate-200">
              <li className="flex gap-3 items-start"><span className="text-blue-400 text-xl mt-0.5">✅</span> <span><strong>Todo lo del Plan Starter, más:</strong></span></li>
              <li className="flex gap-3 items-start"><span className="text-blue-400 text-xl mt-0.5">🚀</span> <span><strong>Cero Comisiones por Venta:</strong> El 100% de la ganancia es tuya.</span></li>
              <li className="flex gap-3 items-start"><span className="text-blue-400 text-xl mt-0.5">🌐</span> <span><strong>Dominio Propio Incluido:</strong> Tu página será <em>www.tunegocio.com</em>.</span></li>
              <li className="flex gap-3 items-start"><span className="text-blue-400 text-xl mt-0.5">🎨</span> <span><strong>100% Marca Blanca:</strong> Tu marca es la única protagonista.</span></li>
              <li className="flex gap-3 items-start"><span className="text-blue-400 text-xl mt-0.5">⚡</span> <span><strong>Galería de Alta Velocidad:</strong> Optimización extrema.</span></li>
              <li className="flex gap-3 items-start"><span className="text-blue-400 text-xl mt-0.5">🛠️</span> <span><strong>Soporte Técnico Directo:</strong> Prioridad en atención y mantenimiento.</span></li>
            </ul>
            
            <button 
              onClick={() => openPaddleCheckout('pro')}
              className="w-full py-4 rounded-xl font-black bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all active:scale-95 text-lg flex justify-center items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Lanzar con Pro
            </button>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Pagos procesados de forma segura
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}