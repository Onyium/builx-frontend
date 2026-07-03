import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminLeadsPanel() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [rubroFilter, setRubroFilter] = useState('todos');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // 🚀 CONEXIÓN REAL AL BACKEND
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        // Asegúrate de tener esta ruta creada en tu backend (Node.js) que haga un SELECT * FROM empresas (o la tabla donde guardes los leads)
        const response = await axios.get('https://builx-api.onrender.com/api/admin/leads');
        
        // Mapeamos los datos de la BD para asegurar que la tabla del frontend no se rompa si hay nulos
        const leadsReales = response.data.map(lead => ({
          id: lead.id,
          nombre: lead.nombre || 'Sin Nombre',
          email_administrador: lead.email_administrador || 'Sin correo',
          whatsapp_pedidos: lead.whatsapp_pedidos || 'No registrado',
          rubro: lead.rubro || 'General',
          tema_visual: lead.tema_visual || 'Sin tema',
          // Formateamos la fecha (ej. "2026-07-03T14:30:00Z" -> "2026-07-03")
          fecha_registro: lead.fecha_registro ? lead.fecha_registro.split('T')[0] : 'Sin fecha',
          // Valores por defecto en caso de que aún no manejes pagos/planes en la BD
          estado_pago: lead.estado_pago || 'pendiente', 
          plan: lead.plan || 'starter'
        }));

        setLeads(leadsReales);
      } catch (error) {
        console.error("Error al cargar los leads desde MySQL:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  // 🚨 LÓGICA DE FILTRADO QUIRÚRGICO (Se mantiene intacta)
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email_administrador.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.whatsapp_pedidos.includes(searchTerm);

    const matchesStatus = statusFilter === 'todos' || lead.estado_pago === statusFilter;
    const matchesRubro = rubroFilter === 'todos' || lead.rubro === rubroFilter;

    // Filtro por rango de fechas
    let matchesDate = true;
    if (startDate && endDate) {
      matchesDate = lead.fecha_registro >= startDate && lead.fecha_registro <= endDate;
    } else if (startDate) {
      matchesDate = lead.fecha_registro >= startDate;
    } else if (endDate) {
      matchesDate = lead.fecha_registro <= endDate;
    }

    return matchesSearch && matchesStatus && matchesRubro && matchesDate;
  });

  return (
    <div className="min-h-screen bg-[#050B14] text-white font-sans p-6 md:p-12 relative overflow-hidden">
      
      {/* HEADER DEL PANEL */}
      <div className="max-w-7xl mx-auto mb-10 z-10 relative">
        <h1 className="text-4xl font-black tracking-tight mb-2">
          Control de Leads & Ventas <span className="text-cyan-400">BuilX</span>
        </h1>
        <p className="text-slate-400 font-medium">Monitorea y haz seguimiento a los hoteles registrados en tu embudo.</p>
      </div>

      {/* BARRA DE FILTROS AVANZADOS */}
      <div className="max-w-7xl mx-auto bg-white/[0.02] border border-white/10 rounded-3xl p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 backdrop-blur-md z-10 relative">
        
        {/* Filtro 1: Búsqueda de Texto */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Buscar Lead</label>
          <input 
            type="text"
            placeholder="Nombre, correo o WhatsApp..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Filtro 2: Estado del Embudo / Pago */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Estado del Pago</label>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 text-slate-300"
          >
            <option value="todos">Todos los estados</option>
            <option value="pagado">🟢 Pagado</option>
            <option value="pendiente">🟡 Checkout Abierto</option>
            <option value="abandonado">🔴 Abandonado</option>
          </select>
        </div>

        {/* Filtro 3: Fechas (Desde) */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Desde (Fecha)</label>
          <input 
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 text-slate-300"
          />
        </div>

        {/* Filtro 4: Fechas (Hasta) */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Hasta (Fecha)</label>
          <input 
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 text-slate-300"
          />
        </div>
      </div>

      {/* TABLA DE LEADS */}
      <div className="max-w-7xl mx-auto bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md z-10 relative">
        {loading ? (
          <div className="p-12 text-center text-cyan-400 font-bold animate-pulse">Sincronizando base de datos de leads...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="p-5">Hotel / Empresa</th>
                  <th className="p-5">Tipo / Rubro</th>
                  <th className="p-5">Contacto</th>
                  <th className="p-5">Fecha Reg.</th>
                  <th className="p-5">Plan</th>
                  <th className="p-5">Estado</th>
                  <th className="p-5 text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-5 font-bold text-white">{lead.nombre}</td>
                    <td className="p-5 text-slate-300 text-xs font-medium">{lead.rubro}</td>
                    <td className="p-5">
                      <div className="text-white font-medium">{lead.email_administrador}</div>
                      <div className="text-slate-500 text-xs">{lead.whatsapp_pedidos}</div>
                    </td>
                    <td className="p-5 text-slate-400 text-xs">{lead.fecha_registro}</td>
                    <td className="p-5">
                      <span className={`px-2 py-1 rounded-md text-xs font-black uppercase ${lead.plan === 'pro' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/20' : 'bg-slate-700/30 text-slate-400'}`}>
                        {lead.plan}
                      </span>
                    </td>
                    <td className="p-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        lead.estado_pago === 'pagado' ? 'bg-emerald-500/10 text-emerald-400' :
                        lead.estado_pago === 'pendiente' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {lead.estado_pago === 'pagado' ? '● Pagado' : lead.estado_pago === 'pendiente' ? '● Checkout Abierto' : '● Abandonado'}
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      <a 
                        href={`https://wa.me/503${lead.whatsapp_pedidos}?text=Hola%20${encodeURIComponent(lead.nombre)},%20vi%20tu%20registro%20en%20BuilX...`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block bg-white/5 hover:bg-white/10 text-white font-bold px-4 py-2 rounded-xl text-xs border border-white/10 transition-all active:scale-95"
                      >
                        WhatsApp 💬
                      </a>
                    </td>
                  </tr>
                ))}
                {filteredLeads.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-10 text-center text-slate-500 font-medium">No se encontraron leads registrados aún.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}