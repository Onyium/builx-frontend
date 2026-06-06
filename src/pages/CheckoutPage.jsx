import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializePaddle } from '@paddle/paddle-js';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [paddle, setPaddle] = useState(null);
  
  const empresaId = localStorage.getItem('empresa_id');
  const userEmail = localStorage.getItem('user_email') || ''; 

  useEffect(() => {
    // Si por alguna razón no hay correo, lo regresamos al registro
    if (!userEmail) {
      navigate('/register');
      return;
    }

    // 1. Inicializar Paddle
    initializePaddle({
      environment: 'production', // Usa 'sandbox' si vas a hacer pruebas falsas primero
      token: 'live_22754b75a5b0306a909407d77a8', // 🚨 REEMPLAZA: Ve a Developer > Authentication en Paddle
      eventCallback: function(event) {
        // Esto imprimirá en la consola TODO lo que hagas en el popup de Paddle
        console.log("📡 Señal de Paddle detectada:", event.name); 

        // Si el pago es un éxito total (En Paddle el evento se llama 'checkout.completed')
        if (event.name === 'checkout.completed') {
          console.log('🎉 ¡Pago exitoso detectado por el frontend!');
          
          // Esperamos 2.5 segundos para que vea el check verde y luego lo mandamos al dashboard
          setTimeout(() => {
            navigate('/dashboard'); // ¡Teletransportación automática!
          }, 2500);
        }
      }
    }).then((paddleInstance) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });

  }, [navigate, userEmail]);

  // 🚨 LA MAGIA DE PADDLE: Función que se ejecuta al hacer clic en el botón
  const openPaddleCheckout = (e) => {
    e.preventDefault();

    if (!paddle) {
      console.warn('Paddle no ha terminado de cargar');
      return;
    }

    paddle.Checkout.open({
      items: [
        {
          priceId: 'pro_01kt9p9g1tvtk5negnycg6gvmh', // 🚨 REEMPLAZA: Tu ID del producto "BuilX base option" de $11/mes
          quantity: 1
        }
      ],
      customer: {
        email: userEmail // El correo se autocompleta para el cliente
      },
      customData: {
        empresa_id: empresaId // 🚨 SÚPER IMPORTANTE: Esto viajará a tu Webhook de Node.js
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-white font-sans selection:bg-blue-500 flex flex-col relative overflow-hidden">
      
      {/* FONDO AURORA MESH */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[120px] md:blur-[150px] animate-blob"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-500/20 rounded-full blur-[120px] md:blur-[180px] animate-blob animation-delay-2000"></div>
      </div>

      {/* NAVBAR SIMPLE */}
      <nav className="w-full p-6 flex justify-center items-center z-10 max-w-7xl mx-auto">
        <div className="text-3xl font-black tracking-tighter text-white">
          Buil<span className="text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]">X</span>
        </div>
      </nav>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 z-10">
        <div className="max-w-4xl w-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          {/* COLUMNA IZQUIERDA: Beneficios */}
          <div className="w-full md:w-5/12 bg-white/[0.02] p-8 sm:p-10 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center">
            <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full mb-4 w-fit">
              Plan Profesional
            </div>
            <h2 className="text-3xl font-black mb-2">BuilX Pro</h2>
            <p className="text-slate-400 text-sm mb-8">Todo lo que necesitas para digitalizar tu negocio y recibir pedidos directamente a tu WhatsApp.</p>
            
            <ul className="space-y-4">
              {[
                'Catálogo digital ilimitado',
                'Panel de administración',
                'Integración directa a WhatsApp',
                'Soporte técnico prioritario'
              ].map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA DERECHA: Checkout */}
          <div className="w-full md:w-7/12 p-8 sm:p-10 flex flex-col justify-center relative">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Resumen de pago</h3>
              <div className="flex items-end justify-center gap-1">
                <span className="text-5xl font-black tracking-tighter">$11</span>
                <span className="text-slate-400 font-medium mb-1">.00 / mes</span>
              </div>
            </div>

            {/* Caja de confirmación de correo */}
            <div className="bg-black/30 border border-white/5 rounded-xl p-4 mb-8 text-center">
              <p className="text-xs text-slate-400 mb-1">Activando cuenta para:</p>
              <p className="text-emerald-400 font-mono font-bold">{userEmail || 'cargando...'}</p>
            </div>

            {/* BOTÓN DE PADDLE */}
            <button
              onClick={openPaddleCheckout}
              className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Proceder al Pago Seguro
            </button>

            {/* Garantía y Seguridad */}
            <div className="mt-6 flex flex-col items-center gap-4">
              <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                <svg className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <p className="text-sm font-bold text-emerald-400">Garantía de 14 días</p>
                  <p className="text-xs text-emerald-400/80 mt-1">Si no estás satisfecho <strong>dentro de tus primeros 14 días</strong> de suscripción, te devolvemos el 100% de tu dinero. Sin preguntas ni complicaciones.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Pagos encriptados y procesados de forma segura
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}