let plantillaSeleccionada = '';
let colorFondo = '';
let colorTexto = '';

function seleccionarPlantilla(id, nombre, bgClass, textClass) {
    plantillaSeleccionada = id;
    colorFondo = bgClass;
    colorTexto = textClass;
    document.getElementById('seccion-personalizar').classList.remove('hidden');
}

function cerrarPersonalizador() {
    document.getElementById('seccion-personalizar').classList.add('hidden');
}

function volverAEditar() {
    document.getElementById('pantalla-preview').classList.add('hidden');
    document.getElementById('seccion-personalizar').classList.remove('hidden');
}

function generarPrevisualizacion() {
    const nombre = document.getElementById('nombre-empresa').value || 'Mi Empresa';
    const descripcion = document.getElementById('descripcion-empresa').value || 'Esta es una descripción corta sobre el increíble valor que nuestra empresa aporta a los clientes.';

    document.getElementById('preview-nombre-header').innerText = nombre;
    
    // Generamos dinámicamente el HTML de la plantilla elegida
    let htmlPlantilla = '';

    if (plantillaSeleccionada === 'restaurante') {
        htmlPlantilla = `
            <div class="min-h-screen flex flex-col font-serif">
                <nav class="p-6 flex justify-between items-center bg-amber-50">
                    <span class="text-xl font-bold ${colorTexto}">${nombre}</span>
                    <div class="space-x-4 text-sm text-amber-900">
                        <span>Menú</span><span>Reservas</span><span>Contacto</span>
                    </div>
                </nav>
                <main class="flex-1 flex flex-col items-center justify-center text-center p-8 bg-amber-50/50">
                    <h1 class="text-5xl font-bold text-slate-900 max-w-2xl leading-tight">${nombre}</h1>
                    <p class="text-lg text-slate-700 max-w-xl mt-6 italic">"${descripcion}"</p>
                    <div class="mt-8 flex space-x-4">
                        <button class="${colorFondo} text-white px-6 py-3 rounded-md font-semibold">Reservar una mesa</button>
                        <button class="border border-amber-900 text-amber-900 px-6 py-3 rounded-md font-semibold">Ver Menú</button>
                    </div>
                </main>
            </div>
        `;
    } else if (plantillaSeleccionada === 'fitness') {
        htmlPlantilla = `
            <div class="min-h-screen flex flex-col bg-neutral-950 text-white font-sans">
                <nav class="p-6 flex justify-between items-center border-b border-neutral-900">
                    <span class="text-xl font-black tracking-wider uppercase ${colorTexto}">${nombre}</span>
                    <div class="space-x-6 text-sm text-neutral-400">
                        <span>Planes</span><span>Clases</span><span>Blog</span>
                    </div>
                </nav>
                <main class="flex-1 flex flex-col items-center justify-center text-center p-8">
                    <span class="text-xs uppercase tracking-widest ${colorTexto} font-bold mb-4">ENTRENA SIN EXCUSAS</span>
                    <h1 class="text-6xl font-black uppercase tracking-tight max-w-3xl leading-none">${nombre}</h1>
                    <p class="text-neutral-400 max-w-xl mt-6 text-lg">${descripcion}</p>
                    <button class="${colorFondo} text-white uppercase tracking-wider font-bold px-8 py-4 rounded-full mt-8 hover:scale-105 transition-transform">
                        Iniciar Prueba Gratuita
                    </button>
                </main>
            </div>
        `;
    } else if (plantillaSeleccionada === 'corporate') {
        htmlPlantilla = `
            <div class="min-h-screen flex flex-col bg-slate-50 font-sans">
                <nav class="p-6 flex justify-between items-center bg-white border-b border-slate-100">
                    <span class="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <span class="w-3 h-3 rounded-full ${colorFondo}"></span> ${nombre}
                    </span>
                    <div class="space-x-6 text-sm text-slate-600">
                        <span>Servicios</span><span>Casos de éxito</span><span>Sobre nosotros</span>
                    </div>
                </nav>
                <main class="flex-1 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center p-8">
                    <div>
                        <h1 class="text-5xl font-extrabold text-slate-900 leading-tight">${nombre}</h1>
                        <p class="text-slate-600 mt-6 text-lg leading-relaxed">${descripcion}</p>
                        <div class="mt-8">
                            <button class="${colorFondo} text-white px-6 py-3 rounded-lg font-semibold shadow-md">Agendar Consultoría</button>
                        </div>
                    </div>
                    <div class="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                        <h3 class="font-bold text-slate-900 text-lg">¿Por qué elegirnos?</h3>
                        <p class="text-slate-500 text-sm">Ofrecemos soluciones personalizadas enfocadas en acelerar el crecimiento estratégico de tu negocio.</p>
                        <div class="border-t border-slate-100 pt-4 flex justify-between">
                            <div><span class="block text-2xl font-bold text-slate-950">99%</span><span class="text-xs text-slate-400">Satisfacción</span></div>
                            <div><span class="block text-2xl font-bold text-slate-950">24/7</span><span class="text-xs text-slate-400">Soporte técnico</span></div>
                        </div>
                    </div>
                </main>
            </div>
        `;
    }

    // Inyectamos el diseño generado y ocultamos/mostramos los contenedores correctos
    document.getElementById('container-render').innerHTML = htmlPlantilla;
    document.getElementById('seccion-personalizar').classList.add('hidden');
    document.getElementById('pantalla-preview').classList.remove('hidden');
}