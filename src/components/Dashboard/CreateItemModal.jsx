import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CreateItemModal({ isOpen, onClose, onSave, initialData = null }) {
  const [categorias, setCategorias] = useState([]);
  const [modoGaleria, setModoGaleria] = useState(false);
  
  // 🖼️ ESTADOS DE IMÁGENES
  const [archivos, setArchivos] = useState([]); 
  const [fotosGuardadas, setFotosGuardadas] = useState([]); 
  const [fotosAEliminar, setFotosAEliminar] = useState([]); 

  const [tabInterna, setTabInterna] = useState('general');

  // 🚀 formData SIMPLIFICADO: Adiós a los 10 campos de acordeones
  const [formData, setFormData] = useState({
    nombre: '', descripcion: '', precio: '', tipo_item: 'producto', categoria_id: '',
    sku: '', precio_anterior: '', badge_oferta: false, badge_nuevo: false,
    controlar_inventario: false, stock: 0, mostrar_sku: true, mostrar_reviews: false,
  });

  // 🚀 LA BOLSA MÁGICA DEL ÍTEM
  const [detallesExtra, setDetallesExtra] = useState({});

  const empresaId = localStorage.getItem('empresa_id') || 1;

  useEffect(() => {
    if (isOpen) {
      setTabInterna('general'); 
      
      // 1. Cargar categorías
      axios.get(`https://builx-api.onrender.com/api/categorias/${empresaId}`)
        .then(res => {
          setCategorias(res.data);
          if (!initialData && res.data.length > 0) {
            setFormData(prev => ({ ...prev, categoria_id: res.data[0].id }));
          }
        })
        .catch(err => console.error("Error cargando categorías:", err));

      // 2. Cargar datos iniciales
      if (initialData) {
        setFormData({
          nombre: initialData.nombre || '', descripcion: initialData.descripcion || '', precio: initialData.precio || '',
          tipo_item: initialData.tipo_item || 'producto', categoria_id: initialData.categoria_id || '',
          sku: initialData.sku || '', precio_anterior: initialData.precio_anterior || '',
          badge_oferta: !!initialData.badge_oferta, badge_nuevo: !!initialData.badge_nuevo,
          controlar_inventario: !!initialData.controlar_inventario, stock: initialData.stock || 0,
          mostrar_sku: initialData.mostrar_sku !== undefined ? !!initialData.mostrar_sku : true,
          mostrar_reviews: !!initialData.mostrar_reviews,
        });

        // 🚀 Cargar el JSON de detalles extra
        try {
          if (initialData.detalles_extra) {
            setDetallesExtra(typeof initialData.detalles_extra === 'string' 
              ? JSON.parse(initialData.detalles_extra) 
              : initialData.detalles_extra);
          } else {
            setDetallesExtra({});
          }
        } catch(e) { setDetallesExtra({}); }
        
        // Cargar fotos existentes
        let fotosParseadas = [];
        if (initialData.fotos) {
          try {
            fotosParseadas = typeof initialData.fotos === 'string' ? JSON.parse(initialData.fotos) : initialData.fotos;
          } catch(e) { fotosParseadas = []; }
        }
        setFotosGuardadas(fotosParseadas);
        setModoGaleria(fotosParseadas.length > 1);
        
      } else {
        setFormData({
          nombre: '', descripcion: '', precio: '', tipo_item: 'producto', categoria_id: '', sku: '', precio_anterior: '',
          badge_oferta: false, badge_nuevo: false, controlar_inventario: false, stock: 0, mostrar_sku: true, mostrar_reviews: false,
        });
        setDetallesExtra({});
        setFotosGuardadas([]);
        setModoGaleria(false);
      }
      
      setArchivos([]);
      setFotosAEliminar([]);
    }
  }, [initialData, isOpen, empresaId]);

  if (!isOpen) return null;

  const handleFileSelect = (e) => {
    const newFiles = Array.from(e.target.files);
    if (!modoGaleria) {
      setArchivos([newFiles[0]]);
    } else {
      setArchivos(prev => [...prev, ...newFiles]);
    }
    e.target.value = ''; 
  };

  const removeArchivoNuevo = (index) => setArchivos(prev => prev.filter((_, i) => i !== index));
  const removeFotoGuardada = (index, foto) => {
    setFotosGuardadas(prev => prev.filter((_, i) => i !== index));
    setFotosAEliminar(prev => [...prev, foto]); 
  };

  // Manejador para el JSON de detalles extra
  const handleDetalleChange = (key, value) => {
    setDetallesExtra(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    
    Object.keys(formData).forEach(key => {
      if (typeof formData[key] === 'boolean') {
        data.append(key, formData[key] ? 1 : 0);
      } else {
        data.append(key, formData[key]);
      }
    });

    data.append('empresa_id', empresaId);
    
    // 🚀 Empaquetamos el JSON dinámico
    data.append('detalles_extra', JSON.stringify(detallesExtra));

    archivos.forEach(file => data.append('fotos', file));

    if (fotosAEliminar.length > 0) {
      data.append('fotos_a_eliminar', JSON.stringify(fotosAEliminar));
    }

    if (initialData?.id) data.append('id', initialData.id);
    
    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 text-left transition-opacity">
      <div className="bg-white sm:rounded-[2.5rem] rounded-3xl p-4 sm:p-8 w-full max-w-2xl shadow-2xl max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl sm:text-2xl font-black text-gray-900">
            {initialData ? 'Editar Ítem' : 'Nuevo Ítem'}
          </h3>
          <button onClick={onClose} className="sm:hidden bg-gray-100 text-gray-500 w-8 h-8 rounded-full font-bold">✕</button>
        </div>

        <div className="flex gap-2 border-b border-gray-100 pb-3 mb-4 sm:mb-6 overflow-x-auto custom-scrollbar">
          <button type="button" onClick={() => setTabInterna('general')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${tabInterna === 'general' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}>
            📦 1. Datos Generales
          </button>
          <button type="button" onClick={() => setTabInterna('marketing')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${tabInterna === 'marketing' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}>
            🚀 2. Precios e Inventario
          </button>
          <button type="button" onClick={() => setTabInterna('detalles')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${tabInterna === 'detalles' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}>
            ✨ 3. Detalles IA
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-5 custom-scrollbar">
          
          {/* SECCIÓN 1 Y 2 SE QUEDAN EXACTAMENTE IGUAL COMO LAS TENÍAS */}
          {tabInterna === 'general' && (
             // ... Todo tu código de general (nombre, precio, fotos) ...
             <div className="space-y-4 animate-fade-in">
             <div>
               <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nombre</label>
               <input required placeholder="Ej. Lavamanos Ovalado" className="w-full p-3 sm:p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" 
                 value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
             </div>
             {/* ... el resto de tu código de general ... */}
             </div>
          )}
          {tabInterna === 'marketing' && (
            // ... Todo tu código de marketing ...
            <div className="space-y-4 animate-fade-in">
              <div className="bg-gray-50/60 p-4 sm:p-5 rounded-2xl border border-gray-100 space-y-4">
                <div className="flex justify-between items-center">
                  <div><h4 className="text-sm font-bold text-gray-800">Código SKU</h4></div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={formData.mostrar_sku} onChange={(e) => setFormData({...formData, mostrar_sku: e.target.checked})} className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <input placeholder="Ej. SKU-115542" className="w-full p-3 sm:p-4 bg-white border border-gray-200 rounded-xl outline-none text-sm" 
                  value={formData.sku} onChange={(e) => setFormData({...formData, sku: e.target.value})} />
              </div>
              {/* ... el resto de tu código de marketing ... */}
            </div>
          )}

          {/* 🚀 SECCIÓN 3: DETALLES DINÁMICOS (El JSON) */}
          {tabInterna === 'detalles' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800">
                Estos campos fueron generados por la IA específicamente para tu tipo de negocio.
              </div>
              
              {Object.keys(detallesExtra).length === 0 ? (
                <div className="text-center p-8 text-gray-400 font-medium border-2 border-dashed border-gray-200 rounded-2xl">
                  Aún no hay detalles extra. La IA los creará cuando diseñe tu sitio.
                </div>
              ) : (
                Object.entries(detallesExtra).map(([key, value]) => (
                  <div key={key} className="border border-gray-100 rounded-2xl p-4 bg-gray-50/40">
                    <label className="block text-xs font-black text-gray-800 mb-2 capitalize">
                      {key.replace(/_/g, ' ')}
                    </label>
                    <textarea 
                      className="w-full p-3 sm:p-4 bg-white border border-gray-200 rounded-xl outline-none h-20 text-xs resize-none focus:ring-2 focus:ring-blue-500"
                      value={value} 
                      onChange={(e) => handleDetalleChange(key, e.target.value)} 
                    />
                  </div>
                ))
              )}

              <div className="border border-gray-100 rounded-2xl p-4 sm:p-5 bg-emerald-50/30 flex justify-between items-center mt-6">
                <h4 className="text-xs font-black text-emerald-900">⭐ Activar Reviews (Estrellitas)</h4>
                <input type="checkbox" checked={formData.mostrar_reviews} onChange={(e) => setFormData({...formData, mostrar_reviews: e.target.checked})} className="w-4 h-4 accent-emerald-600" />
              </div>
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-4 border-t border-gray-100 sticky bottom-0 bg-white z-10 pb-2">
            <button type="button" onClick={onClose} className="w-full sm:flex-1 py-3 sm:py-4 text-gray-500 font-bold hover:bg-gray-50 rounded-2xl transition-all text-sm">
              Cancelar
            </button>
            <button type="submit" className="w-full sm:flex-1 py-3 sm:py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all text-sm">
              {initialData ? 'Guardar Cambios' : 'Crear Ítem'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}