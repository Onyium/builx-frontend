// src/builx-blocks/navbarBlock.js

export const navbarBlock = {
  id: 'navbar-bloque',
  opciones: {
    label: '🔝 Menú Superior',
    category: 'Navegación',
    content: `
      <nav style="background-color: #ffffff; padding: 15px 5%; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); font-family: sans-serif; position: sticky; top: 0; z-index: 1000; width: 100%; box-sizing: border-box;">
        
        <div style="display: flex; align-items: center; gap: 15px;">
          <img src="{{logo_url}}" alt="Logo" style="height: 45px; width: auto; object-fit: contain; border-radius: 4px;">
          <span style="font-size: 20px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px;">{{nombre}}</span>
        </div>

        <div style="display: flex; gap: 25px; align-items: center;">
          <a href="#" style="color: #475569; text-decoration: none; font-weight: 500; font-size: 15px;">Inicio</a>
          <a href="#" style="color: #475569; text-decoration: none; font-weight: 500; font-size: 15px;">Catálogo</a>
          <a href="#" style="color: #475569; text-decoration: none; font-weight: 500; font-size: 15px;">FAQ</a>
          
          <a href="tel:{{telefono}}" style="background-color: #2563eb; color: white; padding: 10px 22px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 14px; transition: background 0.3s; box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);">
            📞 Llamar 
          </a>
        </div>
      </nav>
    `
  }
};