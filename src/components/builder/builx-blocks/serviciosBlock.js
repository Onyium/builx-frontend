export const serviciosBlock = {
  id: 'lista-servicios',
  opciones: {
    label: '🛠️ Servicios',
    category: 'Catálogo',
    content: `
      <section style="padding: 60px 20px; background-color: #f8fafc; font-family: sans-serif;">
        <div style="max-width: 1200px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h2 style="font-size: 32px; font-weight: 800; color: #0f172a; margin-bottom: 10px;">Nuestros Servicios</h2>
            <p style="color: #64748b; font-size: 16px;">Soluciones profesionales a tu medida</p>
          </div>
          
          {{LISTA_SERVICIOS}}
          
        </div>
      </section>
    `
  }
};