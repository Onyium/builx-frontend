import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CategoriasManager({ empresaId }) {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState('');

  useEffect(() => {
    if (empresaId) {
      fetchCategorias();
    }
  }, [empresaId]);

  const fetchCategorias = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/categorias/${empresaId}`);
      setCategorias(res.data);
    } catch (err) {
      console.error("Error al obtener categorías:", err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!nuevaCategoria.trim()) return;

    try {
      await axios.post('http://localhost:5000/api/categorias', {
        empresa_id: empresaId,
        nombre: nuevaCategoria
      });
      setNuevaCategoria('');
      fetchCategorias();
    } catch (err) {
      alert("Error al crear la categoría");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta categoría? Ojo: si hay productos con esta categoría, podrían quedarse sin una.")) {
      try {
        await axios.delete(`http://localhost:5000/api/categorias/${id}`);
        fetchCategorias();
      } catch (err) {
        alert("Error al eliminar la categoría");
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🗂️ Gestor de Categorías</h2>
      
      <form onSubmit={handleAdd} className="flex gap-4 mb-6">
        <input 
          type="text" 
          placeholder="Ej. Postres, Herramientas, Consultas..." 
          className="flex-1 border p-3 rounded-xl outline-none focus:border-blue-500 transition-all"
          value={nuevaCategoria}
          onChange={(e) => setNuevaCategoria(e.target.value)}
          required
        />
        <button 
          type="submit" 
          className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all"
        >
          Añadir Categoría
        </button>
      </form>

      <div className="flex flex-wrap gap-3">
        {categorias.length === 0 ? (
          <p className="text-gray-500 text-sm italic">Aún no hay categorías creadas.</p>
        ) : (
          categorias.map(cat => (
            <div key={cat.id} className="bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-3 font-medium">
              {cat.nombre}
              <button 
                onClick={() => handleDelete(cat.id)}
                className="text-red-400 hover:text-red-600 font-bold text-lg leading-none"
                title="Eliminar"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}