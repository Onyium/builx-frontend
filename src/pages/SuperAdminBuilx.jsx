import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SuperAdminBuilx = () => {
    const [leads, setLeads] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [drawerLead, setDrawerLead] = useState(null); // 👈 Controla el lead visible en el panel deslizante
    const navigate = useNavigate();

    const entrarComoCliente = (lead) => {
        localStorage.clear();
        localStorage.setItem('empresaId', lead.id);
        localStorage.setItem('empresa_id', lead.id);
        localStorage.setItem('nombre', lead.nombre);
        localStorage.setItem('suscripcion_estado', lead.suscripcion_estado);
        localStorage.setItem('user_email', lead.email_administrador);
        localStorage.setItem('login_time', Date.now().toString()); 
        window.location.href = '/dashboard'; 
    };

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const response = await axios.get('https://builx-api.onrender.com/api/admin/leads-secretos-builx');
                if (response.data.success) {
                    setLeads(response.data.data);
                }
            } catch (error) {
                console.error("Error cargando los leads:", error);
            } finally {
                setCargando(false);
            }
        };
        fetchLeads();
    }, []);

    if (cargando) {
        return <div className="text-white text-center mt-20 text-xl">Cargando Centro de Mando... 🚀</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-400">Panel de Control BuilX</h1>
                    <span className="bg-blue-600 px-4 py-2 rounded-lg font-semibold">
                        Total Empresas: {leads.length}
                    </span>
                </div>

                <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-700 text-gray-300">
                                <th className="p-4 border-b border-gray-600">Empresa</th>
                                <th className="p-4 border-b border-gray-600">Rubro</th>
                                <th className="p-4 border-b border-gray-600">Estado</th>
                                <th className="p-4 border-b border-gray-600 text-center">Acciones Rápidas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-gray-750 border-b border-gray-700 transition-colors">
                                    <td className="p-4">
                                        <p className="font-bold">{lead.nombre}</p>
                                        <p className="text-sm text-gray-400">{lead.email_administrador}</p>
                                    </td>
                                    <td className="p-4 text-gray-300">{lead.rubro}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                            lead.suscripcion_estado === 'building' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-green-500/20 text-green-400'
                                        }`}>
                                            {lead.suscripcion_estado}
                                        </span>
                                    </td>
                                    <td className="p-4 flex justify-center gap-3">
                                        {/* Botón para abrir el panel lateral */}
                                        <button 
                                            onClick={() => setDrawerLead(lead)}
                                            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer"
                                        >
                                            📋 Ver Detalles
                                        </button>

                                        <a 
                                            href={`https://wa.me/${lead.whatsapp_pedidos || lead.telefono}?text=${encodeURIComponent(
                                                `¡Hola! Soy Jonathan de BuilX. 🚀\n\nYa estructuré la base de tu catálogo para ${lead.nombre}.\n\nPuedes ver la vista previa privada aquí:\nhttps://www.builxapp.com/v/${lead.slug || lead.id}\n\nCuéntame qué te parece para habilitar las ediciones.`
                                            )}`}
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer"
                                        >
                                            WhatsApp
                                        </a>
                                        
                                        <button 
                                            onClick={() => entrarComoCliente(lead)}
                                            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer"
                                        >
                                            Ver Dashboard
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ─── PANEL DESLIZANTE LATERAL (DRAWER) ─── */}
            <div className={`fixed inset-y-0 right-0 w-96 bg-gray-800 border-l border-gray-700 shadow-2xl p-6 transform transition-transform duration-300 ease-in-out z-50 ${drawerLead ? 'translate-x-0' : 'translate-x-full'}`}>
                {drawerLead && (
                    <div className="h-full flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                                <h2 className="text-xl font-black text-blue-400 truncate max-w-[200px]">{drawerLead.nombre}</h2>
                                <button 
                                    onClick={() => setDrawerLead(null)}
                                    className="text-gray-400 hover:text-white text-lg font-bold"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-5 overflow-y-auto max-h-[75vh] pr-2">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contacto Directo</label>
                                    <p className="text-sm font-mono mt-0.5 text-slate-300">{drawerLead.email_administrador}</p>
                                    <p className="text-sm font-mono text-slate-300">{drawerLead.telefono || 'Sin teléfono'}</p>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rubro Comercial</label>
                                    <p className="text-sm font-medium text-slate-200 mt-0.5">💼 {drawerLead.rubro || 'No especificado'}</p>
                                </div>

                                {/* Ajusta estos atributos según los nombres exactos de tu base de datos */}
                                <div className="bg-slate-900/40 p-4 rounded-xl border border-white/5">
                                    <label className="text-xs font-bold text-blue-400 uppercase tracking-wider">Preferencias Estéticas (Wizard)</label>
                                    
                                    <div className="mt-3">
                                        <span className="text-xs text-slate-400 block">Estilo solicitado:</span>
                                        <p className="text-sm font-semibold text-slate-200 capitalize">
                                            ✨ {drawerLead.estilo_visual || 'Minimalista / Limpio'}
                                        </p>
                                    </div>

                                    <div className="mt-3">
                                        <span className="text-xs text-slate-400 block">Paleta de colores sugerida:</span>
                                        <p className="text-sm font-semibold text-slate-200">
                                            🎨 {drawerLead.colores_preferidos || 'Oscuro con detalles neón'}
                                        </p>
                                    </div>

                                    <div className="mt-3">
                                        <span className="text-xs text-slate-400 block">Descripción extraída / Contexto:</span>
                                        <p className="text-xs text-slate-300 mt-1 leading-relaxed bg-black/20 p-2 rounded border border-white/5 font-medium">
                                            {drawerLead.descripcion_negocio || 'El cliente busca estructurar un catálogo rápido con imágenes de alta definición y contacto directo integrado a WhatsApp corporativo.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => entrarComoCliente(drawerLead)}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition-all"
                        >
                            Infiltrarse en el Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuperAdminBuilx;