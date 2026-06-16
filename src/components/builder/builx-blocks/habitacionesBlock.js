export const habitacionesBlock = {
  id: 'bloque-habitaciones-dinamico',
  opciones: {
    label: '🛏️ Habitaciones',
    category: 'Hotelería',
    content: `
      <section style="padding: 80px 20px; background-color: #fafafa; font-family: sans-serif;">
        <div style="max-width: 1100px; margin: 0 auto;">
          
          <div style="text-align: center; margin-bottom: 50px;">
            <h2 style="font-size: 36px; font-weight: bold; color: #111; margin-bottom: 15px; font-family: 'Playfair Display', serif;">Nuestros Espacios</h2>
            <p style="color: #666; font-size: 16px; max-width: 600px; margin: 0 auto;">Habitaciones diseñadas para brindarte la mayor comodidad, con vistas increíbles y atención de primera.</p>
          </div>
          
          <!-- AQUÍ ES DONDE SUCEDE LA MAGIA DINÁMICA -->
          <div style="display: flex; flex-wrap: wrap; gap: 30px; justify-content: center;">
            {{LISTA_HABITACIONES}}
          </div>

        </div>
      </section>
    `
  }
};