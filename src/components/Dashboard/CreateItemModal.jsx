import { useState, useEffect } from 'react';
import axios from 'axios';

// 🚀 Añadimos esquemaIA a las props
export default function CreateItemModal({ isOpen, onClose, onSave, initialData = null, esquemaIA = {} }) {
  const [categorias, setCategorias] = useState([]);
  const [modoGaleria, setModoGaleria] = useState(false);
  
  // 🖼️ ESTADOS DE IMÁGENES
  const [archivos, setArchivos] = useState([]); 
  const [fotosGuardadas, setFotosGuardadas] = useState([]); 
  const [fotosAEliminar, setFotosAEliminar] = useState([]); 

  const [tabInterna, setTabInterna] = useState('general');

  // formData estándar
  const [formData, setFormData] = useState({
    nombre: '', descripcion: '', precio: '', tipo_item: 'producto', categoria_id: '',
    sku: '', precio_anterior: '', badge_oferta: false, badge_nuevo: false,
    controlar_inventario: false, stock: 0, mostrar_sku: true, mostrar_reviews: false,
  });

  const [detallesExtra, setDetallesExtra] = useState({});
  const empresaId = localStorage.getItem('empresa_id') || 1;

  // 🚀 LIMPIADOR DE URLS PARA LA PREVISUALIZACIÓN
  const formatearUrlPreview = (rawUrl) => {
    if (!rawUrl) return '';
    let limpia = String(rawUrl).replace(/[\[\]"'\\]/g, '').trim();
    if (limpia.includes('cloudinary.com')) {
      const pos = limpia.lastIndexOf('http');
      if (pos !== -1) limpia = limpia.substring(pos);
    }
    limpia = limpia.replace('https//', 'https://').replace('http//', 'http://');
    if (limpia.startsWith('http')) return limpia;
    return `https://builx-api.onrender.com${limpia.startsWith('/') ? limpia : '/' + limpia}`;
  };

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

      // 2. Cargar datos iniciales (MODO EDICIÓN)
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

        // Desempaquetar detalles extra
        try {
          if (initialData.detalles_extra) {
            setDetallesExtra(typeof initialData.detalles_extra === 'string' 
              ? JSON.parse(initialData.detalles_extra) 
              : initialData.detalles_extra);
          } else {
            setDetallesExtra({});
          }
        } catch(e) { setDetallesExtra({}); }
        
        // 🚀 BÚSQUEDA INTELIGENTE DE FOTOS EXISTENTES
        let fotosParseadas = [];
        if (initialData.todasLasFotos && Array.isArray(initialData.todasLasFotos)) {
            fotosParseadas = initialData.todasLasFotos;
        }
        
        // Si no encontró fotos en la galería, busca la principal
        if (fotosParseadas.length === 0 && initialData.imagen_url) {
            fotosParseadas = [initialData.imagen_url];
        }

        // Limpiamos las URLs antes de meterlas al estado
        const fotosLimpias = fotosParseadas.map(f => formatearUrlPreview(f));
        
        setFotosGuardadas(fotosLimpias);
        setModoGaleria(fotosLimpias.length > 1);
        
      } else {
        // MODO NUEVO ÍTEM
        setFormData({
          nombre: '', descripcion: '', precio: '', tipo_item: 'producto', categoria_id: '', sku: '', precio_anterior: '',
          badge_oferta: false, badge_nuevo: false, controlar_inventario: false, stock: 0, mostrar_sku: true, mostrar_reviews: false,
        });
        
        const detallesVacios = {};
        if (esquemaIA && typeof esquemaIA === 'object') {
            Object.keys(esquemaIA).forEach(llave => {
                detallesVacios[llave] = ''; 
            });
        }
        setDetallesExtra(detallesVacios);
        setFotosGuardadas([]);
        setModoGaleria(false);
      }
      
      setArchivos([]);
      setFotosAEliminar([]);
    }
  }, [initialData, isOpen, empresaId, esquemaIA]);

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
    // Guardamos la URL cruda para que el backend sepa cuál borrar de Cloudinary
    setFotosAEliminar(prev => [...prev, foto]); 
  };

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
          
          {tabInterna === 'general' && (
             <div className="space-y-4 animate-fade-in">
             <div>
               <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nombre</label>
               <input required placeholder="Ej. Lavamanos Ovalado" className="w-full p-3 sm:p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" 
                 value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
             </div>
             
             <div>
               <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Descripción</label>
               <textarea placeholder="Descripción del producto..." className="w-full p-3 sm:p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm h-24 resize-none" 
                 value={formData.descripcion} onChange={(e) => setFormData({...formData, descripcion: e.target.value})} />
             </div>

             <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Precio ($)</label>
                 <input required type="number" step="0.01" placeholder="0.00" className="w-full p-3 sm:p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-bold text-blue-600" 
                   value={formData.precio} onChange={(e) => setFormData({...formData, precio: e.target.value})} />
               </div>
               <div>
                 <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Categoría</label>
                 <select required className="w-full p-3 sm:p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                   value={formData.categoria_id} onChange={(e) => setFormData({...formData, categoria_id: e.target.value})}>
                   {categorias.map(cat => <option key={cat.id} value={cat.id}>{cat.nombre}</option>)}
                 </select>
               </div>
             </div>

             {/* 📸 SECCIÓN DE IMÁGENES */}
             <div className="pt-4 border-t border-gray-100 mt-4">
               <div className="flex justify-between items-center mb-3">
                 <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                   Fotografías del Ítem
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-500">
                   <input 
                     type="checkbox" 
                     checked={modoGaleria} 
                     onChange={(e) => setModoGaleria(e.target.checked)} 
                     className="accent-blue-600 w-4 h-4" 
                   />
                   Permitir varias fotos (Galería)
                 </label>
               </div>
               
               <input 
                 type="file" 
                 accept="image/*"
                 multiple={modoGaleria} 
                 onChange={handleFileSelect}
                 className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer transition-colors"
               />

               {/* Previsualización de las fotos */}
               {(fotosGuardadas.length > 0 || archivos.length > 0) && (
                 <div className="flex gap-2 overflow-x-auto py-3 custom-scrollbar mt-2">
                   
                   {/* Fotos guardadas */}
                   {fotosGuardadas.map((foto, index) => (
                     <div key={`old-${index}`} className="relative flex-shrink-0 animate-fade-in">
                       <img src={foto} alt="guardada" className="w-16 h-16 object-cover rounded-xl border border-gray-200 shadow-sm" />
                       <button type="button" onClick={() => removeFotoGuardada(index, foto)} className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center hover:bg-red-600 shadow-md">✕</button>
                     </div>
                   ))}
                   
                   {/* Fotos nuevas */}
                   {archivos.map((file, index) => (
                     <div key={`new-${index}`} className="relative flex-shrink-0 animate-fade-in">
                       <img src={URL.createObjectURL(file)} alt="nueva" className="w-16 h-16 object-cover rounded-xl border-2 border-blue-400 shadow-sm" />
                       <button type="button" onClick={() => removeArchivoNuevo(index)} className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center hover:bg-red-600 shadow-md">✕</button>
                     </div>
                   ))}
                 </div>
               )}
             </div>

             </div>
          )}

          {tabInterna === 'marketing' && (
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
            </div>
          )}

          {tabInterna === 'detalles' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800 font-medium">
                ✨ Campos personalizados para tu catálogo.
              </div>
              
              {Object.keys(detallesExtra).length === 0 ? (
                <div className="text-center p-8 text-gray-400 font-medium border-2 border-dashed border-gray-200 rounded-2xl">
                  Este catálogo no usa campos dinámicos extra.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(detallesExtra).map(([key, value]) => (
                    <div key={key} className="border border-gray-100 rounded-2xl p-4 bg-gray-50/40 focus-within:bg-white focus-within:border-blue-200 transition-colors">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                        {key.replace(/_/g, ' ')}
                      </label>
                      <input 
                        type={esquemaIA[key] === 'numero' ? 'number' : 'text'}
                        className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder={`Ej. Escribe aquí...`}
                        value={value || ''} 
                        onChange={(e) => handleDetalleChange(key, e.target.value)} 
                      />
                    </div>
                  ))}
                </div>
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