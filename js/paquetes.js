// Muestra las tarjetas del catálogo con soporte de clic en toda la tarjeta
function renderizarCatalogoPaquetes() {
    const contenedor = document.getElementById('contenedor-paquetes-grid');
    if (!contenedor) return;

    let htmlGrid = '';

    listaPaquetes.forEach(paquete => {
        let itemsHtml = '';
        paquete.caracteristicas.forEach(item => {
            itemsHtml += `
                <li class="flex items-start gap-3">
                    <span class="text-indigo-600 font-bold text-lg leading-none">✓</span>
                    <span>${item}</span>
                </li>
            `;
        });

        // CAMBIO CLAVE: Agregamos el onclick a la tarjeta completa y la clase cursor-pointer
        htmlGrid += `
            <div onclick="seleccionarPlantilla('${paquete.id}', '${paquete.nombre}', '${paquete.bgClass}', '${paquete.textClass}')" 
                 class="${paquete.cardStyles} cursor-pointer transform hover:-translate-y-1 transition-all duration-300">
                <div>
                    <div class="flex items-center justify-between mb-6">
                        <div class="bg-slate-50 p-3 rounded-2xl text-2xl">${paquete.emoji}</div>
                        ${paquete.badgeHtml}
                    </div>
                    <h3 class="text-2xl font-bold text-slate-900">Web ${paquete.nombre}</h3>
                    <p class="text-sm text-slate-500 mt-2 min-h-[40px]">${paquete.descripcion}</p>
                    
                    <hr class="my-6 border-slate-100">
                    
                    <ul class="space-y-4 text-sm text-slate-600">
                        ${itemsHtml}
                    </ul>
                </div>

                <div class="mt-8">
                    <!-- Agregamos pointer-events-none para que el botón no interfiera con el clic del padre -->
                    <button class="${paquete.buttonStyles} pointer-events-none">
                        Probar Demo ${paquete.nombre} <span>→</span>
                    </button>
                </div>
            </div>
        `;
    });

    contenedor.innerHTML = htmlGrid;
} 

// Función global para manejar la selección de paquetes
window.seleccionarPlantilla = function(id, nombre, bgClass, textClass) {
    const contenedor = document.getElementById('contenedor-paquetes-grid');
    if (!contenedor) return;
    
    const tarjetas = contenedor.children;

    // 1. Limpiar el estado de TODAS las tarjetas al diseño base (gris/blanco)
    for (let i = 0; i < tarjetas.length; i++) {
        const tarjeta = tarjetas[i];
        const boton = tarjeta.querySelector('button');
        
        // Quitamos bordes activos e interrupciones de transición
        tarjeta.classList.remove('border-indigo-600', 'border-2', 'shadow-xl', 'lg:-translate-y-4', 'duration-300', 'transition-all');
        
        // Devolvemos las clases originales del estado inactivo, INCLUYENDO el hover gris original
        tarjeta.classList.add('border', 'border-slate-200', 'shadow-sm', 'hover:border-slate-300', 'hover:shadow-md');

        if (boton) {
            boton.className = "w-full bg-slate-50 hover:bg-slate-100 text-slate-800 text-sm py-3.5 px-4 rounded-xl font-semibold transition-colors flex justify-center items-center gap-2 border border-slate-200 pointer-events-none";
        }
    }

    // 2. Encontrar la tarjeta que recibió el clic
    const tarjetaSeleccionada = Array.from(tarjetas).find(t => t.getAttribute('onclick').includes(`'${id}'`));
    
    if (tarjetaSeleccionada) {
        // CLAVE: Quitamos 'hover:border-slate-300' para que el color gris del hover no tape al lila mientras el cursor siga encima
        tarjetaSeleccionada.classList.remove('border', 'border-slate-200', 'shadow-sm', 'hover:border-slate-300');
        
        // Aplicamos el borde lila (indigo-600) y la sombra de inmediato sin delay
        tarjetaSeleccionada.classList.add('border-2', 'border-indigo-600', 'shadow-xl');
        
        // Activamos y pintamos su respectivo botón demo
        const botonSeleccionado = tarjetaSeleccionada.querySelector('button');
        if (botonSeleccionado) {
            botonSeleccionado.className = `w-full ${bgClass} hover:opacity-90 text-white text-sm py-3.5 px-4 rounded-xl font-semibold shadow-lg flex justify-center items-center gap-2`;
        }

        // Devolvemos la animación de suavizado tras 50ms para que futuras interacciones se sientan bien
        setTimeout(() => {
            tarjetaSeleccionada.classList.add('transition-all', 'duration-300');
        }, 50);
    }
};

// 3. SELECCIÓN POR DEFAULT: Al cargar la página, se auto-selecciona el plan Profesional
document.addEventListener('DOMContentLoaded', () => {
    // Esperamos un momento breve para asegurar que el HTML esté listo y llamamos al Profesional por defecto
    setTimeout(() => {
        seleccionarPlantilla('corporate', 'Profesional', 'bg-blue-600', 'text-blue-600');
    }, 100);
});