import { useState, useEffect } from 'react';
import axios from 'axios';

export default function BandejaContacto({ empresaId }) {
  const [mensajes, setMensajes] = useState([]);
  const [filtro, setFiltro] = useState('todos'); // 'todos' o 'no-leidos'
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    console.log("🔎 El ID que le está llegando a la Bandeja es:", empresaId);
    if (empresaId) fetchMensajes();
  }, [empresaId]);

  const fetchMensajes = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/contacto/${empresaId}`);
      setMensajes(res.data);
    } catch (err) {
      console.error("Error cargando mensajes:", err);
    } finally {
      setCargando(false);
    }
  };

  const handleMarcarLeido = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/contacto/leido/${id}`);
      // Actualizamos el estado local de forma limpia
      setMensajes(mensajes.map(m => m.id === id ? { ...m, leido: 1 } : m));
    } catch (err) {
      alert("Error al actualizar estado");
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este lead?")) {
      try {
        await axios.delete(`http://localhost:5000/api/contacto/${id}`);
        setMensajes(mensajes.filter(m => m.id !== id));
      } catch (err) {
        alert("Error al eliminar el registro");
      }
    }
  };

  const mensajesFiltrados = mensajes.filter(m => {
    if (filtro === 'no-leidos') return m.leido === 0;
    return true;
  });

  if (cargando) return <p className="text-gray-500 text-center py-10 font-medium">Cargando bandeja de entrada...</p>;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 max-w-5xl mx-auto mb-10">
      
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-5 mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">📥 Bandeja de Leads / Contactos</h2>
          <p className="text-gray-500 text-sm mt-0.5">Gestiona los clientes interesados que escriben desde tu sitio web.</p>
        </div>
        
        {/* Filtros */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          <button 
            onClick={() => setFiltro('todos')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filtro === 'todos' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Todos ({mensajes.length})
          </button>
          <button 
            onClick={() => setFiltro('no-leidos')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filtro === 'no-leidos' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            No leídos ({mensajes.filter(m => m.leido === 0).length})
          </button>
        </div>
      </div>

      {/* Cuerpo / Lista de Mensajes */}
      {mensajesFiltrados.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-gray-200 rounded-2xl bg-gray-50">
          <p className="text-gray-400 font-medium italic text-sm">No hay mensajes disponibles en esta sección.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {mensajesFiltrados.map(msg => (
            <div 
              key={msg.id} 
              onClick={() => msg.leido === 0 && handleMarcarLeido(msg.id)}
              className={`p-5 rounded-2xl border transition-all relative cursor-pointer ${msg.leido === 0 ? 'bg-blue-50/40 border-blue-100 hover:bg-blue-50' : 'bg-white border-gray-100 hover:border-gray-200'}`}
            >
              {/* Punto azul flotante si no está leído */}
              {msg.leido === 0 && (
                <span className="absolute top-6 left-4 w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse" />
              )}

              <div className="pl-4">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                      {msg.nombre}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">
                      {new Date(msg.fecha_creacion).toLocaleString('es-SV')}
                    </p>
                  </div>

                  {/* Acciones de la tarjeta */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {msg.leido === 0 ? (
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleMarcarLeido(msg.id); }}
                        className="bg-white hover:bg-gray-100 border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-lg font-bold transition-colors shadow-sm"
                      >
                        ✔ Marcar leído
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-md">Leído</span>
                    )}
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleEliminar(msg.id); }}
                      className="bg-white hover:bg-red-50 border border-gray-200 text-red-500 hover:text-red-600 text-xs p-1.5 rounded-lg transition-colors shadow-sm"
                      title="Eliminar lead"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {/* Grid de Información de Contacto */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm bg-gray-50/50 p-3 rounded-xl border border-gray-100/60 mb-3">
                  <p className="text-gray-600 font-medium">📧 <span className="text-gray-900 select-all">{msg.correo}</span></p>
                  <p className="text-gray-600 font-medium">📞 <span className="text-gray-900 select-all">{msg.telefono}</span></p>
                </div>

                {/* Texto del Mensaje */}
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">{msg.mensaje}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}