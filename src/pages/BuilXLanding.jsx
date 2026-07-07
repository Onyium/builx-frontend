import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function LandingMarketing() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const comparativas = [
    { id: 1, texto: "Netflix" },
    { id: 2, texto: "tu plan de datos" },
    { id: 3, texto: "dos Starbucks" },
    { id: 4, texto: "una pizza" },
    { id: 5, texto: "Spotify Premium" }
  ];

  const [index, setIndex] = useState(0);

  // 🚨 RASTREO DE LEADS DESDE CORREO (CON RASTREADOR VISUAL)
  useEffect(() => {
    const emailLead = searchParams.get('correo'); 
    
    console.log("🔍 Analizando URL en busca de correo...");
    console.log("📧 Correo detectado:", emailLead);

    if (emailLead) {
      console.log("✅ ¡Correo atrapado! Disparando POST a MySQL...");
      localStorage.setItem('lead_origen_email', emailLead);

      axios.post('https://builx-api.onrender.com/api/admin/registrar-visita', {
        email: emailLead,
        accion: 'abrio_landing'
      })
      .then(respuesta => {
         console.log("🚀 Servidor dice:", respuesta.data.message);
      })
      .catch(err => {
         console.error("❌ Error reportando visita:", err);
      });
    } else {
      console.log("⚠️ No se encontró '?correo=' en la URL. Todo normal.");
    }
  }, [searchParams]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % comparativas.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#050B14] text-white font-sans selection:bg-blue-500 selection:text-white min-h-screen relative overflow-hidden">
      
      {/* FONDO AURORA MESH */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[120px] md:blur-[150px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-500/20 rounded-full blur-[120px] md:blur-[180px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[10%] w-[50vw] h-[50vw] bg-blue-700/30 rounded-full blur-[120px] md:blur-[150px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">

        {/* NAVBAR FLOTANTE */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#050B14]/40 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer group">
              <span className="text-3xl font-black tracking-tighter text-white">
                Buil<span className="text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]">X</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#demo" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Ver Demo</a>
              <a href="#caracteristicas" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Características</a>
              <a href="#precios" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Precios</a>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="hidden md:block text-sm font-bold text-slate-300 hover:text-white transition-colors">
                Iniciar Sesión
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black py-3 px-8 rounded-xl text-lg transition-all active:scale-95 hidden md:flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                Crear Motor 🚀
              </button>

              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-slate-300 hover:text-white p-2"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> 
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /> 
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* MENÚ MÓVIL */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 w-full bg-[#050B14]/95 backdrop-blur-xl border-b border-white/10 px-6 py-8 flex flex-col gap-6 shadow-2xl">
              <button 
                onClick={() => { navigate('/register'); setIsMobileMenuOpen(false); }}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                Crear Motor de Reservas 🚀
              </button>
            </div>
          )}
        </nav>

        {/* I. EL GANCHO Y EL VIDEO (ESTRUCTURA VSL) */}
        <section className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto min-h-[90vh] flex items-center" id="demo">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            
            {/* COLUMNA IZQUIERDA: EL DOLOR Y LA SOLUCIÓN */}
            <div className="text-left pt-8">
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-red-500/40 bg-red-500/10 text-red-400 text-sm font-bold tracking-widest uppercase backdrop-blur-md">
                Alto a las comisiones abusivas
              </div>
              
              <h2 className="text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6">
                <span className="block text-white">Ahorra cientos de</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500 mb-2">dólares al mes</span>
                <span className="block text-white mb-2">en tu hotel.</span>
              </h2>
              
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-8 max-w-lg">
                Deja de regalar el 20% de tus ganancias. Obtén tu propio motor de reservas directas conectado a WhatsApp y <strong>quédate con el 100% de tu dinero.</strong>
              </p>
              
              <button 
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black py-4 px-10 rounded-xl text-xl transition-all active:scale-95 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.4)] w-full sm:w-auto mb-6"
              >
                Empezar configuración gratis
              </button>

              {/* ANCLAJE DE PRECIO DINÁMICO */}
              <div className="flex items-center gap-3 text-sm md:text-base text-slate-400 font-medium">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span>Tu motor funcionando por menos de lo que cuesta <strong className="text-white bg-white/10 px-2 py-0.5 rounded transition-all">{comparativas[index].texto}</strong> al mes.</span>
              </div>
            </div>

            {/* COLUMNA DERECHA: EL REPRODUCTOR DE VIDEO */}
            <div className="relative flex justify-center items-center w-full mt-8 lg:mt-0">
              {/* Brillo de fondo para el video */}
              <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none"></div>
              
              {/* Contenedor del Video */}
              <div className="relative w-full aspect-video bg-[#0A1120] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.15)] group">
                
                {/* 🚨 AQUÍ VA TU VIDEO UGH.MP4 🚨 */}
                <video 
                  src="/ugh.mp4" 
                  controls 
                  controlsList="nodownload"
                  className="w-full h-full object-cover"
                >
                  Tu navegador no soporta la reproducción de videos.
                </video>
                
                {/* Etiqueta flotante motivacional (Desaparece al poner el mouse encima) */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-white tracking-wider uppercase">Mira cómo funciona (3 min)</span>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* SECCIÓN DE MOCKUP - Demostración de valor UI */}
        <section className="py-24 relative overflow-hidden bg-white/[0.02] border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Así de premium se verá <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">tu sistema de reservas.</span>
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Tus huéspedes podrán ver las habitaciones, verificar precios y enviarte la solicitud de reserva estructurada directamente a la recepción de tu WhatsApp. <strong>Cero fricción para ellos, más rentabilidad para ti.</strong>
              </p>
              <ul className="space-y-4 text-slate-200 text-lg">
                <li className="flex items-center gap-3 justify-center lg:justify-start">
                  <span className="text-cyan-400 text-2xl">✓</span> Diseño optimizado para turistas en móviles.
                </li>
                <li className="flex items-center gap-3 justify-center lg:justify-start">
                  <span className="text-cyan-400 text-2xl">✓</span> Galerías de fotos dinámicas.
                </li>
                <li className="flex items-center gap-3 justify-center lg:justify-start">
                  <span className="text-cyan-400 text-2xl">✓</span> Cierre directo y seguro en WhatsApp.
                </li>
              </ul>
            </div>

            <div className="lg:w-1/2 flex justify-center w-full">
              <div className="relative mx-auto border-gray-800 bg-gray-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-[0_0_80px_rgba(168,85,247,0.3)] transform transition-transform duration-700 hover:scale-105 hover:-rotate-2">
                <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20"></div>
                <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative">
                  <video src="/mockup.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover object-top" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* IV. SECCIÓN DE PRECIOS Y PLANES */}
        <section className="py-24 relative" id="precios">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                Deja de regalarle el <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">20%</span> a los intermediarios.
              </h2>
              <p className="text-xl text-slate-300 mb-6">
                Paga una tarifa mensual plana por tu tecnología y recibe el <strong className="text-white">100%</strong> del dinero de cada noche.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Tarjeta 1: PLAN STARTER */}
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col backdrop-blur-sm transition-transform hover:-translate-y-1">
                <h3 className="text-2xl font-black text-white mb-2">PLAN STARTER</h3>
                <p className="text-slate-400 text-sm mb-6 min-h-[40px]">(Ideal para hostales que quieren digitalizarse)</p>
                <div className="mb-8">
                  <span className="text-5xl font-black text-white">$15</span>
                  <span className="text-slate-400 font-medium"> / mes</span>
                </div>
                <p className="text-slate-300 mb-8 font-medium">Empieza a recibir reservas directas hoy mismo.</p>
                
                <ul className="space-y-5 mb-10 flex-1 text-slate-300">
                  <li className="flex gap-3 items-start"><span className="text-cyan-400 text-xl mt-0.5">✅</span> <span><strong>Motor de Reservas:</strong> Página web completa.</span></li>
                  <li className="flex gap-3 items-start"><span className="text-cyan-400 text-xl mt-0.5">✅</span> <span><strong>WhatsApp:</strong> Botón directo para ventas.</span></li>
                  <li className="flex gap-3 items-start"><span className="text-cyan-400 text-xl mt-0.5">✅</span> <span><strong>Panel de Control:</strong> Actualiza precios tú mismo.</span></li>
                  <li className="flex gap-3 items-start"><span className="text-yellow-500 text-xl mt-0.5">⚠️</span> <span><strong>Dominio compartido:</strong> <em>tuhostal.builx.com</em>.</span></li>
                </ul>
                
                <button 
                  onClick={() => {
                    localStorage.setItem('selected_plan', 'starter');
                    navigate('/register'); 
                  }}
                  className="w-full py-4 rounded-xl font-bold border border-white/20 hover:bg-white/10 transition-colors text-white text-lg">
                  Elegir Plan Starter
                </button>
              </div>

              {/* Tarjeta 2: PLAN PRO */}
              <div className="bg-gradient-to-b from-blue-900/40 to-[#050B14] border-2 border-cyan-400/50 rounded-3xl p-8 md:p-10 flex flex-col relative shadow-[0_0_50px_rgba(34,211,238,0.15)] transform md:-translate-y-4">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-black px-6 py-1.5 rounded-full text-sm shadow-[0_0_20px_rgba(34,211,238,0.4)] tracking-wide">
                  LA OPCIÓN ESTÁNDAR 🔥
                </div>
                <h3 className="text-2xl font-black text-white mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">PLAN PRO</h3>
                <p className="text-cyan-200/70 text-sm mb-6 min-h-[40px]">(Para hoteles y resorts con presencia corporativa)</p>
                <div className="mb-8">
                  <span className="text-6xl font-black text-white">$39</span>
                  <span className="text-slate-400 font-medium"> / mes</span>
                </div>
                <p className="text-white mb-8 font-medium">Proyecta autoridad total. Tu hotel, tu marca, tus reglas.</p>
                
                <ul className="space-y-5 mb-10 flex-1 text-slate-200">
                  <li className="flex gap-3 items-start"><span className="text-cyan-400 text-xl mt-0.5">✅</span> <span><strong>Todo lo del Plan Starter, más:</strong></span></li>
                  <li className="flex gap-3 items-start"><span className="text-blue-400 text-xl mt-0.5">🚀</span> <span><strong>Cero Comisiones:</strong> El 100% es tuyo.</span></li>
                  <li className="flex gap-3 items-start"><span className="text-blue-400 text-xl mt-0.5">🌐</span> <span><strong>Dominio Propio:</strong> <em>www.tuhotel.com</em>.</span></li>
                  <li className="flex gap-3 items-start"><span className="text-blue-400 text-xl mt-0.5">🎨</span> <span><strong>100% Marca Blanca:</strong> Diseño corporativo.</span></li>
                </ul>
                
                <button 
                  onClick={() => {
                    localStorage.setItem('selected_plan', 'pro');
                    navigate('/register'); 
                  }}
                  className="w-full py-4 rounded-xl font-black bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all active:scale-95 text-lg">
                  Elegir Plan Pro
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* VII. FOOTER COMPLETO Y RESTAURADO */}
        <footer className="border-t border-white/10 bg-[#050B14] pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
              <div className="flex items-center gap-2 cursor-pointer">
                <span className="text-3xl font-black tracking-tighter text-white">
                  Buil<span className="text-blue-500">X</span>
                </span>
              </div>
              <div className="flex gap-8 text-slate-400 text-sm font-medium">
                <a href="/terminos" className="hover:text-white transition-colors">Términos de Servicio</a>
                <a href="/privacidad" className="hover:text-white transition-colors">Privacidad</a>
                <a href="/reembolsos" className="hover:text-white transition-colors">Reembolsos</a>
              </div>
            </div>
            <div className="text-center text-slate-500 text-sm">
              © {new Date().getFullYear()} BuilX. Todos los derechos reservados. Impulsando la independencia hotelera.
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}