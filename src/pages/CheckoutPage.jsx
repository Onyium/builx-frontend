import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const empresaId = localStorage.getItem('empresa_id');
  
  // 🚨 OJO: Recuperamos el correo con el que se acaba de registrar
  const userEmail = localStorage.getItem('user_email') || ''; 

  useEffect(() => {
    // 1. Inicializar Lemon Squeezy
    window.createLemonSqueezy?.();
    const script = document.createElement('script');
    script.src = 'https://app.lemonsqueezy.com/js/lemon.js';
    script.async = true;
    document.body.appendChild(script);

    // 🚨 LA MAGIA CORREGIDA:
    script.onload = () => {
      // Configuramos el Setup pasándole el objeto 'eventHandler'
      window.LemonSqueezy?.Setup({
        eventHandler: (evento) => {
          
          // Esto imprimirá en la consola TODO lo que hagas en el popup
          console.log("📡 Señal de Lemon Squeezy detectada:", evento.event); 

          // Si el pago es un éxito total:
          if (evento.event === 'Checkout.Success') {
            console.log('🎉 ¡Pago exitoso detectado por el frontend!');
            
            // Esperamos 2.5 segundos para que veas el "check" verde de éxito y 
            // le demos tiempo a tu Node.js de guardar el pago en MySQL.
            setTimeout(() => {
              navigate('/dashboard'); // ¡Teletransportación automática!
            }, 2500);
          }
          
        }
      });
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [navigate]);

  const linkBase = "https://builx.lemonsqueezy.com/checkout/buy/715a2b85-e0d9-49d4-9f48-9e3193e44049"; 
  
  // 🚨 EL BLINDAJE DEL CORREO (Adiós al error 422):
  // Armamos el enlace de forma inteligente y segura
  let lemonCheckoutUrl = linkBase;
  const conector = linkBase.includes('?') ? '&' : '?';

  // 1. Siempre enviamos el ID de la empresa para que el webhook sepa quién pagó
  lemonCheckoutUrl += `${conector}checkout[custom][empresa_id]=${empresaId}`;

  // 2. Solo pegamos el correo si realmente existe en el localStorage
  if (userEmail) {
    lemonCheckoutUrl += `&checkout[email]=${encodeURIComponent(userEmail)}`;
  }

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-6 text-white text-center">
      <div className="max-w-md w-full bg-[#1E293B] p-8 rounded-2xl shadow-2xl border border-slate-800">
        <div className="text-5xl mb-4">💳</div>
        <h1 className="text-2xl font-black mb-2 tracking-tight">Paso Final: Activa tu Plan</h1>
        <p className="text-slate-400 text-sm mb-4">
          Estás registrando tu empresa con el correo: <br />
          <strong className="text-emerald-400 font-mono text-xs">{userEmail || 'No detectado'}</strong>
        </p>
        <p className="text-slate-400 text-xs mb-6">
          Para garantizar la activación automática, la pasarela procesará tu suscripción exclusivamente con esta cuenta.
        </p>

        <a
          href={lemonCheckoutUrl}
          className="lemonsqueezy-button w-full inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-600/30 text-sm"
        >
          💎 Proceder al Pago Seguro ($15/mes)
        </a>
      </div>
    </div>
  );
}