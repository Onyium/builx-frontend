export const galeriaBlock = {
  id: 'bloque-galeria',
  opciones: {
    label: '🖼️ Galería Dinámica',
    category: 'Contenido',
    content: `
      <section id="seccion-galeria" style="padding: 60px 20px; background-color: #ffffff; font-family: sans-serif;">
        <div style="max-width: 1200px; margin: 0 auto;">
          <h2 style="text-align: center; font-size: 32px; font-weight: 800; color: #0f172a; margin-bottom: 10px;">Nuestros Trabajos</h2>
          <p style="text-align: center; color: #64748b; font-size: 16px; margin-bottom: 40px;">Conoce la calidad de lo que hacemos</p>
          
          {{LISTA_GALERIA}}
          
        </div>
      </section>
    `
  }
};