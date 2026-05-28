export const testimoniosBlock = {
  id: 'bloque-testimonios',
  opciones: {
    label: '⭐ Testimonios',
    category: 'Contenido',
    content: `
      <section style="padding: 60px 20px; background-color: #f8fafc; font-family: sans-serif; overflow: hidden;">
        <div style="max-width: 1000px; margin: 0 auto;">
          <h2 style="text-align: center; font-size: 28px; margin-bottom: 40px; color: #1e293b; font-weight: bold;">Lo que dicen nuestros clientes</h2>
          
          <div style="display: flex; gap: 20px; overflow-x: auto; padding-bottom: 20px; scroll-snap-type: x mandatory;">
             {{LISTA_TESTIMONIOS}}
          </div>
          
        </div>
      </section>
    `
  }
};