import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cropper from 'react-cropper';

// Componente Modal UI
function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-6 z-[2000] backdrop-blur-sm">
      <div className="bg-white p-8 rounded-3xl w-full max-w-3xl shadow-2xl relative border border-gray-100">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 font-bold text-2xl transition-all">×</button>
        <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-8">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export default function GaleriaManager({ empresaId }) {
  const [fotos, setFotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  const [isCropperModalOpen, setIsCropperModalOpen] = useState(false);
  const cropperRef = useRef(null);

  useEffect(() => {
    if (empresaId) fetchFotos();
  }, [empresaId]);

  const fetchFotos = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/galeria/${empresaId}`);
      setFotos(res.data);
    } catch (err) {
      console.error("Error al obtener galería:", err);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedFileUrl(reader.result); 
      setIsCropperModalOpen(true);
    };
    reader.readAsDataURL(file);
    e.target.value = ''; 
  };

  const handleUploadWithCrop = async () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    setUploading(true);

    try {
      // ⚠️ EL ARREGLO ESTÁ AQUÍ: Forzamos un cuadrado perfecto de 800x800 y fondo blanco
      const canvas = cropper.getCroppedCanvas({
        width: 800,
        height: 800,
        fillColor: '#ffffff' // Convierte transparencias a blanco puro
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          alert("Error al procesar el recorte.");
          setUploading(false);
          return;
        }

        const formData = new FormData();
        formData.append('empresa_id', empresaId);
        formData.append('foto', blob, 'trabajo-recortado.jpg');

        await axios.post('http://localhost:5000/api/galeria/subir', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        fetchFotos();
        setIsCropperModalOpen(false); // Cerramos el modal cuando ya subió
        setUploading(false);
      }, 'image/jpeg', 0.9); // Calidad del 90% para que cargue rápido

    } catch (err) {
      alert("Error al subir la imagen recortada");
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta foto?")) {
      try {
        await axios.delete(`http://localhost:5000/api/galeria/${id}`);
        fetchFotos();
      } catch (err) {
        alert("Error al eliminar la imagen");
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">🖼️ Galería de Trabajos / Fotos</h2>
          <p className="text-gray-500 text-sm mt-1">Sube fotos reales de tus proyectos, local o servicios anteriores.</p>
        </div>
        
        <label className={`cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 transition-all flex items-center gap-2 ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
          {uploading ? '⏱️ Procesando...' : '📤 Subir Foto'}
          <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} disabled={uploading} />
        </label>
      </div>

      {/* Grid de imágenes */}
      {fotos.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-gray-200 rounded-2xl bg-gray-50">
          <p className="text-gray-400 font-medium italic text-sm">No hay fotos subidas en la galería todavía.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {fotos.map(foto => (
            <div key={foto.id} className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              
              {/* La Imagen Limpia */}
              <img 
                src={`http://localhost:5000${foto.imagen_url}`} 
                alt="Trabajo" 
                className="w-full h-full object-cover"
              />
              
              {/* Botón de eliminar en la esquina superior derecha (Sin bloquear el centro) */}
              <button 
                onClick={() => handleDelete(foto.id)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md transition-colors z-10"
                title="Eliminar foto"
              >
                <span className="text-sm">🗑️</span>
              </button>
              
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isCropperModalOpen} onClose={() => !uploading && setIsCropperModalOpen(false)} title="Recorta y Previsualiza tu Foto">
        <div className="w-full h-[400px] bg-gray-50 rounded-2xl overflow-hidden mb-6 relative">
          <Cropper
            src={selectedFileUrl}
            style={{ height: "100%", width: "100%" }}
            initialAspectRatio={1 / 1} 
            aspectRatio={1 / 1} 
            guides={true} 
            ref={cropperRef}
            zoomable={true}
            scalable={true}
            viewMode={1}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
          />
        </div>
        
        <div className="flex justify-end gap-3">
          <button 
            onClick={() => setIsCropperModalOpen(false)} 
            disabled={uploading}
            className="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all disabled:opacity-50"
          >
            Cancelar
          </button>
          <button 
            onClick={handleUploadWithCrop} 
            disabled={uploading}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-75"
          >
            {uploading ? (
              <>⏳ Subiendo...</>
            ) : (
              <>Confirmar y Subir Trabajo ✨</>
            )}
          </button>
        </div>
      </Modal>
    </div>
  );
}