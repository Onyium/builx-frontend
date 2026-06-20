import React from 'react';

// Ahora solo recibimos 'config', que contiene TODO el JSON de la base de datos
export default function TemaBasico({ config }) {
    // Desestructuramos para no escribir 'config.' en todos lados
    const { hotelIdentity, modules } = config;
    
    // Verificamos el modo oscuro directamente del JSON
    const isDark = hotelIdentity.theme.mode === 'dark';

    return (
        <div 
            className={`font-sans min-h-screen ${isDark ? 'text-gray-100' : 'text-gray-800'}`} 
            style={{ backgroundColor: isDark ? '#121212' : '#f9fafb' }}
        >
            {/* Header inyectando el color primario del JSON */}
            <header 
                className="p-8 text-center shadow-md" 
                style={{ backgroundColor: hotelIdentity.theme.primaryAccent, color: '#fff' }}
            >
                <h1 className="text-4xl font-black">{hotelIdentity.name}</h1>
                <p className="mt-2 text-xl opacity-90">{hotelIdentity.slogan}</p>
            </header>

            <main className="max-w-4xl mx-auto p-8">
                {/* Usamos el color secundario para el borde sutil */}
                <h2 
                    className="text-2xl font-bold border-b pb-2 mb-6" 
                    style={{ borderColor: hotelIdentity.theme.secondaryAccent }}
                >
                    Nuestras Cabañas
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Iteramos sobre modules.rooms en lugar de un prop externo 'items' */}
                    {modules.rooms.map(room => (
                        // Solo renderizamos si la cabaña está disponible (isAvailable: true)
                        room.isAvailable && (
                            <div 
                                key={room.id} 
                                className="p-6 rounded-xl shadow-sm border transition-transform hover:scale-105"
                                style={{ 
                                    backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
                                    borderColor: isDark ? '#333333' : '#e5e7eb'
                                }}
                            >
                                <h3 className="font-bold text-xl">{room.name}</h3>
                                
                                {/* Precio con el color primario dinámico */}
                                <p className="font-black text-2xl mt-2" style={{ color: hotelIdentity.theme.primaryAccent }}>
                                    ${room.pricePerNight}
                                </p>
                                
                                <p className="text-sm mt-2 opacity-80 font-medium">
                                    Capacidad: {room.capacity}
                                </p>
                                
                                {/* Mapeamos las amenidades desde el array del JSON */}
                                <div className="mt-4 border-t border-gray-700 pt-3">
                                    <p className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2">Incluye:</p>
                                    <ul className="text-sm opacity-80 space-y-1">
                                        {room.amenities.map((amenity, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <span style={{ color: hotelIdentity.theme.secondaryAccent }}>•</span> 
                                                {amenity}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </main>
        </div>
    );
}