function abrirModalCheckout() {
    const modal = document.getElementById('checkoutModal');
    if (!modal) return;

    const categoriaNombre = document.getElementById('selectedCategoryName')?.textContent || 
                            document.querySelector('.categoria-activa')?.textContent || 
                            'Salón de Eventos';
                            
    // 1. Cargar Categoría / Plantilla Seleccionada
    // (Ajusta 'selectedCategory' o el ID/variable donde guardes la plantilla activa)
    const plantillaElement = document.getElementById('selectedCategoryName') || document.querySelector('.categoria-activa');
    const nombrePlantilla = plantillaElement ? (plantillaElement.textContent || plantillaElement.value) : 'Salón de Eventos'; // Valor por defecto si aplica

    const summaryPlantillaElement = document.getElementById('summaryPlantilla');
    if (summaryPlantillaElement) {
        summaryPlantillaElement.textContent = nombrePlantilla;
    }

    // 2. Cargar Nombre del Negocio
    const nombreNegocio = typeof businessNameInput !== 'undefined' && businessNameInput ? businessNameInput.value.trim() : '';
    const summaryNombreElement = document.getElementById('summaryNombre');
    if (summaryNombreElement) {
        summaryNombreElement.textContent = nombreNegocio || 'Sin especificar';
    }

    // 3. Cargar Colores
    if (typeof colorPrincipal !== 'undefined') {
        const color1El = document.getElementById('summaryColor1');
        if (color1El) color1El.style.backgroundColor = colorPrincipal;
    }
    if (typeof colorSecundario !== 'undefined') {
        const color2El = document.getElementById('summaryColor2');
        if (color2El) color2El.style.backgroundColor = colorSecundario;
    }

    // 4. Cargar Vista Previa del Logo
    const logoContainer = document.getElementById('summaryLogoContainer');
    if (logoContainer) {
        if (typeof logoDataUrl !== 'undefined' && logoDataUrl && logoDataUrl !== '') {
            logoContainer.innerHTML = `<img src="${logoDataUrl}" class="h-6 max-w-[80px] object-contain rounded border border-slate-200">`;
        } else {
            logoContainer.innerHTML = `<span class="text-slate-400 italic text-[11px]">Por defecto</span>`;
        }
    }

    // Mostrar el Modal
    modal.classList.remove('hidden');
}

// Cerrar Modal
function cerrarModalCheckout() {
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.classList.add('hidden');
}

// Envío por WhatsApp con resumen automático
function comprarPorWhatsApp() {
    const telefonoVentas = "526678477021"; // 👈 Tu número de WhatsApp aquí
    const nombre = businessNameInput ? businessNameInput.value.trim() : 'Mi Negocio';
    const dominio = document.getElementById('checkoutDominio')?.value.trim() || 'Por definir';

    const mensaje = `Hola! Quiero adquirir el Paquete Express 🚀%0A%0A` +
                    `📌 *Datos de mi pedido:*%0A` +
                    `• *Plantilla:* ${encodeURIComponent(plantilla)}%0A` +
                    `• *Negocio:* ${encodeURIComponent(nombre)}%0A` +
                    `• *Dominio deseado:* ${encodeURIComponent(dominio)}%0A` +
                    `• *Color 1:* ${encodeURIComponent(colorPrincipal)}%0A` +
                    `• *Color 2:* ${encodeURIComponent(colorSecundario)}%0A%0A` +
                    `Me gustaría pagar por transferencia bancaria / aclarar unas dudas.`;

    window.open(`https://wa.me/${telefonoVentas}?text=${mensaje}`, '_blank');
}

// Función al enviar el formulario con Tarjeta
function procesarPago(e) {
    e.preventDefault();
    alert('¡Procesando pago seguro! Aquí integrarás tu SDK de Stripe o Mercado Pago.');
}

async function validarDominioModal() {
    const inputDominio = document.getElementById('checkoutDominio');
    const statusText = document.getElementById('statusDominioModal');
    
    if (!inputDominio || !statusText) return;

    let dominio = inputDominio.value.trim().toLowerCase();

    // 1. Limpieza de protocolo y barras
    dominio = dominio.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];

    if (!dominio) {
        statusText.className = "text-[11px] mt-1 text-amber-600 block font-medium";
        statusText.textContent = "⚠️ Ingresa un nombre de dominio para verificar.";
        statusText.classList.remove('hidden');
        return;
    }

    // Si no especificó extensión, asumimos .com
    if (!dominio.includes('.')) {
        dominio += '.com';
        inputDominio.value = dominio;
    }

    // 2. Estado de carga
    statusText.className = "text-[11px] mt-1 text-slate-500 block animate-pulse";
    statusText.textContent = "🔍 Consultando disponibilidad...";
    statusText.classList.remove('hidden');

    try {
        let status = await consultarDNS(dominio);

        // Convertimos a Número para evitar fallos de tipo (string vs number)
        status = Number(status);

        // Status 3 (NXDOMAIN): El dominio NO existe en la red DNS => ¡Está LIBRE!
        if (status === 3) {
            statusText.className = "text-[11px] mt-1 text-emerald-600 font-bold block flex items-center gap-1";
            statusText.innerHTML = `<span>✅</span> ¡El dominio <b>${dominio}</b> está disponible!`;
        } 
        // Status 0 (NOERROR): Se encontraron registros DNS => Ya está OCUPADO
        else if (status === 0) {
            statusText.className = "text-[11px] mt-1 text-rose-500 font-medium block flex items-center gap-1";
            statusText.innerHTML = `<span>❌</span> El dominio <b>${dominio}</b> ya está registrado. Intenta con otro.`;
        } 
        else {
            // Si devuelve cualquier otro código no estándar
            statusText.className = "text-[11px] mt-1 text-amber-600 block";
            statusText.textContent = "⚠️ No pudimos validar este dominio específico. Lo confirmaremos por WhatsApp.";
        }

    } catch (error) {
        console.error("Error al verificar dominio:", error);
        statusText.className = "text-[11px] mt-1 text-amber-600 block";
        statusText.textContent = "⚠️ Servicio de consulta ocupado. Podrás confirmarlo post-compra.";
    }
}

// Función auxiliar con fallback (Cloudflare -> Google)
async function consultarDNS(dominio) {
    try {
        // Opción A: Cloudflare DoH
        const resCF = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(dominio)}&type=A`, {
            headers: { 'Accept': 'application/dns-json' }
        });
        if (resCF.ok) {
            const dataCF = await resCF.json();
            return dataCF.Status;
        }
    } catch (e) {
        console.warn("Cloudflare DNS falló, intentando con Google DNS...");
    }

    // Opción B: Google Public DNS (Fallback de respaldo)
    const resGoogle = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(dominio)}&type=A`);
    if (resGoogle.ok) {
        const dataGoogle = await resGoogle.json();
        return dataGoogle.Status;
    }

    throw new Error("No se pudo consultar ningún servidor DNS.");
}


document.addEventListener('DOMContentLoaded', () => {
    const cardNumberInput = document.getElementById('cardNumber');
    const cardExpiryInput = document.getElementById('cardExpiry');

    // 1. Formateador de Número de Tarjeta (Agrupa de 4 en 4)
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', (e) => {
            // Eliminar todo lo que no sea un número
            let value = e.target.value.replace(/\D/g, '');
            
            // Limitar a máximo 16 dígitos
            value = value.substring(0, 16);
            
            // Insertar un espacio cada 4 dígitos
            const formatted = value.match(/.{1,4}/g)?.join(' ') || '';
            
            e.target.value = formatted;
        });
    }

    // 2. Formateador de Vencimiento (Agrega la diagonal MM/AA)
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', (e) => {
            // Eliminar todo lo que no sea un número
            let value = e.target.value.replace(/\D/g, '');
            
            // Limitar a 4 dígitos (2 para mes, 2 para año)
            value = value.substring(0, 4);

            // Si hay más de 2 dígitos, insertar la diagonal '/'
            if (value.length > 2) {
                e.target.value = `${value.substring(0, 2)}/${value.substring(2)}`;
            } else {
                e.target.value = value;
            }
        });
    }
});