import React from 'react';

export default function TemaAwwwards({ config, empresa, items, paginaActual }) {
    // Si la IA no definió un color primario, usamos un azul eléctrico elegante por defecto
    const colorAcento = config.color_primario || '#3b82f6';

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-white selection:text-black">
            
            {/* 🌟 HERO SECTION (Nivel Awwwards) */}
            <header className="relative w-full min-h-[60vh] flex flex-col items-center justify-center text-center p-8 overflow-hidden border-b border-gray-800/50">
                {/* Un brillo sutil de fondo usando el color de acento */}
                <div 
                    className="absolute top-[-20%] left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none"
                    style={{ backgroundColor: colorAcento }}
                ></div>
                
                <div className="z-10 flex flex-col items-center gap-6 max-w-4xl">
                    {/* Si subieron un logo, lo mostramos elegante */}
                    {config.logo_url && (
                        <img src={`https://builx-api.onrender.com${config.logo_url}`} alt="Logo" className="h-16 w-auto object-contain drop-shadow-2xl mb-4" />
                    )}
                    
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                        {empresa.nombre}
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide max-w-2xl">
                        {config.slogan || 'Elevando la experiencia a un nuevo nivel.'}
                    </p>

                    {/* Botón de acción con el color de la empresa */}
                    <button 
                        className="mt-8 px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105 shadow-[0_0_40px_rgba(0,0,0,0.3)]"
                        style={{ backgroundColor: colorAcento, boxShadow: `0 0 20px ${colorAcento}40` }}
                    >
                        {config.texto_boton_hero || 'Explorar Catálogo'}
                    </button>
                </div>
            </header>

            {/* 📦 SECCIÓN DE CATÁLOGO / ÍTEMS */}
            <main className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Colección <span className="text-gray-500 font-light capitalize">{paginaActual}</span>
                    </h2>
                    <span className="text-sm font-bold tracking-widest uppercase text-gray-500 border-b border-gray-700 pb-1">
                        {items.length} Ítems
                    </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map(item => (
                        <div key={item.id} className="group relative bg-[#111111] rounded-[2rem] p-4 border border-gray-800/60 hover:border-gray-600 transition-colors duration-500">
                            
                            {/* Imagen del Ítem */}
                            <div className="relative w-full aspect-square rounded-[1.5rem] overflow-hidden bg-black mb-6">
                                {item.imagen_url ? (
                                    <img 
                                        src={item.imagen_url} 
                                        alt={item.nombre} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100" 
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-800 font-black text-2xl">Sin Imagen</div>
                                )}
                                
                                {/* Badges */}
                                {item.badge_oferta === 1 && (
                                    <span className="absolute top-4 left-4 bg-white text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                                        Oferta Especial
                                    </span>
                                )}
                            </div>

                            {/* Info del Ítem */}
                            <div className="px-2">
                                <h3 className="text-xl font-bold mb-2">{item.nombre}</h3>
                                <p className="text-3xl font-light tracking-tighter" style={{ color: colorAcento }}>
                                    ${item.precio}
                                </p>
                                
                                {/* Detalles IA dinámicos (si existen) */}
                                {item.detalles_extra && (
                                    <div className="mt-4 pt-4 border-t border-gray-800">
                                        {Object.entries(typeof item.detalles_extra === 'string' ? JSON.parse(item.detalles_extra) : item.detalles_extra).slice(0,2).map(([key, value]) => (
                                            <p key={key} className="text-xs text-gray-400 flex justify-between mb-1">
                                                <span className="capitalize font-bold text-gray-500">{key.replace(/_/g, ' ')}</span>
                                                <span className="truncate max-w-[60%] text-right">{value}</span>
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* 🦶 FOOTER MINIMALISTA */}
            <footer className="w-full py-12 text-center border-t border-gray-900 mt-12 bg-black">
                <h4 className="text-2xl font-black tracking-tighter mb-4">{empresa.nombre}</h4>
                <p className="text-sm text-gray-600 font-bold tracking-widest uppercase mb-8">
                    {config.telefono || 'Contacto no disponible'}
                </p>
                <p className="text-xs text-gray-800">
                    © 2026 {empresa.nombre}. Todos los derechos reservados.
                </p>
            </footer>

        </div>
    );
}