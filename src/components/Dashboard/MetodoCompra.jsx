import React, { useState } from 'react';

export default function MetodoCompraConfig({ empresaData, onSave }) {
  const [metodoSeleccionado, setMetodoSeleccionado] = useState(empresaData.metodo_compra || 'whatsapp');

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm max-w-2xl text-left">
      <h3 className="text-xl font-black text-gray-900 mb-2">Método de Procesamiento de Pedidos</h3>
      <p className="text-sm text-gray-500 mb-6">Elige cómo quieres recibir los pagos y la información de las compras de tus clientes.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* 🟢 MODO WHATSAPP */}
        <div 
          onClick={() => setMetodoSeleccionado('whatsapp')}
          className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
            metodoSeleccionado === 'whatsapp' 
              ? 'border-green-500 bg-green-50/30' 
              : 'border-gray-100 bg-white hover:border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">🛒💬</span>
            <input type="radio" checked={metodoSeleccionado === 'whatsapp'} readOnly className="accent-green-600 h-4 w-4" />
          </div>
          <h4 className="font-bold text-gray-900 text-base mb-1">Carrito vía WhatsApp</h4>
          <p className="text-xs text-gray-500 leading-relaxed">Los clientes acumulan productos en un carrito local y te envían la factura detallada lista para procesar en un mensaje de WhatsApp.</p>
        </div>

        {/* 🔒 MODO EN LÍNEA (BLOQUEADO PARA V2) */}
        <div className="p-5 rounded-2xl border-2 border-gray-100 bg-gray-50/50 opacity-60 relative overflow-hidden">
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider">
            Próximamente
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">💳🔒</span>
            <input type="radio" disabled className="h-4 w-4" />
          </div>
          <h4 className="font-bold text-gray-400 text-base mb-1">Pasarela de Pagos (Tarjeta)</h4>
          <p className="text-xs text-gray-400 leading-relaxed">Permite cobrar de forma automática con tarjetas de crédito o débito e ingresar el dinero directo a tu cuenta bancaria.</p>
        </div>
      </div>

      <button 
        onClick={() => onSave(metodoSeleccionado)}
        className="px-6 py-3 bg-gray-900 text-white font-bold rounded-xl text-sm shadow-md hover:bg-black transition-all active:scale-95"
      >
        Guardar Configuración
      </button>
    </div>
  );
}