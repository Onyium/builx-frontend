import React, { useState, useMemo } from 'react';
import Animacion from './components/Animacion';
import GaleriaPublica from './components/GaleriaPublica';
import SidebarReserva from './components/SidebarReserva';
import { formatearUrlPublica } from './components/UtilidadesCatalogo';

export default function CatalogoHabitaciones({ items, theme, configCatalogo, onSelect }) {
  // ==========================================
  // 1. ESTADOS DE LOS FILTROS Y UI (Sin fechas)
  // ==========================================
  const [filtros, setFiltros] = useState({
    adultos: 1,
    ninos: 0,
    precioMax: 500, 
    desayuno: false,
    cancelacion: false
  });

  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);

  const manejarFiltro = (e) => {
    const { name, value, type, checked } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // ==========================================
  // 2. LÓGICA MATEMÁTICA Y FILTRADO AVANZADO
  // ==========================================
  const itemsProcesados = useMemo(() => {
    const adultosSeleccionados = parseInt(filtros.adultos) || 1;
    const ninosSeleccionados = parseInt(filtros.ninos) || 0;

    return items.reduce((acc, item) => {
      if (!item.esta_disponible) return acc;

      let detalles = {};
      try {
        detalles = typeof item.detalles_extra === 'string' 
          ? JSON.parse(item.detalles_extra) 
          : (item.detalles_extra || {});
      } catch (e) {}

      const capAdultos = parseInt(detalles.Max_Adultos) || parseInt(detalles.Capacidad_Maxima) || 2;
      const capNinos = parseInt(detalles.Max_Ninos) || 0;
      const tieneDesayuno = detalles.Desayuno_Incluido === true;
      const tieneCancelacion = detalles.Cancelacion_Gratis === true;

      // Filtros duros
      if (capAdultos < adultosSeleccionados) return acc;
      if (capNinos < ninosSeleccionados) return acc;
      if (filtros.desayuno && !tieneDesayuno) return acc;
      if (filtros.cancelacion && !tieneCancelacion) return acc;

      // Cálculos de ocupación para 1 sola noche (base)
      const precioBaseNoche = parseFloat(item.precio) || 0;
      const ocupacionBase = parseInt(detalles.Ocupacion_Base_Incluida) || capAdultos; 
      const cobroExtra = parseFloat(detalles.Cobro_Persona_Extra) || 0;

      let personasExtra = 0;
      if (adultosSeleccionados > ocupacionBase) {
        personasExtra = adultosSeleccionados - ocupacionBase;
      }

      const precioTotalNoche = precioBaseNoche + (personasExtra * cobroExtra);

      // Filtro de precio
      if (precioTotalNoche > parseFloat(filtros.precioMax)) return acc;

      acc.push({
        ...item,
        precioMostrar: precioTotalNoche.toFixed(2)
      });

      return acc;
    }, []);
  }, [items, filtros]);

  return (
    <section id="catalogo" className="w-full h-full px-4 md:px-6 py-12 md:py-24" style={{ backgroundColor: theme.bgBeige, color: theme.textDark }}>
      <div className="max-w-7xl mx-auto">
        
        {/* ENCABEZADO */}
        <div className="text-center mb-12">
          <Animacion direccion="arriba">
            <h2 className="text-4xl md:text-5xl font-serif text-[#2b4535]">
              {configCatalogo?.titulo || "Disponibilidad y Precios"}
            </h2>
            <div className="w-16 h-px mx-auto mt-6" style={{ backgroundColor: theme.accentOrange }}></div>
          </Animacion>
        </div>

        {/* NIVEL 1: BARRA DE BÚSQUEDA (Solo Huéspedes) - Limpio sin traspasos */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8 flex flex-wrap gap-4 items-end">
          <div className="w-full mb-2 sm:mb-0 sm:w-auto">
            <span className="font-serif text-xl text-[#2b4535]">¿Quiénes viajan?</span>
          </div>
          <div className="w-[45%] sm:w-32 lg:w-40 ml-auto sm:ml-4">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Adultos</label>
            <input 
              type="number" name="adultos" min="1" max="10" 
              value={filtros.adultos} onChange={manejarFiltro} 
              className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 focus:border-[#2b4535] focus:bg-white outline-none transition-all font-bold" 
            />
          </div>
          <div className="w-[45%] sm:w-32 lg:w-40">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Niños</label>
            <input 
              type="number" name="ninos" min="0" max="10" 
              value={filtros.ninos} onChange={manejarFiltro} 
              className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 focus:border-[#2b4535] focus:bg-white outline-none transition-all font-bold" 
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* NIVEL 2: SIDEBAR DE FILTROS SECUNDARIOS - Estático en celular, Sticky en Escritorio */}
          <aside className="w-full lg:w-1/4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm lg:sticky lg:top-24 mb-2 lg:mb-0">
            <h3 className="font-serif text-xl text-[#2b4535] mb-6 border-b border-gray-100 pb-4 flex items-center justify-between">
              <span>Filtros</span>
              <span className="text-xs font-sans font-normal text-gray-400">({itemsProcesados.length} disp.)</span>
            </h3>
            
            {/* Filtro de Precio */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <label className="font-bold text-sm text-gray-700">Presupuesto máx:</label>
                <span className="font-serif font-bold text-lg text-[#2b4535]">${filtros.precioMax}</span>
              </div>
              <input 
                type="range" name="precioMax" min="10" max="1500" step="10"
                value={filtros.precioMax} onChange={manejarFiltro}
                className="w-full accent-[#7e3547] cursor-pointer" 
              />
              <span className="text-[10px] text-gray-400">Precio por noche</span>
            </div>

            {/* Filtros de Beneficios */}
            <div className="space-y-3.5 border-t border-gray-100 pt-6">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Comodidades</span>
              
              <label className="flex items-center gap-3 cursor-pointer group select-none">
                <input 
                  type="checkbox" name="desayuno" 
                  checked={filtros.desayuno} onChange={manejarFiltro} 
                  className="w-5 h-5 rounded border-gray-300 accent-[#2b4535] cursor-pointer" 
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">Desayuno incluido</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer group select-none">
                <input 
                  type="checkbox" name="cancelacion" 
                  checked={filtros.cancelacion} onChange={manejarFiltro} 
                  className="w-5 h-5 rounded border-gray-300 accent-[#2b4535] cursor-pointer" 
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">Cancelación gratis</span>
              </label>
            </div>

            {/* Botón Resetear */}
            {(filtros.desayuno || filtros.cancelacion || filtros.adultos > 1 || filtros.precioMax < 500) && (
              <button 
                onClick={() => setFiltros({ adultos: 1, ninos: 0, precioMax: 500, desayuno: false, cancelacion: false })}
                className="w-full mt-8 py-2 text-xs font-bold text-gray-400 hover:text-red-600 border border-dashed border-gray-300 rounded-lg hover:border-red-300 transition-all"
              >
                Limpiar filtros
              </button>
            )}
          </aside>

          {/* GRILLA DE RESULTADOS (Las Tarjetas) */}
          <div className="w-full lg:w-3/4">
            {itemsProcesados.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 p-8">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🏨</div>
                <h4 className="text-2xl font-serif text-[#2b4535] mb-2">Sin habitaciones disponibles</h4>
                <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
                  No encontramos habitaciones que coincidan con tus filtros actuales.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {itemsProcesados.map((item) => {
                  let imagenes = (item.todasLasFotos?.length > 0) 
                    ? item.todasLasFotos.map(formatearUrlPublica) 
                    : [formatearUrlPublica(item.imagen_url)];

                  return (
                    <div key={item.id} className="h-full">
                      <article className="group flex flex-col h-full bg-white border border-gray-200 transition-all duration-300 hover:shadow-xl rounded-2xl overflow-hidden">
                        
                        {/* Galería */}
                        <div className="h-64 w-full overflow-hidden relative bg-gray-100">
                          <GaleriaPublica imagenes={imagenes} nombre={item.nombre} />
                        </div>
                        
                        {/* Contenido */}
                        <div className="p-6 flex flex-col flex-1">
                          <h3 className="font-serif text-2xl mb-2 text-[#2b4535] group-hover:text-[#7e3547] transition-colors">
                            {item.nombre}
                          </h3>
                          <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                            {item.descripcion}
                          </p>
                          
                          {/* Pie de la tarjeta DINÁMICO */}
                          <div className="mt-auto flex justify-between items-end pt-5 border-t border-gray-100">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Desde</span>
                              <div className="flex items-baseline gap-1">
                                <span className="font-serif text-3xl text-[#2b4535] font-black">${item.precioMostrar}</span>
                                <span className="text-xs text-gray-400">/noche</span>
                              </div>
                            </div>
                            
                            {/* AL DAR CLIC, ABRIMOS EL SIDEBAR */}
                            <button 
                              onClick={() => {
                                setHabitacionSeleccionada(item);
                                if (onSelect) onSelect(item);
                              }}
                              className="px-6 py-3 text-white text-sm font-bold transition-all active:scale-95 shadow-md hover:shadow-lg rounded-xl"
                              style={{ backgroundColor: theme.accentOrange }}
                            >
                              Reservar
                            </button>
                          </div>
                        </div>

                      </article>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* RENDERIZADO CONDICIONAL DEL SIDEBAR */}
      {habitacionSeleccionada && (
        <SidebarReserva 
          item={habitacionSeleccionada} 
          telefonoHotel={configCatalogo?.telefono || "+51974206744"} 
          primaryColor={theme.accentOrange} 
          // Pasamos los huéspedes actuales al Sidebar para que no tenga que volver a ponerlos
          huespedesIniciales={{
            adultos: parseInt(filtros.adultos) || 1,
            ninos: parseInt(filtros.ninos) || 0
          }}
          onCancel={() => setHabitacionSeleccionada(null)} 
        />
      )}
    </section>
  );
}