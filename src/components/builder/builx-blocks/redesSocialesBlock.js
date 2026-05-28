export const redesSocialesBlock = {
  id: 'redes-sociales',
  opciones: {
    label: '🌐 Redes Sociales',
    category: 'Contenido',
    content: `
      <section style="padding: 40px 20px; text-align: center; background-color: #f8fafc; font-family: sans-serif;">
        <h3 style="color: #334155; font-size: 20px; margin-bottom: 25px; font-weight: bold;">Síguenos en nuestras redes</h3>
        
        <div style="display: flex; justify-content: center; gap: 15px;">
          <a href="{{link_facebook}}" target="_blank" style="display: {{display_fb}}; align-items: center; justify-content: center; width: 45px; height: 45px; background-color: #1877F2; border-radius: 50%; color: white; text-decoration: none; font-weight: bold; font-size: 14px; box-shadow: 0 4px 6px rgba(24,119,242,0.3); transition: transform 0.2s;">
            Fb
          </a>
          
          <a href="{{link_instagram}}" target="_blank" style="display: {{display_ig}}; align-items: center; justify-content: center; width: 45px; height: 45px; background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); border-radius: 50%; color: white; text-decoration: none; font-weight: bold; font-size: 14px; box-shadow: 0 4px 6px rgba(220,39,67,0.3); transition: transform 0.2s;">
            Ig
          </a>
          
          <a href="{{link_whatsapp}}" target="_blank" style="display: {{display_wa}}; align-items: center; justify-content: center; width: 45px; height: 45px; background-color: #25D366; border-radius: 50%; color: white; text-decoration: none; font-weight: bold; font-size: 14px; box-shadow: 0 4px 6px rgba(37,211,102,0.3); transition: transform 0.2s;">
            Wa
          </a>

          <a href="{{link_tiktok}}" target="_blank" style="display: {{display_tk}}; align-items: center; justify-content: center; width: 45px; height: 45px; background-color: #000000; border-radius: 50%; color: white; text-decoration: none; font-weight: bold; font-size: 14px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); transition: transform 0.2s;">
            Tk
          </a>
        </div>
      </section>
    `
  }
};