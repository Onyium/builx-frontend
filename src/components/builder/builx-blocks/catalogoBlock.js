export const catalogoBlock = {
  id: 'catalogo-avanzado',
  opciones: {
    label: '🛍️ Catálogo y Buscador',
    category: 'Catálogo',
    
    // 🚀 EL SECRETO: Usamos un Objeto ({}) para que GrapesJS no bloquee el código
    content: {
      type: 'default',
      components: `
        <section class="seccion-productos" style="background-color: #ffffff; font-family: sans-serif; padding-bottom: 60px;">
          
          <style>
            /* Elimina el temblor / scroll horizontal en celular */
            html, body { 
                overflow-x: hidden !important; 
                width: 100%; 
                margin: 0; 
                padding: 0; 
            }
            * { box-sizing: border-box; }

            /* Cuadrícula para móviles (Forzamos 2 columnas) */
            .grid-productos-magico {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 12px;
            }

            /* Ajustes proporcionales para tarjetas en celular */
            .producto-item img { height: 150px !important; border-radius: 12px 12px 0 0 !important; }
            .card-item-info { padding: 10px !important; }
            .card-item-info h3 { font-size: 0.9rem !important; margin-bottom: 5px !important; }
            .card-item-info p { font-size: 0.75rem !important; }
            .card-item-price { font-size: 1.1rem !important; }
            
            .producto-item button, .producto-item a.btn-whatsapp { 
                padding: 8px !important; 
                font-size: 0.8rem !important; 
            }

            /* Cuadrícula para PC y Tablets (Vuelve a tarjetas grandes) */
            @media (min-width: 768px) {
                .grid-productos-magico {
                    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                    gap: 20px;
                }
                .producto-item img { height: 200px !important; }
                .card-item-info { padding: 15px !important; }
                .card-item-info h3 { font-size: 1.1rem !important; }
                .card-item-price { font-size: 1.3rem !important; }
                .producto-item button, .producto-item a.btn-whatsapp { 
                    padding: 10px !important; 
                    font-size: 0.9rem !important; 
                }
            }
          </style>

          <div style="background-color: #4b4a4a; width: 100%; overflow-x: auto; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div class="menu-categorias-custom" style="display: flex; gap: 30px; max-width: 1200px; margin: 0 auto; padding: 5px 20px; scrollbar-width: none; -ms-overflow-style: none;">
                  </div>
          </div>

          <div style="max-width: 1200px; margin: 40px auto 0;">
            <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 40px; justify-content: center; padding: 0 20px;">
              <input type="text" class="buscador-productos" placeholder="🔍 Buscar producto..." style="padding: 12px 20px; border: 1px solid #cbd5e1; border-radius: 8px; width: 100%; max-width: 280px; outline: none; font-size: 15px;">
              
              <select class="filtro-categoria" style="display: none;">
                {{OPCIONES_CATEGORIAS}}
              </select>

              <select class="filtro-precio" style="padding: 12px 20px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; font-size: 15px; cursor: pointer; background: white;">
                <option value="default">Ordenar precio</option>
                <option value="menor">Menor a Mayor</option>
                <option value="mayor">Mayor a Menor</option>
              </select>
            </div>

            <div class="grid-productos-magico" style="padding: 0 20px;">
              {{LISTA_PRODUCTOS}}
            </div>
          </div>
        </section>
      `,
      
      // 🚀 EL SCRIPT NATIVO DE GRAPESJS
      script: function() {
        const section = this;
        
        const selectCat = section.querySelector('.filtro-categoria');
        const menuCustom = section.querySelector('.menu-categorias-custom');
        const buscador = section.querySelector('.buscador-productos');
        const filtroPrecio = section.querySelector('.filtro-precio');
        const contenedor = section.querySelector('.grid-productos-magico');

        // --- 1. DIBUJAR MENÚ SUPERIOR DE CATEGORÍAS ---
        if (selectCat && menuCustom && menuCustom.children.length === 0) {
            const opciones = Array.from(selectCat.options);
            
            // Si carga vacío en el editor, muestra este texto temporal
            if (opciones.length === 0) {
                menuCustom.innerHTML = '<span style="color:white; padding:15px 0; font-weight:800; font-size:13px;">CATEGORÍAS (MODO EDICIÓN)</span>';
            } else {
                opciones.forEach((op, index) => {
                    const btn = document.createElement('button');
                    btn.textContent = op.text.toUpperCase(); 
                    btn.style.cssText = "background: none; border: none; color: white; font-weight: 800; font-size: 13px; letter-spacing: 0.5px; cursor: pointer; padding: 15px 0; border-bottom: 3px solid transparent; white-space: nowrap; transition: all 0.2s ease-in-out; font-family: inherit;";
                    
                    btn.addEventListener('mouseenter', () => { if(selectCat.value !== op.value) btn.style.color = '#e2e8f0'; });
                    btn.addEventListener('mouseleave', () => { if(selectCat.value !== op.value) btn.style.color = 'white'; });

                    // La primera categoría arranca seleccionada (letra rosada)
                    if (index === 0) {
                        btn.style.borderBottom = '3px solid #e07a88'; 
                        btn.style.color = '#e07a88';
                        selectCat.value = op.value;
                    }

                    btn.addEventListener('click', () => {
                        selectCat.value = op.value;
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
            }
        }

        // --- 2. ACTIVAR BUSCADOR Y ORDENADOR ---
        if (contenedor && buscador) {
            const filtrarYOrdenar = () => {
                const textoBusqueda = buscador.value.toLowerCase();
                const orden = filtroPrecio ? filtroPrecio.value : 'default';
                const categoriaSeleccionada = selectCat ? selectCat.value : 'todas';
                
                let productos = Array.from(contenedor.querySelectorAll('.producto-item'));

                productos.forEach(prod => {
                    const nombre = (prod.getAttribute('data-nombre') || '').toLowerCase();
                    const categoria = (prod.getAttribute('data-categoria') || '').toLowerCase();
                    
                    const cumpleTexto = nombre.includes(textoBusqueda);
                    const cumpleCategoria = (categoriaSeleccionada === 'todas') || (categoria === categoriaSeleccionada);

                    if (cumpleTexto && cumpleCategoria) {
                        prod.style.display = ''; 
                    } else {
                        prod.style.display = 'none'; 
                    }
                });

                if (orden !== 'default') {
                    const productosVisibles = productos.filter(p => p.style.display !== 'none');
                    productosVisibles.sort((a, b) => {
                        const precioA = parseFloat(a.getAttribute('data-precio') || 0);
                        const precioB = parseFloat(b.getAttribute('data-precio') || 0);
                        return orden === 'menor' ? precioA - precioB : precioB - precioA;
                    });
                    productosVisibles.forEach(prod => contenedor.appendChild(prod));
                }
            };

            buscador.addEventListener('input', filtrarYOrdenar);
            if(filtroPrecio) filtroPrecio.addEventListener('change', filtrarYOrdenar);
            if(selectCat) selectCat.addEventListener('change', filtrarYOrdenar);
        }
      }
    }
  }
};