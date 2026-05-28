// src/components/Dashboard/EmpresaConfig.jsx
import { useState } from 'react';

export default function EmpresaConfig({ datos, onUpdate, currentLogo }) {
  const [localDatos, setLocalDatos] = useState(datos);
  const [logoFile, setLogoFile] = useState(null);

  const handleSubmit = () => {
    onUpdate(localDatos, logoFile);
    setLogoFile(null); // Limpiar después de enviar
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm mb-12 border border-gray-100">
      <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <span>⚙️</span> Configuración de la Sucursal
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Logo</label>
          <input type="file" accept="image/*" className="w-full text-sm" 
                 onChange={e => setLogoFile(e.target.files[0])} />
          {currentLogo && !logoFile && (
            <img src={`https://builx-api.onrender.com${currentLogo}`} className="h-10 mt-2 object-contain" />
          )}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Dirección</label>
          <input type="text" className="w-full border p-3 rounded-xl" 
                 value={localDatos.direccion || ''}
                 onChange={e => setLocalDatos({...localDatos, direccion: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Teléfono General</label>
          <input type="text" className="w-full border p-3 rounded-xl" 
                 value={localDatos.telefono || ''}
                 onChange={e => setLocalDatos({...localDatos, telefono: e.target.value})} />
        </div>
        
        {/* 🚨 AQUÍ AGREGAMOS EL CAMPO PARA WHATSAPP DE PEDIDOS */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 text-emerald-600">
            WhatsApp para Pedidos
          </label>
          <input type="text" className="w-full border p-3 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
                 placeholder="Ej: 50371234567"
                 value={localDatos.whatsapp_pedidos || ''}
                 onChange={e => setLocalDatos({...localDatos, whatsapp_pedidos: e.target.value})} />
          <p className="text-[10px] text-gray-400 mt-1">Con código de país, sin espacios.</p>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Google Maps</label>
          <input type="text" className="w-full border p-3 rounded-xl" 
                 value={localDatos.link_google_maps || ''}
                 onChange={e => setLocalDatos({...localDatos, link_google_maps: e.target.value})} />
        </div>
        
        {/* REDES SOCIALES PROTEGIDAS CONTRA NULL */}
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Facebook URL</label>
          <input type="text" className="w-full border p-2 rounded-lg text-sm" 
                 value={localDatos.link_facebook || ''} 
                 onChange={e => setLocalDatos({...localDatos, link_facebook: e.target.value})} />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Instagram URL</label>
          <input type="text" className="w-full border p-2 rounded-lg text-sm" 
                 value={localDatos.link_instagram || ''} 
                 onChange={e => setLocalDatos({...localDatos, link_instagram: e.target.value})} />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Whatsapp URL</label>
          <input type="text" className="w-full border p-2 rounded-lg text-sm" 
                 value={localDatos.link_whatsapp || ''} 
                 onChange={e => setLocalDatos({...localDatos, link_whatsapp: e.target.value})} />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">TIKTOK URL</label>
          <input type="text" className="w-full border p-2 rounded-lg text-sm" 
                 value={localDatos.link_tiktok || ''} 
                 onChange={e => setLocalDatos({...localDatos, link_tiktok: e.target.value})} />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button onClick={handleSubmit} className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold">
          Guardar Configuración
        </button>
      </div>
    </div>
  );
}