// src/builx-blocks/contactoBlock.js

export const contactoBlock = {
  id: 'contacto-ubicacion',
  opciones: {
    label: '📍 Contacto y Ubicación',
    category: 'Información',
    content: `
      <section style="padding: 50px 20px; font-family: 'Helvetica', sans-serif; background-color: #ffffff;">
        <div style="max-width: 1000px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 40px; align-items: center;">
          
          <div style="flex: 1; min-width: 300px;">
            <h2 style="font-size: 28px; color: #1a1a1a; margin-bottom: 15px;">¿Dónde estamos?</h2>
            <p style="font-size: 16px; color: #555; line-height: 1.6; margin-bottom: 25px;">
              Visítanos en nuestra sucursal o contáctanos directamente para resolver tus dudas.
            </p>
            
            <div style="margin-bottom: 20px;">
              <strong style="display: block; font-size: 14px; color: #888; text-transform: uppercase;">Dirección</strong>
              <p style="font-size: 18px; color: #333; margin-top: 5px;">{{direccion}}</p>
            </div>

            <div style="margin-bottom: 30px;">
              <strong style="display: block; font-size: 14px; color: #888; text-transform: uppercase;">Teléfono</strong>
              <p style="font-size: 18px; color: #333; margin-top: 5px;">{{telefono}}</p>
            </div>

            <a href="{{link_google_maps}}" target="_blank" 
              style="display: inline-block; padding: 12px 25px; background-color: #25d366; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; transition: background 0.3s;">
              📍 Abrir en Google Maps
            </a>
          </div>

          <div style="flex: 1; min-width: 300px; height: 350px; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <iframe 
              width="100%" 
              height="100%" 
              frameborder="0" 
              style="border:0" 
              src="{{link_google_maps}}" 
              allowfullscreen>
            </iframe>
          </div>

        </div>
      </section>
    `,
  }
};