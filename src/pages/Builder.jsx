import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GrapesEditor from '../components/builder/GrapesEditor';

const Builder = () => {
  const navigate = useNavigate();
  
  // 🚀 AQUÍ ESTÁ LA MAGIA: Leemos el ID del negocio logueado dinámicamente
  const empresaId = localStorage.getItem('empresa_id');

  useEffect(() => {
    // Seguridad: Si alguien intenta entrar a /builder por la URL sin iniciar sesión, lo mandamos al login
    if (!empresaId) {
      navigate('/login');
    }
  }, [empresaId, navigate]);

  // Evitamos renderizar el editor si no hay ID mientras se redirige
  if (!empresaId) return null; 

  return (
    <div className="builder-page">
      {/* Barra superior con el ID dinámico para que sepas qué negocio estás editando */}
      <div style={{ padding: '10px', background: '#0F172A', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong>Panel BuilX:</strong> Editor Visual Premium
        </div>
        <div style={{ fontSize: '12px', background: '#2563EB', padding: '4px 10px', borderRadius: '8px', fontWeight: 'bold' }}>
          Editando Empresa ID: {empresaId}
        </div>
      </div>
      
      {/* Le pasamos el ID real de la sesión a tu componente principal */}
      <GrapesEditor empresaId={empresaId} />
    </div>
  );
};

export default Builder;