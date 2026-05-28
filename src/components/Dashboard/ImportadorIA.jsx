import React, { useState } from 'react';

export default function ImportadorIA({ empresaId, onImportSuccess }) {
    const [jsonText, setJsonText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', msg: '' });

    const handleImport = async () => {
        setStatus({ type: '', msg: '' });
        
        if (!jsonText.trim()) {
            setStatus({ type: 'error', msg: 'Pega el código JSON primero.' });
            return;
        }

        let productosParseados;
        try {
            // Validamos que el usuario haya pegado un JSON real
            productosParseados = JSON.parse(jsonText);
            if (!Array.isArray(productosParseados)) throw new Error("Debe ser un arreglo [ ]");
        } catch (e) {
            setStatus({ type: 'error', msg: 'Formato inválido. Asegúrate de que sea un JSON puro.' });
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch('https://builx-api.onrender.com/api/items/importar-masivo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    empresa_id: empresaId,
                    productosJSON: productosParseados
                })
            });

            const data = await res.json();

            if (data.success) {
                setStatus({ type: 'success', msg: `${productosParseados.length} productos importados con éxito.` });
                setJsonText(''); // Limpiamos la caja
                if (onImportSuccess) onImportSuccess(); // Para recargar la tabla de productos
            } else {
                setStatus({ type: 'error', msg: data.message || 'Hubo un error al importar.' });
            }
        } catch (error) {
            setStatus({ type: 'error', msg: 'Error de conexión con el servidor.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-6">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🤖⚡</span>
                <div>
                    <h3 className="font-black text-gray-900 text-lg">Importación Rápida con IA</h3>
                    <p className="text-xs text-gray-500">Pega el arreglo JSON generado para crear productos y categorías automáticamente.</p>
                </div>
            </div>

            <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder="[ { &quot;nombre&quot;: &quot;Café&quot;, &quot;precio&quot;: 2.50 ... } ]"
                className="w-full h-48 p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none mb-4"
                spellCheck="false"
            />

            {status.msg && (
                <div className={`p-3 rounded-lg mb-4 text-sm font-bold ${status.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {status.msg}
                </div>
            )}

            <button
                onClick={handleImport}
                disabled={isLoading}
                className={`w-full py-3 rounded-xl font-black text-white transition-all shadow-md active:scale-95 flex justify-center items-center gap-2 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-black'}`}
            >
                {isLoading ? (
                    'Cargando Productos...'
                ) : (
                    <>Construir Catálogo <span className="opacity-70">🚀</span></>
                )}
            </button>
        </div>
    );
}