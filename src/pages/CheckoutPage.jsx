import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('user_email') || ''; 
  const empresaNombre = localStorage.getItem('empresa_nombre') || 'Tu Hotel';
  
  // ESTADO PARA SABER QUÉ PLAN ELIGIÓ
  const [selectedPlan, setSelectedPlan] = useState(null);

  // 🚨 TUS IDs DE SUSCRIPCIÓN DE PAYPAL
  const paypalClientId = "BAAleYJrH9Zu1Y1qicYxGu5o95PikA7RZj7VNqKomKvZDV7wWTIKrE3mTr_WaQscrg1NsZR8VmPM3T7w5I";
  const planStarterId = "P-67U06159VB849570KNJDJ27Q"; // Ej: P-XXXXXXXXXXX
  const planProId = "P-67U06159VB849570KNJDJ27Q"; // Tu ID actual

  useEffect(() => {
    // Si no hay sesión, lo mandamos a registrarse
    if (!userEmail) {
      navigate('/register');
      return;
    }

    // CARGAMOS EL SCRIPT DE PAYPAL DINÁMICAMENTE
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&vault=true&intent=subscription`;
    script.setAttribute("data-sdk-integration-source", "button-factory");
    script.async = true;
    
    script.onload = () => {
      console.log("PayPal Script Cargado");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Limpiamos al salir de la página
    };
  }, [navigate, userEmail]);

  // FUNCIÓN PARA RENDERIZAR EL BOTÓN CUANDO SELECCIONAN UN PLAN
  const handleSelectPlan = (planType) => {
    setSelectedPlan(planType);
    
    const planId = planType === 'pro' ? planProId : planStarterId;
    
    // Limpiamos el contenedor anterior si cambiaron de opinión
    document.getElementById('paypal-button-container').innerHTML = '';

    // Renderizamos el botón de PayPal
    window.paypal.Buttons({
      style: {
          shape: 'rect',
          color: 'blue', // Color azul para que combine con BuilX
          layout: 'vertical',
          label: 'subscribe'
      },
      createSubscription: function(data, actions) {
        return actions.subscription.create({
          'plan_id': planId
        });
      },
      onApprove: function(data, actions) {
        // 🎉 AQUÍ OCURRE LA MAGIA CUANDO PAGAN
        console.log("Pago completado:", data.subscriptionID);
        
        // Lo mandamos al dashboard directamente
        navigate('/dashboard'); 
      }
    }).render('#paypal-button-container');
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-white font-sans selection:bg-cyan-500 flex flex-col relative overflow-hidden pb-12">
      
      {/* FONDO AURORA MESH */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-600/20 rounded-full blur-[120px] md:blur-[150px] animate-blob"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-500/20 rounded-full blur-[120px] md:blur-[180px] animate-blob animation-delay-2000"></div>
      </div>

      {/* HEADER */}
      <nav className="w-full p-6 flex justify-between items-center z-10 max-w-5xl mx-auto">
        <div className="text-3xl font-black tracking-tighter text-white">
          Buil<span className="text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]">X</span>
        </div>
        <button 
          onClick={() => navigate(-1)} 
          className="text-slate-400 hover:text-white font-bold transition-colors text-sm px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5"
        >
          Volver atrás
        </button>
      </nav>

      <div className="text-center z-10 mt-4 mb-10 px-4">
        <h2 className="text-3xl md:text-4xl font-black mb-3">Activa el motor de reservas de <span className="text-cyan-400">{empresaNombre}</span></h2>
        <p className="text-slate-400 font-medium">Selecciona tu plan para publicar tu página y comenzar a recibir reservas hoy mismo.</p>
      </div>

      {/* CONTENEDOR DE TARJETAS Y PAGO */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 z-10">
        
        {!selectedPlan ? (
          // VISTA 1: MOSTRAR LOS PLANES
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full animate-fade-in-down">
            
            {/* PLAN STARTER */}
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col backdrop-blur-sm transition-transform hover:-translate-y-1">
              <h3 className="text-2xl font-black text-white mb-2">PLAN STARTER</h3>
              <p className="text-slate-400 text-sm mb-6 min-h-[40px]">(Ideal para hostales que quieren digitalizarse)</p>
              <div className="mb-8">
                <span className="text-5xl font-black text-white">$15</span>
                <span className="text-slate-400 font-medium"> / mes</span>
              </div>
              
              <ul className="space-y-5 mb-10 flex-1 text-slate-300">
                <li className="flex gap-3 items-start"><span className="text-cyan-400 text-xl mt-0.5">✅</span> <span><strong>Motor de Reservas:</strong> Página web completa.</span></li>
                <li className="flex gap-3 items-start"><span className="text-cyan-400 text-xl mt-0.5">✅</span> <span><strong>Integración a WhatsApp:</strong> Botón directo para cerrar ventas.</span></li>
                <li className="flex gap-3 items-start"><span className="text-yellow-500 text-xl mt-0.5">⚠️</span> <span><strong>Dominio compartido:</strong> Usará <em>tuhostal.builx.com</em>.</span></li>
              </ul>
              
              <button 
                onClick={() => handleSelectPlan('starter')}
                className="w-full py-4 rounded-xl font-bold border border-white/20 hover:bg-white/10 transition-colors text-white text-lg">
                Elegir Starter
              </button>
            </div>

            {/* PLAN PRO */}
            <div className="bg-gradient-to-b from-blue-900/40 to-[#050B14] border-2 border-cyan-500/50 rounded-3xl p-8 md:p-10 flex flex-col relative shadow-[0_0_50px_rgba(34,211,238,0.15)] transform md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-black px-6 py-1.5 rounded-full text-sm shadow-[0_0_20px_rgba(59,130,246,0.5)] tracking-wide whitespace-nowrap">
                LA OPCIÓN ESTÁNDAR 🔥
              </div>
              <h3 className="text-2xl font-black text-white mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">PLAN PRO</h3>
              <p className="text-cyan-200/70 text-sm mb-6 min-h-[40px]">(Para hoteles que cuidan su presencia corporativa)</p>
              <div className="mb-8">
                <span className="text-6xl font-black text-white">$39</span>
                <span className="text-slate-400 font-medium"> / mes</span>
              </div>
              
              <ul className="space-y-5 mb-10 flex-1 text-slate-200">
                <li className="flex gap-3 items-start"><span className="text-blue-400 text-xl mt-0.5">✅</span> <span><strong>Todo lo del Plan Starter.</strong></span></li>
                <li className="flex gap-3 items-start"><span className="text-blue-400 text-xl mt-0.5">🚀</span> <span><strong>Cero Comisiones por Reserva:</strong> El 100% de la noche es tuya.</span></li>
                <li className="flex gap-3 items-start"><span className="text-blue-400 text-xl mt-0.5">🌐</span> <span><strong>Dominio Propio Incluido:</strong> <em>www.tuhotel.com</em>.</span></li>
              </ul>
              
              <button 
                onClick={() => handleSelectPlan('pro')}
                className="w-full py-4 rounded-xl font-black bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all active:scale-95 text-lg">
                Elegir Pro
              </button>
            </div>

          </div>
        ) : (
          // VISTA 2: EL CONTENEDOR DE PAYPAL
          <div className="w-full max-w-md bg-white/[0.05] border border-white/10 p-8 rounded-3xl backdrop-blur-md animate-fade-in-right text-center">
            <button 
              onClick={() => setSelectedPlan(null)} 
              className="text-slate-400 hover:text-white text-sm font-bold mb-6 flex items-center justify-center gap-2 w-full"
            >
              ← Cambiar de plan
            </button>
            
            <h3 className="text-2xl font-black mb-2">Completar Suscripción</h3>
            <p className="text-slate-400 mb-8">Plan seleccionado: <strong className="text-white uppercase">{selectedPlan}</strong></p>
            
            {/* 🚨 AQUÍ SE RENDERIZA EL BOTÓN DE PAYPAL 🚨 */}
            <div id="paypal-button-container" className="min-h-[150px] flex items-center justify-center bg-white/5 rounded-xl p-4"></div>
            
            <p className="text-xs text-slate-500 mt-6 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Transacción 100% segura por PayPal
            </p>
          </div>
        )}

      </div>
      
      <style>{`
        .animate-fade-in-down { animation: fadeInDown 0.4s ease-out forwards; }
        .animate-fade-in-right { animation: fadeInRight 0.3s ease-out forwards; }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  );
}