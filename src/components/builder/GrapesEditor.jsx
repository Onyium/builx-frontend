import React, { useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

// Importamos todos los bloques desde la nueva carpeta
import { todosLosBloques } from './builx-blocks';

const GrapesEditor = ({ empresaId }) => {
  const editorRef = useRef(null);
  
  // 🧠 NUEVO: Estado para guardar la memoria del CSS de la IA
  const [temaIA, setTemaIA] = useState('');

  useEffect(() => {
    const editor = grapesjs.init({
      container: '#gjs',
      height: '100%', 
      width: 'auto',
      storageManager: false, 
      blockManager: {
        appendTo: '#blocks',
      },
    });

    editorRef.current = editor;

    // --- CARGA DE DISEÑO DESDE LA BASE DE DATOS ---
    fetch(`https://builx-api.onrender.com/api/diseno/${empresaId}`)
      .then(res => {
        if (!res.ok) throw new Error("No hay diseño previo");
        return res.json();
      })
      .then(data => {
        if (data && data.web_components) {
          editor.setComponents(JSON.parse(data.web_components));
          editor.setStyle(data.web_css);
        }
      })
      .catch(err => console.log("Lienzo en blanco listo para diseñar."));

    // --- INSTALADOR AUTOMÁTICO DE BLOQUES ---
    todosLosBloques.forEach(bloque => {
      editor.BlockManager.add(bloque.id, bloque.opciones);
    });

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, [empresaId]);

  // --- 🎨 FUNCIÓN PARA APLICAR TEMA DE LA IA A LA FUERZA BRUTA ---
  const handleInyectarTema = () => {
    const cssGenerado = window.prompt("🤖 Pega el CSS generado por la IA aquí (Recuerda pedirle que use !important):");
    
    if (cssGenerado && editorRef.current) {
      setTemaIA(cssGenerado); // Lo guardamos en memoria para cuando le des a Publicar

      // 1. Nos metemos al documento interno (iframe) de GrapesJS
      const iframeDoc = editorRef.current.Canvas.getDocument();
      
      // 2. Borramos el tema anterior si existía para no acumular basura
      const temaViejo = iframeDoc.getElementById('builx-tema-ia');
      if (temaViejo) temaViejo.remove();

      // 3. Inyectamos la etiqueta <style> a la fuerza bruta al lienzo
      const styleTag = iframeDoc.createElement('style');
      styleTag.id = 'builx-tema-ia';
      styleTag.innerHTML = cssGenerado;
      iframeDoc.head.appendChild(styleTag);

      alert("¡Estilo inyectado! El diseño debió cambiar. Recuerda darle a 'Publicar' para guardarlo en la base de datos.");
    }
  };

  // --- FUNCIÓN PARA GUARDAR EN LA BD ---
  const handleSave = () => {
    if (!editorRef.current) return;

    const html = editorRef.current.getHtml();
    
    // 🧠 NUEVO: Sumamos el CSS normal de GrapesJS + El CSS de la IA al final para que mande sobre el resto
    const cssFinal = editorRef.current.getCss() + "\n/* TEMA IA BUILX */\n" + temaIA; 
    
    const components = editorRef.current.getComponents();

    fetch('https://builx-api.onrender.com/api/diseno/guardar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        empresa_id: empresaId, 
        html, 
        css: cssFinal, 
        components 
      })
    })
    .then(res => res.json())
    .then(data => alert("¡Web de BuilX publicada con éxito! 🚀"))
    .catch(err => {
      console.error(err);
      alert("Error al conectar con el servidor.");
    });
  };

  // --- RENDERIZADO VISUAL DEL EDITOR ---
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      
      {/* Barra Superior BuilX (Interna del Editor) */}
      <div style={{ 
        backgroundColor: '#1e293b', 
        color: 'white', 
        padding: '12px 20px', 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 10
      }}>
        <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>
          Configuración de Estilos
        </span>
        
        {/* BOTÓN DE IA EN LA BARRA SUPERIOR */}
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button 
            onClick={handleInyectarTema}
            style={{
              background: 'transparent',
              border: '1px solid #60a5fa',
              color: '#60a5fa',
              padding: '6px 15px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.85rem',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
                e.target.style.background = '#60a5fa';
                e.target.style.color = '#1e293b';
            }}
            onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#60a5fa';
            }}
          >
            🎨 Inyectar Tema IA
          </button>
        </div>
      </div>

      {/* Área Principal (Bloques y Lienzo) */}
      <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden', position: 'relative' }}>
        
        <div id="blocks" style={{ width: '250px', borderRight: '1px solid #ddd', background: '#f9f9f9', overflowY: 'auto' }}>
          <h3 style={{ padding: '15px', fontSize: '14px', textAlign: 'center', borderBottom: '1px solid #eee', margin: 0 }}>
            Bloques
          </h3>
        </div>

        <div id="gjs" style={{ flexGrow: 1 }}></div>

        <button 
          onClick={handleSave}
          style={{
            position: 'absolute',
            bottom: '30px',
            right: '30px',
            padding: '15px 35px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)',
            zIndex: 1000,
            fontWeight: 'bold',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          🚀 Publicar en BuilX
        </button>

      </div>
    </div>
  );
};

export default GrapesEditor;