import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export default function ProtectedRoute({ children }) {
  const [estado, setEstado] = useState('cargando'); 
  const empresaId = localStorage.getItem('empresa_id');

  useEffect(() => {
    const verificarAcceso = async () => {
      if (!empresaId) {
        setEstado('denegado');
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/empresa/${empresaId}`);
        const datosBD = Array.isArray(res.data) ? res.data[0] : res.data;
        
        console.log("🕵️ Guardián de Acceso:", datosBD?.suscripcion_estado); 
        
        if (datosBD && datosBD.suscripcion_estado === 'active') {
          setEstado('permitido');
        } else {
          setEstado('denegado');
        }
        
      } catch (error) {
        console.error("Error al verificar acceso:", error);
        setEstado('denegado'); 
      }
    };

    verificarAcceso();
  }, [empresaId]);

  if (estado === 'cargando') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white">
        <div className="font-bold animate-pulse text-emerald-400">
          Cargando tu espacio de trabajo en BuilX...
        </div>
      </div>
    );
  }

  if (estado === 'denegado') {
    // 🚨 CAMBIO CLAVE: Si no ha pagado, va directo a la zona de facturación
    return <Navigate to="/checkout" replace />;
  }

  return children;
}