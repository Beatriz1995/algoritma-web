const listaPaquetes = [
    {
        id: 'restaurante',
        nombre: 'Express',
        tag: 'Plan Esencial',
        emoji: '🚀',
        descripcion: 'Páginas planas, limpias y directas al grano. Ideales para lanzar tu presencia digital rápido.',
        bgClass: 'bg-amber-600',
        textClass: 'text-amber-600',
        badgeHtml: '<span class="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md font-mono">Plan Esencial</span>',
        cardStyles: 'bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-300',
        buttonStyles: 'w-full bg-slate-50 hover:bg-slate-100 text-slate-800 text-sm py-3.5 px-4 rounded-xl font-semibold transition-colors flex justify-center items-center gap-2 border border-slate-200',
        caracteristicas: [
            'Página web de una sola sección (Landing Page)',
            'Información del negocio estructurada',
            '<strong>Botón de acción directo a WhatsApp</strong>',
            'Enlaces a redes sociales y mapa interactivo'
        ]
    },
    {
        id: 'corporate',
        nombre: 'Profesional',
        tag: 'Interactivo + Gestión',
        emoji: '💼',
        descripcion: 'El sitio perfecto para ofrecer servicios. Una cara impecable al público y un potente gestor interno.',
        bgClass: 'bg-blue-600',
        textClass: 'text-blue-600',
        badgeHtml: '<span class="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-sm">MÁS RECOMENDADO</span><span class="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md font-mono">Interactivo + Gestión</span>',
        cardStyles: 'bg-white rounded-3xl border-2 border-indigo-600 shadow-xl p-8 flex flex-col justify-between relative transform lg:-translate-y-4 transition-all duration-300',
        buttonStyles: 'w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-3.5 px-4 rounded-xl font-semibold shadow-lg shadow-indigo-100 transition-all flex justify-center items-center gap-2',
        caracteristicas: [
            'Todo lo incluido en el paquete <strong>Express</strong>',
            '<span class="text-slate-900 font-medium">📆 Sistema de reservación y agendamiento de citas en línea</span>',
            'Notificaciones por correo automáticas (Citas, contacto)',
            '<strong class="text-indigo-600">Panel Administrativo Privado:</strong> Gestiona tus citas, cambia fotos de la galería y edita textos fácilmente'
        ]
    },
    {
        id: 'fitness',
        nombre: 'Business',
        tag: 'E-Commerce Completo',
        emoji: '💳',
        descripcion: 'Diseñado para negocios listos para vender productos físicos o digitales a gran escala en internet.',
        bgClass: 'bg-emerald-600',
        textClass: 'text-emerald-600',
        badgeHtml: '<span class="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md font-mono">E-Commerce Completo</span>',
        cardStyles: 'bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-300',
        buttonStyles: 'w-full bg-slate-50 hover:bg-slate-100 text-slate-800 text-sm py-3.5 px-4 rounded-xl font-semibold transition-colors flex justify-center items-center gap-2 border border-slate-200',
        caracteristicas: [
            'Todo lo incluido en el paquete <strong>Profesional</strong>',
            '<span class="text-slate-900 font-medium">🛒 Tienda en línea con Carrito de compras integrado</span>',
            'Pasarela de pagos segura (Tarjetas de Crédito/Débito, PayPal)',
            'Panel administrativo con control de inventarios, stock y envíos'
        ]
    }
];