import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingMarketing() {
  const navigate = useNavigate();
  // NUEVO ESTADO: Controla si el menú móvil está abierto o cerrado
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
            
            {/* ENLACES ESCRITORIO (Se ocultan en móvil) */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#caracteristicas" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Características</a>
              <a href="#precios" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Precios</a>
              <a href="#faq" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">FAQ</a>
            </div>
            
            <div className="flex items-center gap-4">
              {/* BOTONES ESCRITORIO (Se ocultan en móvil) */}
              <button 
                onClick={() => navigate('/login')}
                className="hidden md:block text-sm font-bold text-slate-300 hover:text-white transition-colors">
                Iniciar Sesión
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="hidden md:block bg-white/10 border border-white/20 hover:bg-white hover:text-black text-white text-sm font-bold py-2.5 px-6 rounded-lg backdrop-blur-sm transition-all active:scale-95">
                Empezar Ahora
              </button>

              {/* BOTÓN HAMBURGUESA PARA MÓVILES (Se oculta en escritorio) */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-slate-300 hover:text-white p-2 focus:outline-none transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> // Ícono de X
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /> // Ícono de 3 rayas
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
                className="w-full bg-blue-500 hover:bg-blue-400 text-white text-lg font-bold py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                Empezar Ahora por $15
              </button>
            </div>
          )}
        </nav>
        {/* I. EL GANCHO DEL PRECIO */}
        <section className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto min-h-[90vh] flex items-center">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            <div className="text-left pt-8">
              <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-4">
                <span className="block text-white">Tu negocio en</span>
                <span className="block text-white mb-2">internet por menos</span>
                <span className="block text-3xl md:text-5xl text-slate-300 font-bold mt-4">de lo que cuesta...</span>
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
                No necesitas miles de dólares para tener una tienda profesional. Por solo <strong className="inline-block whitespace-nowrap text-white bg-white/10 backdrop-blur-md px-3 py-1 mx-1 rounded-md border border-white/20">$15 al mes</strong>, obtienes la plataforma completa.
              </p>
              <button className="btn-primary-glow text-white font-black py-4 px-12 rounded-xl text-xl transition-all active:scale-95 flex items-center justify-center gap-3">
                🚀 Empezar Ahora
              </button>
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
              <h3 className="text-3xl font-bold mb-4 text-white leading-tight">De las decisiones de compra hoy en día comienzan con una búsqueda en internet.</h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                Si tu negocio no tiene un catálogo web, literalmente le estás regalando 7 de cada 10 clientes a tu competencia. No dejes tu crecimiento al azar, asegura tu presencia en el mercado digital más grande del mundo.
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
                Así de profesional se verá <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">tu próximo catálogo.</span>
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Tus clientes podrán navegar por tus productos, ver detalles, agregar al carrito y enviarte el pedido estructurado directamente a tu WhatsApp. <strong>Cero fricción para ellos, más ventas para ti.</strong>
              </p>
              <ul className="space-y-4 text-slate-200 text-lg">
                <li className="flex items-center gap-3 justify-center lg:justify-start">
                  <span className="text-cyan-400 text-2xl">✓</span> Diseño optimizado para móviles.
                </li>
                <li className="flex items-center gap-3 justify-center lg:justify-start">
                  <span className="text-cyan-400 text-2xl">✓</span> Filtros y categorías automáticas.
                </li>
                <li className="flex items-center gap-3 justify-center lg:justify-start">
                  <span className="text-cyan-400 text-2xl">✓</span> Cierre de ventas en WhatsApp.
                </li>
              </ul>
            </div>

            <div className="lg:w-1/2 flex justify-center w-full">
              <div className="relative mx-auto border-gray-800 bg-gray-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-[0_0_80px_rgba(168,85,247,0.3)] transform transition-transform duration-700 hover:scale-105 hover:-rotate-2 group">
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
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Sin tutoriales. Sin tocar código.<br/><span className="text-cyan-400">Tú te encargas de vender.</span></h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-16">
            Diseñamos una plataforma tan intuitiva que parece magia. Sube tus fotos, pon el precio y nosotros nos encargamos de toda la tecnología. BuilX hace el trabajo pesado.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.05] transition-all duration-300 group backdrop-blur-md">
              <div className="text-5xl mb-6 transform group-hover:-translate-y-2 transition-transform">🚀</div>
              <h4 className="text-xl font-bold mb-3 text-white">Catálogo en minutos</h4>
              <p className="text-slate-300 text-sm">Tu inventario en línea más rápido que preparar una taza de café.</p>
            </div>
            <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.05] transition-all duration-300 group backdrop-blur-md">
              <div className="text-5xl mb-6 transform group-hover:-translate-y-2 transition-transform">💬</div>
              <h4 className="text-xl font-bold mb-3 text-white">Pedidos a WhatsApp</h4>
              <p className="text-slate-300 text-sm">Recibe facturas detalladas directamente en tu chat, sin intermediarios.</p>
            </div>
            <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.05] transition-all duration-300 group backdrop-blur-md">
              <div className="text-5xl mb-6 transform group-hover:-translate-y-2 transition-transform">🤖</div>
              <h4 className="text-xl font-bold mb-3 text-white">Automatización IA</h4>
              <p className="text-slate-300 text-sm">Herramientas inteligentes para estructurar tu tienda sin esfuerzo manual.</p>
            </div>
          </div>
        </section>

        {/* IV. LA COMPARATIVA */}
        <section className="py-24 border-y border-white/10 bg-white/[0.02] backdrop-blur-md" id="precios">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-black text-center mb-16">Más con menos. Descubre por qué somos diferentes.</h2>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5">
                    <th className="p-6 md:p-8 text-slate-300 font-semibold w-1/3 border-b border-white/10">Característica</th>
                    <th className="p-6 md:p-8 text-white font-black text-xl w-1/3 border-b border-white/10 bg-blue-500/10 border-x border-white/10 text-center">BuilX 🚀</th>
                    <th className="p-6 md:p-8 text-slate-300 font-semibold w-1/3 border-b border-white/10 text-center">Tradicionales</th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base">
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-6 md:p-8 text-slate-200">Precio Mensual</td>
                    <td className="p-6 md:p-8 font-bold text-cyan-300 bg-blue-500/5 border-x border-white/10 text-center">$15 fijos</td>
                    <td className="p-6 md:p-8 text-slate-400 text-center">$30 a $50+</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-6 md:p-8 text-slate-200">Curva de Aprendizaje</td>
                    <td className="p-6 md:p-8 font-bold text-white bg-blue-500/5 border-x border-white/10 text-center">Menos de 1 hora</td>
                    <td className="p-6 md:p-8 text-slate-400 text-center">Semanas de tutoriales</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-6 md:p-8 text-slate-200">Recepción de Pedidos</td>
                    <td className="p-6 md:p-8 font-bold text-white bg-blue-500/5 border-x border-white/10 text-center">Directo a WhatsApp</td>
                    <td className="p-6 md:p-8 text-slate-400 text-center">Emails que se pierden</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* V. PREGUNTAS FRECUENTES */}
        <section className="py-24 px-6 max-w-4xl mx-auto" id="faq">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Preguntas Frecuentes</h2>
            <p className="text-xl text-slate-300">Todo lo que necesitas saber antes de empezar.</p>
          </div>
          <div className="space-y-4">
            <details className="group bg-white/[0.03] border border-white/10 rounded-2xl cursor-pointer transition-all duration-300 hover:border-cyan-400/40 backdrop-blur-sm">
              <summary className="flex items-center justify-between p-6 md:p-8 font-bold text-lg md:text-xl text-white list-none">
                ¿Me cobran comisiones por cada venta que haga?
                <span className="transition-transform duration-300 group-open:rotate-180 text-cyan-400">
                  <svg fill="none" height="24" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 md:px-8 md:pb-8 text-slate-300 text-lg leading-relaxed">
                <strong>Absolutamente no.</strong> A diferencia de otras plataformas que te quitan entre el 2% y el 5% de tus ganancias, en BuilX solo pagas tu suscripción plana de $15 al mes. Todo el dinero va directo a tu bolsillo.
              </div>
            </details>
            <details className="group bg-white/[0.03] border border-white/10 rounded-2xl cursor-pointer transition-all duration-300 hover:border-cyan-400/40 backdrop-blur-sm">
              <summary className="flex items-center justify-between p-6 md:p-8 font-bold text-lg md:text-xl text-white list-none">
                ¿Cómo recibo el pago de mis clientes?
                <span className="transition-transform duration-300 group-open:rotate-180 text-cyan-400">
                  <svg fill="none" height="24" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 md:px-8 md:pb-8 text-slate-300 text-lg leading-relaxed">
                El pedido estructurado te llega directamente a tu WhatsApp. Desde ahí, tú acuerdas con el cliente el método de pago que prefieras, dándote control total.
              </div>
            </details>
            <details className="group bg-white/[0.03] border border-white/10 rounded-2xl cursor-pointer transition-all duration-300 hover:border-cyan-400/40 backdrop-blur-sm">
              <summary className="flex items-center justify-between p-6 md:p-8 font-bold text-lg md:text-xl text-white list-none">
                ¿Cómo recibo el pago de mis clientes?
                <span className="transition-transform duration-300 group-open:rotate-180 text-cyan-400">
                  <svg fill="none" height="24" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 md:px-8 md:pb-8 text-slate-300 text-lg leading-relaxed">
                El pedido estructurado te llega directamente a tu WhatsApp. Desde ahí, tú acuerdas con el cliente el método de pago que prefieras, dándote control total.
              </div>
            </details>
          </div>
        </section>

        {/* VI. CALL TO ACTION FINAL */}
        <section className="py-32 px-6 text-center border-t border-white/10 bg-white/[0.02] backdrop-blur-xl">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black mb-6">¿Listo para escalar tus ventas?</h2>
            <p className="text-xl text-slate-300 mb-12">Únete a los emprendedores que ya están vendiendo en automático por el precio de una pizza.</p>
            <button className="btn-primary-glow text-white font-black py-5 px-16 rounded-2xl text-2xl transition-all active:scale-95 mx-auto block">
              Empezar Ahora por $15/mes
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
                <a href="/reembolsos" className="hover:text-white transition-colors">reembolsos</a>
              </div>
            </div>
            <div className="text-center text-slate-500 text-sm">
              © {new Date().getFullYear()} BuilX. Todos los derechos reservados. Impulsando el comercio digital.
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}