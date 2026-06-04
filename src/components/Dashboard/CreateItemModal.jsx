import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CreateItemModal({ isOpen, onClose, onSave, initialData = null }) {
  const [categorias, setCategorias] = useState([]);
  const [modoGaleria, setModoGaleria] = useState(false);
  
  // 🖼️ NUEVOS ESTADOS PARA GESTIÓN VISUAL DE IMÁGENES
  const [archivos, setArchivos] = useState([]); // Fotos nuevas seleccionadas
  const [fotosGuardadas, setFotosGuardadas] = useState([]); // Fotos que ya venían de la BD
  const [fotosAEliminar, setFotosAEliminar] = useState([]); // Fotos de la BD que el usuario borró

  const [tabInterna, setTabInterna] = useState('general');

  const [formData, setFormData] = useState({
    nombre: '', descripcion: '', precio: '', tipo_item: 'producto', categoria_id: '',
    sku: '', precio_anterior: '', badge_oferta: false, badge_nuevo: false,
    controlar_inventario: false, stock: 0, mostrar_sku: true,
    mostrar_especificaciones: false, mostrar_garantia: false, mostrar_pagos_envios: false, mostrar_reviews: false,
    especificaciones: '', garantia: '', pagos_envios: ''
  });
  
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
          mostrar_especificaciones: !!initialData.mostrar_especificaciones, mostrar_garantia: !!initialData.mostrar_garantia,
          mostrar_pagos_envios: !!initialData.mostrar_pagos_envios, mostrar_reviews: !!initialData.mostrar_reviews,
          especificaciones: initialData.especificaciones || '', garantia: initialData.garantia || '', pagos_envios: initialData.pagos_envios || ''
        });
        
        // Cargar fotos existentes si las hay (Asumiendo que vienen en initialData.fotos)
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
          badge_oferta: false, badge_nuevo: false, controlar_inventario: false, stock: 0, mostrar_sku: true,
          mostrar_especificaciones: false, mostrar_garantia: false, mostrar_pagos_envios: false, mostrar_reviews: false,
          especificaciones: '', garantia: '', pagos_envios: ''
        });
        setFotosGuardadas([]);
        setModoGaleria(false);
      }
      
      // Limpiar estados de imágenes temporales
      setArchivos([]);
      setFotosAEliminar([]);
    }
  }, [initialData, isOpen, empresaId]);

  if (!isOpen) return null;

  // 📸 FUNCIÓN: Cuando el usuario selecciona fotos
  const handleFileSelect = (e) => {
    const newFiles = Array.from(e.target.files);
    if (!modoGaleria) {
      setArchivos([newFiles[0]]); // Si no es galería, solo guarda 1
    } else {
      setArchivos(prev => [...prev, ...newFiles]); // Si es galería, las suma a las que ya tenía
    }
    e.target.value = ''; // Resetea el input por si quiere volver a elegir la misma foto
  };

  // 🗑️ FUNCIÓN: Borrar una foto nueva recién seleccionada
  const removeArchivoNuevo = (index) => {
    setArchivos(prev => prev.filter((_, i) => i !== index));
  };

  // 🗑️ FUNCIÓN: Borrar una foto vieja que ya estaba en la BD
  const removeFotoGuardada = (index, foto) => {
    setFotosGuardadas(prev => prev.filter((_, i) => i !== index));
    setFotosAEliminar(prev => [...prev, foto]); // La anotamos para decirle al backend que la borre
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

    // Adjuntar las fotos nuevas
    archivos.forEach(file => {
      data.append('fotos', file);
    });

    // Si el usuario borró fotos viejas, se lo mandamos al backend
    if (fotosAEliminar.length > 0) {
      data.append('fotos_a_eliminar', JSON.stringify(fotosAEliminar));
    }

    if (initialData?.id) data.append('id', initialData.id);
    
    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 text-left transition-opacity">
      <div className="bg-white sm:rounded-[2.5rem] rounded-3xl p-4 sm:p-8 w-full max-w-2xl shadow-2xl max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        
        {/* Cabecera del Modal */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl sm:text-2xl font-black text-gray-900">
            {initialData ? 'Editar Ítem' : 'Nuevo Ítem'}
          </h3>
          <button onClick={onClose} className="sm:hidden bg-gray-100 text-gray-500 w-8 h-8 rounded-full font-bold">✕</button>
        </div>

        {/* NAVBAR INTERNO */}
        <div className="flex gap-2 border-b border-gray-100 pb-3 mb-4 sm:mb-6 overflow-x-auto custom-scrollbar">
          <button type="button" onClick={() => setTabInterna('general')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${tabInterna === 'general' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}>
            📦 1. Datos Generales
          </button>
          <button type="button" onClick={() => setTabInterna('marketing')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${tabInterna === 'marketing' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}>
            🚀 2. Precios e Inventario
          </button>
          <button type="button" onClick={() => setTabInterna('acordeones')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${tabInterna === 'acordeones' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}>
            📜 3. Acordeones
          </button>
        </div>

        {/* Formulario Principal */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-5 custom-scrollbar">
          
          {/* ────── SECCIÓN 1: DATOS GENERALES ────── */}
          {tabInterna === 'general' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nombre</label>
                <input required placeholder="Ej. Lavamanos Ovalado" className="w-full p-3 sm:p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" 
                  value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Precio Actual ($)</label>
                  <input required type="number" step="0.01" placeholder="0.00" className="w-full p-3 sm:p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none text-sm" 
                    value={formData.precio} onChange={(e) => setFormData({...formData, precio: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Categoría</label>
                  <select required className="w-full p-3 sm:p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none text-sm"
                    value={formData.categoria_id} onChange={(e) => setFormData({...formData, categoria_id: e.target.value})}>
                    <option value="">Seleccionar...</option>
                    {categorias.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 📸 ÁREA DE GESTIÓN DE IMÁGENES PROFESIONAL */}
              <div className="p-4 sm:p-5 bg-blue-50/40 border border-blue-100 rounded-[1.5rem] space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black text-blue-600 uppercase tracking-tighter">Galería de Imágenes</span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-[10px] font-bold text-gray-500">Múltiples fotos</span>
                    <input type="checkbox" checked={modoGaleria} onChange={(e) => setModoGaleria(e.target.checked)} className="w-4 h-4 accent-blue-600 cursor-pointer" />
                  </label>
                </div>
                
                {/* Botón de subida estilizado (Oculta el input real) */}
                <label className="block w-full border-2 border-dashed border-blue-300 bg-white hover:bg-blue-50 rounded-2xl p-6 text-center cursor-pointer transition-colors group">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform shadow-sm">
                    <i className="fa-solid fa-camera"></i>
                  </div>
                  <span className="text-xs font-bold text-blue-600 block">Toca para subir imágenes</span>
                  <span className="text-[10px] text-gray-400 font-medium block mt-1">PNG, JPG, WEBP</span>
                  <input type="file" multiple={modoGaleria} accept="image/*" className="hidden" onChange={handleFileSelect} />
                </label>

                {/* Previsualización Visual (Miniaturas) */}
                {(archivos.length > 0 || fotosGuardadas.length > 0) && (
                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 bg-white p-3 rounded-2xl border border-gray-100">
                    
                    {/* Renderizar fotos viejas (si existen) */}
                    {fotosGuardadas.map((foto, idx) => (
                      <div key={`old-${idx}`} className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-gray-200 group">
                        <img src={foto.url || foto} alt="guardada" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeFotoGuardada(idx, foto)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shadow-md hover:bg-red-600">
                          ✕
                        </button>
                      </div>
                    ))}

                    {/* Renderizar fotos nuevas subiéndose */}
                    {archivos.map((file, idx) => (
                      <div key={`new-${idx}`} className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-blue-400 group">
                        <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-blue-600/10 pointer-events-none"></div>
                        <button type="button" onClick={() => removeArchivoNuevo(idx)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shadow-md hover:bg-red-600">
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Descripción Breve</label>
                <textarea placeholder="Describe lo que ofreces de forma persuasiva..." className="w-full p-3 sm:p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none h-24 text-sm resize-none"
                  value={formData.descripcion} onChange={(e) => setFormData({...formData, descripcion: e.target.value})} />
              </div>
            </div>
          )}

          {/* ────── SECCIÓN 2: MARKETING E INVENTARIO ────── */}
          {tabInterna === 'marketing' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-gray-50/60 p-4 sm:p-5 rounded-2xl border border-gray-100 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">Código SKU</h4>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={formData.mostrar_sku} onChange={(e) => setFormData({...formData, mostrar_sku: e.target.checked})} className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <input placeholder="Ej. SKU-115542" className="w-full p-3 sm:p-4 bg-white border border-gray-200 rounded-xl outline-none text-sm" 
                  value={formData.sku} onChange={(e) => setFormData({...formData, sku: e.target.value})} />
              </div>

              <div className="bg-red-50/30 p-4 sm:p-5 rounded-2xl border border-red-100/50 space-y-4">
                <h4 className="text-sm font-bold text-red-900">Estrategias de Precios (Ofertas)</h4>
                <div>
                  <label className="block text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Precio Anterior Tachado ($)</label>
                  <input type="number" step="0.01" placeholder="Ej. 19.90" className="w-full p-3 sm:p-4 bg-white border border-red-100 rounded-xl outline-none text-sm" 
                    value={formData.precio_anterior} onChange={(e) => setFormData({...formData, precio_anterior: e.target.value})} />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <label className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-gray-100 flex-1 cursor-pointer">
                    <input type="checkbox" checked={formData.badge_oferta} onChange={(e) => setFormData({...formData, badge_oferta: e.target.checked})} className="w-4 h-4 accent-red-500" />
                    <span className="text-xs font-bold text-gray-700">"-20% Oferta"</span>
                  </label>
                  <label className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-gray-100 flex-1 cursor-pointer">
                    <input type="checkbox" checked={formData.badge_nuevo} onChange={(e) => setFormData({...formData, badge_nuevo: e.target.checked})} className="w-4 h-4 accent-blue-500" />
                    <span className="text-xs font-bold text-gray-700">"Nuevo 🆕"</span>
                  </label>
                </div>
              </div>

              <div className="bg-emerald-50/30 p-4 sm:p-5 rounded-2xl border border-emerald-100/60 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-emerald-900">Control de Inventario</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={formData.controlar_inventario} onChange={(e) => setFormData({...formData, controlar_inventario: e.target.checked})} className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                {formData.controlar_inventario && (
                  <div>
                    <label className="block text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Unidades Disponibles</label>
                    <input type="number" className="w-full p-3 sm:p-4 bg-white border border-emerald-200 rounded-xl outline-none font-bold text-gray-800 text-sm" 
                      value={formData.stock} onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ────── SECCIÓN 3: ACORDEONES EXTENDIDOS ────── */}
          {tabInterna === 'acordeones' && (
            <div className="space-y-4 animate-fade-in">
              <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50/40">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-black text-gray-800">🛠️ Especificaciones</span>
                  <input type="checkbox" checked={formData.mostrar_especificaciones} onChange={(e) => setFormData({...formData, mostrar_especificaciones: e.target.checked})} className="w-4 h-4 accent-blue-600 cursor-pointer" />
                </div>
                {formData.mostrar_especificaciones && (
                  <textarea placeholder="Medidas, materiales, etc..." className="w-full p-3 sm:p-4 bg-white border border-gray-200 rounded-xl outline-none h-20 text-xs resize-none"
                    value={formData.especificaciones} onChange={(e) => setFormData({...formData, especificaciones: e.target.value})} />
                )}
              </div>

              <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50/40">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-black text-gray-800">🛡️ Garantía / Cuidados</span>
                  <input type="checkbox" checked={formData.mostrar_garantia} onChange={(e) => setFormData({...formData, mostrar_garantia: e.target.checked})} className="w-4 h-4 accent-blue-600 cursor-pointer" />
                </div>
                {formData.mostrar_garantia && (
                  <textarea placeholder="Garantía de fábrica..." className="w-full p-3 sm:p-4 bg-white border border-gray-200 rounded-xl outline-none h-20 text-xs resize-none"
                    value={formData.garantia} onChange={(e) => setFormData({...formData, garantia: e.target.value})} />
                )}
              </div>

              <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50/40">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-black text-gray-800">🚚 Pagos y Envíos</span>
                  <input type="checkbox" checked={formData.mostrar_pagos_envios} onChange={(e) => setFormData({...formData, mostrar_pagos_envios: e.target.checked})} className="w-4 h-4 accent-blue-600 cursor-pointer" />
                </div>
                {formData.mostrar_pagos_envios && (
                  <textarea placeholder="Zonas de cobertura..." className="w-full p-3 sm:p-4 bg-white border border-gray-200 rounded-xl outline-none h-20 text-xs resize-none"
                    value={formData.pagos_envios} onChange={(e) => setFormData({...formData, pagos_envios: e.target.value})} />
                )}
              </div>

              <div className="border border-gray-100 rounded-2xl p-4 sm:p-5 bg-blue-50/30 flex justify-between items-center">
                <h4 className="text-xs font-black text-blue-900">⭐ Activar Reviews (Estrellitas)</h4>
                <input type="checkbox" checked={formData.mostrar_reviews} onChange={(e) => setFormData({...formData, mostrar_reviews: e.target.checked})} className="w-4 h-4 accent-blue-600" />
              </div>
            </div>
          )}

          {/* ────── BOTONES DE ACCIÓN ────── */}
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