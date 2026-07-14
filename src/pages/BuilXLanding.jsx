import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function AgencyLanding() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchParams] = useSearchParams();

  // 🚨 RASTREO DE LEADS DESDE CORREO EN FRÍO (INTACTO)
  useEffect(() => {
    const emailLead = searchParams.get('correo'); 
    
    console.log("🔍 Buscando prospectos...");
    if (emailLead) {
      console.log("✅ Lead inmobiliario detectado:", emailLead);
      localStorage.setItem('lead_origen_email', emailLead);

      axios.post('https://builx-api.onrender.com/api/admin/registrar-visita', {
        email: emailLead,
        accion: 'abrio_landing_agencia'
      })
      .then(respuesta => console.log("🚀 Visita registrada:", respuesta.data.message))
      .catch(err => console.error("❌ Error reportando visita:", err));
    }
  }, [searchParams]);

  // Número de WhatsApp para cerrar clientes (Cámbialo por el tuyo)
  const contactarWhatsApp = () => {
    window.open('https://wa.me/503XXXXXXXX?text=Hola%20Jonathan,%20vi%20el%20demo%20de%20BuilX%20Studio%20y%20me%20interesa%20la%20arquitectura%20para%20mi%20inmobiliaria.', '_blank');
  };

  return (
    <div className="bg-[#050B14] text-white font-sans selection:bg-blue-500 selection:text-white min-h-screen relative overflow-hidden">
      
      {/* FONDO AURORA MESH (Mantiene el toque de lujo tecnológico) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[150px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] bg-slate-500/10 rounded-full blur-[150px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[10%] w-[50vw] h-[50vw] bg-blue-700/20 rounded-full blur-[150px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">

        {/* NAVBAR FLOTANTE TIPO ESTUDIO */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#050B14]/60 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer group">
              <span className="text-3xl font-black tracking-tighter text-white">
                Buil<span className="text-blue-400">X</span> <span className="font-light tracking-widest text-lg text-slate-400 uppercase">Studio</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#arquitectura" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">La Arquitectura</a>
              <a href="#demo" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Demo Premium</a>
              <a href="#inversion" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Inversión</a>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={contactarWhatsApp}
                className="bg-white hover:bg-slate-200 text-black font-bold py-2.5 px-6 rounded-lg text-sm transition-all active:scale-95 hidden md:flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Agendar Consultoría
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
        </nav>

        {/* I. EL GANCHO CORPORATIVO B2B */}
        <section className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto min-h-[90vh] flex items-center" id="arquitectura">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            
            <div className="text-left pt-8">
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/50 text-slate-300 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
                Exclusivo para Real Estate
              </div>
              
              <h2 className="text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6">
                <span className="block text-white">No vendas casas,</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-2">proyecta estatus.</span>
              </h2>
              
              <p className="text-xl text-slate-400 leading-relaxed mb-8 max-w-lg">
                El 80% de los compradores de lujo abandonan catálogos lentos. Diseñamos arquitectura web de carga instantánea que posiciona tu agencia inmobiliaria por encima de la competencia.
              </p>
              
              <button 
                onClick={contactarWhatsApp}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black py-4 px-10 rounded-xl text-lg transition-all active:scale-95 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.2)] w-full sm:w-auto mb-6"
              >
                Hablemos de tu Catálogo
              </button>
            </div>

            {/* AQUÍ VA EL VIDEO DE TU DISEÑO ÉPICO (dise;oepicoxd.mp4) */}
            <div className="relative flex justify-center items-center w-full mt-8 lg:mt-0" id="demo">
              <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>
              <div className="relative w-full aspect-video bg-[#0A1120] border border-white/10 rounded-2xl overflow-hidden shadow-2xl group">
                <video 
                  src="TU_LINK_DE_CLOUDINARY_AQUI" 
                  autoPlay loop muted playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </section>

        <section className="py-24 relative overflow-hidden bg-[#0A1120] border-y border-white/5" id="portafolio">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Encabezado de la sección */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Nuestra Arquitectura en Acción</h2>
              <p className="text-xl text-slate-400">Explora proyectos reales construidos con nuestra tecnología de carga instantánea.</p>
            </div>
            
            {/* Grid de Proyectos */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* PROYECTO 1: Tu enlace real */}
              <div className="group relative bg-[#050B14] border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">
                {/* Imagen de Preview */}
                <div className="aspect-video bg-slate-800 relative overflow-hidden border-b border-white/10">
                   {/* OJO: Cambia este link de imagen por una captura de pantalla real de tu sitio */}
                   <img 
                     src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                     alt="Demo Inmobiliaria Christian" 
                     className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-transparent"></div>
                </div>
                
                {/* Contenido de la Tarjeta */}
                <div className="p-6 relative z-10">
                  <div className="bg-blue-600/20 border border-blue-500/50 text-blue-400 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    Catálogo Inmobiliario
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Desarrollo "Christian"</h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    Catálogo dinámico de propiedades con filtrado instantáneo y visualización premium. Sin tiempos de carga, listo para cerrar ventas.
                  </p>
                  
                  {/* Botón que redirige a tu link */}
                  <a 
                    href="https://www.builxapp.com/v/chrisstian-1779951638465#catalogo" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition-colors"
                  >
                    Ver Proyecto en Vivo
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* PROYECTO 2: Placeholder para tu futuro proyecto */}
              <div className="group relative bg-[#050B14] border border-white/5 rounded-2xl overflow-hidden opacity-70 hover:opacity-100 transition-all duration-300">
                <div className="aspect-video bg-slate-900 relative overflow-hidden border-b border-white/5 flex items-center justify-center">
                   <span className="text-slate-600 font-medium">Próximo Proyecto</span>
                </div>
                <div className="p-6">
                  <div className="bg-slate-800 text-slate-400 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    En Desarrollo
                  </div>
                  <h3 className="text-xl font-bold text-slate-300 mb-2">Mansiones Conceptuales</h3>
                  <p className="text-slate-500 text-sm mb-6">
                    Sitio web de ultra-lujo con overlay oscuro y animaciones fluidas. Estará disponible pronto.
                  </p>
                  <span className="text-slate-600 font-bold cursor-not-allowed">Próximamente...</span>
                </div>
              </div>

              {/* PROYECTO 3: Placeholder */}
              <div className="group relative bg-[#050B14] border border-white/5 rounded-2xl overflow-hidden opacity-70 hover:opacity-100 transition-all duration-300 hidden lg:block">
                <div className="aspect-video bg-slate-900 relative overflow-hidden border-b border-white/5 flex items-center justify-center">
                   <span className="text-slate-600 font-medium">Próximo Proyecto</span>
                </div>
                <div className="p-6">
                  <div className="bg-slate-800 text-slate-400 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    En Desarrollo
                  </div>
                  <h3 className="text-xl font-bold text-slate-300 mb-2">Boutique Hotel Real</h3>
                  <p className="text-slate-500 text-sm mb-6">
                    Motor de reservas sin comisiones optimizado para conversiones móviles.
                  </p>
                  <span className="text-slate-600 font-bold cursor-not-allowed">Próximamente...</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* II. PROPUESTA DE VALOR (¿Por qué elegirte?) */}
        <section className="py-24 relative overflow-hidden bg-white/[0.02] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-black mb-16">Arquitectura que cierra tratos.</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 border border-white/5 rounded-2xl bg-[#0A1120]">
                <div className="text-cyan-400 text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-3">Carga Instantánea</h3>
                <p className="text-slate-400">Tecnología en React que muestra tus propiedades en milisegundos. Sin bases de datos lentas.</p>
              </div>
              <div className="p-8 border border-white/5 rounded-2xl bg-[#0A1120]">
                <div className="text-cyan-400 text-4xl mb-4">💎</div>
                <h3 className="text-xl font-bold mb-3">Diseño High-End</h3>
                <p className="text-slate-400">Tipografías elegantes, proporciones matemáticas y un entorno visual digno de propiedades de lujo.</p>
              </div>
              <div className="p-8 border border-white/5 rounded-2xl bg-[#0A1120]">
                <div className="text-cyan-400 text-4xl mb-4">📲</div>
                <h3 className="text-xl font-bold mb-3">Cero Fricción</h3>
                <p className="text-slate-400">Usted no toca código. Mándenos las fotos por WhatsApp y su catálogo estará actualizado globalmente.</p>
              </div>
            </div>
          </div>
        </section>

        {/* III. EL CIERRE: LA INVERSIÓN (El modelo de $200 + $30) */}
        <section className="py-24 relative" id="inversion">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Inversión clara. Resultados reales.</h2>
              <p className="text-xl text-slate-400">Calidad de agencia corporativa, con la agilidad de un estudio independiente.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              
              {/* PAGO INICIAL ($200) */}
              <div className="bg-[#0A1120] border border-white/10 rounded-3xl p-10 flex flex-col hover:border-cyan-500/50 transition-all">
                <div className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-2">Fase 1: Desarrollo</div>
                <h3 className="text-3xl font-black text-white mb-6">Arquitectura Base</h3>
                <div className="mb-8">
                  <span className="text-5xl font-black text-white">$200</span>
                  <span className="text-slate-400 font-medium"> pago único</span>
                </div>
                <ul className="space-y-4 mb-10 text-slate-300">
                  <li className="flex gap-3 items-start"><span className="text-cyan-400">✓</span> Diseño visual premium (estilo Awwwards).</li>
                  <li className="flex gap-3 items-start"><span className="text-cyan-400">✓</span> Estructuración de catálogo JSON dinámico.</li>
                  <li className="flex gap-3 items-start"><span className="text-cyan-400">✓</span> Integración y optimización de imágenes HD.</li>
                  <li className="flex gap-3 items-start"><span className="text-cyan-400">✓</span> Despliegue en servidores globales ultrarrápidos.</li>
                </ul>
              </div>

              {/* SERVICIO MENSUAL ($30) */}
              <div className="bg-gradient-to-b from-[#0A1120] to-[#050B14] border border-blue-500/30 rounded-3xl p-10 flex flex-col relative shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-bold px-4 py-1 rounded-full text-xs tracking-wider">
                  EL MOTOR DEL NEGOCIO
                </div>
                <div className="text-blue-400 text-sm font-bold tracking-widest uppercase mb-2">Fase 2: Mantenimiento</div>
                <h3 className="text-3xl font-black text-white mb-6">Servicio Concierge</h3>
                <div className="mb-8">
                  <span className="text-5xl font-black text-white">$30</span>
                  <span className="text-slate-400 font-medium"> / mes</span>
                </div>
                <ul className="space-y-4 mb-10 text-slate-300">
                  <li className="flex gap-3 items-start"><span className="text-blue-400">✓</span> Modificaciones ilimitadas de inventario.</li>
                  <li className="flex gap-3 items-start"><span className="text-blue-400">✓</span> Alojamiento web en Vercel/Render de alto rendimiento.</li>
                  <li className="flex gap-3 items-start"><span className="text-blue-400">✓</span> Renovación automática de certificados SSL de seguridad.</li>
                  <li className="flex gap-3 items-start"><span className="text-blue-400">✓</span> Soporte técnico directo (usted no lidia con paneles).</li>
                </ul>
              </div>

            </div>

            <div className="mt-16 flex justify-center">
              <button 
                onClick={contactarWhatsApp}
                className="bg-white text-black font-black py-4 px-12 rounded-xl text-xl transition-all hover:bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Iniciar Proyecto
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}