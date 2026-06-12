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
        const res = await axios.get(`https://builx-api.onrender.com/api/empresa/${empresaId}`);
        const datosBD = Array.isArray(res.data) ? res.data[0] : res.data;
        
        console.log("🕵️ Guardián de Acceso:", datosBD?.suscripcion_estado); 
        
        // 🚨 LA NUEVA LISTA VIP 🚨
        const estadosPermitidos = ['active', 'starter', 'pro', 'building', 'trial'];
        
        // Verificamos si el estado de la BD está en nuestra lista de permitidos
        if (datosBD && estadosPermitidos.includes(datosBD.suscripcion_estado)) {
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
    // Si no ha pagado o tiene un estado inválido, lo mandamos al checkout
    return <Navigate to="/checkout" replace />;
  }

  return children;
}