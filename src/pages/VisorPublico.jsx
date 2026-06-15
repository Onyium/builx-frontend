import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function VisorPublico() {
    const { slug } = useParams(); // Saca el nombre de la URL (ej. floristeriaChristian)
    const [searchParams] = useSearchParams(); 
    const isPreview = searchParams.get('preview') === 'true'; // Verifica si trae la llave VIP
    
    const [datosSitio, setDatosSitio] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchSitio = async () => {
            try {
                // 🚨 IMPORTANTE: Necesitas que tu backend tenga una ruta para buscar por SLUG
                const res = await axios.get(`https://builx-api.onrender.com/api/empresa/slug/${slug}`);
                
                if (res.data && res.data.success) {
                    setDatosSitio(res.data.data);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Error al cargar el sitio:", err);
                setError(true);
            } finally {
                setCargando(false);
            }
        };

        fetchSitio();
    }, [slug]);

    if (cargando) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="animate-pulse font-bold text-xl text-blue-400">Cargando catálogo...</div>
            </div>
        );
    }

    if (error || !datosSitio) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <h1 className="text-2xl font-bold">Sitio no encontrado 😢</h1>
            </div>
        );
    }

    // 🚨 EL GUARDIA DE SEGURIDAD (Sitio en Construcción) 🚨
    if (datosSitio.suscripcion_estado === 'building' && !isPreview) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#050B14] text-white p-4 text-center">
                <span className="text-6xl mb-4">🚧</span>
                <h1 className="text-4xl font-black mb-3">Sitio en Construcción</h1>
                <p className="text-slate-400 text-lg">
                    Este catálogo digital de <strong>{datosSitio.nombre}</strong> está siendo estructurado actualmente. ¡Vuelve pronto!
                </p>
            </div>
        );
    }

    // 👇 RENDERIZADO DEL SITIO FINAL 👇
    return (
        <div className="w-full min-h-screen">
            {/* Aviso flotante solo para el dueño / administrador */}
            {datosSitio.suscripcion_estado === 'building' && isPreview && (
                <div className="bg-yellow-500 text-black text-center text-xs font-bold py-1.5 w-full fixed top-0 z-[9999] shadow-md">
                    ⚠️ MODO VISTA PREVIA: Este sitio aún no es visible para el público general.
                </div>
            )}
            
            {/* Inyectamos el CSS de GrapeJS */}
            <style dangerouslySetInnerHTML={{ __html: datosSitio.css_guardado || '' }} />
            
            {/* Inyectamos el HTML de GrapeJS */}
            <div dangerouslySetInnerHTML={{ __html: datosSitio.html_guardado || '<p class="text-center mt-20">Aún no hay diseño generado.</p>' }} />
        </div>
    );
}