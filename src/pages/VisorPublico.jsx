import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

// 🚀 IMPORTACIONES DE TUS PLANTILLAS
import TemaAwwwards from '../components/templates/TemaAwwwards';
import TemaBasico from '../components/templates/TemaBasico/TemaBasico';

export default function VisorPublico() {
    // 🚀 La variable 'subpagina' te permite manejar rutas tipo /v/hotel/reservas
    const { slug, subpagina } = useParams(); 
    const [searchParams] = useSearchParams(); 
    const isPreview = searchParams.get('preview') === 'true'; 
    
    const [datosSitio, setDatosSitio] = useState(null);
    const [items, setItems] = useState([]); 
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchDatosGlobales = async () => {
            try {
                setCargando(true);
                // 1. Traer los datos de la Empresa (Incluye el JSON de configuración y plan_actual)
                const resEmpresa = await axios.get(`https://builx-api.onrender.com/api/empresa/slug/${slug}`);
                
                if (resEmpresa.data && resEmpresa.data.success) {
                    const empresaData = resEmpresa.data.data;
                    setDatosSitio(empresaData);
                    document.title = empresaData.nombre || 'Sitio Web';

                    // 2. Traer los ítems de ESA empresa usando su ID
                    const resItems = await axios.get(`https://builx-api.onrender.com/api/items/${empresaData.id}`);
                    setItems(resItems.data || []);

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

        if (slug) fetchDatosGlobales();
    }, [slug]);

    if (cargando) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050B14] text-white">
                <div className="animate-pulse font-bold text-xl text-blue-400">Cargando catálogo...</div>
            </div>
        );
    }

    if (error || !datosSitio) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#050B14] text-white">
                <span className="text-6xl mb-4">😢</span>
                <h1 className="text-2xl font-bold">Sitio no encontrado</h1>
                <p className="text-gray-400 mt-2">La URL parece incorrecta o el sitio no existe.</p>
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

    // ==========================================
    // 🚀 EL MOTOR DE PLANTILLAS
    // ==========================================
    const renderizarPlantilla = () => {
        // Parseamos el JSON que viene de la base de datos de forma segura
        let config = {};
        try {
            config = typeof datosSitio.configuracion_sitio === 'string' 
                ? JSON.parse(datosSitio.configuracion_sitio) 
                : (datosSitio.configuracion_sitio || {});
        } catch (e) {
            console.error("Error leyendo JSON de configuración", e);
        }

        // 🚀 MAGIA MARCA BLANCA: Al pasar "empresa: datosSitio", el TemaBasico 
        // ya tiene acceso a empresa.plan_actual para saber si muestra la marca de agua o no.
        const propsComunes = {
            config: config, 
            empresa: datosSitio, 
            items: items, 
            paginaActual: subpagina || 'inicio' 
        };

        // Decidimos qué componente de React renderizar
        switch (datosSitio.plantilla_seleccionada) {
            case 'tema-awwwards':
                return <TemaAwwwards {...propsComunes} />;
            case 'tema-basico':
                return <TemaBasico {...propsComunes} />;
            default:
                // Si no hay plantilla seleccionada, cargamos una genérica
                return <TemaBasico {...propsComunes} />; 
        }
    };

    return (
        <div className={`w-full min-h-screen ${datosSitio.suscripcion_estado === 'building' && isPreview ? 'pt-8' : ''}`}>
            
            {/* Aviso flotante modo Preview */}
            {datosSitio.suscripcion_estado === 'building' && isPreview && (
                <div className="bg-yellow-500 text-black text-center text-xs font-bold py-2 w-full fixed top-0 left-0 z-[9999] shadow-md">
                    ⚠️ MODO VISTA PREVIA: Este sitio aún no es visible para el público general.
                </div>
            )}
            
            {/* 🚀 INYECTAMOS LA MAGIA REACT 🚀 */}
            {renderizarPlantilla()}
            
        </div>
    );
}