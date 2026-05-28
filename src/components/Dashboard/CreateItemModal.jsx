import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CreateItemModal({ isOpen, onClose, onSave, initialData = null }) {
  const [categorias, setCategorias] = useState([]);
  const [modoGaleria, setModoGaleria] = useState(false);
  const [archivos, setArchivos] = useState([]);
  
  // 📥 NUEVO ESTADO: Para controlar la navegación interna del modal
  const [tabInterna, setTabInterna] = useState('general'); // 'general', 'marketing', 'acordeones'

  // 📦 ESTADO EXPANDIDO: Incluye absolutamente todos los nuevos superpoderes de la PDP
  const [formData, setFormData] = useState({
    nombre: '', 
    descripcion: '', 
    precio: '', 
    tipo_item: 'producto', 
    categoria_id: '',
    // Bloque de identificación y marketing
    sku: '',
    precio_anterior: '',
    badge_oferta: false,
    badge_nuevo: false,
    // Control de Inventario
    controlar_inventario: false,
    stock: 0,
    // Interruptores de Visibilidad (Toggles)
    mostrar_sku: true,
    mostrar_especificaciones: false,
    mostrar_garantia: false,
    mostrar_pagos_envios: false,
    mostrar_reviews: false,
    // Contenido extendido
    especificaciones: '',
    garantia: '',
    pagos_envios: ''
  });
  
  const empresaId = localStorage.getItem('empresa_id') || 1;

  useEffect(() => {
    if (isOpen) {
      setTabInterna('general'); // Resetear a la primera pestaña siempre que abra
      
      // 1. Cargar categorías
      axios.get(`http://localhost:5000/api/categorias/${empresaId}`)
        .then(res => {
          setCategorias(res.data);
          if (!initialData && res.data.length > 0) {
            setFormData(prev => ({ ...prev, categoria_id: res.data[0].id }));
          }
        })
        .catch(err => console.error("Error cargando categorías:", err));

      // 2. Cargar datos iniciales (Mapeando los campos dinámicos si existen en la edición)
      if (initialData) {
        setFormData({
          nombre: initialData.nombre || '',
          descripcion: initialData.descripcion || '',
          precio: initialData.precio || '',
          tipo_item: initialData.tipo_item || 'producto',
          categoria_id: initialData.categoria_id || '',
          sku: initialData.sku || '',
          precio_anterior: initialData.precio_anterior || '',
          badge_oferta: !!initialData.badge_oferta,
          badge_nuevo: !!initialData.badge_nuevo,
          controlar_inventario: !!initialData.controlar_inventario,
          stock: initialData.stock || 0,
          mostrar_sku: initialData.mostrar_sku !== undefined ? !!initialData.mostrar_sku : true,
          mostrar_especificaciones: !!initialData.mostrar_especificaciones,
          mostrar_garantia: !!initialData.mostrar_garantia,
          mostrar_pagos_envios: !!initialData.mostrar_pagos_envios,
          mostrar_reviews: !!initialData.mostrar_reviews,
          especificaciones: initialData.especificaciones || '',
          garantia: initialData.garantia || '',
          pagos_envios: initialData.pagos_envios || ''
        });
        setModoGaleria(archivos.length > 1);
      } else {
        // Resetear completo a limpio si es nuevo ítem
        setFormData({
          nombre: '', descripcion: '', precio: '', tipo_item: 'producto', categoria_id: '',
          sku: '', precio_anterior: '', badge_oferta: false, badge_nuevo: false,
          controlar_inventario: false, stock: 0, mostrar_sku: true,
          mostrar_especificaciones: false, mostrar_garantia: false, mostrar_pagos_envios: false, mostrar_reviews: false,
          especificaciones: '', garantia: '', pagos_envios: ''
        });
        setModoGaleria(false);
      }
      setArchivos([]);
    }
  }, [initialData, isOpen, empresaId]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    
    // Agregamos todo el payload expandido al FormData
    Object.keys(formData).forEach(key => {
      // Los booleanos los pasamos como 1 o 0 para que MySQL los entienda directo como TINYINT
      if (typeof formData[key] === 'boolean') {
        data.append(key, formData[key] ? 1 : 0);
      } else {
        data.append(key, formData[key]);
      }
    });

    data.append('empresa_id', empresaId);

    // Fotos de galería
    for (let i = 0; i < archivos.length; i++) {
        data.append('fotos', archivos[i]);
    }

    if (initialData?.id) data.append('id', initialData.id);
    
    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 text-left">
      <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-2xl shadow-2xl max-h-[90vh] flex flex-col">
        
        {/* Cabecera del Modal */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black text-gray-900">
            {initialData ? 'Editar Configuración de Ítem' : 'Nuevo Ítem Multi-negocio'}
          </h3>
          <span className="text-[11px] font-bold px-3 py-1 bg-gray-100 text-gray-500 rounded-full uppercase tracking-wider">
            {formData.tipo_item}
          </span>
        </div>

        {/* ─── NAVBAR INTERNO DEL MODAL (Pestañas de control) ─── */}
        <div className="flex gap-2 border-b border-gray-100 pb-3 mb-6 overflow-x-auto">
          <button type="button" onClick={() => setTabInterna('general')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${tabInterna === 'general' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}>
            📦 1. Datos Generales
          </button>
          <button type="button" onClick={() => setTabInterna('marketing')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${tabInterna === 'marketing' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}>
            🚀 2. Precios e Inventario
          </button>
          <button type="button" onClick={() => setTabInterna('acordeones')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${tabInterna === 'acordeones' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}>
            📜 3. Acordeones Extendidos
          </button>
        </div>

        {/* Formulario Principal */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-2 space-y-5">
          
          {/* ────── SECCIÓN 1: DATOS GENERALES ────── */}
          {tabInterna === 'general' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nombre del producto/servicio</label>
                <input required placeholder="Ej. Lavamanos Ovalado o Ramo de 24 Rosas" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                  value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Precio Actual ($)</label>
                  <input required type="number" step="0.01" placeholder="0.00" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none" 
                    value={formData.precio} onChange={(e) => setFormData({...formData, precio: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Tipo de Estructura</label>
                  <select className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none appearance-none font-medium"
                    value={formData.tipo_item} onChange={(e) => setFormData({...formData, tipo_item: e.target.value})}>
                    <option value="producto">📦 Producto (Físico)</option>
                    <option value="servicio">⚡ Servicio / Agenda</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Categoría Asociada</label>
                <select required className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none"
                  value={formData.categoria_id} onChange={(e) => setFormData({...formData, categoria_id: e.target.value})}>
                  <option value="">Seleccionar categoría...</option>
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="p-5 bg-blue-50/40 border border-blue-100 rounded-[1.5rem] space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black text-blue-600 uppercase tracking-tighter">Habilitar Galería de fotos (Carrusel)</span>
                  <input type="checkbox" checked={modoGaleria} onChange={(e) => setModoGaleria(e.target.checked)} className="w-4 h-4 accent-blue-600 cursor-pointer" />
                </div>
                <input type="file" multiple={modoGaleria} accept="image/*" onChange={(e) => setArchivos(e.target.files)}
                  className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer" />
                {archivos.length > 0 && <p className="text-[10px] font-bold text-blue-500">🔥 {archivos.length} imágenes seleccionadas para la vista de detalles</p>}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Descripción Breve (Vista previa)</label>
                <textarea placeholder="Describe lo que ofreces de forma persuasiva..." className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none h-24 text-sm resize-none"
                  value={formData.descripcion} onChange={(e) => setFormData({...formData, descripcion: e.target.value})} />
              </div>
            </div>
          )}

          {/* ────── SECCIÓN 2: MARKETING E INVENTARIO ────── */}
          {tabInterna === 'marketing' && (
            <div className="space-y-5 animate-fade-in">
              
              {/* Bloque Identificadores SKU */}
              <div className="bg-gray-50/60 p-5 rounded-2xl border border-gray-100 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">Código de Modelo o SKU</h4>
                    <p className="text-xs text-gray-400">Útil para ferreterías o repuestos comerciales.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={formData.mostrar_sku} onChange={(e) => setFormData({...formData, mostrar_sku: e.target.checked})} className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ml-2 text-xs font-bold text-gray-500">Mostrar en Web</span>
                  </label>
                </div>
                <input placeholder="Ej. SKU-115542" className="w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none" 
                  value={formData.sku} onChange={(e) => setFormData({...formData, sku: e.target.value})} />
              </div>

              {/* Bloque de Precios Anteriores y Descuentos */}
              <div className="bg-red-50/30 p-5 rounded-2xl border border-red-100/50 space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-red-900">Estrategias de Precios (Ofertas)</h4>
                  <p className="text-xs text-gray-400">Muestra el precio tachado y calcula el ahorro de forma automatizada en la web.</p>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Precio Original Anterior ($)</label>
                  <input type="number" step="0.01" placeholder="Ej. 19.90 (Sabiendo que hoy cuesta menos)" className="w-full p-4 bg-white border border-red-100 rounded-2xl outline-none" 
                    value={formData.precio_anterior} onChange={(e) => setFormData({...formData, precio_anterior: e.target.value})} />
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-gray-100 flex-1 cursor-pointer">
                    <input type="checkbox" checked={formData.badge_oferta} onChange={(e) => setFormData({...formData, badge_oferta: e.target.checked})} className="w-4 h-4 accent-red-500" />
                    <span className="text-xs font-bold text-gray-700">Etiqueta "-20% Oferta"</span>
                  </label>
                  <label className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-gray-100 flex-1 cursor-pointer">
                    <input type="checkbox" checked={formData.badge_nuevo} onChange={(e) => setFormData({...formData, badge_nuevo: e.target.checked})} className="w-4 h-4 accent-blue-500" />
                    <span className="text-xs font-bold text-gray-700">Etiqueta "Nuevo 🆕"</span>
                  </label>
                </div>
              </div>

              {/* Control de Stock */}
              <div className="bg-emerald-50/30 p-5 rounded-2xl border border-emerald-100/60 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900">Control de Inventario Riguroso</h4>
                    <p className="text-xs text-gray-400">Oculta el botón de compra o pone "Agotado" si llega a cero.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={formData.controlar_inventario} onChange={(e) => setFormData({...formData, controlar_inventario: e.target.checked})} className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                    <span className="ml-2 text-xs font-bold text-emerald-600">Activar</span>
                  </label>
                </div>
                {formData.controlar_inventario && (
                  <div>
                    <label className="block text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Unidades Disponibles en Almacén</label>
                    <input type="number" className="w-full p-4 bg-white border border-emerald-200 rounded-2xl outline-none font-bold text-gray-800" 
                      value={formData.stock} onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})} />
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ────── SECCIÓN 3: ACORDEONES EXTENDIDOS (DETAILS) ────── */}
          {tabInterna === 'acordeones' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 bg-amber-50 rounded-2xl text-xs text-amber-800 font-medium mb-2 border border-amber-100">
                💡 <strong>Estrategia SaaS:</strong> Activa solo los acordeones que este negocio o producto necesite. Los acordeones apagados se omitirán automáticamente en la web.
              </div>

              {/* Acordeón: Especificaciones Técnicas */}
              <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50/40">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-black text-gray-800">🛠️ Pestaña de Especificaciones</span>
                  <input type="checkbox" checked={formData.mostrar_especificaciones} onChange={(e) => setFormData({...formData, mostrar_especificaciones: e.target.checked})} className="w-4 h-4 accent-blue-600 cursor-pointer" />
                </div>
                {formData.mostrar_especificaciones && (
                  <textarea placeholder="Medidas, materiales, voltajes, o tipos de flores..." className="w-full p-4 bg-white border border-gray-200 rounded-xl outline-none h-20 text-xs resize-none"
                    value={formData.especificaciones} onChange={(e) => setFormData({...formData, especificaciones: e.target.value})} />
                )}
              </div>

              {/* Acordeón: Garantía */}
              <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50/40">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-black text-gray-800">🛡️ Pestaña de Garantía o Cuidados</span>
                  <input type="checkbox" checked={formData.mostrar_garantia} onChange={(e) => setFormData({...formData, mostrar_garantia: e.target.checked})} className="w-4 h-4 accent-blue-600" />
                </div>
                {formData.mostrar_garantia && (
                  <textarea placeholder="Ej. Garantía de 6 meses de fábrica o Instrucciones para regar y cuidar las rosas..." className="w-full p-4 bg-white border border-gray-200 rounded-xl outline-none h-20 text-xs resize-none"
                    value={formData.garantia} onChange={(e) => setFormData({...formData, garantia: e.target.value})} />
                )}
              </div>

              {/* Acordeón: Envíos */}
              <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50/40">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-black text-gray-800">🚚 Pestaña de Pagos y Envíos</span>
                  <input type="checkbox" checked={formData.mostrar_pagos_envios} onChange={(e) => setFormData({...formData, mostrar_pagos_envios: e.target.checked})} className="w-4 h-4 accent-blue-600" />
                </div>
                {formData.mostrar_pagos_envios && (
                  <textarea placeholder="Zonas de cobertura, costos de delivery, o si aceptas pago contra entrega..." className="w-full p-4 bg-white border border-gray-200 rounded-xl outline-none h-20 text-xs resize-none"
                    value={formData.pagos_envios} onChange={(e) => setFormData({...formData, pagos_envios: e.target.value})} />
                )}
              </div>

              {/* Módulo: Reseñas / Social Proof */}
              <div className="border border-gray-100 rounded-2xl p-5 bg-blue-50/30 flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-black text-blue-900">⭐ Activar Sistema de Reviews</h4>
                  <p className="text-[11px] text-gray-400">Permite que tus clientes califiquen el producto con estrellitas.</p>
                </div>
                <input type="checkbox" checked={formData.mostrar_reviews} onChange={(e) => setFormData({...formData, mostrar_reviews: e.target.checked})} className="w-4 h-4 accent-blue-600" />
              </div>

            </div>
          )}

          {/* ────── BOTONES DE ACCIÓN ────── */}
          <div className="flex gap-3 pt-2 border-t border-gray-100 sticky bottom-0 bg-white">
            <button type="button" onClick={onClose} className="flex-1 py-4 text-gray-400 font-bold hover:bg-gray-50 rounded-2xl transition-all text-sm">
              Cancelar
            </button>
            <button type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all text-sm">
              {initialData ? 'Guardar Cambios Totales' : 'Dar de Alta Ítem'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}