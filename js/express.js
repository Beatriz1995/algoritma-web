lucide.createIcons();

// Arreglo con la data de las 6 plantillas Express
const plantillas = [
    { 
        id: 1, 
        categoria: "Servicios de Urgencia y del Hogar", 
        desc: "Ideal para: Técnicos en AA, cerrajeros, fumigadores, plomeros y electricistas.",
        imagenPreview: "img/express/servicio_urgencias.png",  
        imagenCompleta: "img/express/servicio_urgencias_completo.jpg",
        urlDemo: "http://localhost/cerrajeria/"
    },
    { 
        id: 2, 
        categoria: "Profesionistas Independientes", 
        desc: "Ideal para: Psicólogos, médicos, abogados, contadores y arquitectos, etc.", 
        imagenPreview: "img/express/servicio_urgencias.png",  
        imagenCompleta: "img/express/servicio_urgencias_completo.jpg",
        urlDemo: "http://localhost/cerrajeria/"
    },
    { 
        id: 3, 
        categoria: "Transportes, Logística y Mudanzas", 
        desc: "Ideal para: Fletes, mudanzas locales, grúas y renta de autos o vans.", 
        imagenPreview: "img/express/transporte_logistica.png",  
        imagenCompleta: "img/express/transporte_logistica_completo.jpg",
        urlDemo: "http://localhost/gruas/"
    },
    { 
        id: 4, 
        categoria: "Eventos, Entretenimiento y Espacios", 
        desc: "Ideal para: Salones de eventos, palapas, banquetes, mariachis y DJs.", 
        imagenPreview: "img/express/eventos.png",  
        imagenCompleta: "img/express/eventos_completo.jpg",
        urlDemo: "http://localhost/SALON-EVENTOS/"
    },
    { 
        id: 5, 
        categoria: "Restaurantes / Menú", 
        desc: "Ideal para: Food trucks, restaurantes, etc.", 
        imagenPreview: "img/express/servicio_urgencias.png",  
        imagenCompleta: "img/express/servicio_urgencias_completo.jpg",
        urlDemo: "http://localhost/cerrajeria/"
    },
    { 
        id: 6, 
        categoria: "Inmobiliaria / Leads", 
        desc: "Ideal para: Preventa de fraccionamientos, torres de departamentos y agentes independientes.", 
        imagenPreview: "img/express/servicio_urgencias.png",  
        imagenCompleta: "img/express/servicio_urgencias_completo.jpg",
        urlDemo: "http://localhost/cerrajeria/"
    }
];

let plantillaSeleccionada = 1;
let colorPrincipal = '#2563eb';
let colorSecundario = '#0f766e';
let logoDataUrl = ''; // Variable para almacenar el logo en Base64

// Elementos DOM
const primaryColorPicker = document.getElementById('primaryColorPicker');
const secondarySuggestionsContainer = document.getElementById('secondarySuggestionsContainer');
const templatesGallery = document.getElementById('templatesGallery');
const businessNameInput = document.getElementById('businessName');
const businessDescriptionInput = document.getElementById('businessDescription');

// Elementos del Modal / Frame de Previsualización Real-Time
const expandedPreviewContainer = document.getElementById('expandedPreviewContainer');
const btnPrevisualizar = document.getElementById('btnPrevisualizar');
const btnClosePreview = document.getElementById('btnClosePreview');
const previewUrlBar = document.getElementById('previewUrlBar');
const previewIframe = document.getElementById('previewIframe');
const whatsappFloat = document.getElementById('whatsappFloat');
// Elementos DOM
const businessLogoInput = document.getElementById('businessLogo');

// RENDERIZAR LA GALERÍA DE PLANTILLAS
function renderGallery() {
    if (!templatesGallery) return;
    templatesGallery.innerHTML = '';
    
    plantillas.forEach(t => {
        const isSelected = plantillaSeleccionada === t.id;
        
        const card = document.createElement('div');
        card.className = `bg-white border rounded-2xl p-4 cursor-pointer relative transition-all duration-300 transform select-none flex flex-col justify-between min-h-[220px] ${
            isSelected ? 'border-blue-600 shadow-lg ring-2 ring-blue-100 scale-[1.02]' : 'border-gray-200 shadow-sm hover:border-gray-300 hover:shadow'
        }`;
        
        card.onclick = () => selectTemplate(t.id);

        card.innerHTML = `
            <div>
                <div class="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'bg-blue-600 text-white opacity-100 scale-100' : 'bg-gray-100 text-gray-300 opacity-0 scale-75'
                }">
                    <i data-lucide="check" class="w-3.5 h-3.5"></i>
                </div>
                <div class="w-full rounded-xl overflow-hidden mb-3 bg-gray-100 border border-gray-100 shadow-inner transition-all duration-500 ease-in-out ${
                    isSelected ? 'h-96' : 'h-28'
                }">
                    <img 
                        src="${isSelected ? t.imagenCompleta : t.imagenPreview}" 
                        alt="${t.categoria}" 
                        class="w-full h-full object-cover object-top transition-all duration-500"
                    >
                </div>
                <h4 class="text-sm font-bold text-gray-900">${t.categoria}</h4>
                <p class="text-xs text-gray-700 mt-0.5">${t.desc}</p>
            </div>
            <button 
                type="button" 
                onclick="handleTemplateClick()"
                class="mt-4 w-full h-9 rounded-lg text-xs font-semibold transition border flex items-center justify-center gap-1 cursor-pointer ${
                    isSelected 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm hover:bg-blue-700' 
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }"
            >
                ${isSelected ? '✓ Previsualizar' : 'Seleccionar'}
        </button>
        `;
        templatesGallery.appendChild(card);
    });
    lucide.createIcons();
}

// SELECCIÓN DE PLANTILLA
function selectTemplate(id) {
    plantillaSeleccionada = id;
    renderGallery();
    
    // Actualizar la URL estética
    const plantilla = plantillas.find(p => p.id === id);
    if (plantilla && previewUrlBar) {
        previewUrlBar.textContent = `demo.algoritma.com/express-${plantilla.categoria.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    }

    // Si el modal de vista previa ya está abierto, cargamos la nueva plantilla inmediatamente
    if (expandedPreviewContainer && !expandedPreviewContainer.classList.contains('hidden')) {
        cargarDemo(id);
    }
}

// CARGAR LA DEMO DENTRO DEL IFRAME CON PARÁMETROS EN LA URL
function cargarDemo(id) {
    const plantilla = plantillas.find(p => p.id === id);
    if (!plantilla) return;

    const iframe = document.getElementById('previewIframe');
    
    const titulo = encodeURIComponent(businessNameInput ? businessNameInput.value.trim() : '');
    const desc = encodeURIComponent(businessDescriptionInput ? businessDescriptionInput.value.trim() : '');
    const c1 = encodeURIComponent(colorPrincipal);
    const c2 = encodeURIComponent(colorSecundario);

    // Armamos la URL con Query Params
    const urlConParametros = `${plantilla.urlDemo}?titulo=${titulo}&desc=${desc}&color1=${c1}&color2=${c2}`;

    if (iframe) {
        iframe.src = urlConParametros;

        // 🟢 LE AGREGAMOS UN PEQUEÑO RETARDE PARA QUE LA PLANTILLA ALCANCE A INICIALIZAR EL LISTENER
        iframe.onload = () => {
           // Ejecución inmediata
            enviarLiveUpdates();
            
            // Re-envío táctico tras 100ms para asegurar que los scripts receptores de la plantilla hayan terminado de ejecutar sus eventos iniciales
            setTimeout(() => {
                enviarLiveUpdates();
            }, 100);
        };
    }
    
    if (previewUrlBar) {
        previewUrlBar.textContent = `demo.algoritma.com/express-${plantilla.categoria.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    }
}

// ENVIAR CAMBIOS EN TIEMPO REAL AL IFRAME SIN RECARGAR
function enviarLiveUpdates() {
    const iframe = document.getElementById('previewIframe');
    if (!iframe || !iframe.contentWindow) return;

    iframe.contentWindow.postMessage({
        logo: logoDataUrl
    }, '*');
}

// HERRAMIENTAS DE TEORÍA DEL COLOR
function hexToHsl(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

// GENERADOR DE PALETAS
function generateColorSuggestions(hex) {
    colorPrincipal = hex;
    const hsl = hexToHsl(hex);
    
    const combinations = [
        { 
            name: 'SUGERIDO (ANÁLOGO)', 
            label: 'Principal + Análogo',
            color: hslToHex((hsl.h + 30) % 360, hsl.s, Math.max(20, hsl.l - 5)) 
        },
        { 
            name: 'COMPLEMENTARIO', 
            label: 'Principal + Contraste',
            color: hslToHex((hsl.h + 180) % 360, Math.min(100, hsl.s + 10), hsl.l) 
        },
        { 
            name: 'MONOCROMÁTICO', 
            label: 'Principal + Claro',
            color: hslToHex(hsl.h, Math.max(10, hsl.s - 20), Math.min(90, hsl.l + 25)) 
        },
        { 
            name: 'GRIS ELEGANTE', 
            label: 'Principal + Neutro',
            color: hslToHex(hsl.h, 10, 45) 
        }
    ];

    const validColor = combinations.some(c => c.color === colorSecundario);
    if (!validColor) {
        colorSecundario = combinations[0].color;
    }

    if (secondarySuggestionsContainer) {
        secondarySuggestionsContainer.innerHTML = '';
        
        combinations.forEach((c) => {
            const isSelected = colorSecundario === c.color;

            const card = document.createElement('div');
            card.className = `border rounded-xl overflow-hidden cursor-pointer transition-all duration-200 bg-white flex flex-col justify-between aspect-square ${
                isSelected ? 'border-blue-600 ring-2 ring-blue-100 shadow-sm' : 'border-gray-200 hover:border-gray-700'
            }`;
            
            card.onclick = (e) => {
                e.stopPropagation();
                colorSecundario = c.color;
                generateColorSuggestions(hex);
                enviarLiveUpdates();
            };

            card.innerHTML = `
                <div class="flex-1 flex gap-2 justify-center items-center px-2">
                    <div class="w-10 h-10 rounded-lg relative shadow-inner flex items-center justify-center text-white shrink-0" style="background-color: ${colorPrincipal}">
                        ${isSelected ? '<i data-lucide="check" class="w-4 h-4 drop-shadow"></i>' : ''}
                    </div>
                    <div class="w-10 h-10 rounded-lg shadow-inner shrink-0" style="background-color: ${c.color}"></div>
                </div>
                <div class="text-center py-1 px-1 text-[8px] uppercase tracking-wider transition-colors truncate ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 border-t border-gray-100'
                }">
                    ${c.name}
                </div>
            `;
            secondarySuggestionsContainer.appendChild(card);
        });
    }
    
    lucide.createIcons();
    enviarLiveUpdates();
}

function handleTemplateClick() {
        if (!plantillaSeleccionada) {
            alert('Por favor selecciona una de las 6 plantillas prediseñadas para poder previsualizar.');
            return;
        }

        // 1. Cargar el HTML en el iframe con sus datos
        cargarDemo(plantillaSeleccionada);

        // 2. Abrir el modal emergente
        if (expandedPreviewContainer) {
            expandedPreviewContainer.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Bloquear scroll del fondo

            // Ocultamos el botón de WhatsApp
            if (whatsappFloat) whatsappFloat.classList.add('hidden');
        }
}

// LISTENERS DE INPUTS EN TIEMPO REAL
if (primaryColorPicker) {
    primaryColorPicker.addEventListener('input', (e) => {
        generateColorSuggestions(e.target.value);
    });
}

if (businessNameInput) {
    businessNameInput.addEventListener('input', enviarLiveUpdates);
}

if (businessDescriptionInput) {
    businessDescriptionInput.addEventListener('input', enviarLiveUpdates);
}


// CERRAR PREVIEW
if (btnClosePreview) {
    btnClosePreview.onclick = () => {
        if (expandedPreviewContainer) {
            expandedPreviewContainer.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Restaurar scroll del fondo
            
            // Mostramos de nuevo el botón de WhatsApp
            if (whatsappFloat) whatsappFloat.classList.remove('hidden');

            // Limpiar el iframe para liberar memoria
            const iframe = document.getElementById('previewIframe');
            if (iframe) iframe.src = '';
        }
    };
}

// Evento cuando el usuario selecciona una imagen
if (businessLogoInput) {
    businessLogoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                logoDataUrl = URL.createObjectURL(file);
                enviarLiveUpdates(); // 🟢 Envía la actualización a la vista previa
            };
            reader.readAsDataURL(file);
        } else {
            logoDataUrl = '';
            enviarLiveUpdates();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && expandedPreviewContainer && !expandedPreviewContainer.classList.contains('hidden')) {
        btnClosePreview.click(); // Automáticamente llamará el código de arriba y lo volverá a mostrar
    }
});
// INICIALIZACIÓN
renderGallery();
if (primaryColorPicker) {
    generateColorSuggestions(primaryColorPicker.value);
}