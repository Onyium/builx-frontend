// src/components/Dashboard/EmpresaConfig.jsx
import { useState } from 'react';

export default function EmpresaConfig({ datos, onUpdate, currentLogo }) {
  const [config, setConfig] = useState(() => {
    try {
      if (!datos.configuracion_sitio) return {};
      return typeof datos.configuracion_sitio === 'string' 
        ? JSON.parse(datos.configuracion_sitio) 
        : datos.configuracion_sitio;
    } catch (e) {
      console.error("Error parseando configuracion_sitio", e);
      return {};
    }
  });

  const [logoFile, setLogoFile] = useState(null);

  // 1. Manejador para actualizar el estado anidado
  // path es un arreglo de llaves, ej: ['contactChannels', 'whatsapp', 'phoneNumber']
  const handleChangeAnidado = (path, value) => {
    setConfig((prevConfig) => {
      // Creamos una copia profunda del estado actual para no mutarlo directamente
      const newConfig = JSON.parse(JSON.stringify(prevConfig));
      let current = newConfig;
      
      // Navegamos hasta el último nivel del objeto
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      // Actualizamos el valor final
      current[path[path.length - 1]] = value;
      return newConfig;
    });
  };

  const handleSubmit = () => {
    onUpdate(config, logoFile);
    setLogoFile(null);
  };

  // 2. EL MOTOR RECURSIVO MÁGICO
  // Recibe el objeto actual y la "ruta" de cómo llegamos hasta ahí
  const renderizarJSON = (objetoActual, rutaPadre = []) => {
    if (!objetoActual || typeof objetoActual !== 'object') return null;

    return Object.entries(objetoActual).map(([llave, valor]) => {
      // Evitamos renderizar el logo_url o arrays (como la lista de productos, que van en otra sección)
      if (llave === 'logo_url' || Array.isArray(valor)) return null;

      const rutaActual = [...rutaPadre, llave];

      // Si el valor es OTRO objeto (ej: contactChannels), llamamos a esta misma función de nuevo
      if (typeof valor === 'object' && valor !== null) {
        return (
          <div key={rutaActual.join('.')} className="col-span-full mb-6 border-t border-gray-200 pt-6 mt-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4 capitalize text-blue-600">
              {llave.replace(/([A-Z])/g, ' $1').trim()} {/* Formato bonito: contactChannels -> Contact Channels */}
            </h3>
            {/* Contenedor tipo grid para los sub-elementos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderizarJSON(valor, rutaActual)} 
            </div>
          </div>
        );
      }

      // Si el valor es un booleano (true/false), mostramos un Checkbox (ej: isVisible)
      if (typeof valor === 'boolean') {
        return (
          <div key={rutaActual.join('.')} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <input 
              type="checkbox" 
              checked={valor} 
              onChange={(e) => handleChangeAnidado(rutaActual, e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <label className="text-sm font-bold text-gray-700 capitalize">
               {llave.replace(/([A-Z])/g, ' $1').trim()}
            </label>
          </div>
        );
      }

      // El Input Inteligente para colores, textos largos y cortos
      return (
        <div key={rutaActual.join('.')} className="flex flex-col justify-end bg-gray-50 p-4 rounded-xl border border-gray-200">
          <label className="block text-sm font-bold text-gray-700 mb-2 capitalize">
             {llave.replace(/([A-Z])/g, ' $1').trim()}
          </label>
          
          {llave.toLowerCase().includes('color') || llave.toLowerCase().includes('accent') ? (
            <div className="flex items-center gap-3 bg-white p-2 border rounded-xl">
               <input 
                  type="color" 
                  value={valor || '#000000'} 
                  onChange={(e) => handleChangeAnidado(rutaActual, e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                />
                <span className="text-sm text-gray-500 uppercase font-mono">{valor}</span>
            </div>
          ) : (typeof valor === 'string' && valor.length > 50) ? (
             <textarea 
                value={valor || ''} 
                onChange={(e) => handleChangeAnidado(rutaActual, e.target.value)}
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                rows={3}
              />
          ) : (
            <input 
              type="text" 
              value={valor || ''} 
              onChange={(e) => handleChangeAnidado(rutaActual, e.target.value)}
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          )}
        </div>
      );
    });
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm mb-12 border border-gray-100">
      <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <span>⚙️</span> Configuración Avanzada de la Interfaz
      </h2>
      
      {/* === CAMPO ESTÁTICO: EL LOGO === */}
      <div className="mb-8 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <label className="block text-sm font-bold text-gray-700 mb-2">Logo Principal</label>
        <div className="flex items-center gap-4">
          {currentLogo && !logoFile && (
            <img src={`https://builx-api.onrender.com${currentLogo}`} alt="Logo" className="h-16 w-16 object-cover rounded-lg border bg-white" />
          )}
          <input 
            type="file" 
            accept="image/*" 
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
            onChange={e => setLogoFile(e.target.files[0])} 
          />
        </div>
      </div>

      {/* === EL ÁRBOL DINÁMICO DE JSON === */}
      <div className="space-y-6">
         {Object.keys(config).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderizarJSON(config)}
            </div>
         ) : (
           <div className="p-4 text-sm text-yellow-700 bg-yellow-50 rounded-lg">
             La IA aún no ha generado variables de diseño para este sitio.
           </div>
         )}
      </div>

      <div className="mt-8 flex justify-end">
        <button onClick={handleSubmit} className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20">
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}