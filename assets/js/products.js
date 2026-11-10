/* ==========================================================================
   CATÁLOGO IP7 × GRUPO VARDÍ — FUENTE DE VERDAD
   Para agregar/quitar productos solo se edita este archivo.
   - BRANDS:     marcas del grupo (orden en que aparecen en el sitio)
   - COMPANIES:  razones sociales y qué marcas opera cada una
   - CATEGORIES: usos / ocasiones (filtro del catálogo)
   - PRODUCTS:   productos propuestos (fotos y referencias de ip7.cataprom.com)
   - KITS:       combinaciones sugeridas (items = ids de PRODUCTS)
   ========================================================================== */

const DEFAULT_MIN_QTY = 20;

const BRANDS = [
  {
    id: "nissan",
    name: "Nissan",
    logo: "assets/img/marcas/nissan.svg",
    photo: "assets/img/vehiculos/nissan.webp",
    photoPos: "right center",
    company: "dinissan",
    tagline: "Qashqai e-POWER · Nissan Intelligent Mobility",
    kind: "Automóviles, SUV, e-POWER y pick-ups",
    models: ["Qashqai e-POWER", "Kait", "Versa", "Sentra", "X-Trail e-POWER", "Frontier"],
    url: "https://www.nissan.com.co/",
    color: "#c3002f",
  },
  {
    id: "dinissan",
    name: "Dinissan",
    logo: "assets/img/marcas/dinissan.png",
    photo: "assets/img/vehiculos/dinissan.webp",
    noHero: true,
    company: "dinissan",
    tagline: "Más que una empresa, una familia",
    kind: "Distribución, repuestos y posventa · 66 años en Colombia",
    models: ["Nissan", "New Holland", "Unicarriers", "Posventa"],
    url: "https://dinissan.com.co/",
    color: "#1b3a6b",
  },
  {
    id: "changan",
    name: "Changan",
    logo: "assets/img/marcas/changan-blanco.webp",
    photo: "assets/img/vehiculos/changan.webp",
    company: "comautomotriz",
    tagline: "Vive inteligente · NEVO Q05 100% eléctrica",
    kind: "SUV, eléctricos y vehículos comerciales",
    models: ["NEVO Q05", "Hunter", "CS15", "CS35 Plus", "CS55 Plus", "Van Cargo"],
    url: "https://changan.com.co/nevo-q05/",
    color: "#0b3b8c",
    electric: true,
  },
  {
    id: "deepal",
    name: "Deepal",
    logo: "assets/img/marcas/deepal.svg",
    photo: "assets/img/vehiculos/deepal.webp",
    photoFit: "contain",
    company: "comautomotriz",
    tagline: "Toca el futuro, vive Deepal",
    kind: "Eléctricos e híbridos de rango extendido",
    models: ["S07 MAX", "S07 E-MAX", "S05", "G318"],
    url: "https://www.deepalcolombia.com.co/",
    color: "#e5622a",
    electric: true,
  },
  {
    id: "chery",
    name: "Chery",
    logo: "assets/img/marcas/chery-blanco.svg",
    photo: "assets/img/vehiculos/chery.webp",
    company: "autovardi",
    tagline: "Así se ve la nueva generación de movilidad",
    kind: "SUV híbridas y 100% eléctricas",
    models: ["Tiggo 4 CSH", "Tiggo 7 CSH", "Tiggo 8 CSH", "Tiggo 9 CSH", "iCAR 03", "E5"],
    url: "https://www.chery.com.co/",
    color: "#a6192e",
    electric: true,
  },
  {
    id: "mazda",
    name: "Mazda Vardí",
    logo: "assets/img/marcas/mazda.svg",
    logoLabel: "Mazda",
    photo: "assets/img/vehiculos/mazda.webp",
    photoFit: "contain",
    company: "autovardi",
    tagline: "La maestría se conduce",
    kind: "Concesionario Mazda · Costa Caribe, Chía y Popayán",
    models: ["CX-30", "CX-50", "CX-90", "Mazda 3"],
    url: "https://www.mazdavardi.com.co/",
    color: "#101010",
  },
  {
    id: "farizon",
    name: "Farizon",
    logo: "assets/img/marcas/farizon.png",
    photo: "assets/img/vehiculos/farizon.webp",
    company: "autovardi",
    tagline: "Impulsados por el futuro",
    kind: "Vehículos comerciales 100% eléctricos (Geely)",
    models: ["Van V6E", "Super Van SV11", "Camión H9E"],
    url: "https://farizon.com.co/",
    color: "#0a6cff",
    electric: true,
  },
  {
    id: "seguros",
    name: "Vardí Seguros",
    logo: "assets/img/marcas/vardiseguros.svg",
    photo: "",
    company: "seguros",
    tagline: "Conduce tranquilo, nosotros nos encargamos del resto",
    kind: "Agencia de seguros: autos, empresas y personas",
    models: ["Autos", "Motos", "Pyme", "Hogar", "Vida", "Viajes"],
    url: "https://www.vardiseguros.com.co/",
    color: "#00205b",
  },
];

/* Razones sociales. `confirm:true` = inferido de las páginas, falta confirmar con el cliente. */
const COMPANIES = [
  {
    id: "dinissan",
    name: "Distribuidora Nissan S.A.",
    short: "Dinissan",
    brands: ["nissan", "dinissan"],
    note: "Importación, comercialización, repuestos y seguros de vehículos Nissan.",
  },
  {
    id: "comautomotriz",
    name: "Com Automotriz S.A.",
    short: "Com Automotriz",
    brands: ["changan", "deepal"],
    note: "Representante de Changan y Deepal en Colombia · NIT 830.045.752-5.",
  },
  {
    id: "autovardi",
    name: "Autovardi S.A.S.",
    short: "Autovardi",
    brands: ["chery", "mazda", "farizon"],
    note: "Farizon (confirmado). Chery y Mazda Vardí: sus políticas de datos son de Autovardi.",
    confirm: true,
  },
  {
    id: "seguros",
    name: "Vardí Agencia de Seguros",
    short: "Vardí Seguros",
    brands: ["seguros"],
    note: "Agencia de seguros del Grupo Vardí, trabaja con 12 aseguradoras.",
  },
];

const CATEGORIES = [
  { id: "entrega", name: "Entrega de vehículo", emoji: "🔑", color: "#fff6c2" },
  { id: "carretera", name: "Seguridad en carretera", emoji: "🛟", color: "#ffe2d1" },
  { id: "electrica", name: "Movilidad eléctrica y tecnología", emoji: "⚡", color: "#dcefff" },
  { id: "clima", name: "Sol y lluvia", emoji: "☂️", color: "#e3f6ea" },
  { id: "viaje", name: "Viaje y test drive", emoji: "🧭", color: "#efe6ff" },
  { id: "equipo", name: "Equipo comercial y posventa", emoji: "🧰", color: "#e9edf5" },
  { id: "pines", name: "Pines y llaveros a la medida", emoji: "📌", color: "#ffe6ef" },
  { id: "marroquineria", name: "Marroquinería", emoji: "👜", color: "#f3e7da" },
  { id: "textiles", name: "Textiles", emoji: "👕", color: "#e2f0ff" },
  { id: "litografia", name: "Litografía", emoji: "📒", color: "#eef7d9" },
];

const ALL = ["nissan", "dinissan", "changan", "deepal", "chery", "mazda", "farizon", "seguros"];
const EV = ["changan", "deepal", "chery", "farizon"];
const DEALERS = ["nissan", "dinissan", "changan", "deepal", "chery", "mazda", "farizon"];
const PASSENGER = ["nissan", "dinissan", "changan", "deepal", "chery", "mazda"];

/* why = por qué le sirve al Grupo Vardí (se muestra en la tarjeta) */
const PRODUCTS = [
  // --- Entrega de vehículo ---
  { id: "ml-188", ref: "ML-188", name: "Llavero Car II", category: "entrega", brands: PASSENGER, colors: "Silver:#B0BEC5", why: "El primer regalo con las llaves del carro nuevo. Grabado láser con el logo de la marca.", cp: "ML-188/llavero-car-ii" },
  { id: "ll-104", ref: "LL-104", name: "Llavero Destapador Car", category: "entrega", brands: PASSENGER, colors: "Azul:#1E88E5|Rojo:#E53935|Silver:#B0BEC5", why: "Silueta de carro en metal, ideal para entregas masivas y ferias.", cp: "LL-104/llavero-destapador-car" },
  { id: "he-216", ref: "HE-216", name: "Metro Llavero Car", category: "entrega", brands: PASSENGER.concat("seguros"), colors: "Azul:#1E88E5|Blanco:#FFFFFF|Negro:#000000|Rojo:#E53935", why: "Llavero útil y económico para activaciones en vitrina y test drives.", cp: "HE-216/metro-llavero-car" },
  { id: "so-74", ref: "SO-74", name: "Protector Solar para Carro Sunshade", category: "entrega", brands: PASSENGER, colors: "Negro:#000000", why: "Parasol tipo sombrilla: se queda en el carro y la marca se ve todos los días.", cp: "SO-74/protector-solar-para-carro-sunshade" },
  { id: "ho-235", ref: "HO-235", name: "Aspiradora para Carro", category: "entrega", brands: ["nissan", "chery", "mazda", "changan", "deepal"], colors: "Negro:#000000", why: "Regalo premium para el cliente que estrena o para fidelizar en posventa.", cp: "HO-235/aspiradora-para-carro" },
  { id: "cp-203", ref: "CP-203", name: "Toalla en Microfibra Multiusos", category: "entrega", brands: PASSENGER.concat("seguros"), colors: "Azul:#1E88E5|Gris:#9E9E9E", why: "Para limpiar pantalla, tablero y vidrios. Incluir en el kit de entrega.", cp: "CP-203/toalla-en-microfibra-multiusos" },

  // --- Seguridad en carretera ---
  { id: "he-328", ref: "HE-328", name: "Luz de Emergencia V16 Magnética", category: "carretera", brands: ALL, colors: "Naranja:#FB8C00", why: "Señal de emergencia magnética. Perfecta para Vardí Seguros: prevención con marca.", cp: "HE-328/luz-de-emergencia-v16-magn-tica" },
  { id: "he-259", ref: "HE-259", name: "Set de Herramientas Truck", category: "carretera", brands: ["farizon", "dinissan", "changan", "seguros"], colors: "Negro:#000000", why: "Estuche en forma de camión: ideal para Farizon y líneas comerciales.", cp: "HE-259/set-de-herramientas-truck" },
  { id: "he-294", ref: "HE-294", name: "Set de Herramientas Big Tire", category: "carretera", brands: PASSENGER, colors: "Negro:#000000", why: "Herramientas dentro de una llanta. Muy recordable en entregas y talleres.", cp: "HE-294/set-de-herramientas-big-tire" },
  { id: "he-280", ref: "HE-280", name: "Set de Herramientas con Lámpara LED", category: "carretera", brands: ALL, colors: "Negro:#000000", why: "Kit de carretera compacto con lámpara para la guantera.", cp: "HE-280/set-de-herramientas-con-l-mpara-led---oferta" },
  { id: "il-139", ref: "IL-139", name: "Linterna Cob Power", category: "carretera", brands: ALL, colors: "Negro:#000000", why: "Linterna de trabajo para emergencias o cambio de llanta de noche.", cp: "IL-139/linterna-cob-power" },
  { id: "il-128", ref: "IL-128", name: "Linterna Dinamo con Radio", category: "carretera", brands: ["seguros", "farizon", "dinissan"], colors: "Negro:#000000", why: "Funciona sin pilas (dinamo). Mensaje de prevención para asegurados.", cp: "IL-128/linterna-dinamo-con-radio" },

  // --- Movilidad eléctrica y tecnología ---
  { id: "te-661", ref: "TE-661", name: "Cable Multicargador Eco Fast 65w", category: "electrica", brands: EV, colors: "Gris:#9E9E9E", why: "Carga rápida para celular y portátil: habla el idioma de las marcas eléctricas.", cp: "TE-661/cable-multicargador-eco-fast-65w" },
  { id: "te-595", ref: "TE-595", name: "Cargador para Carro Eco", category: "electrica", brands: PASSENGER, colors: "Blanco:#FFFFFF", why: "Cargador USB para el carro en material ecológico.", cp: "TE-595/cargador-para-carro-eco" },
  { id: "te-536", ref: "TE-536", name: "Soporte Magnético para Móviles Bamboo", category: "electrica", brands: ["deepal", "changan", "chery", "mazda"], colors: "Natural / Bambú:#EFEBE9", why: "Soporte para rejilla en bambú: tecnología + sostenibilidad, ideal para eléctricos.", cp: "TE-536/soporte-magn-tico-para-m-viles-bamboo" },
  { id: "te-161", ref: "TE-161", name: "Soporte Magnético para Móviles", category: "electrica", brands: PASSENGER, colors: "Azul:#1E88E5|Negro:#000000", why: "Soporte de celular para el carro, económico para volumen.", cp: "TE-161/soporte-magn-tico-para-m-viles" },
  { id: "te-594", ref: "TE-594", name: "Cargador Inalámbrico Mágnet 3-1 Eco", category: "electrica", brands: ["deepal", "chery", "mazda", "nissan"], colors: "Natural / Bambú:#EFEBE9", why: "Regalo ejecutivo para clientes de gama alta (Tiggo 9, CX-90, S07).", cp: "TE-594/cargador-inal-mbrico-m-gnet-3-1-eco" },
  { id: "te-08-1", ref: "TE-08-1", name: "Power Bank con Botón 2200mah", category: "electrica", brands: ALL, colors: "Azul:#1E88E5|Negro:#000000|Silver:#B0BEC5", why: "Batería de respaldo con logo. Funciona en ferias, lanzamientos y test drives.", cp: "TE-08-1/pila-recargable-power-bank-con-bot-n-2200mah" },
  { id: "te-559", ref: "TE-559", name: "Pila Recargable Llavero 1200 mAh", category: "electrica", brands: EV, colors: "Negro:#000000", why: "Llavero + batería de emergencia: perfecto para lanzamientos de eléctricos.", cp: "TE-559/pila-recargable-llavero-1200-mah" },
  { id: "te-652", ref: "TE-652", name: "Multicargador con Puertos Fast 35w", category: "electrica", brands: ["deepal", "changan", "chery", "farizon", "nissan"], colors: "Negro:#000000", why: "Cargador de pared rápido para clientes y asesores.", cp: "TE-652/multicargador-con-puertos-fast-35w" },
  { id: "te-442", ref: "TE-442", name: "Audífonos Bluetooth Tron", category: "electrica", brands: ALL, colors: "Negro:#000000", why: "Premio para concursos de ventas o incentivo de cierre.", cp: "TE-442/aud-fonos-bluetooth-tron" },

  // --- Sol y lluvia ---
  { id: "so-44-2", ref: "SO-44-2", name: "Paraguas Brook Ergo 27\" Reflectivo", category: "clima", brands: ALL, colors: "Silver:#B0BEC5", why: "Paraguas grande reflectivo: visibilidad y seguridad al bajarse del carro.", cp: "SO-44-2/paraguas-brook-ergo-27-reflectivo---oferta" },
  { id: "va-109", ref: "VA-109", name: "Protector Solar para Carro", category: "clima", brands: PASSENGER.concat("seguros"), colors: "Gris:#9E9E9E", why: "Parasol plegable de volumen, para campañas de verano o la Costa (Mazda Vardí).", cp: "VA-109/protector-solar-para-carro" },
  { id: "va-244", ref: "VA-244", name: "Llavero con Capa", category: "clima", brands: ["seguros", "dinissan", "farizon", "changan"], colors: "Azul:#1E88E5|Blanco:#FFFFFF|Negro:#000000|Rojo:#E53935", why: "Impermeable de bolsillo en llavero, económico para eventos masivos.", cp: "VA-244/llavero-con-capa" },
  { id: "cap-34", ref: "CAP-34", name: "Gorra Taslon Urban Travel", category: "textiles", brands: ALL, colors: "Azul Oscuro:#0A3D7A|Azul Royal:#1E88E5|Negro:#000000|Rojo:#E53935", why: "Gorra técnica para eventos al aire libre y test drives.", cp: "CAP-34/gorra-taslon-urban-travel" },

  // --- Viaje y test drive ---
  { id: "mu-355", ref: "MU-355", name: "Termo Metálico Calypso Chili 750ml", category: "viaje", brands: ALL, colors: "Gris Oscuro:#9E9E9E", why: "Termo de calidad para clientes y colaboradores. Cabe en el portavasos.", cp: "MU-355/termo-met-lico-calypso-chili-750ml" },
  { id: "mu-380", ref: "MU-380", name: "Mug Metálico Odín Urban Travel 450ml", category: "viaje", brands: ALL, colors: "Negro:#000000", why: "Mug de viaje antiderrame para el café de la mañana en el carro.", cp: "MU-380/mug-met-lico-od-n-urban-travel-450ml" },
  { id: "va-603", ref: "VA-603", name: "Nevera Cooler Hexagon", category: "viaje", brands: ["mazda", "chery", "nissan", "changan", "deepal"], colors: "Azul:#1E88E5|Negro:#000000", why: "Nevera plegable que también es butaco: perfecta para la SUV y los paseos.", cp: "VA-603/nevera-cooler-hexagon" },
  { id: "va-1256", ref: "VA-1256", name: "Organizador Firstclass", category: "marroquineria", brands: PASSENGER.concat("seguros"), colors: "Negro:#000000", why: "Para guardar manual, SOAT y documentos del vehículo.", cp: "VA-1256/organizador-firstclass" },
  { id: "cp-387", ref: "CP-387", name: "Kit de Aseo Travel", category: "viaje", brands: ["seguros", "mazda", "chery"], colors: "Natural:#EFEBE9", why: "Detalle útil para seguros de viaje o clientes de ruta.", cp: "CP-387/kit-de-aseo-travel" },

  // --- Equipo comercial y posventa ---
  { id: "va-1118", ref: "VA-1118", name: "Morral Backpack Bizz 2.0", category: "equipo", brands: ALL, colors: "Negro:#000000", why: "Morral ejecutivo para asesores comerciales de las +40 ciudades del grupo.", cp: "VA-1118/morral-backpack-bizz-2-0" },
  { id: "va-643", ref: "VA-643", name: "Trolley Morral Backpack Urban Travel", category: "equipo", brands: ALL, colors: "Negro-Gris:#000000", why: "Para gerentes y equipo que viaja entre vitrinas.", cp: "VA-643/trolley-morral-backpack-urban-travel" },
  { id: "va-996", ref: "VA-996", name: "Funda Portalaptop RPET", category: "equipo", brands: ALL, colors: "Negro:#000000", why: "Funda en material reciclado para el equipo administrativo.", cp: "VA-996/funda-portalaptop-rpet" },
  { id: "cap-22", ref: "CAP-22", name: "Gorra Trucker", category: "textiles", brands: DEALERS, colors: "Blanco-Azul Oscuro:#0A3D7A|Blanco-Rojo:#E53935|Blanco-Negro:#000000|Blanco-Amarillo:#FDD835", why: "Dotación para técnicos de taller, alistamiento y eventos.", cp: "CAP-22/gorra-trucker" },
  { id: "il-155", ref: "IL-155", name: "Linterna Recargable Neck", category: "equipo", brands: ["dinissan", "farizon", "nissan", "changan"], colors: "Blanco:#FFFFFF", why: "Linterna de cuello manos libres para técnicos de posventa.", cp: "IL-155/linterna-recargable-neck" },
  { id: "il-145", ref: "IL-145", name: "Llavero Linterna Lamp", category: "equipo", brands: ALL, colors: "Azul:#1E88E5|Negro:#000000", why: "Detalle económico para volumen: ferias, Salón del Automóvil, open house.", cp: "IL-145/llavero-linterna-lamp" },
  { id: "va-893", ref: "VA-893", name: "Sporty Bag Reflectiva Security", category: "equipo", brands: ALL, colors: "Silver:#B0BEC5", why: "Tula reflectiva para entregar material en eventos y carreras.", cp: "VA-893/sporty-bag-reflectiva-security" },
  { id: "te-658", ref: "TE-658", name: "Mini Aspiradora Lautus", category: "equipo", brands: PASSENGER, colors: "Negro:#000000", why: "Para el alistamiento del vehículo antes de la entrega o como premio.", cp: "TE-658/mini-aspiradora-lautus" },
];

const KITS = [
  {
    id: "kit-estreno",
    name: "Kit Estreno",
    tagline: "Para entregar con las llaves del vehículo nuevo",
    brands: PASSENGER,
    items: ["ml-188", "so-74", "cp-203", "te-595"],
  },
  {
    id: "kit-electrico",
    name: "Kit Eléctrico",
    tagline: "Lanzamientos NEVO, Deepal, iCAR y Farizon",
    brands: EV,
    items: ["te-661", "te-536", "te-559", "mu-355"],
  },
  {
    id: "kit-carretera",
    name: "Kit Carretera Segura",
    tagline: "Prevención con marca para asegurados y flotas",
    brands: ["seguros", "farizon", "dinissan"],
    items: ["he-328", "he-280", "il-139", "va-244"],
  },
  {
    id: "kit-asesor",
    name: "Kit Asesor Vardí",
    tagline: "Dotación para el equipo comercial y de posventa",
    brands: ALL,
    items: ["va-1118", "mu-380", "cap-34", "te-08-1"],
  },
];

/* ---- Productos de ip7.cataprom.com (sin marca, inventario 2026-11-04) ---- */
PRODUCTS.push(
  { id: "ml-412", ref: "ML-412", name: "Llavero Metálico ML-412", category: "entrega", brands: PASSENGER, colors: "Gris Oscuro:#9E9E9E", why: "Llavero metálico para entregar con las llaves del vehículo.", cp: "ML-412/llavero-ml-412" },
  { id: "ml-217", ref: "ML-217", name: "Llavero Metálico Silver ML-217", category: "entrega", brands: PASSENGER, colors: "Silver-Negro:#B0BEC5", why: "Llavero metálico plateado, ideal para grabado láser del logo.", cp: "ML-217/llavero-silver-ml-217" },
  { id: "ml-405", ref: "ML-405", name: "Llavero Metálico ML-405", category: "entrega", brands: PASSENGER, colors: "Negro:#000000", why: "Llavero metálico de entrega premium.", cp: "ML-405/llavero-ml-405" },
  { id: "cp-59", ref: "CP-59", name: "Set de Toallitas Multiusos", category: "entrega", brands: ALL, colors: "Blanco:#FFFFFF", why: "Toallitas multiusos para limpiar tablero, pantalla y vidrios.", cp: "CP-59/set-de-toallitas-multiusos" },
  { id: "cp-193", ref: "CP-193", name: "Paños Húmedos Antibacterial Klean 60und", category: "entrega", brands: ALL, colors: "Azul:#1E88E5|Blanco:#FFFFFF", why: "Paños húmedos antibacteriales para el carro y la vitrina.", cp: "CP-193/pa-os-h-medos-antibacterial-klean-60und" },
  { id: "he-239", ref: "HE-239", name: "Kit de Carretera Mustang", category: "carretera", brands: ALL, colors: "Negro:#000000", why: "Kit de emergencia: triángulos, chaleco reflectivo, cables y herramientas.", cp: "HE-239/set-de-herramientas-mustang" },
  { id: "he-173", ref: "HE-173", name: "Set de Herramientas Neumatic", category: "carretera", brands: DEALERS, colors: "Silver-Negro:#B0BEC5", why: "Set de herramientas con medidor para revisar llantas.", cp: "HE-173/set-de-herramientas-neumatic" },
  { id: "he-304", ref: "HE-304", name: "Herramientero Denby", category: "carretera", brands: DEALERS, colors: "Negro:#000000", why: "Herramientero completo para el baúl.", cp: "HE-304/herramientero-denby" },
  { id: "he-301", ref: "HE-301", name: "Martillo con Navaja Eco", category: "carretera", brands: ALL, colors: "Natural:#EFEBE9", why: "Martillo con navaja: útil en emergencias de carretera.", cp: "HE-301/martillo-con-navaja-eco" },
  { id: "he-332", ref: "HE-332", name: "Set de Destornilladores Multy", category: "carretera", brands: ALL, colors: "Negro:#000000", why: "Destornilladores intercambiables para arreglos rápidos.", cp: "HE-332/set-de-destornilladores-multy" },
  { id: "he-281", ref: "HE-281", name: "Set de Destornilladores Pen con Linterna LED", category: "carretera", brands: ALL, colors: "Negro:#000000|Silver:#B0BEC5", why: "Bolígrafo destornillador con linterna LED.", cp: "HE-281/set-de-destornilladores-pen-con-linterna-led" },
  { id: "il-159", ref: "IL-159", name: "Linterna Recargable Head", category: "carretera", brands: ALL, colors: "Gris:#9E9E9E", why: "Linterna de cabeza manos libres para cambiar una llanta de noche.", cp: "IL-159/linterna-recargable-head" },
  { id: "il-158", ref: "IL-158", name: "Linterna Recargable Ultan", category: "carretera", brands: ALL, colors: "Negro:#000000", why: "Linterna recargable potente para el baúl.", cp: "IL-158/linterna-recargable-ultan" },
  { id: "il-163", ref: "IL-163", name: "Linterna Utility", category: "carretera", brands: ALL, colors: "Gris-Naranja:#9E9E9E", why: "Linterna utilitaria para emergencias.", cp: "IL-163/linterna-utility" },
  { id: "il-71", ref: "IL-71", name: "Linterna de 9 Leds Flynt", category: "carretera", brands: ALL, colors: "Naranja:#FB8C00|Rojo:#E53935", why: "Linterna de 9 LED económica para volumen.", cp: "IL-71/linterna-de-9-leds-flynt" },
  { id: "te-490", ref: "TE-490", name: "Speaker Bluetooth con Luz Emergency", category: "carretera", brands: ALL, colors: "Negro-Bambú:#000000", why: "Parlante Bluetooth con luz de emergencia.", cp: "TE-490/speaker-bluetooth-con-luz-emergency" },
  { id: "te-585", ref: "TE-585", name: "Pila Recargable Flashlight 5000 Mah", category: "electrica", brands: ALL, colors: "Silver:#B0BEC5", why: "Batería de 5000 mAh con linterna incorporada.", cp: "TE-585/pila-recargable-flashlight-5000-mah" },
  { id: "te-363-1", ref: "TE-363-1", name: "Pila Recargable en Bamboo Nipax 5000mah II", category: "electrica", brands: EV, colors: "Madera:#8D6E63", why: "Batería en bambú de 5000 mAh: tecnología sostenible.", cp: "TE-363-1/pila-recargable-en-bamboo-nipax-5000mah-ii" },
  { id: "te-112-1", ref: "TE-112-1", name: "Pila Recargable en Aluminio 4000mah", category: "electrica", brands: ALL, colors: "Azul:#1E88E5", why: "Batería en aluminio de 4000 mAh, regalo ejecutivo.", cp: "TE-112-1/pila-recargable-en-aluminio-4000mah" },
  { id: "te-617", ref: "TE-617", name: "Cable Multicargador Steffen", category: "electrica", brands: DEALERS, colors: "Negro:#000000|Silver:#B0BEC5", why: "Cable multicargador para todos los celulares del carro.", cp: "TE-617/cable-multicargador-steffen---oferta" },
  { id: "te-566", ref: "TE-566", name: "Cable Multicargador 3-1 Bamboo", category: "electrica", brands: EV, colors: "Natural / Bambú:#EFEBE9", why: "Cable 3 en 1 en bambú, ideal para marcas eléctricas.", cp: "TE-566/cable-multicargador-3-1-bamboo" },
  { id: "te-579", ref: "TE-579", name: "Soporte para Móviles Jet", category: "electrica", brands: PASSENGER, colors: "Negro:#000000", why: "Soporte de celular para usar el GPS en el carro.", cp: "TE-579/soporte-para-m-viles-jet" },
  { id: "te-477-1", ref: "TE-477-1", name: "Soporte para Móviles Nixon Bamboo", category: "electrica", brands: EV, colors: "Blanco:#FFFFFF|Negro:#000000", why: "Soporte de celular en bambú.", cp: "TE-477-1/soporte-para-m-viles-nixon-bamboo" },
  { id: "te-682", ref: "TE-682", name: "Soporte en Silicona Flexible Roll", category: "electrica", brands: ALL, colors: "Azul:#1E88E5|Blanco:#FFFFFF|Gris:#9E9E9E|Negro:#000000|Rojo:#E53935", why: "Soporte flexible en silicona para celular.", cp: "TE-682/soporte-en-silicona-flexible-roll" },
  { id: "te-573", ref: "TE-573", name: "Cargador Inalámbrico Multifunción", category: "electrica", brands: ALL, colors: "Negro:#000000", why: "Cargador inalámbrico multifunción para escritorio de asesores.", cp: "TE-573/cargador-inal-mbrico-multifunci-n" },
  { id: "te-494", ref: "TE-494", name: "Speaker Bluetooth Mack", category: "electrica", brands: ALL, colors: "Bambú-Negro:#C6A46A", why: "Parlante Bluetooth para eventos y premios.", cp: "TE-494/speaker-bluetooth-mack" },
  { id: "te-591", ref: "TE-591", name: "Speaker Bluetooth Alden Eco", category: "electrica", brands: EV, colors: "Natural / Bambú:#EFEBE9", why: "Parlante Bluetooth ecológico.", cp: "TE-591/speaker-bluetooth-alden-eco---oferta" },
  { id: "so-84", ref: "SO-84", name: "Paraguas Autolight 23\" Urban Travel", category: "clima", brands: ALL, colors: "Negro:#000000", why: "Paraguas automático: se abre al bajarse del carro.", cp: "SO-84/paraguas-autolight-23-urban-travel" },
  { id: "so-08", ref: "SO-08", name: "Paraguas Golf II 30\"", category: "clima", brands: ALL, colors: "Azul Oscuro:#0A3D7A|Azul Royal:#1E88E5|Blanco:#FFFFFF|Negro:#000000|Rojo:#E53935|Verde:#43A047", why: "Paraguas golf de 30 pulgadas para vitrinas y eventos.", cp: "SO-08/paraguas-golf-ii-30" },
  { id: "so-71", ref: "SO-71", name: "Paraguas President 30\"", category: "clima", brands: ALL, colors: "Azul Royal:#1E88E5|Negro:#000000", why: "Paraguas grande ejecutivo para entregas de vehículo.", cp: "SO-71/paraguas-president-30" },
  { id: "so-89", ref: "SO-89", name: "Paraguas Easyroll 23\" Urban Travel", category: "clima", brands: ALL, colors: "Negro-Gris:#000000", why: "Paraguas compacto que cabe en la puerta del carro.", cp: "SO-89/paraguas-easyroll-23-urban-travel" },
  { id: "so-88", ref: "SO-88", name: "Mini Paraguas Super Light 21\" Urban Travel", category: "clima", brands: ALL, colors: "Gris:#9E9E9E|Negro:#000000", why: "Mini paraguas liviano para la guantera.", cp: "SO-88/mini-paraguas-super-light-21-urban-travel" },
  { id: "va-382", ref: "VA-382", name: "Poncho PVC con Estuche", category: "clima", brands: ALL, colors: "Azul Rey:#1E88E5|Blanco:#FFFFFF|Negro:#000000", why: "Poncho impermeable en estuche, económico para volumen.", cp: "VA-382/poncho-pvc-con-estuche" },
  { id: "va-293", ref: "VA-293", name: "Abrigo Impermeable", category: "textiles", brands: ALL, colors: "Azul:#1E88E5|Blanco Transparente:#FFFFFF|Negro:#000000", why: "Abrigo impermeable para técnicos y eventos al aire libre.", cp: "VA-293/abrigo-impermeable" },
  { id: "te-623", ref: "TE-623", name: "Estuche para Móviles Flex Waterproof", category: "clima", brands: ALL, colors: "Negro:#000000", why: "Estuche impermeable para el celular.", cp: "TE-623/estuche-para-m-viles-flex-waterproof" },
  { id: "cap-11", ref: "CAP-11", name: "Gorra Béisbol", category: "textiles", brands: ALL, colors: "Amarillo:#FDD835|Azul Oscuro:#0A3D7A|Azul Royal:#1E88E5|Khaki:#C3B091|Negro:#000000|Rojo:#E53935|Verde:#43A047", why: "Gorra béisbol clásica para eventos y dotación.", cp: "CAP-11/gorra-b-isbol" },
  { id: "cap-26", ref: "CAP-26", name: "Gorra Mesh", category: "textiles", brands: ALL, colors: "Azul Oscuro:#0A3D7A|Azul Royal:#1E88E5|Negro:#000000|Rojo:#E53935|Verde:#43A047", why: "Gorra mesh fresca para activaciones en vitrina.", cp: "CAP-26/gorra-mesh" },
  { id: "cap-33", ref: "CAP-33", name: "Visera Trucker", category: "textiles", brands: ALL, colors: "Azul Oscuro:#0A3D7A|Azul Royal:#1E88E5|Negro:#000000|Rojo:#E53935|Verde:#43A047", why: "Visera para eventos al sol y test drives.", cp: "CAP-33/visera-trucker" },
  { id: "mu-443", ref: "MU-443", name: "Mug Metálico Camper Urban Travel 1100 Ml", category: "viaje", brands: ALL, colors: "Blanco:#FFFFFF|Negro:#000000", why: "Mug térmico de 1,1 litros para viajes largos.", cp: "MU-443/mug-met-lico-camper-urban-travel-1100-ml" },
  { id: "mu-498", ref: "MU-498", name: "Mug Metálico Brinox Urban Travel 500ml", category: "viaje", brands: ALL, colors: "Blanco:#FFFFFF|Negro:#000000", why: "Mug metálico para el café en el carro.", cp: "MU-498/mug-met-lico-brinox-urban-travel-500ml" },
  { id: "mu-431", ref: "MU-431", name: "Botilito Metálico Klak Chili 1l", category: "viaje", brands: ALL, colors: "Gris Oscuro:#9E9E9E|Negro:#000000", why: "Botella metálica de 1 litro.", cp: "MU-431/botilito-met-lico-klak-chili-1l" },
  { id: "mu-289", ref: "MU-289", name: "Termo Bamboo 500ml", category: "viaje", brands: EV, colors: "Silver-Bamboo:#B0BEC5", why: "Termo en bambú de 500 ml.", cp: "MU-289/termo-bamboo-500ml" },
  { id: "mu-162-1", ref: "MU-162-1", name: "Set de Mugs con Termo Cascade", category: "viaje", brands: ALL, colors: "Silver:#B0BEC5", why: "Set de termo y mugs para regalo de entrega.", cp: "MU-162-1/set-de-mugs-con-termo-cascade" },
  { id: "va-71", ref: "VA-71", name: "Nevera Cooler Bag Trolley", category: "viaje", brands: PASSENGER, colors: "Azul-Negro:#1E88E5|Gris-Negro:#9E9E9E", why: "Nevera con ruedas para paseos en familia.", cp: "VA-71/nevera-cooler-bag-trolley" },
  { id: "va-249", ref: "VA-249", name: "Silla Nevera Cooler con Espaldar", category: "viaje", brands: PASSENGER, colors: "Herraje:#9E9E9E|Negro:#000000", why: "Silla con nevera para paseos y eventos.", cp: "VA-249/silla-nevera-cooler-con-espaldar---producci-n-nacional" },
  { id: "va-588", ref: "VA-588", name: "Nevera Cooler Max", category: "viaje", brands: ALL, colors: "Azul:#1E88E5|Rojo:#E53935|Verde:#43A047", why: "Nevera rígida para el baúl.", cp: "VA-588/nevera-cooler-max---producci-n-nacional" },
  { id: "he-329", ref: "HE-329", name: "Candado de Clave Tsa", category: "viaje", brands: ALL, colors: "Negro:#000000", why: "Candado TSA para maletas.", cp: "HE-329/candado-de-clave-tsa" },
  { id: "va-505", ref: "VA-505", name: "Pesa de Viaje Digital", category: "viaje", brands: ALL, colors: "Negro:#000000", why: "Pesa digital para equipaje.", cp: "VA-505/pesa-de-viaje-digital" },
  { id: "te-561", ref: "TE-561", name: "Adaptador Universal Travel", category: "viaje", brands: ALL, colors: "Blanco:#FFFFFF", why: "Adaptador universal para viajes.", cp: "TE-561/adaptador-universal-travel" },
  { id: "va-1017", ref: "VA-1017", name: "Organizador Multiusos Tech", category: "viaje", brands: ALL, colors: "Gris Oscuro:#9E9E9E", why: "Organizador para cables, cargadores y documentos.", cp: "VA-1017/organizador-multiusos-tech" },
  { id: "va-1066", ref: "VA-1066", name: "Estuche Dry Bag 2 5l", category: "viaje", brands: ALL, colors: "Azul:#1E88E5|Blanco:#FFFFFF", why: "Bolsa seca impermeable de 2,5 litros.", cp: "VA-1066/estuche-dry-bag-2-5l" },
  { id: "va-925", ref: "VA-925", name: "Morral Backpack Antirrobo Security", category: "equipo", brands: ALL, colors: "Gris:#9E9E9E", why: "Morral antirrobo para asesores comerciales.", cp: "VA-925/morral-backpack-antirrobo-security" },
  { id: "va-1003", ref: "VA-1003", name: "Morral Backpack Reflect", category: "equipo", brands: ALL, colors: "Negro:#000000", why: "Morral reflectivo: visible en carretera.", cp: "VA-1003/morral-backpack-reflect" },
  { id: "va-1076", ref: "VA-1076", name: "Maletín Master Ocean", category: "equipo", brands: ALL, colors: "Negro:#000000", why: "Maletín para gerentes y equipo que viaja.", cp: "VA-1076/malet-n-master-ocean" },
  { id: "va-994", ref: "VA-994", name: "Maletín Portadocumentos King", category: "marroquineria", brands: ALL, colors: "Gris:#9E9E9E|Negro:#000000", why: "Maletín portadocumentos ejecutivo.", cp: "VA-994/malet-n-portadocumentos-king" },
  { id: "va-395", ref: "VA-395", name: "Maletín Deportivo Florida", category: "equipo", brands: ALL, colors: "Negro:#000000", why: "Maletín deportivo para incentivos.", cp: "VA-395/malet-n-deportivo-florida" },
  { id: "of-726", ref: "OF-726", name: "Libreta Ejecutiva Opus Chili", category: "equipo", brands: ALL, colors: "Azul:#1E88E5|Negro:#000000", why: "Libreta ejecutiva para el equipo comercial.", cp: "OF-726/libreta-ejecutiva-opus-chili" },
  { id: "of-680", ref: "OF-680", name: "Libreta Klaus Urban Business", category: "equipo", brands: ALL, colors: "Azul Oscuro:#0A3D7A|Gris Oscuro:#9E9E9E|Negro:#000000", why: "Libreta Urban Business para posventa.", cp: "OF-680/libreta-klaus-urban-business" },
  { id: "of-575", ref: "OF-575", name: "Set de Bolígrafo y Libreta Swisspeak Lux", category: "equipo", brands: ALL, colors: "Negro:#000000", why: "Set de libreta y bolígrafo para regalo corporativo.", cp: "OF-575/set-de-bol-grafo-y-libreta-swisspeak-lux" },
  { id: "metal-tw", ref: "METAL-TW", name: "Bolígrafo Metal Twist", category: "equipo", brands: ALL, colors: "Gris Oscuro:#9E9E9E", why: "Bolígrafo metálico para firmar la entrega del vehículo.", cp: "METAL-TW/bol-grafo-metal-twist" },
  { id: "set-sw-luz", ref: "SET-SW-LUZ", name: "Set de Bolígrafos Swisspeak Luzern", category: "equipo", brands: ALL, colors: "Negro:#000000", why: "Set de bolígrafos premium para clientes VIP.", cp: "SET-SW-LUZ/set-de-bol-grafos-swisspeak-luzern" },
  { id: "cp-210", ref: "CP-210", name: "Gel Antibacterial 300ml", category: "equipo", brands: ALL, colors: "Blanco:#FFFFFF", why: "Gel antibacterial grande para la vitrina.", cp: "CP-210/gel-antibacterial-300ml" },
  { id: "cp-118", ref: "CP-118", name: "Gel Antibacterial Round 40ml", category: "equipo", brands: ALL, colors: "Caucho Amarillo:#FDD835|Caucho Azul:#1E88E5|Caucho Blanco:#FFFFFF|Caucho Morado:#8E24AA|Caucho Naranja:#FB8C00|Caucho Negro:#000000|Caucho Rojo:#E53935|Caucho Verde:#43A047|Gel Transparente Nacional:#EEEEEE", why: "Gel antibacterial de bolsillo para clientes.", cp: "CP-118/gel-antibacterial-round-40ml" },
);

/* ---- Pines, marroquinería, textiles y litografía ---- */
PRODUCTS.push(
  { id: "va-1123", ref: "VA-1123", name: "Portadocumentos Heritage Swiss Peak", category: "marroquineria", brands: ALL, colors: "Negro:#000000", why: "Portadocumentos premium para entregar el manual, SOAT y papeles del vehículo.", cp: "VA-1123/portadocumentos-heritage-swiss-peak" },
  { id: "va-1170", ref: "VA-1170", name: "Portadocumentos Vintra", category: "marroquineria", brands: ALL, colors: "Negro:#000000", why: "Portadocumentos para la guantera.", cp: "VA-1170/portadocumentos-vintra" },
  { id: "va-1300", ref: "VA-1300", name: "Portadocumentos Belay", category: "marroquineria", brands: ALL, colors: "Gris:#9E9E9E|Negro:#000000", why: "Portadocumentos ejecutivo para asesores.", cp: "VA-1300/portadocumentos-belay" },
  { id: "va-510", ref: "VA-510", name: "Portadocumentos de Viaje Swisspeak", category: "marroquineria", brands: ALL, colors: "Negro:#000000", why: "Portadocumentos de viaje con compartimentos.", cp: "VA-510/portadocumentos-de-viaje-swisspeak" },
  { id: "va-1258", ref: "VA-1258", name: "Portapasaporte Book Swiss Peak", category: "marroquineria", brands: ALL, colors: "Negro:#000000", why: "Portapasaporte tipo libro, regalo para clientes VIP.", cp: "VA-1258/portapasaporte-book-swiss-peak" },
  { id: "ml-366", ref: "ML-366", name: "Set de Portatarjetas y Llavero Jack", category: "marroquineria", brands: PASSENGER, colors: "Rojo:#E53935|Silver:#B0BEC5|Verde:#43A047", why: "Set de portatarjetas y llavero para la entrega del vehículo.", cp: "ML-366/set-de-portatarjetas-y-llavero-jack-oferta" },
  { id: "ml-182", ref: "ML-182", name: "Portatarjetas Ml-182", category: "marroquineria", brands: ALL, colors: "Negro:#000000", why: "Portatarjetas metálico para tarjeta de propiedad.", cp: "ML-182/portatarjetas-ml-182---oferta" },
  { id: "va-666", ref: "VA-666", name: "Chaqueta Urban Travel Wear", category: "textiles", brands: ALL, colors: "L Azul:#1E88E5|L Blanco:#FFFFFF|L Negro:#000000|M Azul:#1E88E5|M Blanco:#FFFFFF|M Negro:#000000|S Azul:#1E88E5|S Blanco:#FFFFFF|S Negro:#000000|Xl Azul:#1E88E5|Xl Blanco:#FFFFFF|Xl Negro:#000000", why: "Chaqueta para equipo comercial y eventos.", cp: "VA-666/chaqueta-urban-travel-wear" },
  { id: "cap-20", ref: "CAP-20", name: "Gorra Emergency", category: "textiles", brands: ALL, colors: "Naranja 6 Paneles:#FB8C00|Verde 6 Paneles:#43A047", why: "Gorra reflectiva para técnicos y carretera.", cp: "CAP-20/gorra-emergency" },
  { id: "pin-zamak", ref: "A LA MEDIDA", name: "Pin metálico troquelado (diseño propio)", category: "pines", brands: ALL, colors: "Dorado:#D4AF37|Oro rosa:#E0A189|Plateado:#C0C0C0", why: "Pines con la forma que quieran: logo, símbolo o letra. Ideales para reconocimientos.", custom: true },
  { id: "pin-litoresina", ref: "A LA MEDIDA", name: "Pin en litoresina con forma de vehículo", category: "pines", brands: ALL, colors: "", why: "El modelo del vehículo en un pin full color para lanzamientos.", custom: true },
  { id: "pin-tarjeta", ref: "A LA MEDIDA", name: "Pin con tarjeta de agradecimiento impresa", category: "pines", brands: ALL, colors: "", why: "Pin + tarjeta con mensaje para celebrar metas del equipo.", custom: true },
  { id: "llavero-troquelado", ref: "A LA MEDIDA", name: "Llavero metálico troquelado en litoresina", category: "pines", brands: ALL, colors: "", why: "Llavero con la forma y mensaje que quieran, en full color.", custom: true },
  { id: "cuaderno-litografia", ref: "A LA MEDIDA", name: "Cuaderno argollado tapa dura personalizado", category: "litografia", brands: ALL, colors: "", why: "Portada, contraportada y hojas internas con la marca. Impresión 4x4 y UV parcial.", custom: true },
  { id: "separador-libro", ref: "A LA MEDIDA", name: "Separador de libro con borla", category: "litografia", brands: ALL, colors: "", why: "Pieza económica con QR a redes sociales o a la página de la marca.", custom: true },
  { id: "sticker-personalizado", ref: "A LA MEDIDA", name: "Stickers y etiquetas plastificadas", category: "litografia", brands: ALL, colors: "", why: "Stickers con semicorte para personalizar productos y campañas.", custom: true },
);

// Ronda 8 (2026-11-06): productos que compartió Mercadeo IP7
PRODUCTS.unshift(
  { id: "carrito-mercado", ref: "CARRITO MERCADO", name: "Carrito de mercado plegable", category: "viaje", brands: ALL, colors: "Rojo:#d62828|Azul:#1f5fd6|Azul oscuro:#2e3a6e|Negro:#1a1a1a", why: "Bolsa amplia con tapa y ruedas, para mercado o viaje. Se marca en el frente.", custom: true },
  { id: "galletas-fortuna", ref: "A LA MEDIDA", name: "Galletas de la fortuna con mensaje personalizado", category: "entrega", brands: ALL, colors: "", why: "Un detalle con mensaje de la marca para la entrega del vehículo o un evento.", custom: true },
  { id: "nevera-portavasos", ref: "NEVERA PORTÁTIL", name: "Nevera portátil con portavasos en la tapa", category: "viaje", brands: ALL, colors: "", why: "Nevera con manija para paseos y test drives. Tapa con espacio para vasos.", custom: true },
  { id: "nevera-personal", ref: "NEVERA ARCTIC", name: "Nevera personal Arctic", category: "viaje", brands: ALL, colors: "", why: "Nevera compacta con manija abatible, para llevar bebidas en el carro.", custom: true },
  { id: "botella-stanley", ref: "STANLEY", name: "Botella térmica Stanley con tapa abatible", category: "equipo", brands: ALL, colors: "", why: "Botella premium de una de nuestras marcas aliadas, marcada con láser.", custom: true },
);

// Ronda 17 (2026-11-10): productos que compartió Mercadeo IP7
PRODUCTS.unshift(
  { id: "gorro-bucket", ref: "GORRO BUCKET", name: "Gorro bucket", category: "clima", brands: ALL, colors: "Azul rey:#1f3fd8", why: "Gorro de tela para el sol en paseos, ferias y entregas al aire libre. Se bordea el logo al frente.", custom: true },
  { id: "pijama-carro", ref: "PIJAMA CARRO", name: "Pijama para carro", category: "carretera", brands: ALL, colors: "Negro:#1a1a1a", sizes: ["S", "M", "L", "XL"], why: "Funda que cubre el vehículo del sol, el polvo y la lluvia. Disponible en tallas S, M, L y XL según el tamaño del carro.", custom: true },
  { id: "silla-plegable", ref: "SILLA PLEGABLE", name: "Silla Plegable", category: "viaje", brands: ALL, colors: "Azul:#1f3fd8|Negro:#1a1a1a", why: "Silla plegable portátil con funda, ideal para actividades al aire libre.", custom: true },
  { id: "silla-camp", ref: "SILLA CAMP", name: "Silla Camp", category: "viaje", brands: ALL, colors: "Rojo:#d62828|Verde:#1f7a3a|Azul:#1f3fd8", why: "Banco plegable compacto, práctico para pesca, camping o eventos.", custom: true },
  { id: "cobija-spark", ref: "COBIJA SPARK", name: "Cobija Spark", category: "entrega", brands: ALL, colors: "Gris:#9b9690|Azul oscuro:#1f3a7a", why: "Cobija suave tipo mink, un obsequio cálido y elegante para clientes VIP.", custom: true },
);
