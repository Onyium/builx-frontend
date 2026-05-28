export const catalogoBlock = {
  id: 'catalogo-avanzado',
  opciones: {
    label: '🛍️ Catálogo y Buscador',
    category: 'Catálogo',
    content: `
      <section id="seccion-productos" style="padding: 60px 20px; background-color: #ffffff; font-family: sans-serif;">
        <div style="max-width: 1200px; margin: 0 auto;">
          <h2 style="text-align: center; font-size: 32px; font-weight: 800; color: #0f172a; margin-bottom: 30px;">Nuestro Catálogo</h2>

          <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 40px; justify-content: center;">
            <input type="text" class="buscador-productos" placeholder="🔍 Buscar producto..." style="padding: 12px 20px; border: 1px solid #cbd5e1; border-radius: 8px; width: 100%; max-width: 250px; outline: none; font-size: 15px; transition: border 0.3s;">
            
            <select class="filtro-categoria" style="padding: 12px 20px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; font-size: 15px; cursor: pointer; background: white; transition: border 0.3s;">
              {{OPCIONES_CATEGORIAS}}
            </select>

            <select class="filtro-precio" style="padding: 12px 20px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; font-size: 15px; cursor: pointer; background: white; transition: border 0.3s;">
              <option value="default">Ordenar precio</option>
              <option value="menor">Menor a Mayor</option>
              <option value="mayor">Mayor a Menor</option>
            </select>
          </div>

          {{LISTA_PRODUCTOS}}

        </div>
      </section>
    `
  }
};