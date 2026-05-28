export const faqBlock = {
  id: 'bloque-faqs',
  opciones: {
    label: '❓ Preguntas Frecuentes',
    category: 'Contenido',
    content: `
      <section style="padding: 60px 20px; background-color: #ffffff; font-family: sans-serif;">
        <div style="max-width: 800px; margin: 0 auto;">
          <h2 style="text-align: center; font-size: 28px; margin-bottom: 30px; color: #1e293b; font-weight: bold;">Preguntas Frecuentes</h2>
          
          {{LISTA_FAQS}}
          
        </div>
      </section>
    `
  }
};