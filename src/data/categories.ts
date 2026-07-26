export type Category = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  coverImage: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
};

export const categories: Category[] = [
  { slug:"laptops-gaming", name:"Laptops para estudiar, crear y jugar", shortName:"Laptops", description:"Equipos portátiles para estudio, productividad, creación, uso híbrido y juegos ligeros según su configuración.", icon:"💻", coverImage:"/images/menu-laptos.png", seoTitle:"Laptops para estudiar, crear y jugar", seoDescription:"Explora laptops para productividad, estudio, creación y distintos niveles de rendimiento.", keywords:["laptop","laptops","portátil","portátiles","notebook","computadora portátil","estudio","productividad","creación"] },
  { slug:"teclados-mecanicos", name:"Teclados mecánicos", shortName:"Teclados", description:"Formatos, switches y conexiones para escribir y jugar con precisión.", icon:"⌨", coverImage:"/images/menu-teclados.png", seoTitle:"Teclados mecánicos gaming", seoDescription:"Compara formatos y características de teclados mecánicos.", keywords:["teclado","teclados","teclado mecánico","keyboard","switches"] },
  { slug:"ratones-gaming", name:"Ratones gaming", shortName:"Ratones", description:"Sensores precisos, pesos y formas pensadas para distintos agarres.", icon:"◉", coverImage:"/images/menu-mouse.png", seoTitle:"Ratones gaming: selección y guía", seoDescription:"Encuentra el tipo de ratón gaming adecuado para tu forma de jugar.", keywords:["ratón","ratones","mouse","mice","mouse gaming"] },
  { slug:"audio-gaming", name:"Audio y auriculares", shortName:"Audio", description:"Auriculares y micrófonos para comunicarte y escuchar cada detalle.", icon:"♫", coverImage:"/images/audio-gaming-png.png", seoTitle:"Audio gaming: auriculares y micrófonos", seoDescription:"Guías de audio gaming para elegir conexión, micrófono y comodidad.", keywords:["audio","auricular","auriculares","audífono","audífonos","headset","micrófono"] },
  { slug:"monitores-gaming", name:"Monitores", shortName:"Monitores", description:"Pantallas fluidas con resoluciones y tamaños para cada escritorio.", icon:"▣", coverImage:"/images/menu-monitor.png", seoTitle:"Monitores gaming: guía de selección", seoDescription:"Compara frecuencia, resolución y ergonomía en monitores gaming.", keywords:["monitor","monitores","pantalla","pantallas","display"] },
  { slug:"componentes", name:"Componentes", shortName:"Componentes", description:"Piezas fundamentales para planear o actualizar una PC gaming.", icon:"◇", coverImage:"/images/menu-componentes.png", seoTitle:"Componentes para PC gaming", seoDescription:"Orientación para elegir componentes compatibles para PC gaming.", keywords:["componente","componentes","pieza pc","piezas pc","hardware","pc"] },
  { slug:"setup-gaming", name:"Setup gaming", shortName:"Setup", description:"Ergonomía, mobiliario y organización para un espacio cómodo.", icon:"⌂", coverImage:"/images/menu-setup.png", seoTitle:"Setup gaming: ergonomía y organización", seoDescription:"Ideas y guías para construir un setup gaming cómodo y ordenado.", keywords:["setup","escritorio","silla gaming","mobiliario","espacio gaming"] },
  { slug:"accesorios-gaming", name:"Accesorios", shortName:"Accesorios", description:"Controles y complementos útiles para completar tu equipo.", icon:"✦", coverImage:"/images/menu-accesorios.png", seoTitle:"Accesorios gaming recomendados", seoDescription:"Explora accesorios gaming y complementos para PC y consola.", keywords:["accesorio","accesorios","complemento","complementos","mando","control"] },
  { slug:"auriculares-gaming", name:"Auriculares gaming", shortName:"Auriculares", description:"Auriculares con cable e inalámbricos para juego, comunicación y uso multiplataforma.", icon:"♫", coverImage:"/images/audio-gaming-png.png", seoTitle:"Auriculares gaming con cable e inalámbricos", seoDescription:"Explora auriculares gaming según conexión, micrófono y compatibilidad.", keywords:["auriculares gaming","headset","audífonos","con cable","inalámbricos","bluetooth"] },
  { slug:"microfonos-streaming", name:"Micrófonos para streaming", shortName:"Micrófonos", description:"Micrófonos USB y XLR para streaming, podcast, gaming y videollamadas.", icon:"♩", coverImage:"/images/audio-gaming-png.png", seoTitle:"Micrófonos para streaming, podcast y gaming", seoDescription:"Explora micrófonos USB y XLR para voz, streaming y creación de contenido.", keywords:["micrófono usb","micrófono xlr","streaming","podcast","gaming","videollamadas"] },
  { slug:"sillas-gaming", name:"Sillas gaming", shortName:"Sillas", description:"Sillas para configurar un espacio de juego, estudio y trabajo con medidas y ajustes adecuados.", icon:"♜", coverImage:"/images/menu-setup.png", seoTitle:"Sillas gaming para jugar, estudiar y trabajar", seoDescription:"Explora sillas gaming según ajustes, reposapiés, soporte lumbar, medidas y color.", keywords:["silla gaming","silla ergonómica","reposapiés","respaldo ajustable","soporte lumbar","setup"] },
];

export const categoryBySlug = (slug: string) => categories.find((category) => category.slug === slug);
