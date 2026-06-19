// src/components/Dashboard/EmpresaConfig.jsx
import { useState } from 'react';

export default function EmpresaConfig({ datos, onUpdate, currentLogo }) {
  // 1. Inicializamos el estado leyendo el JSON de la base de datos
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

  // El logo se maneja aparte porque es un archivo físico que va a Multer
  const [logoFile, setLogoFile] = useState(null);

  const handleChange = (key, value) => {
    setConfig({ ...config, [key]: value });
  };

  const handleSubmit = () => {
    // Le pasamos todo el objeto config al Dashboard principal para que lo envíe
    onUpdate(config, logoFile);
    setLogoFile(null);
  };

  // 2. EL MOTOR INTELIGENTE: Decide qué dibujar según la llave y el valor
  const renderInputInteligente = (key, value) => {
    // Si la IA le puso "color" a la variable, mostramos el selector de color
    if (key.toLowerCase().includes('color')) {
      return (
        <div className="flex items-center gap-3">
          <input 
            type="color" 
            value={value || '#000000'} 
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-12 h-12 rounded cursor-pointer border-0 p-0"
          />
          <span className="text-sm text-gray-500 uppercase">{value}</span>
        </div>
      );
    }

    // Si es un texto muy largo (ej: misión, visión, políticas), mostramos un textarea
    if (typeof value === 'string' && value.length > 50) {
      return (
        <textarea 
          value={value || ''} 
          onChange={(e) => handleChange(key, e.target.value)}
          className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          rows={3}
        />
      );
    }

    // Para todo lo demás (links, telefonos, slogans), un input normal
    return (
      <input 
        type="text" 
        value={value || ''} 
        onChange={(e) => handleChange(key, e.target.value)}
        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
      />
    );
  };

  // Filtramos el logo_url del JSON porque ese lo manejamos con el input de archivo arriba
  const camposDinamicos = Object.entries(config).filter(([key]) => key !== 'logo_url');

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm mb-12 border border-gray-100">
      <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <span>⚙️</span> Configuración de la Sucursal
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* === CAMPO ESTÁTICO: EL LOGO (Manejo de Archivos) === */}
        <div className="md:col-span-2 lg:col-span-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
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

        {/* === CAMPOS DINÁMICOS: LA MAGIA DEL JSON === */}
        {camposDinamicos.map(([key, value]) => (
          <div key={key} className="flex flex-col justify-end">
            <label className="block text-sm font-bold text-gray-700 mb-2 capitalize">
              {/* Quitamos los guiones bajos para que se vea limpio (ej: whatsapp_pedidos -> Whatsapp Pedidos) */}
              {key.replace(/_/g, ' ')}
            </label>
            {renderInputInteligente(key, value)}
          </div>
        ))}

      </div>

      {camposDinamicos.length === 0 && (
        <div className="mt-4 p-4 text-sm text-yellow-700 bg-yellow-50 rounded-lg">
          La IA aún no ha generado variables para este sitio o el JSON está vacío.
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <button onClick={handleSubmit} className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20">
          Guardar Configuración
        </button>
      </div>
    </div>
  );
}