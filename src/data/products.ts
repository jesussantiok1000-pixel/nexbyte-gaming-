export type ProductStatus = "draft" | "published" | "hidden";

export interface Product {
  slug: string;
  title: string;
  analysisTitle: string;
  shortDescription: string;
  orientationText: string;
  category: string;
  categorySlug: string;
  image: string;
  imageAlt: string;
  features: string[];
  recommendedFor: string[];
  advantages: string[];
  limitations: string[];
  purchaseCriteria: string[];
  commonMistakes: string[];
  nexbyteCriteria: string[];
  neutralRecommendation: string;
  analysisUrl: string;
  guideUrl: string;
  connectivity: string;
  usage: string[];
  usageLabel: string;
  featured: boolean;
  status: ProductStatus;
  relatedSlugs: string[];
  updatedAt: string;
  asin?: string;
  amazonUrl?: string;
  affiliateUrl?: string;
  officialImageUrl?: string;
  affiliateEnabled: false;
}

export type ProductCardData = Product;

const shared = {
  status: "published" as const,
  updatedAt: "2026-07-23",
  affiliateEnabled: false as const,
  asin: "",
  amazonUrl: "",
  affiliateUrl: "",
  officialImageUrl: "",
};

export const products: Product[] = [
  {
    ...shared,
    slug: "laptop-gaming-equilibrada",
    title: "Una laptop preparada para jugar y crear",
    analysisTitle: "El equilibrio que buscas para jugar y crear",
    shortDescription: "Un punto de partida equilibrado para quienes buscan rendimiento, movilidad y una experiencia fluida.",
    orientationText: "Pensada para jugar, estudiar y crear contenido.",
    category: "Laptops", categorySlug: "laptops-gaming",
    image: "/images/laptop.webp",
    imageAlt: "Laptop gaming abierta con teclado iluminado sobre un fondo azul y violeta",
    features: ["Pantalla fluida", "Rendimiento gráfico", "Memoria ampliable"],
    recommendedFor: ["Personas que juegan y estudian en un mismo equipo", "Usuarios que necesitan movilidad", "Quien busca un equipo completo sin montar una PC"],
    advantages: ["Integra pantalla, teclado y batería", "Permite trabajar y jugar en distintos espacios", "Ofrece configuraciones para varios niveles de exigencia"],
    limitations: ["La ampliación puede ser limitada", "Suele generar más ruido y temperatura que un equipo de escritorio", "El rendimiento depende del límite de potencia y la refrigeración"],
    purchaseCriteria: ["GPU adecuada para la resolución objetivo", "Memoria ampliable y almacenamiento accesible", "Pantalla con brillo, color y frecuencia apropiados", "Sistema térmico y conectividad"],
    commonMistakes: ["Elegir solo por el nombre de la GPU", "Ignorar la potencia configurada y la refrigeración", "No comprobar si memoria y almacenamiento se pueden ampliar"],
    nexbyteCriteria: ["Equilibrio entre GPU y pantalla", "Memoria suficiente para el uso previsto", "Conectividad y mantenimiento razonables"],
    neutralRecommendation: "Prioriza una configuración equilibrada y verificable. Una GPU superior no compensa una pantalla deficiente, poca memoria o una refrigeración insuficiente.",
    analysisUrl: "/analisis/laptop-gaming-equilibrada", guideUrl: "/guias/elegir-laptop-gaming",
    connectivity: "Wi‑Fi", usage: ["gaming", "productividad", "estudio"], usageLabel:"Jugar, estudiar y crear", featured: true,
    relatedSlugs: ["monitor-gaming", "raton-gaming-inalambrico", "mando-inalambrico-pc"],
  },
  {
    ...shared,
    slug: "teclado-mecanico-tkl",
    title: "Teclado mecánico TKL",
    analysisTitle: "Más espacio, precisión y una respuesta a tu ritmo",
    shortDescription: "Formato compacto sin bloque numérico que libera espacio para el ratón y conserva las teclas de función.",
    orientationText: "Pensado para ganar espacio sin renunciar a las teclas esenciales.",
    category: "Teclados", categorySlug: "teclados-mecanicos",
    image: "/images/TECLADO.webp",
    imageAlt: "Teclado mecánico TKL con iluminación cian y violeta",
    features: ["Formato compacto TKL", "Opciones de switches", "Conexión USB estable"],
    recommendedFor: ["Escritorios con espacio limitado", "Jugadores que necesitan más recorrido para el ratón", "Usuarios que no dependen del teclado numérico"],
    advantages: ["Ocupa menos espacio que un teclado completo", "Mantiene fila de funciones y flechas", "Existe una amplia variedad de switches y perfiles"],
    limitations: ["No incluye bloque numérico", "La distribución puede variar entre regiones", "El sonido y la sensación dependen del switch y la construcción"],
    purchaseCriteria: ["Distribución e idioma", "Tipo de switch", "Estabilizadores y construcción", "Conexión y compatibilidad"],
    commonMistakes: ["Comprar una distribución distinta a la necesaria", "Elegir switches solo por el color", "Confundir TKL con formatos todavía más compactos"],
    nexbyteCriteria: ["Formato adecuado al espacio", "Conexión fiable", "Construcción y distribución claramente documentadas"],
    neutralRecommendation: "El formato TKL es práctico si no utilizas el bloque numérico. Antes de elegir, confirma distribución, switches y método de conexión.",
    analysisUrl: "/analisis/teclado-mecanico-tkl", guideUrl: "/guias/elegir-teclado-mecanico",
    connectivity: "USB", usage: ["gaming", "productividad", "escritura"], usageLabel:"Jugar, escribir y trabajar", featured: true,
    relatedSlugs: ["raton-gaming-inalambrico", "monitor-gaming", "laptop-gaming-equilibrada"],
  },
  {
    ...shared,
    slug: "raton-gaming-inalambrico",
    title: "Ratón gaming inalámbrico",
    analysisTitle: "Libertad de movimiento sin perder el control",
    shortDescription: "Una referencia para valorar forma, peso, sensor, autonomía y conexión antes de elegir.",
    orientationText: "Pensado para moverte con libertad y mantener un escritorio despejado.",
    category: "Ratones", categorySlug: "ratones-gaming",
    image: "/images/mouse.webp",
    imageAlt: "Ratón gaming inalámbrico iluminado sobre una superficie oscura",
    features: ["Sensor preciso", "Diseño ligero", "Batería recargable"],
    recommendedFor: ["Jugadores que buscan libertad de movimiento", "Espacios donde conviene reducir cables", "Personas que conocen su tipo de agarre"],
    advantages: ["Reduce el arrastre del cable", "Facilita un escritorio limpio", "Los modelos actuales pueden ofrecer conexiones de baja latencia"],
    limitations: ["Necesita carga", "La forma no se adapta igual a todas las manos", "Bluetooth y receptor dedicado pueden tener comportamientos distintos"],
    purchaseCriteria: ["Forma y tamaño", "Peso", "Autonomía y carga", "Sensor y tipo de conexión"],
    commonMistakes: ["Elegir por DPI máximo", "Ignorar el tamaño de la mano", "No comprobar dónde se guarda el receptor"],
    nexbyteCriteria: ["Ergonomía antes que cifras extremas", "Conexión apropiada al uso", "Peso y autonomía equilibrados"],
    neutralRecommendation: "La forma y el tamaño importan más que una cifra extrema de sensibilidad. Comprueba agarre, peso y conexión.",
    analysisUrl: "/analisis/raton-gaming-inalambrico", guideUrl: "/guias/elegir-raton-gaming",
    connectivity: "Inalámbrico", usage: ["gaming", "productividad"], usageLabel:"Jugar y trabajar con libertad", featured: false,
    relatedSlugs: ["teclado-mecanico-tkl", "laptop-gaming-equilibrada", "monitor-gaming"],
  },
  {
    ...shared,
    slug: "auriculares-gaming",
    title: "Auriculares gaming cómodos",
    analysisTitle: "Comodidad y claridad para sesiones más largas",
    shortDescription: "Comodidad, micrófono y conexión son más importantes que las promesas de sonido espectacular.",
    orientationText: "Pensados para jugar, conversar y disfrutar durante más tiempo.",
    category: "Audio", categorySlug: "audio-gaming",
    image: "/images/audifonos.webp",
    imageAlt: "Auriculares gaming con micrófono e iluminación ambiental",
    features: ["Micrófono integrado", "Almohadillas amplias", "Opciones con cable o inalámbricas"],
    recommendedFor: ["Sesiones prolongadas", "Juego cooperativo y llamadas", "Espacios compartidos"],
    advantages: ["Integra escucha y comunicación", "Puede aislar distracciones", "Existe variedad de conexiones y perfiles"],
    limitations: ["El ajuste cambia según cabeza y orejas", "Los modelos inalámbricos requieren carga", "El sonido envolvente virtual no siempre mejora la precisión"],
    purchaseCriteria: ["Peso y presión", "Calidad y posición del micrófono", "Conexión compatible", "Almohadillas reemplazables"],
    commonMistakes: ["Priorizar luces sobre comodidad", "No comprobar compatibilidad con consola o PC", "Confundir aislamiento con cancelación activa"],
    nexbyteCriteria: ["Comodidad sostenible", "Voz inteligible", "Conexión compatible y controles accesibles"],
    neutralRecommendation: "Si puedes, prioriza comodidad y claridad del micrófono. La conexión debe coincidir con todos los dispositivos que usarás.",
    analysisUrl: "/analisis/auriculares-gaming", guideUrl: "/guias/elegir-auriculares-gaming",
    connectivity: "Inalámbrico", usage: ["gaming", "comunicacion", "streaming"], usageLabel:"Jugar, conversar y hacer streaming", featured: false,
    relatedSlugs: ["microfono-usb-streaming", "mando-inalambrico-pc", "laptop-gaming-equilibrada"],
  },
  {
    ...shared,
    slug: "monitor-gaming",
    title: "Monitor gaming fluido",
    analysisTitle: "Una imagen más fluida cambia la experiencia",
    shortDescription: "Frecuencia, resolución, panel y ergonomía deben guardar relación con el equipo y la distancia de uso.",
    orientationText: "Pensado para disfrutar movimientos más claros y un espacio de trabajo cómodo.",
    category: "Monitores", categorySlug: "monitores-gaming",
    image: "/images/monitor.webp",
    imageAlt: "Monitor gaming mostrando gráficos azules y violetas",
    features: ["Alta frecuencia", "Sincronización adaptativa", "Soporte ajustable"],
    recommendedFor: ["Juegos con movimiento rápido", "Equipos capaces de generar tasas altas de fotogramas", "Usuarios que también estudian o crean contenido"],
    advantages: ["Mejora la claridad de movimiento", "Puede reducir cortes con sincronización adaptativa", "Un soporte ajustable favorece la postura"],
    limitations: ["La frecuencia alta exige más a la GPU", "La calidad de imagen depende del panel", "Las conexiones pueden limitar resolución y frecuencia"],
    purchaseCriteria: ["Resolución y tamaño", "Frecuencia y tiempo de respuesta realista", "Tipo de panel", "Puertos y ergonomía"],
    commonMistakes: ["Comprar más frecuencia de la que el equipo puede aprovechar", "Ignorar el soporte y la altura", "Usar un cable o puerto que limita la señal"],
    nexbyteCriteria: ["Relación entre resolución, frecuencia y GPU", "Ergonomía", "Conexiones suficientes y sincronización compatible"],
    neutralRecommendation: "Elige resolución y frecuencia según el rendimiento real de tu equipo. Un buen soporte y un panel adecuado también cambian la experiencia.",
    analysisUrl: "/analisis/monitor-gaming", guideUrl: "/guias/elegir-monitor-gaming",
    connectivity: "DisplayPort", usage: ["gaming", "productividad", "creacion"], usageLabel:"Jugar, trabajar y crear", featured: false,
    relatedSlugs: ["laptop-gaming-equilibrada", "raton-gaming-inalambrico", "teclado-mecanico-tkl"],
  },
  {
    ...shared,
    slug: "microfono-usb-streaming",
    title: "Micrófono USB para streaming",
    analysisTitle: "Haz que tu voz se escuche con claridad",
    shortDescription: "Una opción directa para voz, clases y streaming cuando se controla la distancia y el ruido del entorno.",
    orientationText: "Pensado para comunicarte con claridad en directos, clases y llamadas.",
    category: "Audio", categorySlug: "audio-gaming",
    image: "/images/microfono.webp",
    imageAlt: "Micrófono USB para streaming montado sobre soporte",
    features: ["Patrón cardioide", "Conexión USB", "Control de ganancia"],
    recommendedFor: ["Streaming inicial", "Clases y videollamadas", "Creadores que necesitan una configuración sencilla"],
    advantages: ["No requiere una interfaz de audio separada", "Configuración relativamente directa", "Puede mejorar la claridad frente a micrófonos integrados"],
    limitations: ["Capta teclado y reverberación si está lejos", "Necesita colocación correcta", "Algunos controles dependen del sistema operativo"],
    purchaseCriteria: ["Patrón polar", "Control de ganancia y monitoreo", "Soporte y rosca", "Compatibilidad USB"],
    commonMistakes: ["Colocarlo demasiado lejos", "Subir la ganancia para compensar mala posición", "Esperar que elimine por sí solo el ruido del cuarto"],
    nexbyteCriteria: ["Controles accesibles", "Montaje estable", "Compatibilidad y monitoreo claramente explicados"],
    neutralRecommendation: "La colocación cercana y una ganancia moderada suelen importar más que accesorios llamativos.",
    analysisUrl: "/analisis/microfono-usb-streaming", guideUrl: "/guias/preparar-audio-streaming",
    connectivity: "USB", usage: ["streaming", "comunicacion", "productividad"], usageLabel:"Streaming, clases y videollamadas", featured: false,
    relatedSlugs: ["auriculares-gaming", "laptop-gaming-equilibrada", "silla-ergonomica"],
  },
  {
    ...shared,
    slug: "silla-ergonomica",
    title: "Silla ergonómica para setup",
    analysisTitle: "Tu comodidad también forma parte del setup",
    shortDescription: "Los ajustes, las medidas y la postura pesan más que una estética agresiva o una etiqueta gaming.",
    orientationText: "Pensada para acompañarte durante sesiones de juego, estudio y trabajo.",
    category: "Setup", categorySlug: "setup-gaming",
    image: "/images/silla.webp",
    imageAlt: "Silla ergonómica de respaldo alto en un setup moderno",
    features: ["Apoyo lumbar", "Reposabrazos ajustables", "Material transpirable"],
    recommendedFor: ["Personas que pasan varias horas sentadas", "Espacios de estudio y juego", "Usuarios dispuestos a ajustar su postura"],
    advantages: ["Permite adaptar altura y apoyos", "Puede favorecer cambios de postura", "Sirve para trabajo, estudio y juego"],
    limitations: ["Las medidas no funcionan igual para todas las personas", "Un soporte lumbar agresivo puede resultar incómodo", "La silla no sustituye pausas y movimiento"],
    purchaseCriteria: ["Altura y profundidad del asiento", "Rango de reposabrazos", "Soporte lumbar", "Base, ruedas y material"],
    commonMistakes: ["Elegir solo por apariencia", "No revisar las medidas", "Mantener una misma postura durante horas"],
    nexbyteCriteria: ["Rangos de ajuste útiles", "Medidas publicadas", "Material y soporte adecuados al entorno"],
    neutralRecommendation: "Compara las medidas con tu cuerpo y escritorio. Ninguna silla corrige por sí sola una mala configuración o la falta de pausas.",
    analysisUrl: "/analisis/silla-ergonomica", guideUrl: "/guias/organizar-setup-ergonomico",
    connectivity: "No aplica", usage: ["ergonomia", "productividad", "gaming"], usageLabel:"Jugar, estudiar y trabajar con comodidad", featured: false,
    relatedSlugs: ["monitor-gaming", "teclado-mecanico-tkl", "microfono-usb-streaming"],
  },
  {
    ...shared,
    slug: "mando-inalambrico-pc",
    title: "Mando inalámbrico para PC",
    analysisTitle: "Control cómodo para jugar a tu manera",
    shortDescription: "Compatibilidad, distribución, autonomía y conexión determinan si un mando encaja con tus juegos y dispositivos.",
    orientationText: "Pensado para disfrutar aventuras, plataformas y conducción con comodidad.",
    category: "Accesorios", categorySlug: "accesorios-gaming",
    image: "/images/mando.webp",
    imageAlt: "Mando inalámbrico para PC con controles simétricos",
    features: ["Diseño ergonómico", "Conexión inalámbrica", "Vibración configurable"],
    recommendedFor: ["Juegos de conducción, plataformas y aventura", "Juego desde el sofá", "Usuarios que alternan entre PC y otros dispositivos"],
    advantages: ["Control analógico gradual", "Postura relajada en ciertos géneros", "Reduce cables en el área de juego"],
    limitations: ["No todos los juegos muestran los mismos iconos", "Requiere batería o carga", "La compatibilidad puede cambiar según el modo de conexión"],
    purchaseCriteria: ["Compatibilidad con PC y juegos", "Distribución de palancas", "Autonomía", "Bluetooth, receptor o cable"],
    commonMistakes: ["Asumir compatibilidad universal", "No revisar el tipo de batería", "Ignorar la distribución de botones preferida"],
    nexbyteCriteria: ["Compatibilidad documentada", "Conexión estable", "Controles y ergonomía coherentes"],
    neutralRecommendation: "Confirma compatibilidad y método de conexión. La distribución más cómoda depende de tus hábitos y de los géneros que juegas.",
    analysisUrl: "/analisis/mando-inalambrico-pc", guideUrl: "/guias/elegir-mando-pc",
    connectivity: "Inalámbrico", usage: ["gaming", "entretenimiento"], usageLabel:"Aventuras, plataformas y conducción", featured: false,
    relatedSlugs: ["auriculares-gaming", "laptop-gaming-equilibrada", "monitor-gaming"],
  },
];

export const approvedProducts = products.filter((product) => product.status === "published");
export const productBySlug = (slug: string) => approvedProducts.find((product) => product.slug === slug);
