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
        setDatosEmpresa({
          direccion: res.data.direccion || '',
          telefono: res.data.telefono || '',
          link_google_maps: res.data.link_google_maps || '',
          link_facebook: res.data.link_facebook || '',
          link_instagram: res.data.link_instagram || '',
          link_whatsapp: res.data.link_whatsapp || '',
          link_tiktok: res.data.link_tiktok || '',
          suscripcion_estado: res.data.suscripcion_estado || 'trial', 
          email: res.data.email_administrador || '' 
        });
        setCurrentLogo(res.data.logo_url || null);
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

  const handleUpdateEmpresa = async (nuevosDatos, file) => {
    try {
      const formData = new FormData();
      formData.append('direccion', nuevosDatos.direccion || '');
      formData.append('telefono', nuevosDatos.telefono || '');
      formData.append('whatsapp_pedidos', nuevosDatos.whatsapp_pedidos || '');
      formData.append('link_google_maps', nuevosDatos.link_google_maps || '');
      formData.append('link_facebook', nuevosDatos.link_facebook || '');
      formData.append('link_instagram', nuevosDatos.link_instagram || '');
      formData.append('link_whatsapp', nuevosDatos.link_whatsapp || '');
      formData.append('link_tiktok', nuevosDatos.link_tiktok || '');
      
      if (file) {
        formData.append('logo', file);
      }

      await axios.put(`https://builx-api.onrender.com/api/empresa/actualizar/${empresaId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      alert("¡Configuración de la sucursal guardada con éxito! 📍");
      fetchEmpresa(); 
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
      {/* 📱 Responsivo: En móviles se oculta usando transformaciones, en escritorio (lg:) se queda fija */}
      <aside className={`w-64 bg-[#0F172A] text-slate-300 flex flex-col fixed h-full z-30 shadow-2xl border-r border-slate-800 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        
        {/* Marca/SaaS Identificador */}
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
          {/* Botón para cerrar en móviles */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Links de Navegación del Panel */}
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
          {datosEmpresa.suscripcion_estado === 'active' && (
            <button 
              onClick={() => navigate('/admin/builder')} 
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-bold transition-all bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 active:scale-95 mt-4"
            >
              🎨 Editar Página Web
            </button>
          )}
        </nav>

        {/* Sección de Meta Info Inferior */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-center">
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Empresa ID: {empresaId}</p>
        </div>
      </aside>

      {/* ─── ÁREA DE TRABAJO PRINCIPAL (DERECHA) ─── */}
      {/* 📱 Responsivo: Quitamos el margen izquierdo en móviles (w-full) y lo devolvemos en escritorio (lg:pl-64) */}
      <div className="flex-1 lg:pl-64 min-h-screen flex flex-col w-full">
        
        {/* Barra Superior Inteligente */}
        <header className="h-16 lg:h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 lg:px-12 sticky top-0 z-10 shadow-sm">
          
          <div className="flex items-center gap-3">
            {/* 📱 Botón Hamburguesa (Solo visible en móviles) */}
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
            {seccionActiva === 'catalogo' && datosEmpresa.suscripcion_estado === 'active' && (
              <button onClick={() => setModalConfig({ isOpen: true, data: null })} className="bg-blue-600 text-white px-3 py-2 lg:px-5 lg:py-2.5 rounded-xl font-bold shadow-md shadow-blue-500/10 active:scale-95 transition-all hover:bg-blue-700 text-xs lg:text-sm whitespace-nowrap">
                + Nuevo Ítem
              </button>
            )}
            
            <button onClick={handleLogout} className="bg-red-50 text-red-600 border border-red-100 px-3 py-2 lg:px-4 lg:py-2.5 rounded-xl font-bold hover:bg-red-100 transition-all text-xs lg:text-sm whitespace-nowrap hidden sm:block">
              Cerrar Sesión
            </button>
            
            {/* Botón de logout icono para móviles muy pequeños */}
            <button onClick={handleLogout} className="sm:hidden bg-red-50 text-red-600 border border-red-100 p-2 rounded-xl font-bold hover:bg-red-100 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </button>
          </div>
        </header>

        {/* ─── CONTENEDOR DE COMPONENTES DINÁMICOS ─── */}
        <main className="p-4 md:p-8 lg:p-12 max-w-6xl w-full mx-auto flex-1 overflow-x-hidden">
          
          {/* 🚨 AQUÍ ESTÁ LA MAGIA: EL MURO DE PAGO 🚨 */}
          {datosEmpresa.suscripcion_estado !== 'active' ? (
            
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-10 text-center max-w-2xl mx-auto mt-6 lg:mt-10 border border-gray-100 mx-4 lg:mx-auto">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-rocket text-3xl lg:text-4xl text-blue-600"></i>
              </div>
              <h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-4">¡Desbloquea todo el poder de BuilX!</h2>
              <p className="text-gray-500 mb-8 text-base lg:text-lg">Para gestionar tu catálogo, recibir leads y usar nuestro Importador IA, necesitas activar tu suscripción premium.</p>
              
              <BotonSuscripcion 
                empresaId={empresaId} 
                emailEmpresa={datosEmpresa.email} 
              />
            </div>

          ) : (
            // 🔓 SI YA PAGÓ, LE MOSTRAMOS SU PANEL NORMAL 🔓
            <>
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
            </>
          )}

        </main>
      </div>

      {/* MODAL CENTRALIZADO */}
      <CreateItemModal isOpen={modalConfig.isOpen} initialData={modalConfig.data} onClose={() => setModalConfig({ isOpen: false, data: null })} onSave={handleSave} />
      <ReviewsModal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} item={itemToReview} />

    </div>
  );
}