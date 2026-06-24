import React from 'react';

// Ahora recibimos 'config' (identidad visual) e 'items' (la tabla de tu backend)
export default function TemaBasico({ config, items }) {
    // 1. Configuraciones visuales y de texto desde el JSON global
    const { hotelIdentity, terminologia } = config;
    const isDark = hotelIdentity?.theme?.mode === 'dark';
    const primaryColor = hotelIdentity?.theme?.primaryAccent || '#3b82f6';
    const secondaryColor = hotelIdentity?.theme?.secondaryAccent || '#9ca3af';

    // Textos adaptables: Si es hotel dice "Cabañas", si es ferretería dice "Productos"
    const tituloCatalogo = terminologia?.catalogo_plural || "Nuestro Catálogo";

    return (
        <div 
            className={`font-sans min-h-screen ${isDark ? 'text-gray-100' : 'text-gray-800'}`} 
            style={{ backgroundColor: isDark ? '#121212' : '#f9fafb' }}
        >
            {/* --- HEADER --- */}
            <header 
                className="p-8 text-center shadow-md relative overflow-hidden" 
                style={{ backgroundColor: primaryColor, color: '#fff' }}
            >
                {/* Si la IA puso una imagen de fondo en el JSON, la mostramos */}
                {config.modules?.heroSection?.backgroundImage && (
                   <div 
                     className="absolute inset-0 opacity-30 bg-cover bg-center"
                     style={{ backgroundImage: `url(${config.modules.heroSection.backgroundImage})` }}
                   />
                )}
                <div className="relative z-10">
                    <h1 className="text-4xl font-black">{hotelIdentity?.name}</h1>
                    <p className="mt-2 text-xl opacity-90">{hotelIdentity?.slogan}</p>
                </div>
            </header>

            {/* --- CATÁLOGO DE ÍTEMS DE MYSQL --- */}
            <main className="max-w-5xl mx-auto p-8">
                <h2 
                    className="text-2xl font-bold border-b pb-2 mb-8" 
                    style={{ borderColor: secondaryColor }}
                >
                    {tituloCatalogo}
                </h2>
                
                {/* Grid Responsivo */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Mapeamos los ítems REALES de tu base de datos */}
                    {items.map(item => {
                        // Si el producto no está disponible, no lo renderizamos
                        if (!item.esta_disponible) return null;

                        // Parseamos la columna detalles_extra (si existe)
                        let detalles = {};
                        try {
                            detalles = item.detalles_extra ? JSON.parse(item.detalles_extra) : {};
                        } catch (e) { console.warn("Error leyendo detalles_extra", e); }

                        return (
                            <div 
                                key={item.id} 
                                className="flex flex-col rounded-xl shadow-sm border transition-all hover:shadow-md hover:-translate-y-1 overflow-hidden"
                                style={{ 
                                    backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
                                    borderColor: isDark ? '#333333' : '#e5e7eb'
                                }}
                            >
                                {/* Imagen del producto */}
                                {item.imagen_url && (
                                    <div className="h-48 overflow-hidden relative">
                                        <img 
                                            src={`https://builx-api.onrender.com${item.imagen_url}`} 
                                            alt={item.nombre} 
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Badges de Oferta/Nuevo si están en MySQL */}
                                        {item.badge_oferta && (
                                           <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">OFERTA</span>
                                        )}
                                    </div>
                                )}

                                {/* Información del producto */}
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="font-bold text-xl">{item.nombre}</h3>
                                    <p className="text-sm opacity-80 mt-1 line-clamp-2">
                                        {item.descripcion}
                                    </p>
                                    
                                    {/* Precio desde MySQL */}
                                    <div className="mt-4 flex items-end gap-2">
                                        <p className="font-black text-2xl" style={{ color: primaryColor }}>
                                            ${item.precio}
                                        </p>
                                        {item.precio_anterior && (
                                            <p className="text-sm line-through opacity-50 mb-1">
                                                ${item.precio_anterior}
                                            </p>
                                        )}
                                    </div>

                                    {/* --- LA MAGIA: DETALLES EXTRA DINÁMICOS --- */}
                                    {Object.keys(detalles).length > 0 && (
                                        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                                            {/* Iteramos sobre cualquier llave rara que venga en detalles_extra */}
                                            {Object.entries(detalles).map(([clave, valor]) => {
                                                // Si es un arreglo (ej: amenidades), lo mostramos como lista
                                                if (Array.isArray(valor)) {
                                                    return (
                                                        <div key={clave} className="mb-2">
                                                            <span className="text-xs font-bold uppercase opacity-60 block mb-1">
                                                                {clave.replace(/_/g, ' ')}:
                                                            </span>
                                                            <ul className="text-sm space-y-1">
                                                                {valor.map((v, i) => (
                                                                    <li key={i} className="flex items-center gap-2">
                                                                        <span style={{ color: secondaryColor }}>•</span> {v}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    );
                                                }
                                                // Si es texto normal (ej: capacidad, talla, medida)
                                                return (
                                                    <p key={clave} className="text-sm flex justify-between border-b border-gray-100 dark:border-gray-800 py-1">
                                                        <span className="opacity-70 capitalize">{clave.replace(/_/g, ' ')}</span>
                                                        <span className="font-medium">{valor}</span>
                                                    </p>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* Botón de Acción Dinámico */}
                                    <button 
                                        className="w-full mt-5 py-2.5 rounded-lg font-bold text-white transition-opacity hover:opacity-90 mt-auto"
                                        style={{ backgroundColor: primaryColor }}
                                    >
                                        {config.modules?.heroSection?.ctaText || "Solicitar"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}