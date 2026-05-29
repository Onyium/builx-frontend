export const catalogoBlock = {
  id: 'catalogo-avanzado',
  opciones: {
    label: '🛍️ Catálogo y Buscador',
    category: 'Catálogo',
    content: {
      type: 'default',
      components: `
        <section class="seccion-productos" style="background-color: #ffffff; font-family: sans-serif; padding-bottom: 60px;">
          
          <style>
            html, body { overflow-x: hidden !important; width: 100%; margin: 0; padding: 0; }
            * { box-sizing: border-box; }

            #grid-productos-magico, .builx-grid-container {
                display: grid !important;
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 12px !important;
                align-items: stretch !important;
            }

            .producto-item { min-width: 0 !important; width: 100% !important; }

            .producto-item img { 
                width: 100% !important; height: auto !important; 
                aspect-ratio: 1 / 1 !important; object-fit: cover !important; 
                border-radius: 12px 12px 0 0 !important; 
            }
            
            .card-item-info { padding: 12px !important; }
            .card-item-info h3 { font-size: 0.85rem !important; margin-bottom: 5px !important; line-height: 1.2 !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
            .card-item-info p { font-size: 0.75rem !important; margin-bottom: 8px !important; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; height: auto; }
            .card-item-price { font-size: 1.1rem !important; margin-bottom: 10px !important; }
            
            .producto-item button, .producto-item a.btn-whatsapp { 
                padding: 8px !important; font-size: 0.75rem !important; width: 100% !important;
            }

            @media (min-width: 768px) {
                #grid-productos-magico, .builx-grid-container {
                    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)) !important; gap: 20px !important;
                }
                .card-item-info { padding: 15px !important; }
                .card-item-info h3 { font-size: 1.1rem !important; white-space: normal; }
                .card-item-price { font-size: 1.3rem !important; }
                .producto-item button, .producto-item a.btn-whatsapp { padding: 10px !important; font-size: 0.9rem !important; }
            }
            
            /* 🚀 ESTILOS PARA LA PAGINACIÓN NUMÉRICA */
            .paginacion-numerica {
                display: flex; justify-content: center; gap: 8px; margin-top: 40px; flex-wrap: wrap; align-items: center;
            }
            .paginacion-numerica button {
                padding: 10px 16px; border: 1px solid #cbd5e1; background: white; color: #475569;
                border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 14px;
                transition: all 0.2s; font-family: inherit;
            }
            .paginacion-numerica button:hover:not(:disabled) {
                background: #f1f5f9; border-color: #94a3b8; color: #0f172a;
            }
            .paginacion-numerica button.activo {
                background: #4b4a4a; /* Color oscuro que combina con la barra de arriba */
                color: white; border-color: #4b4a4a; pointer-events: none;
            }
            .paginacion-numerica button:disabled {
                opacity: 0.4; cursor: not-allowed;
            }
          </style>

          <div style="background-color: #4b4a4a; width: 100%; overflow-x: auto; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div class="menu-categorias-custom" style="display: flex; gap: 30px; max-width: 1200px; margin: 0 auto; padding: 5px 20px; scrollbar-width: none; -ms-overflow-style: none;">
              </div>
          </div>

          <div style="max-width: 1200px; margin: 40px auto 0;">
            <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 40px; justify-content: center; padding: 0 20px;">
              <input type="text" class="buscador-productos" placeholder="🔍 Buscar producto..." style="padding: 12px 20px; border: 1px solid #cbd5e1; border-radius: 8px; width: 100%; max-width: 280px; outline: none; font-size: 15px;">
              
              <select class="filtro-categoria" style="display: none;">{{OPCIONES_CATEGORIAS}}</select>

              <select class="filtro-precio" style="padding: 12px 20px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; font-size: 15px; cursor: pointer; background: white;">
                <option value="default">Ordenar precio</option>
                <option value="menor">Menor a Mayor</option>
                <option value="mayor">Mayor a Menor</option>
              </select>
            </div>

            <div id="inicio-catalogo"></div>

            <div style="padding: 0 20px;">
              {{LISTA_PRODUCTOS}}
            </div>

            <div class="paginacion-numerica" style="display: none;">
                </div>
          </div>
        </section>
      `,
      
      script: function() {
        const section = this;
        const selectCat = section.querySelector('.filtro-categoria');
        const menuCustom = section.querySelector('.menu-categorias-custom');
        const buscador = section.querySelector('.buscador-productos');
        const filtroPrecio = section.querySelector('.filtro-precio');
        const paginacionContainer = section.querySelector('.paginacion-numerica');
        
        let paginaActual = 1;
        const itemsPorPagina = 12; // 👈 Modifica esto si quieres 10, 16 o 20 productos por página
        let productosVisiblesActuales = [];
        
        const inicializarTodo = () => {
            const contenedor = section.querySelector('#grid-productos-magico') || section.querySelector('.builx-grid-container');
            if(!contenedor) return;

            // 1. MENÚ DE CATEGORÍAS
            if (selectCat && menuCustom && menuCustom.children.length === 0) {
                const opciones = Array.from(selectCat.options);
                if (opciones.length === 0) {
                    menuCustom.innerHTML = '<span style="color:white; padding:15px 0; font-weight:800; font-size:13px;">CATEGORÍAS (MODO EDICIÓN)</span>';
                } else {
                    opciones.forEach((op, index) => {
                        const btn = document.createElement('button');
                        btn.textContent = op.text.toUpperCase(); 
                        btn.style.cssText = "background: none; border: none; color: white; font-weight: 800; font-size: 13px; letter-spacing: 0.5px; cursor: pointer; padding: 15px 0; border-bottom: 3px solid transparent; white-space: nowrap; transition: all 0.2s ease-in-out; font-family: inherit;";
                        
                        btn.addEventListener('mouseenter', () => { if(selectCat.value !== op.value) btn.style.color = '#e2e8f0'; });
                        btn.addEventListener('mouseleave', () => { if(selectCat.value !== op.value) btn.style.color = 'white'; });

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

            // 2. LÓGICA DE PAGINACIÓN NUMÉRICA
            const renderizarPaginacion = () => {
                if (!paginacionContainer) return;
                
                const totalPaginas = Math.ceil(productosVisiblesActuales.length / itemsPorPagina);
                paginacionContainer.innerHTML = '';

                // Si solo hay 1 página (o menos), no mostrar números
                if (totalPaginas <= 1) {
                    paginacionContainer.style.display = 'none';
                    return;
                }

                paginacionContainer.style.display = 'flex';

                // Botón Anterior (<)
                const btnPrev = document.createElement('button');
                btnPrev.innerHTML = '←';
                btnPrev.disabled = paginaActual === 1;
                btnPrev.onclick = () => {
                    paginaActual--;
                    aplicarPaginacion();
                    scrollToTop();
                };
                paginacionContainer.appendChild(btnPrev);

                // Botones de Números (1, 2, 3...)
                for (let i = 1; i <= totalPaginas; i++) {
                    const btnNum = document.createElement('button');
                    btnNum.textContent = i;
                    if (i === paginaActual) btnNum.classList.add('activo');
                    
                    btnNum.onclick = () => {
                        paginaActual = i;
                        aplicarPaginacion();
                        scrollToTop();
                    };
                    paginacionContainer.appendChild(btnNum);
                }

                // Botón Siguiente (>)
                const btnNext = document.createElement('button');
                btnNext.innerHTML = '→';
                btnNext.disabled = paginaActual === totalPaginas;
                btnNext.onclick = () => {
                    paginaActual++;
                    aplicarPaginacion();
                    scrollToTop();
                };
                paginacionContainer.appendChild(btnNext);
            };

            const aplicarPaginacion = () => {
                const inicio = (paginaActual - 1) * itemsPorPagina;
                const fin = paginaActual * itemsPorPagina;
                
                productosVisiblesActuales.forEach((prod, index) => {
                    if (index >= inicio && index < fin) {
                        prod.style.display = ''; 
                    } else {
                        prod.style.display = 'none'; 
                    }
                });

                renderizarPaginacion();
            };

            const scrollToTop = () => {
                const ancla = section.querySelector('#inicio-catalogo');
                if (ancla) {
                    // Sube suavemente restando 100px para no tapar con el menú superior
                    window.scrollTo({
                        top: ancla.getBoundingClientRect().top + window.scrollY - 100,
                        behavior: 'smooth'
                    });
                }
            };

            // 3. BUSCADOR Y FILTROS
            if (buscador) {
                const filtrarYOrdenar = () => {
                    const textoBusqueda = buscador.value.toLowerCase();
                    const orden = filtroPrecio ? filtroPrecio.value : 'default';
                    const categoriaSeleccionada = selectCat ? selectCat.value : 'todas';
                    
                    let todosLosProductos = Array.from(contenedor.querySelectorAll('.producto-item'));
                    productosVisiblesActuales = [];

                    // 1. Filtrar
                    todosLosProductos.forEach(prod => {
                        prod.style.display = 'none'; 
                        const nombre = (prod.getAttribute('data-nombre') || '').toLowerCase();
                        const categoria = (prod.getAttribute('data-categoria') || '').toLowerCase();
                        
                        const cumpleTexto = nombre.includes(textoBusqueda);
                        const cumpleCategoria = (categoriaSeleccionada === 'todas') || (categoria === categoriaSeleccionada);

                        if (cumpleTexto && cumpleCategoria) {
                            productosVisiblesActuales.push(prod);
                        }
                    });

                    // 2. Ordenar
                    if (orden !== 'default') {
                        productosVisiblesActuales.sort((a, b) => {
                            const precioA = parseFloat(a.getAttribute('data-precio') || 0);
                            const precioB = parseFloat(b.getAttribute('data-precio') || 0);
                            return orden === 'menor' ? precioA - precioB : precioB - precioA;
                        });
                        // Reordenar en el DOM
                        productosVisiblesActuales.forEach(prod => contenedor.appendChild(prod));
                    }

                    // 3. Resetear siempre a página 1 al buscar o filtrar
                    paginaActual = 1;
                    aplicarPaginacion();
                };

                // Asignar eventos solo la primera vez
                if(!contenedor.dataset.eventos) {
                    buscador.addEventListener('input', filtrarYOrdenar);
                    if(filtroPrecio) filtroPrecio.addEventListener('change', filtrarYOrdenar);
                    if(selectCat) selectCat.addEventListener('change', filtrarYOrdenar);
                    
                    contenedor.dataset.eventos = 'true';
                    filtrarYOrdenar(); // Corrida inicial
                }
            }
        };

        inicializarTodo();
        setTimeout(inicializarTodo, 500);
      }
    }
  }
};