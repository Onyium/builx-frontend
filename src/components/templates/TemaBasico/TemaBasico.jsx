import React from 'react';

export default function TemaBasico({ config, empresa, items, paginaActual }) {
    return (
        <div className="font-sans text-gray-800" style={{ backgroundColor: config.color_fondo || '#f9fafb' }}>
            <header className="p-8 text-center" style={{ backgroundColor: config.color_primario || '#1e3a8a', color: '#fff' }}>
                <h1 className="text-4xl font-black">{empresa.nombre}</h1>
                <p className="mt-2 text-xl opacity-90">{config.slogan || 'Bienvenidos a nuestra tienda'}</p>
            </header>

            <main className="max-w-4xl mx-auto p-8">
                <h2 className="text-2xl font-bold border-b pb-2 mb-6">Nuestro Catálogo ({paginaActual})</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {items.map(item => (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            {item.imagen_url && <img src={item.imagen_url} alt={item.nombre} className="w-full h-48 object-cover rounded-lg mb-4" />}
                            <h3 className="font-bold text-lg">{item.nombre}</h3>
                            <p className="text-emerald-600 font-black text-xl mt-2">${item.precio}</p>
                            
                            {/* Mostramos la magia del JSON de los items si existe */}
                            {item.detalles_extra && (
                                <p className="text-xs text-gray-500 mt-2">
                                    {typeof item.detalles_extra === 'string' 
                                        ? JSON.parse(item.detalles_extra).material // Asumiendo que inventaron una variable "material"
                                        : item.detalles_extra.material}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}