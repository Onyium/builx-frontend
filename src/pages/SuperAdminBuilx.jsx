import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SuperAdminBuilx = () => {
    const [leads, setLeads] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                // Llama a tu nueva ruta secreta
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
        <div className="min-h-screen bg-gray-900 text-white p-8">
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
                                <th className="p-4 border-b border-gray-600">Registro</th>
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
                                            lead.suscripcion_estado === 'starter' ? 'bg-blue-500/20 text-blue-400' :
                                            'bg-green-500/20 text-green-400'
                                        }`}>
                                            {lead.suscripcion_estado}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-gray-400">
                                        {new Date(lead.creado_en).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 flex justify-center gap-3">
                                        {/* Acceso rápido a WhatsApp */}
                                        <a 
                                            href={`https://wa.me/${lead.whatsapp_pedidos}?text=¡Hola! Soy Jonathan de BuilX...`}
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                                        >
                                            WhatsApp
                                        </a>
                                        
                                        {/* Salto al dashboard del cliente */}
                                        <Link 
                                            to={`/dashboard/${lead.id}`} 
                                            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                                        >
                                            Ver Dashboard
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {leads.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-400">
                                        Aún no hay empresas registradas. ¡Hora de vender!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminBuilx;