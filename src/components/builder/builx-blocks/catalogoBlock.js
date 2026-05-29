export const catalogoBlock = {
  id: 'catalogo-avanzado',
  opciones: {
    label: '🛍️ Catálogo y Buscador',
    category: 'Catálogo',
    content: `
      <section id="seccion-productos" style="background-color: #ffffff; font-family: sans-serif; padding-bottom: 60px;">
        
        <div style="background-color: #4b4a4a; width: 100%; overflow-x: auto; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div id="menu-categorias-custom" style="display: flex; gap: 30px; max-width: 1200px; margin: 0 auto; padding: 5px 20px; scrollbar-width: none; -ms-overflow-style: none;">
            </div>
        </div>

        <div style="max-width: 1200px; margin: 40px auto 0;">
          <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 40px; justify-content: center; padding: 0 20px;">
            <input type="text" class="buscador-productos" placeholder="🔍 Buscar producto..." style="padding: 12px 20px; border: 1px solid #cbd5e1; border-radius: 8px; width: 100%; max-width: 280px; outline: none; font-size: 15px; transition: border 0.3s;">
            
            <select class="filtro-categoria" style="display: none;">
              {{OPCIONES_CATEGORIAS}}
            </select>

            <select class="filtro-precio" style="padding: 12px 20px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; font-size: 15px; cursor: pointer; background: white; transition: border 0.3s;">
              <option value="default">Ordenar precio</option>
              <option value="menor">Menor a Mayor</option>
              <option value="mayor">Mayor a Menor</option>
            </select>
          </div>

          <div style="padding: 0 20px;">
            {{LISTA_PRODUCTOS}}
          </div>
        </div>

        <script>
          (function initMenu() {
             const selectCat = document.querySelector('.filtro-categoria');
             const menuCustom = document.getElementById('menu-categorias-custom');
             
             // Si el HTML aún no termina de inyectarse, reintentamos en 200ms
             if(!selectCat || !menuCustom || selectCat.options.length === 0) {
                 setTimeout(initMenu, 200);
                 return;
             }

             // Evitar que se dibujen dobles si se ejecuta de nuevo
             if(menuCustom.children.length > 0) return;

             const opciones = Array.from(selectCat.options);
             
             opciones.forEach((op, index) => {
                 const btn = document.createElement('button');
                 btn.textContent = op.text.toUpperCase(); 
                 btn.style.cssText = "background: none; border: none; color: white; font-weight: 800; font-size: 13px; letter-spacing: 0.5px; cursor: pointer; padding: 15px 0; border-bottom: 3px solid transparent; white-space: nowrap; transition: all 0.2s ease-in-out; font-family: inherit;";
                 
                 btn.addEventListener('mouseenter', () => {
                     if(selectCat.value !== op.value) btn.style.color = '#e2e8f0';
                 });
                 btn.addEventListener('mouseleave', () => {
                     if(selectCat.value !== op.value) btn.style.color = 'white';
                 });

                 if(index === 0) {
                     btn.style.borderBottom = '3px solid #e07a88'; 
                     btn.style.color = '#e07a88';
                     selectCat.value = op.value;
                 }

                 btn.addEventListener('click', () => {
                     selectCat.value = op.value;
                     // IMPORTANTE: Simulamos un cambio real para que el buscador lo detecte
                     selectCat.dispatchEvent(new Event('change', { bubbles: true }));
                     
                     Array.from(menuCustom.children).forEach(b => {
                         b.style.borderBottom = '3px solid transparent';
                         b.style.color = 'white';
                     });
                     
                     btn.style.borderBottom = '3px solid #e07a88';
                     btn.style.color = '#e07a88';
                 });
                 
                 menuCustom.appendChild(btn);
             });
          })();
        </script>
      </section>
    `
  }
};