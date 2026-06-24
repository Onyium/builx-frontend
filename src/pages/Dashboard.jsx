import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import ItemCard from '../components/Dashboard/ItemCard'; 
import CreateItemModal from '../components/Dashboard/CreateItemModal';
import EmpresaConfig from '../components/Dashboard/EmpresaConfig';
import TestimoniosManager from '../components/Dashboard/TestimoniosManager';
import FAQManager from '../components/Dashboard/FAQManager'; 
import CategoriasManager from '../components/Dashboard/CategoriasManager';
import GaleriaManager from '../components/Dashboard/GaleriaManager';
import BandejaContacto from '../components/Dashboard/BandejaContacto';
import ReviewsModal from '../components/Dashboard/ReviewsModal';
import ImportadorIA from '../components/Dashboard/ImportadorIA';
import BotonSuscripcion from '../components/pays/BotonSuscripcion';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, data: null });
  const empresaId = localStorage.getItem('empresa_id');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [itemToReview, setItemToReview] = useState(null);

  const [datosEmpresa, setDatosEmpresa] = useState(null);
  const [currentLogo, setCurrentLogo] = useState(null);

  // 📥 Controla qué sección está viendo el usuario en pantalla
  const [seccionActiva, setSeccionActiva] = useState('catalogo');
  // 📱 Controla si el menú móvil está abierto
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const navigate = useNavigate();

  // --- GUARDIA DE SEGURIDAD (SESIÓN) ---
  useEffect(() => { 
    const checkSession = () => {
      const storedId = localStorage.getItem('empresa_id');
      const loginTime = localStorage.getItem('login_time');

      if (!storedId || !loginTime) {
        window.location.href = '/login'; 
        return false;
      }

      const horasPasadas = (Date.now() - parseInt(loginTime)) / (1000 * 60 * 60);
      
      if (horasPasadas > 3) {
        alert("⏱️ Tu sesión de 3 horas ha expirado por seguridad. Vuelve a ingresar.");
        handleLogout();
        return false;
      }

      return true;
    };

    if (checkSession()) {
      fetchItems(); 
      fetchEmpresa(); 
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('empresa_id');
    localStorage.removeItem('login_time');
    window.location.href = '/login';
  };

  const handleOpenReviews = (item) => {
    setItemToReview(item);
    setIsReviewModalOpen(true);
  };

  const fetchEmpresa = async () => {
    try {
      const res = await axios.get(`https://builx-api.onrender.com/api/empresa/${empresaId}`);
      if (res.data) {
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        
        // 1. Extraemos y parseamos la bolsa mágica (JSON) si es que existe
        let configObj = {};
        if (data.configuracion_sitio) {
          configObj = typeof data.configuracion_sitio === 'string' 
            ? JSON.parse(data.configuracion_sitio) 
            : data.configuracion_sitio;
        }

        // 2. Guardamos la data combinada: Infraestructura + JSON
        setDatosEmpresa({
          ...data, // Mantiene el slug, email, suscripcion_estado, etc.
          configuracion_sitio: configObj // Inyectamos el objeto listo para usarse
        });
        
        // 3. Extraemos el logo_url directamente desde el JSON
        setCurrentLogo(configObj.logo_url || null);
      }
    } catch (err) {
      console.error("Error al obtener datos de la empresa:", err);
    }
  };

  const fetchItems = async () => {
    try {
      const res = await axios.get(`https://builx-api.onrender.com/api/items/${empresaId}`);
      setItems(res.data);
    } catch (err) {
      console.error("Error al obtener items:", err);
    }
  };

  const handleUpdateEmpresa = async (configuracion, file) => {
    try {
      const formData = new FormData();
      
      // 1. Convertimos TODO el objeto de configuración a un string para enviarlo
      formData.append('configuracion_sitio', JSON.stringify(configuracion));
      
      // 2. Si hay plantilla seleccionada, la enviamos (si no, usamos 'default')
      formData.append('plantilla_seleccionada', datosEmpresa.plantilla_seleccionada || 'default');

      // 3. Multer atrapa la imagen física
      if (file) {
        formData.append('logo', file);
      }

      await axios.put(`https://builx-api.onrender.com/api/empresa/actualizar/${empresaId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      alert("¡Configuración de la sucursal guardada con éxito! 📍");
      fetchEmpresa(); // Recargamos para reflejar cambios (como el nuevo logo)
    } catch (err) {
      console.error(err);
      alert("Error al guardar la configuración de la empresa");
    }
  };
  const handleSave = async (formData) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const id = formData.get('id');

    try {
      if (id) { 
          await axios.put(`https://builx-api.onrender.com/api/items/${id}`, formData, config);
      } else { 
          formData.append('empresa_id', empresaId);
          await axios.post('https://builx-api.onrender.com/api/items', formData, config);
      }
      setModalConfig({ isOpen: false, data: null });
      fetchItems();
    } catch (err) {
      alert("Error al guardar el ítem");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este ítem?")) {
        await axios.delete(`https://builx-api.onrender.com/api/items/${id}`);
        fetchItems();
    }
  };

  const handleToggleStatus = async (id, status) => {
    try {
      await axios.put(`https://builx-api.onrender.com/api/items/${id}/status`, { disponible: status });
      fetchItems();
    } catch (err) {
      console.error("Error al cambiar estado");
    }
  };

  // Función auxiliar para cambiar de sección y cerrar el menú en móviles
  const handleNavClick = (seccion) => {
    setSeccionActiva(seccion);
    setIsSidebarOpen(false);
  };

  if (!datosEmpresa) return <div className="p-10 font-bold text-gray-500 text-center">Cargando panel...</div>;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans antialiased text-gray-900 overflow-x-hidden">
      
      {/* ─── FONDO OSCURO PARA MÓVILES (OVERLAY) ─── */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* ─── BARRA LATERAL (SIDEBAR) PREMIUM ─── */}
      <aside className={`w-64 bg-[#0F172A] text-slate-300 flex flex-col fixed h-full z-30 shadow-2xl border-r border-slate-800 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white shadow-md shadow-blue-500/20">
              B
            </div>
            <div>
              <h1 className="font-black text-white tracking-tight text-lg leading-none">BuilX</h1>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mt-1">Admin Panel</span>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1 mt-3 custom-scrollbar">
          <button onClick={() => handleNavClick('catalogo')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${seccionActiva === 'catalogo' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10' : 'hover:bg-slate-800/60 text-slate-400 hover:text-slate-200'}`}>
            📦 <span>Catálogo / Ítems</span>
          </button>
          <button onClick={() => handleNavClick('leads')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${seccionActiva === 'leads' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10' : 'hover:bg-slate-800/60 text-slate-400 hover:text-slate-200'}`}>
            📥 <span>Bandeja de Leads</span>
          </button>
          <button onClick={() => handleNavClick('galeria')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${seccionActiva === 'galeria' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10' : 'hover:bg-slate-800/60 text-slate-400 hover:text-slate-200'}`}>
            🖼️ <span>Galería de Fotos</span>
          </button>
          <button onClick={() => handleNavClick('categorias')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${seccionActiva === 'categorias' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10' : 'hover:bg-slate-800/60 text-slate-400 hover:text-slate-200'}`}>
            🗂️ <span>Categorías</span>
          </button>
          <button onClick={() => handleNavClick('testimonios')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${seccionActiva === 'testimonios' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10' : 'hover:bg-slate-800/60 text-slate-400 hover:text-slate-200'}`}>
            ⭐ <span>Testimonios</span>
          </button>
          <button onClick={() => handleNavClick('faqs')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${seccionActiva === 'faqs' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10' : 'hover:bg-slate-800/60 text-slate-400 hover:text-slate-200'}`}>
            ❓ <span>Preguntas Frecuentes</span>
          </button>
          <button onClick={() => handleNavClick('importador')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${seccionActiva === 'importador' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10' : 'hover:bg-slate-800/60 text-slate-400 hover:text-slate-200'}`}>
            🤖 <span>IMPORTADOR IA</span>
          </button>
          <button onClick={() => handleNavClick('config')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${seccionActiva === 'config' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10' : 'hover:bg-slate-800/60 text-slate-400 hover:text-slate-200'}`}>
            ⚙️ <span>Configuración</span>
          </button>
          
          {/* 👇 BOTÓN LIBERADO PARA ACTIVE, STARTER, PRO Y BUILDING 👇 */}
          {['active', 'starter', 'pro', 'building', 'trial'].includes(datosEmpresa.suscripcion_estado) && (
            <button 
              onClick={() => navigate('/admin/builder')} 
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-bold transition-all bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 active:scale-95 mt-4"
            >
              🎨 Editar Página Web
            </button>
          )}
          {/* 👇 BOTÓN ACTUALIZADO PARA INCLUIR 'BUILDING' Y EL PASE VIP 👇 */}
          {['active', 'starter', 'pro', 'trial', 'building'].includes(datosEmpresa.suscripcion_estado) && (
              <a 
                  href={`/v/${datosEmpresa.slug}${datosEmpresa.suscripcion_estado === 'building' ? '?preview=true' : ''}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-bold transition-all bg-blue-600/10 text-blue-400 border border-blue-600/20 shadow-lg hover:bg-blue-600/20 active:scale-95 mt-2"
              >
                  👁️ {datosEmpresa.suscripcion_estado === 'building' ? 'Ver Vista Previa' : 'Ver Sitio Público'}
              </a>
          )}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-center">
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Empresa ID: {empresaId}</p>
        </div>
      </aside>

      {/* ─── ÁREA DE TRABAJO PRINCIPAL (DERECHA) ─── */}
      <div className="flex-1 lg:pl-64 min-h-screen flex flex-col w-full">
        
        <header className="h-16 lg:h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 lg:px-12 sticky top-0 z-10 shadow-sm">
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <h2 className="text-lg lg:text-xl font-black text-gray-900 tracking-tight capitalize truncate max-w-[150px] sm:max-w-xs">
              {seccionActiva === 'catalogo' ? 'Gestión de Catálogo' : seccionActiva}
            </h2>
          </div>
          
          <div className="flex items-center gap-2 lg:gap-4">
            {/* 👇 PERMITIR AÑADIR ÍTEMS EN TODOS ESTOS ESTADOS 👇 */}
            {seccionActiva === 'catalogo' && ['active', 'starter', 'pro', 'building', 'trial'].includes(datosEmpresa.suscripcion_estado) && (
              <button onClick={() => setModalConfig({ isOpen: true, data: null })} className="bg-blue-600 text-white px-3 py-2 lg:px-5 lg:py-2.5 rounded-xl font-bold shadow-md shadow-blue-500/10 active:scale-95 transition-all hover:bg-blue-700 text-xs lg:text-sm whitespace-nowrap">
                + Nuevo Ítem
              </button>
            )}
            
            <button onClick={handleLogout} className="bg-red-50 text-red-600 border border-red-100 px-3 py-2 lg:px-4 lg:py-2.5 rounded-xl font-bold hover:bg-red-100 transition-all text-xs lg:text-sm whitespace-nowrap hidden sm:block">
              Cerrar Sesión
            </button>
            
            <button onClick={handleLogout} className="sm:hidden bg-red-50 text-red-600 border border-red-100 p-2 rounded-xl font-bold hover:bg-red-100 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </button>
          </div>
        </header>

        {/* ─── CONTENEDOR DE COMPONENTES DINÁMICOS ─── */}
        <main className="p-4 md:p-8 lg:p-12 max-w-6xl w-full mx-auto flex-1 overflow-x-hidden">
          
          {/* 🚨 EL BANNER CONDICIONAL MÁGICO (Solo aparece en modo building o trial) 🚨 */}
          {['building', 'trial'].includes(datosEmpresa.suscripcion_estado) && (
              <div className="relative overflow-hidden bg-blue-900/30 border border-blue-500/50 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_0_30px_rgba(37,99,235,0.15)]">
                  <div className="absolute inset-0 w-full h-[2px] bg-blue-400/20 blur-sm animate-pulse"></div>
                  
                  <div className="flex items-center gap-4 z-10">
                      <div className="bg-blue-500/20 p-3 rounded-full animate-pulse text-blue-400">
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                      </div>
                      <div>
                          <h3 className="text-xl font-bold text-blue-400">🤖 Analizando y construyendo tu sitio...</h3>
                          <p className="text-slate-300 text-sm mt-1">
                              Nuestra IA está trabajando en el diseño. Mientras tanto, puedes subir tus fotos, agregar productos o configurar tus datos.
                          </p>
                      </div>
                  </div>

                  <button 
                      onClick={() => navigate('/checkout')} 
                      className="z-10 whitespace-nowrap bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold transition-colors shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  >
                      Lanzar mi Sitio 🚀
                  </button>
              </div>
          )}

          {/* 🔓 EL PANEL LIBERADO PARA QUE PUEDAN TOCAR TODO EN CUALQUIER ESTADO 🔓 */}
          {seccionActiva === 'catalogo' && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800">Catálogo de Productos</h3>
                <span className="bg-gray-100 text-gray-600 font-bold px-3 py-1 rounded-full text-xs">Total: {items.length}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                {items.map(item => (
                  <ItemCard key={item.id} item={item} onToggle={handleToggleStatus} onEdit={(data) => setModalConfig({ isOpen: true, data })} onDelete={handleDelete} onOpenReviews={handleOpenReviews} />
                ))}
              </div>
            </div>
          )}

          {seccionActiva === 'leads' && <div className="animate-fade-in"><BandejaContacto empresaId={empresaId} /></div>}
          {seccionActiva === 'galeria' && <div className="animate-fade-in"><GaleriaManager empresaId={empresaId} /></div>}
          {seccionActiva === 'categorias' && <div className="animate-fade-in"><CategoriasManager empresaId={empresaId} /></div>}
          {seccionActiva === 'testimonios' && <div className="animate-fade-in"><TestimoniosManager empresaId={empresaId} /></div>}
          {seccionActiva === 'faqs' && <div className="animate-fade-in"><FAQManager empresaId={empresaId} /></div>}
          {seccionActiva === 'importador' && <div className="animate-fade-in"><ImportadorIA empresaId={empresaId} /></div>}
          {seccionActiva === 'config' && <div className="animate-fade-in"><EmpresaConfig datos={datosEmpresa} onUpdate={handleUpdateEmpresa} currentLogo={currentLogo} /></div>}

        </main>
      </div>

      {/* MODAL CENTRALIZADO */}
      <CreateItemModal 
    isOpen={modalConfig.isOpen} 
    initialData={modalConfig.data} 
    onClose={() => setModalConfig({ isOpen: false, data: null })} 
    onSave={handleSave} 
    // 🚀 AQUÍ LE PASAMOS EL MAPA QUE HIZO LA IA:
    esquemaIA={datosEmpresa?.configuracion_sitio?.esquema_detalles_item || {}} 
      />
      <ReviewsModal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} item={itemToReview} />

    </div>
  );
}