import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TestimoniosManager({ empresaId }) {
  const [testimonios, setTestimonios] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre_cliente: '', puesto_cliente: '', comentario: '', estrellas: 5 });
  const [fotoFile, setFotoFile] = useState(null); // <-- Nuevo estado para la foto

  useEffect(() => { fetchTestimonios(); }, []);

  const fetchTestimonios = async () => {
    const res = await axios.get(`http://localhost:5000/api/testimonios/${empresaId}`);
    setTestimonios(res.data);
  };

  const agregarTestimonio = async () => {
    if (!nuevo.nombre_cliente || !nuevo.comentario) return alert("Falta el nombre o el comentario");

    // Empacamos los datos en FormData (porque llevamos una imagen)
    const formData = new FormData();
    formData.append('empresa_id', empresaId);
    formData.append('nombre_cliente', nuevo.nombre_cliente);
    formData.append('puesto_cliente', nuevo.puesto_cliente);
    formData.append('comentario', nuevo.comentario);
    formData.append('estrellas', nuevo.estrellas);
    
    // Si seleccionó foto, la adjuntamos
    if (fotoFile) {
      formData.append('foto', fotoFile);
    }

    try {
      await axios.post('http://localhost:5000/api/testimonios', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // Limpiamos los campos
      setNuevo({ nombre_cliente: '', puesto_cliente: '', comentario: '', estrellas: 5 });
      setFotoFile(null);
      fetchTestimonios();
    } catch (err) {
      console.error(err);
      alert("Error al guardar testimonio");
    }
  };

  const eliminarTestimonio = async (id) => {
    await axios.delete(`http://localhost:5000/api/testimonios/${id}`);
    fetchTestimonios();
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm mb-12 border border-gray-100">
      <h2 className="text-xl font-bold mb-6 text-gray-800 italic">⭐ Gestionar Reseñas de Clientes</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-center">
        {/* Nuevo Input para la Foto */}
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Foto (Opcional)</label>
          <input 
            type="file" 
            accept="image/*"
            className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
            onChange={e => setFotoFile(e.target.files[0])} 
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Nombre</label>
          <input type="text" placeholder="Ej. Ana Pérez" className="w-full border p-2 rounded-lg text-sm" 
                 value={nuevo.nombre_cliente} onChange={e => setNuevo({...nuevo, nombre_cliente: e.target.value})} />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Puesto</label>
          <input type="text" placeholder="Ej. Cliente VIP" className="w-full border p-2 rounded-lg text-sm"
                 value={nuevo.puesto_cliente} onChange={e => setNuevo({...nuevo, puesto_cliente: e.target.value})} />
        </div>
        <div className="flex items-end h-full pb-1">
          <button onClick={agregarTestimonio} className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg font-bold text-sm transition-colors">
            + Agregar
          </button>
        </div>
      </div>
      
      <textarea placeholder="Escribe el comentario del cliente..." className="w-full border p-3 rounded-lg mb-6 text-sm"
                value={nuevo.comentario} onChange={e => setNuevo({...nuevo, comentario: e.target.value})} />
      
      {/* Lista de Testimonios */}
      <div className="space-y-3">
        {testimonios.map(t => (
          <div key={t.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-4">
              {/* Mostramos la foto si existe, si no un cuadrito gris con la inicial */}
              {t.foto_url ? (
                <img src={`http://localhost:5000${t.foto_url}`} alt={t.nombre_cliente} className="w-12 h-12 rounded-full object-cover shadow-sm" />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                  {t.nombre_cliente ? t.nombre_cliente[0].toUpperCase() : 'U'}
                </div>
              )}
              
              <div>
                <p className="font-bold text-gray-800">{t.nombre_cliente} <span className="text-yellow-400 text-xs ml-1">{'★'.repeat(t.estrellas || 5)}</span></p>
                <p className="text-xs text-gray-500 mb-1">{t.puesto_cliente}</p>
                <p className="text-sm text-gray-600 italic">"{t.comentario}"</p>
              </div>
            </div>
            <button onClick={() => eliminarTestimonio(t.id)} className="text-red-400 hover:text-red-600 font-bold p-2 transition-colors" title="Eliminar testimonio">
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}