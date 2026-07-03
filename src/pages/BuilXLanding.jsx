import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingMarketing() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const comparativas = [
    {
      id: 1,
      texto: "Netflix.",
      img: "https://cdn-icons-png.flaticon.com/512/732/732228.png" 
    },
    {
      id: 2,
      texto: "tu plan de datos.",
      img: "https://marketplace.canva.com/-IThg/MAGF7p-IThg/1/tl/canva-wifi-icon-MAGF7p-IThg.png"
    },
    {
      id: 3,
      texto: "dos starbucks.",
      img: "https://png.pngtree.com/recommend-works/png-clipart/20250209/ourmid/pngtree-starbucks-green-disposable-paper-cup-with-lid-png-image_15370420.png"
    },
    {
      id: 4,
      texto: "una pizza.",
      img: "https://cdn-icons-png.flaticon.com/512/3132/3132693.png"
    },
    {
      id: 5,
      texto: "Spotify Premium.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/500px-Spotify_logo_without_text.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail"
    }
  ];

  const [index, setIndex] = useState(0);

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
        <div className="absolute top-[30%] left-[20%] w-[30vw] h-[30vw] bg-yellow-500/10 rounded-full blur-[100px] animate-blob"></div>
      </div>

      <div className="relative z-10">

        {/* NAVBAR FLOTANTE */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#050B14]/40 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer group">
              <span className="text-3xl font-black tracking-tighter text-white">
                Buil<span className="text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)] group-hover:text-blue-300 transition-colors">X</span>
              </span>
            </div>
            
            {/* ENLACES ESCRITORIO */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#caracteristicas" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Características</a>
              <a href="#precios" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Precios</a>
              <a href="#faq" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">FAQ</a>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="hidden md:block text-sm font-bold text-slate-300 hover:text-white transition-colors">
                Iniciar Sesión
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black py-4 px-10 rounded-xl text-xl transition-all active:scale-95 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] w-full md:w-auto"
              >
                Crear Sistema de Reservas 🚀
              </button>

              {/* BOTÓN HAMBURGUESA PARA MÓVILES */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-slate-300 hover:text-white p-2 focus:outline-none transition-colors"
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

          {/* MENÚ DESPLEGABLE MÓVIL */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 w-full bg-[#050B14]/95 backdrop-blur-xl border-b border-white/10 px-6 py-8 flex flex-col gap-6 shadow-2xl animate-fade-in-down">
              <a href="#caracteristicas" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-semibold text-slate-300 hover:text-white transition-colors">Características</a>
              <a href="#precios" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-semibold text-slate-300 hover:text-white transition-colors">Precios</a>
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-semibold text-slate-300 hover:text-white transition-colors">FAQ</a>
              
              <hr className="border-white/10 my-2" />
              
              <button 
                onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
                className="w-full text-left text-xl font-bold text-slate-300 hover:text-white transition-colors">
                Iniciar Sesión
              </button>
              <button 
                onClick={() => { navigate('/register'); setIsMobileMenuOpen(false); }}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-bold py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                Crear Motor de Reservas 🚀
              </button>
            </div>
          )}
        </nav>

        {/* I. EL GANCHO DEL PRECIO */}
        <section className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto min-h-[90vh] flex items-center">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            <div className="text-left pt-8">
              <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-4">
                <span className="block text-white">Tu hotel recibiendo</span>
                <span className="block text-white mb-2">reservas directas por</span>
                <span className="block text-white mb-2">menos de lo que cuesta...</span>
              </h2>
              <div className="min-h-[80px] md:min-h-[100px] flex items-center mb-6">
                <span 
                  key={`text-${index}`} 
                  className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 drop-shadow-lg animate-text"
                >
                  {comparativas[index].texto}
                </span>
              </div>
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed md:leading-loose mb-10 max-w-lg">
                No necesitas pagar comisiones abusivas a terceros. Toma el control total de tu hospedaje.
              </p>
              
              <button 
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black py-4 px-10 rounded-xl text-xl transition-all active:scale-95 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] w-full md:w-auto"
              >
                Empezar a recibir reservas 🚀
              </button>
              <p className="text-sm text-slate-400 mt-4 font-medium flex items-center justify-center md:justify-start gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Configuración gratis. Paga solo si decides publicarlo.
              </p>
            </div>

            <div className="relative flex justify-center items-center h-[400px] md:h-[600px] w-full">
              <div key={`img-${index}`} className="enter-animation w-full h-full flex justify-center items-center">
                <img 
                  src={comparativas[index].img} 
                  alt={comparativas[index].texto} 
                  className="w-full max-w-[300px] md:max-w-[450px] object-contain drop-shadow-[0_20px_50px_rgba(59,130,246,0.4)] animate-3d-model"
                />
              </div>
            </div>
          </div>
        </section>

        {/* II. EL MERCADO */}
        <section className="py-20 border-y border-white/10 bg-white/[0.02] backdrop-blur-md" id="caracteristicas">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3 text-center md:text-left">
              <h3 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-2 drop-shadow-lg">73%</h3>
              <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 mx-auto md:mx-0 rounded-full"></div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-3xl font-bold mb-4 text-white leading-tight">De los turistas buscan la web oficial del hotel antes de reservar.</h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                Si tu negocio solo depende de Booking o Airbnb, estás perdiendo reservas directas todos los días. Asegura tu presencia digital profesional y quédate con el 100% de la ganancia por habitación.
              </p>
            </div>
          </div>
        </section>

        {/* SECCIÓN DE MOCKUP */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-purple-400/40 bg-purple-500/10 text-purple-300 text-sm font-bold tracking-widest uppercase backdrop-blur-md">
                Resultados Reales
              </div>
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
              <div className="relative mx-auto border-gray-800 bg-gray-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-[0_0_80px_rgba(168,85,247,0.3)] transform transition-transform duration-700 hover:scale-105 hover:-rotate-2 group">
                {/* ... (Mockup del teléfono sin cambios) ... */}
                <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative">
                  <video src="/mockup.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* III. CERO FRICCIÓN */}
        <section className="py-24 px-6 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Sin tutoriales aburridos. Sin tocar código.<br/><span className="text-cyan-400">Diseñado para administradores.</span></h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-16">
            Construimos una plataforma tan fácil de usar que parece magia. Tú configuras tus precios en un panel súper sencillo, y nosotros mantenemos tu motor de reservas operando 24/7.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.05] transition-all duration-300 group backdrop-blur-md">
              <div className="text-5xl mb-6 transform group-hover:-translate-y-2 transition-transform">🏨</div>
              <h4 className="text-xl font-bold mb-3 text-white">Tu web en minutos</h4>
              <p className="text-slate-300 text-sm">Tu inventario de habitaciones en línea, estructurado de forma profesional sin contratar agencias costosas.</p>
            </div>
            <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.05] transition-all duration-300 group backdrop-blur-md">
              <div className="text-5xl mb-6 transform group-hover:-translate-y-2 transition-transform">💬</div>
              <h4 className="text-xl font-bold mb-3 text-white">Reservas a WhatsApp</h4>
              <p className="text-slate-300 text-sm">Recibe fechas y detalles del huésped directamente en el chat de tu recepción, listos para concretar el pago.</p>
            </div>
            <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.05] transition-all duration-300 group backdrop-blur-md">
              <div className="text-5xl mb-6 transform group-hover:-translate-y-2 transition-transform">⚙️</div>
              <h4 className="text-xl font-bold mb-3 text-white">Control Total</h4>
              <p className="text-slate-300 text-sm">Cambia precios por temporada o actualiza fotos en tiempo real desde tu panel de administrador. Fácil y rápido.</p>
            </div>
          </div>
        </section>

        {/* IV. SECCIÓN DE PRECIOS Y PLANES */}
        <section className="py-24 border-y border-white/10 bg-white/[0.02] backdrop-blur-md relative" id="precios">
          <div className="max-w-6xl mx-auto px-6">
            
            {/* Header de la sección */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                Deja de regalarle el <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">15%</span> a los intermediarios.
              </h2>
              <p className="text-xl text-slate-300 mb-6">
                Paga una tarifa mensual plana por tu tecnología y recibe el <strong className="text-white">100%</strong> del dinero de cada noche. Sin comisiones ocultas por reserva.
              </p>
            </div>

            {/* Tarjetas de Precios */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              {/* Tarjeta 1: PLAN STARTER */}
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col backdrop-blur-sm transition-transform hover:-translate-y-1">
                <h3 className="text-2xl font-black text-white mb-2">PLAN STARTER</h3>
                <p className="text-slate-400 text-sm mb-6 min-h-[40px]">(Ideal para hostales y posadas que quieren digitalizarse)</p>
                <div className="mb-8">
                  <span className="text-5xl font-black text-white">$15</span>
                  <span className="text-slate-400 font-medium"> / mes</span>
                </div>
                <p className="text-slate-300 mb-8 font-medium">Empieza a recibir reservas directas hoy mismo sin complicaciones técnicas.</p>
                
                <ul className="space-y-5 mb-10 flex-1 text-slate-300">
                  <li className="flex gap-3 items-start"><span className="text-cyan-400 text-xl mt-0.5">✅</span> <span><strong>Motor de Reservas:</strong> Página web completa.</span></li>
                  <li className="flex gap-3 items-start"><span className="text-cyan-400 text-xl mt-0.5">✅</span> <span><strong>Integración a WhatsApp:</strong> Botón directo para cerrar ventas.</span></li>
                  <li className="flex gap-3 items-start"><span className="text-cyan-400 text-xl mt-0.5">✅</span> <span><strong>Panel de Control:</strong> Actualiza habitaciones tú mismo.</span></li>
                  <li className="flex gap-3 items-start"><span className="text-cyan-400 text-xl mt-0.5">✅</span> <span>Alojamiento en la nube (Hosting gratuito).</span></li>
                  <li className="flex gap-3 items-start"><span className="text-yellow-500 text-xl mt-0.5">⚠️</span> <span><strong>Dominio compartido:</strong> Usará <em>tuhostal.builx.com</em>.</span></li>
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
                <p className="text-cyan-200/70 text-sm mb-6 min-h-[40px]">(Para hoteles y resorts que cuidan su presencia corporativa)</p>
                <div className="mb-8">
                  <span className="text-6xl font-black text-white">$39</span>
                  <span className="text-slate-400 font-medium"> / mes</span>
                </div>
                <p className="text-white mb-8 font-medium">Proyecta autoridad total. Tu hotel, tu marca, tus reglas.</p>
                
                <ul className="space-y-5 mb-10 flex-1 text-slate-200">
                  <li className="flex gap-3 items-start"><span className="text-cyan-400 text-xl mt-0.5">✅</span> <span><strong>Todo lo del Plan Starter, más:</strong></span></li>
                  <li className="flex gap-3 items-start"><span className="text-blue-400 text-xl mt-0.5">🚀</span> <span><strong>Cero Comisiones por Reserva:</strong> El 100% de la noche es tuya.</span></li>
                  <li className="flex gap-3 items-start"><span className="text-blue-400 text-xl mt-0.5">🌐</span> <span><strong>Dominio Propio Incluido:</strong> Tu página será <em>www.tuhotel.com</em>.</span></li>
                  <li className="flex gap-3 items-start"><span className="text-blue-400 text-xl mt-0.5">🎨</span> <span><strong>100% Marca Blanca:</strong> Diseño corporativo sin menciones externas.</span></li>
                  <li className="flex gap-3 items-start"><span className="text-blue-400 text-xl mt-0.5">🛠️</span> <span><strong>Soporte Técnico Directo:</strong> Prioridad en atención al sistema.</span></li>
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

            {/* GARANTÍA RIESGO CERO */}
            <div className="mt-24 max-w-4xl mx-auto bg-gradient-to-br from-white/[0.05] to-transparent border border-cyan-500/30 rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden backdrop-blur-xl shadow-[0_0_50px_rgba(34,211,238,0.05)]">
              <div className="absolute top-[-50%] left-[-10%] w-[50%] h-[200%] bg-cyan-500/10 rotate-12 blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="text-6xl mb-6 animate-bounce">🤝</div>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Garantía de Configuración <br className="md:hidden"/> Riesgo Cero</h3>
                <p className="text-xl md:text-2xl text-cyan-100 mb-6 font-semibold">¿Aún no estás seguro? No saques tu tarjeta todavía.</p>
                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                  Escríbenos a WhatsApp, cuéntanos sobre tu hotel y estructuraremos un demo de tu Motor de Reservas <strong className="text-white">completamente gratis</strong>. Si te gusta lo que ves y lo fácil que es operarlo, eliges tu plan y lo activamos.
                </p>
                
                <a 
                  href="https://wa.me/tunumerodewhatsapp" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black py-5 px-8 md:px-12 rounded-2xl text-xl md:text-2xl transition-all hover:-translate-y-1 active:scale-95 shadow-[0_10px_40px_rgba(37,211,102,0.4)] w-full md:w-auto"
                >
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  Contactar por WhatsApp
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* V. PREGUNTAS FRECUENTES */}
        <section className="py-24 px-6 max-w-4xl mx-auto" id="faq">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Preguntas Frecuentes</h2>
            <p className="text-xl text-slate-300">Respuestas rápidas para dueños de negocios.</p>
          </div>
          <div className="space-y-4">
            <details className="group bg-white/[0.03] border border-white/10 rounded-2xl cursor-pointer transition-all duration-300 hover:border-cyan-400/40 backdrop-blur-sm">
              <summary className="flex items-center justify-between p-6 md:p-8 font-bold text-lg md:text-xl text-white list-none">
                ¿Me cobran comisiones por cada reservación que reciba?
                <span className="transition-transform duration-300 group-open:rotate-180 text-cyan-400">
                  <svg fill="none" height="24" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 md:px-8 md:pb-8 text-slate-300 text-lg leading-relaxed mt-4">
                <strong>Absolutamente no.</strong> A diferencia de plataformas como Booking o Airbnb que te quitan entre el 15% y el 20% de tus ingresos, en BuilX solo pagas tu suscripción mensual plana. Todo el dinero de la tarifa de tu habitación va 100% íntegro a tu bolsillo.
              </div>
            </details>
            <details className="group bg-white/[0.03] border border-white/10 rounded-2xl cursor-pointer transition-all duration-300 hover:border-cyan-400/40 backdrop-blur-sm">
              <summary className="flex items-center justify-between p-6 md:p-8 font-bold text-lg md:text-xl text-white list-none">
                ¿Cómo recibo el pago de mis huéspedes?
                <span className="transition-transform duration-300 group-open:rotate-180 text-cyan-400">
                  <svg fill="none" height="24" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 md:px-8 md:pb-8 text-slate-300 text-lg leading-relaxed mt-4">
                La solicitud de reserva con las fechas y datos te llega directamente al WhatsApp de tu recepción. Desde ahí, tú acuerdas con el cliente el método de pago para el anticipo o la totalidad (transferencia bancaria, efectivo, enlace de pago de tu banco), dándote control total de tus ingresos sin que nosotros retengamos nada.
              </div>
            </details>
            <details className="group bg-white/[0.03] border border-white/10 rounded-2xl cursor-pointer transition-all duration-300 hover:border-cyan-400/40 backdrop-blur-sm">
              <summary className="flex items-center justify-between p-6 md:p-8 font-bold text-lg md:text-xl text-white list-none">
                ¿Necesito contratar a un programador para actualizar las fotos?
                <span className="transition-transform duration-300 group-open:rotate-180 text-cyan-400">
                  <svg fill="none" height="24" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 md:px-8 md:pb-8 text-slate-300 text-lg leading-relaxed mt-4">
                Para nada. Te entregamos un panel de control sumamente fácil de usar. Puedes subir nuevas fotos, cambiar el precio de una habitación por temporada alta, o marcarla como no disponible, todo con un par de clics desde tu celular o computadora.
              </div>
            </details>
          </div>
        </section>

        {/* VI. CALL TO ACTION FINAL */}
        <section className="py-32 px-6 text-center border-t border-white/10 bg-white/[0.02] backdrop-blur-xl">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black mb-6">¿Listo para llenar tus habitaciones?</h2>
            <p className="text-xl text-slate-300 mb-12">No dejes que los intermediarios se queden con tus ganancias. Empieza a recibir reservas directas hoy mismo.</p>
            <button 
                onClick={() => navigate('/register')}
                className="bg-white/10 border border-white/20 hover:bg-white hover:text-black text-white font-black py-5 px-16 rounded-2xl text-2xl transition-all active:scale-95 mx-auto block shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Crear mi Motor de Reservas
            </button>
          </div>
        </section>

        {/* VII. FOOTER */}
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