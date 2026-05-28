import { useState, useEffect } from 'react';
import axios from 'axios';

export default function FAQManager({ empresaId }) {
  const [faqs, setFaqs] = useState([]);
  const [nuevo, setNuevo] = useState({ pregunta: '', respuesta: '' });

  useEffect(() => { fetchFaqs(); }, []);

  const fetchFaqs = async () => {
    const res = await axios.get(`https://builx-api.onrender.com/api/faqs/${empresaId}`);
    setFaqs(res.data);
  };

  const agregarFaq = async () => {
    if (!nuevo.pregunta || !nuevo.respuesta) return alert("Llena ambos campos");
    await axios.post('https://builx-api.onrender.com/api/faqs', { ...nuevo, empresa_id: empresaId });
    setNuevo({ pregunta: '', respuesta: '' });
    fetchFaqs();
  };

  const eliminarFaq = async (id) => {
    await axios.delete(`https://builx-api.onrender.com/api/faqs/${id}`);
    fetchFaqs();
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm mb-12 border border-gray-100">
      <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2"><span>❓</span> Preguntas Frecuentes</h2>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input type="text" placeholder="Ej. ¿Hacen envíos a todo el país?" className="flex-1 border p-3 rounded-xl text-sm"
               value={nuevo.pregunta} onChange={e => setNuevo({...nuevo, pregunta: e.target.value})} />
        <input type="text" placeholder="Respuesta..." className="flex-2 border p-3 rounded-xl text-sm w-full md:w-1/2"
               value={nuevo.respuesta} onChange={e => setNuevo({...nuevo, respuesta: e.target.value})} />
        <button onClick={agregarFaq} className="bg-gray-900 text-white font-bold p-3 rounded-xl hover:bg-black transition-colors">
          Agregar
        </button>
      </div>

      <div className="space-y-3">
        {faqs.map(f => (
          <div key={f.id} className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <div>
              <p className="font-bold text-gray-800">{f.pregunta}</p>
              <p className="text-sm text-gray-500">{f.respuesta}</p>
            </div>
            <button onClick={() => eliminarFaq(f.id)} className="text-red-400 hover:text-red-600 font-bold p-2">🗑️</button>
          </div>
        ))}
      </div>
    </div>
  );
}