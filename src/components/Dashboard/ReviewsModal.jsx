import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ReviewsModal({ isOpen, onClose, item }) {
    const [reviews, setReviews] = useState([]);
    const [cargando, setCargando] = useState(false);
    
    // Estado del formulario para la nueva reseña
    const [formData, setFormData] = useState({
        nombre_cliente: '',
        comentario: '',
        estrellas: 5
    });
    const [foto, setFoto] = useState(null);

    // Cargar las reseñas cuando se abre el modal
    useEffect(() => {
        if (isOpen && item) {
            cargarReviews();
        }
    }, [isOpen, item]);

    const cargarReviews = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/reviews/${item.id}`);
            setReviews(res.data);
        } catch (error) {
            console.error("Error al cargar reseñas", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        
        const data = new FormData();
        data.append('item_id', item.id);
        data.append('nombre_cliente', formData.nombre_cliente);
        data.append('comentario', formData.comentario);
        data.append('estrellas', formData.estrellas);
        if (foto) data.append('foto', foto);

        try {
            await axios.post('http://localhost:5000/api/reviews', data);
            setFormData({ nombre_cliente: '', comentario: '', estrellas: 5 });
            setFoto(null);
            cargarReviews(); // Recargar la lista
        } catch (error) {
            alert("Error al guardar la reseña");
        } finally {
            setCargando(false);
        }
    };

    const eliminarReview = async (id) => {
        if(!window.confirm("¿Seguro que quieres borrar esta reseña?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/reviews/${id}`);
            cargarReviews(); // Actualizar lista
        } catch (error) {
            alert("Error al borrar");
        }
    };

    if (!isOpen || !item) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60] text-left">
            <div className="bg-white rounded-[2rem] p-8 w-full max-w-3xl shadow-2xl max-h-[90vh] flex flex-col md:flex-row gap-8 overflow-y-auto">
                
                {/* 📝 COLUMNA IZQUIERDA: Formulario de Nueva Reseña */}
                <div className="flex-1 space-y-4">
                    <div>
                        <h3 className="text-xl font-black text-gray-900">Gestor de Reseñas</h3>
                        <p className="text-xs text-gray-500 font-bold mb-4">Añadiendo reseñas para: <span className="text-blue-600">{item.nombre}</span></p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nombre del Cliente</label>
                            <input required placeholder="Ej. María Pérez" className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none text-sm" 
                                value={formData.nombre_cliente} onChange={(e) => setFormData({...formData, nombre_cliente: e.target.value})} />
                        </div>
                        
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Calificación</label>
                            <select className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none text-sm font-bold text-amber-500"
                                value={formData.estrellas} onChange={(e) => setFormData({...formData, estrellas: e.target.value})}>
                                <option value="5">⭐⭐⭐⭐⭐ (5 Estrellas)</option>
                                <option value="4">⭐⭐⭐⭐ (4 Estrellas)</option>
                                <option value="3">⭐⭐⭐ (3 Estrellas)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Comentario</label>
                            <textarea required placeholder="¿Qué dijo el cliente?" className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none text-sm h-20 resize-none" 
                                value={formData.comentario} onChange={(e) => setFormData({...formData, comentario: e.target.value})} />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Foto (Opcional)</label>
                            <input type="file" accept="image/*" onChange={(e) => setFoto(e.target.files[0])}
                                className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer" />
                        </div>

                        <button type="submit" disabled={cargando} className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold shadow-md hover:bg-black active:scale-95 transition-all text-sm">
                            {cargando ? 'Guardando...' : '➕ Publicar Reseña'}
                        </button>
                    </form>
                    
                    <button onClick={onClose} type="button" className="w-full py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-all text-sm">
                        Cerrar Gestor
                    </button>
                </div>

                {/* ⭐ COLUMNA DERECHA: Lista de Reseñas Existentes */}
                <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-5 flex flex-col h-[500px]">
                    <h4 className="text-sm font-black text-gray-800 mb-4 uppercase tracking-wider border-b border-gray-100 pb-2">Reseñas Activas ({reviews.length})</h4>
                    
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                        {reviews.length === 0 ? (
                            <p className="text-xs text-gray-400 italic text-center mt-10">Aún no hay reseñas para este producto.</p>
                        ) : (
                            reviews.map(rev => (
                                <div key={rev.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100 relative group">
                                    <button onClick={() => eliminarReview(rev.id)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity" title="Borrar reseña">
                                        🗑️
                                    </button>
                                    <div className="text-amber-400 text-xs mb-1">{'★'.repeat(rev.estrellas)}</div>
                                    <p className="text-sm text-gray-600 italic mb-2">"{rev.comentario}"</p>
                                    <div className="flex justify-between items-end">
                                        <span className="text-[11px] font-bold text-gray-900">- {rev.nombre_cliente}</span>
                                        {rev.foto_url && (
                                            <img src={`http://localhost:5000${rev.foto_url}`} alt="foto cliente" className="w-8 h-8 object-cover rounded-lg border border-gray-200" />
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}