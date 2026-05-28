// src/builx-blocks/footerBlock.js

export const footerBlock = {
  id: 'footer-bloque',
  opciones: {
    label: '🔽 Pie de Página',
    category: 'Navegación',
    content: `
      <footer style="background-color: #1e293b; color: #f8fafc; padding: 50px 20px 20px 20px; font-family: sans-serif;">
        <div style="max-width: 1000px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 40px; justify-content: space-between;">

          <div style="flex: 1; min-width: 250px;">
            <h3 style="font-size: 24px; font-weight: bold; margin-bottom: 15px; color: #ffffff;">{{nombre}}</h3>
            <p style="color: #94a3b8; line-height: 1.6; font-size: 14px;">
              Calidad y servicio garantizado. Gracias por confiar en nosotros, estamos para servirte.
            </p>
          </div>

          <div style="flex: 1; min-width: 200px;">
            <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 15px; color: #e2e8f0; text-transform: uppercase; letter-spacing: 1px;">Enlaces</h4>
            <ul style="list-style: none; padding: 0; margin: 0; color: #94a3b8; font-size: 15px; line-height: 2;">
              <li><a href="#" style="color: #94a3b8; text-decoration: none;">Inicio</a></li>
              <li><a href="#" style="color: #94a3b8; text-decoration: none;">Catálogo de Productos</a></li>
              <li><a href="#" style="color: #94a3b8; text-decoration: none;">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          <div style="flex: 1; min-width: 250px;">
            <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 15px; color: #e2e8f0; text-transform: uppercase; letter-spacing: 1px;">Contacto</h4>
            <p style="color: #94a3b8; font-size: 15px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
              <span>📍</span> {{direccion}}
            </p>
            <p style="color: #94a3b8; font-size: 15px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
              <span>📞</span> {{telefono}}
            </p>
          </div>

        </div>

        <div style="max-width: 1000px; margin: 40px auto 0 auto; padding-top: 20px; border-top: 1px solid #334155; text-align: center; color: #64748b; font-size: 13px;">
          &copy; 2026 {{nombre}}. Creado con BuilX.
        </div>
      </footer>
    `
  }
};