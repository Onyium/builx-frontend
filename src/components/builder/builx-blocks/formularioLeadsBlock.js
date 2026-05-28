export const formularioLeadsBlock = {
  id: 'bloque-formulario-leads',
  opciones: {
    label: '✉️ Formulario Leads',
    category: 'Contacto',
    content: `
      <section style="padding: 80px 20px; background-color: #0f172a; font-family: sans-serif; color: white;">
        <div style="max-width: 800px; margin: 0 auto; background: #1e293b; padding: 50px; border-radius: 20px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
          
          <h2 style="text-align: center; font-size: 36px; font-weight: 800; margin-bottom: 10px;">Trabajemos Juntos</h2>
          <p style="text-align: center; color: #94a3b8; font-size: 18px; margin-bottom: 40px;">Déjanos tus datos y nos pondremos en contacto contigo.</p>

          <div style="display: flex; flex-direction: column; gap: 20px;">
            <input type="hidden" id="contacto-empresa-id" value="{{EMPRESA_ID}}">

            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 250px;">
                <label style="display: block; font-size: 14px; font-weight: bold; color: #cbd5e1; margin-bottom: 8px;">Nombre</label>
                <input type="text" id="contacto-nombre" style="width: 100%; padding: 16px; background: #0f172a; border: 1px solid #334155; border-radius: 12px; color: white; outline: none;">
              </div>
              <div style="flex: 1; min-width: 250px;">
                <label style="display: block; font-size: 14px; font-weight: bold; color: #cbd5e1; margin-bottom: 8px;">Correo</label>
                <input type="email" id="contacto-correo" style="width: 100%; padding: 16px; background: #0f172a; border: 1px solid #334155; border-radius: 12px; color: white; outline: none;">
              </div>
            </div>

            <div>
              <label style="display: block; font-size: 14px; font-weight: bold; color: #cbd5e1; margin-bottom: 8px;">Teléfono / WhatsApp</label>
              <input type="tel" id="contacto-telefono" style="width: 100%; padding: 16px; background: #0f172a; border: 1px solid #334155; border-radius: 12px; color: white; outline: none;">
            </div>

            <div>
              <label style="display: block; font-size: 14px; font-weight: bold; color: #cbd5e1; margin-bottom: 8px;">Mensaje</label>
              <textarea id="contacto-mensaje" rows="4" style="width: 100%; padding: 16px; background: #0f172a; border: 1px solid #334155; border-radius: 12px; color: white; outline: none; resize: vertical;"></textarea>
            </div>

            <button type="button" id="contacto-btn" style="background-color: #2563eb; color: white; padding: 18px; border: none; border-radius: 12px; font-size: 18px; font-weight: bold; cursor: pointer; margin-top: 10px;">
              Enviar Mensaje
            </button>
            
            <p id="contacto-respuesta" style="text-align: center; margin-top: 15px; font-weight: bold; display: none;"></p>
          </div>
        </div>
      </section>
    `
  }
};