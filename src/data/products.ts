export type ProductStatus = "draft" | "published" | "hidden";

export interface Product {
  id?: string;
  name?: string;
  brand?: string;
  model?: string;
  productType?: string;
  verifiedSpecs?: string[];
  filters?: string[];
  highlights?: string[];
  summary?: string;
  useCases?: string[];
  compatibilityNotes?: string[];
  showOnHome?: boolean;
  subcategory?: string;
  configurationNotice?: string;
  verificationStatus?: "verified" | "needsVariantVerification";
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
  amazonAsin?: string;
  alt?: string;
  specs?: string[];
  tags?: string[];
  recommendedUse?: string[];
  longDescription?: string;
  editorialVerdict?: string;
  relatedProductIds?: string[];
  officialImageUrl?: string;
  affiliateEnabled: boolean;
  seoTitle?: string;
  seoDescription?: string;
  editorialSummary?: string;
  idealFor?: string[];
  notIdealFor?: string[];
  pros?: string[];
  cons?: string[];
  frequentlyAskedQuestions?: Array<{ question: string; answer: string }>;
  methodology?: string;
  sources?: Array<{ label: string; url?: string }>;
  publishedAt?: string;
  indexable?: boolean;
}

export type ProductCardData = Product;

export const amazonAssociateStoreId = "nexbyte08-21";

export const getValidAffiliateUrl = (candidate?: string) => {
  const value = candidate?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    const isAmazonDomain = /(^|\.)amazon\.[a-z.]+$/i.test(url.hostname) || url.hostname === "amzn.to" || url.hostname === "link.amazon";
    return url.protocol === "https:" && isAmazonDomain ? url.href : null;
  } catch {
    return null;
  }
};

const shared = {
  status: "published" as const,
  updatedAt: "2026-07-23",
  affiliateEnabled: false as const,
  asin: "",
  amazonUrl: "",
  affiliateUrl: "",
  officialImageUrl: "",
};

type CatalogProductInput = Pick<Product,
  "slug"|"brand"|"model"|"productType"|"title"|"shortDescription"|"category"|"categorySlug"|
  "image"|"imageAlt"|"verifiedSpecs"|"filters"|"highlights"|"useCases"|"compatibilityNotes"|"subcategory"|
  "limitations"|"connectivity"|"usage"|"usageLabel"|"relatedSlugs"
> & { guideUrl?: string; showOnHome?: boolean; affiliateUrl?: string };

const catalogProduct = (input: CatalogProductInput): Product => ({
  ...shared,
  ...input,
  id: input.slug,
  verificationStatus: "verified",
  analysisTitle: input.category === "Teclados"
    ? `${input.title}: elige el formato que encaja con tu escritorio`
    : input.category === "Ratones"
      ? `${input.title}: control y conexión para tu forma de jugar`
      : input.category === "Audio"
        ? `${input.title}: audio y comunicación para tu forma de jugar`
        : input.category === "Monitores"
          ? `${input.title}: una pantalla para tu espacio y forma de jugar`
          : input.category === "Setup"
            ? `${input.title}: ajustes y comodidad para tu espacio`
            : input.category === "Accesorios"
              ? `${input.title}: utilidad y compatibilidad para tu setup`
      : input.title,
  summary: input.shortDescription,
  orientationText: input.shortDescription,
  features: input.highlights ?? [],
  recommendedFor: input.useCases ?? [],
  advantages: input.highlights ?? [],
  purchaseCriteria: input.compatibilityNotes ?? [],
  commonMistakes: ["Elegir sin comprobar formato, dimensiones y conectores", "Asumir que una especificación declarada garantiza el rendimiento final"],
  nexbyteCriteria: ["Especificaciones identificables", "Compatibilidad comprobable", "Uso definido con claridad"],
  neutralRecommendation: `Antes de elegir, revisa la compatibilidad con tu equipo y confirma la variante exacta de ${input.model}.`,
  analysisUrl: `/analisis/${input.slug}`,
  guideUrl: input.guideUrl ?? (input.category === "Teclados" ? "/guias/elegir-teclado-mecanico" : input.category === "Ratones" ? "/guias/elegir-raton-gaming" : input.category === "Monitores" ? "/guias/elegir-monitor-gaming" : input.category === "Setup" ? "/guias/organizar-setup-ergonomico" : input.subcategory === "mandos-pc-consola" ? "/guias/elegir-mando-pc" : input.subcategory === "auriculares-gaming" ? "/guias/elegir-auriculares-gaming" : input.subcategory === "microfonos-streaming" ? "/guias/preparar-audio-streaming" : "/guias"),
  featured: false,
  showOnHome: input.showOnHome ?? ["Teclados", "Ratones", "Audio", "Monitores", "Setup", "Accesorios"].includes(input.category),
});

type RealLaptopInput = {
  slug: string;
  brand: string;
  model: string;
  title: string;
  productType: string;
  image: string;
  imageAlt: string;
  verifiedSpecs: string[];
  tags: string[];
  recommendedUse: string[];
  shortDescription: string;
  longDescription: string;
  editorialVerdict: string;
  affiliateUrl: string;
  connectivity: string;
  relatedProductIds: string[];
  featured?: boolean;
};

const realLaptop = (input: RealLaptopInput): Product => ({
  ...shared,
  id: input.slug,
  name: input.title,
  slug: input.slug,
  brand: input.brand,
  model: input.model,
  productType: input.productType,
  verificationStatus: "verified",
  title: input.title,
  analysisTitle: `${input.title}: características y usos recomendados`,
  shortDescription: input.shortDescription,
  longDescription: input.longDescription,
  orientationText: input.editorialVerdict,
  editorialVerdict: input.editorialVerdict,
  category: "Laptops",
  categorySlug: "laptops-gaming",
  subcategory: "laptops-gaming",
  image: input.image,
  imageAlt: input.imageAlt,
  alt: input.imageAlt,
  verifiedSpecs: input.verifiedSpecs,
  specs: input.verifiedSpecs,
  filters: [input.brand, input.productType, ...input.tags, ...input.recommendedUse, ...input.verifiedSpecs],
  tags: input.tags,
  features: input.tags.slice(0, 3),
  highlights: input.tags.slice(0, 3),
  recommendedFor: input.recommendedUse,
  recommendedUse: input.recommendedUse,
  useCases: input.recommendedUse,
  advantages: input.tags.slice(0, 3),
  limitations: ["La experiencia depende de las aplicaciones utilizadas", "Conviene confirmar la variante exacta antes de comprar"],
  purchaseCriteria: ["Comprobar pantalla, memoria y almacenamiento", "Confirmar teclado, sistema operativo y conectividad de la variante"],
  compatibilityNotes: ["Verificar que la configuración publicada por Amazon coincida con la indicada"],
  commonMistakes: ["Elegir sin comprobar la variante exacta", "Asumir un rendimiento no indicado por las especificaciones"],
  nexbyteCriteria: ["Especificaciones identificables", "Uso recomendado claramente definido", "Configuración verificable antes de comprar"],
  neutralRecommendation: input.editorialVerdict,
  analysisUrl: `/analisis/${input.slug}`,
  guideUrl: "/guias/elegir-laptop-gaming",
  connectivity: input.connectivity,
  usage: input.recommendedUse.map((item) => item.toLowerCase().replace(/\s+/g, "-")),
  usageLabel: input.recommendedUse.join(", "),
  featured: input.featured ?? false,
  status: "published",
  relatedSlugs: input.relatedProductIds,
  relatedProductIds: input.relatedProductIds,
  affiliateUrl: input.affiliateUrl,
  affiliateEnabled: true,
});

export const products: Product[] = [
  catalogProduct({
    slug:"soporte-auriculares-alyvisun",brand:"Alyvisun",model:"Soporte ajustable para auriculares",productType:"Soporte vertical para auriculares",title:"Soporte ajustable para auriculares Alyvisun",category:"Accesorios",categorySlug:"accesorios-gaming",subcategory:"soportes-escritorio",
    image:"/images/products/accessories/soporte-auriculares-alyvisun.jpg",imageAlt:"Soporte negro ajustable para auriculares Alyvisun con base pesada",
    shortDescription:"Soporte de escritorio con base pesada y altura ajustable para mantener los auriculares organizados y al alcance.",
    verifiedSpecs:["Tipo: soporte vertical para auriculares","Uso de escritorio","Base pesada","Altura ajustable","Color negro"],
    filters:["soportes de escritorio","soporte para auriculares","base pesada","altura ajustable","organización de escritorio","escritorio","negro"],
    highlights:["Base pesada","Altura ajustable","Organización de escritorio"],useCases:["Organizar auriculares","Liberar espacio","Cuidar auriculares de diadema"],
    compatibilityNotes:["Comprobar altura, espacio disponible y tamaño de los auriculares"],limitations:["La compatibilidad depende de la forma y tamaño de la diadema","Requiere una superficie estable"],
    connectivity:"No aplica",usage:["organizacion","escritorio"],usageLabel:"Organización y uso de escritorio",relatedSlugs:["logitech-g-pro-x-se","logitech-g-pro-x-2-lightspeed","ergosolid-brazo-monitor-17-30"],affiliateUrl:"https://link.amazon/B05c3ZjWX"
  }),
  catalogProduct({
    slug:"mando-inalambrico-xbox-usb-c",brand:"Xbox",model:"Mando inalámbrico con cable USB-C",productType:"Mando inalámbrico para PC y consola",title:"Mando inalámbrico Xbox con cable USB-C",category:"Accesorios",categorySlug:"accesorios-gaming",subcategory:"mandos-pc-consola",
    image:"/images/products/accessories/mando-inalambrico-xbox-usb-c.jpg",imageAlt:"Mando inalámbrico Xbox negro con cable USB-C",
    shortDescription:"Mando inalámbrico de Xbox en color negro con cable USB-C incluido para jugar mediante cable o de forma inalámbrica según el dispositivo compatible.",
    verifiedSpecs:["Tipo: mando inalámbrico","Conexión inalámbrica y USB-C mediante cable incluido","Color negro carbón","Botones, gatillos y cruceta híbrida","Compatibilidad con dispositivos Xbox compatibles y PC Windows compatible; debe verificarse para cada dispositivo"],
    filters:["mandos para pc y consola","mando inalámbrico","usb-c","inalámbrico","pc","xbox","consola","gaming"],
    highlights:["Uso inalámbrico o mediante USB-C","Cruceta híbrida","PC y Xbox compatibles"],useCases:["Gaming en PC","Juego en consola","Alternar conexión cableada e inalámbrica"],
    compatibilityNotes:["Revisar el dispositivo, método de conexión y necesidad de batería, cable o adaptador adicional"],limitations:["La compatibilidad concreta depende del dispositivo","Algunos modos pueden requerir accesorios adicionales"],
    connectivity:"Inalámbrico y USB-C",usage:["gaming","pc","consola"],usageLabel:"Gaming en PC y ecosistema Xbox",relatedSlugs:["thrustmaster-t-gt-wheel-add-on","redragon-m810-pro","mars-gaming-mm024"],affiliateUrl:"https://link.amazon/B04CwhgbB"
  }),
  catalogProduct({
    slug:"thrustmaster-t-gt-wheel-add-on",brand:"Thrustmaster",model:"T-GT Wheel Add-On",productType:"Aro de volante para simulación",title:"Thrustmaster T-GT Wheel Add-On para Gran Turismo",category:"Accesorios",categorySlug:"accesorios-gaming",subcategory:"simulacion-conduccion",
    image:"/images/products/accessories/thrustmaster-t-gt-wheel-add-on.jpg",imageAlt:"Aro de volante Thrustmaster T-GT Wheel Add-On con licencia Gran Turismo",
    shortDescription:"Aro de volante de simulación con licencia oficial Gran Turismo, pensado para configuraciones compatibles de PlayStation y PC.",
    verifiedSpecs:["Tipo: aro de volante o wheel add-on","Licencia Gran Turismo","Plataformas indicadas: PS5, PS4 y PC, sujeto a una base compatible","Uso para simulación de conducción","Controles integrados en el aro"],
    filters:["simulación de conducción","wheel add-on","gran turismo","ps5","ps4","pc","volante gaming","simulación"],
    highlights:["Licencia Gran Turismo","Controles integrados","Uso en configuraciones compatibles"],useCases:["Simulación de conducción","Setup con base compatible","PlayStation y PC compatibles"],
    compatibilityNotes:["Este producto es un add-on; confirma que dispones de una base Thrustmaster compatible","Comprobar aro, base, plataforma y soporte o cockpit"],
    limitations:["No es un sistema de volante completo","Requiere una base compatible que no se debe asumir incluida"],
    connectivity:"Depende de la base",usage:["gaming","simulacion","pc","consola"],usageLabel:"Simulación de conducción en configuración compatible",relatedSlugs:["mando-inalambrico-xbox-usb-c","mars-gaming-mcv4","secretlab-titan-evo-regular"],affiliateUrl:"https://link.amazon/B0h9yidE4"
  }),
  catalogProduct({
    slug:"secretlab-titan-evo-regular",brand:"Secretlab",model:"TITAN Evo Regular",productType:"Silla gaming ergonómica",title:"Secretlab TITAN Evo",category:"Setup",categorySlug:"setup-gaming",subcategory:"sillas-gaming",
    image:"/images/products/setup/secretlab-titan-evo-regular.jpg",imageAlt:"Silla gaming Secretlab TITAN Evo negra en tamaño Regular",
    shortDescription:"Silla gaming de perfil ergonómico para sesiones largas de juego, estudio o trabajo.",
    verifiedSpecs:["Tamaño Regular","Color negro","Soporte lumbar ajustable","Reposabrazos 4D","Respaldo reclinable","Material exterior de cuero sintético","Peso mostrado de 34.5 kg"],
    filters:["silla gaming","reposabrazos 4d","respaldo reclinable","soporte lumbar","gaming","estudio","trabajo","negro"],
    highlights:["Soporte lumbar ajustable","Reposabrazos 4D","Respaldo reclinable"],useCases:["Gaming","Estudio","Trabajo","Sesiones largas"],
    compatibilityNotes:["Comprobar medidas y rango de talla recomendado por Secretlab antes de elegir"],limitations:["La comodidad depende de medidas, postura y ajustes","El tamaño Regular no encaja igual con todas las personas"],
    connectivity:"No aplica",usage:["gaming","estudio","trabajo","ergonomia"],usageLabel:"Gaming, estudio y trabajo",relatedSlugs:["songmics-obg079g01-gris-paloma","songmics-obg079b01-negra-tinta","ergosolid-brazo-monitor-17-30"],affiliateUrl:"https://link.amazon/B0iFHsxFA"
  }),
  catalogProduct({
    slug:"songmics-obg079g01-gris-paloma",brand:"SONGMICS",model:"OBG079G01",productType:"Silla gaming ergonómica con reposapiés",title:"SONGMICS Silla Gaming Ergonómica Gris Paloma",category:"Setup",categorySlug:"setup-gaming",subcategory:"sillas-gaming",
    image:"/images/products/setup/songmics-obg079g01-gris-paloma.jpg",imageAlt:"Silla gaming SONGMICS OBG079G01 color gris paloma con reposapiés",
    shortDescription:"Silla de escritorio con reposapiés y respaldo ajustable para completar un setup cómodo.",
    verifiedSpecs:["Modelo OBG079G01","Color gris paloma","Reposapiés integrado","Respaldo ajustable","Materiales indicados: contrachapada, acero, nailon, espuma y tejido de poliéster","Dimensiones mostradas de 70 × 70 × 123.5 cm","Peso mostrado de 18.5 kg"],
    filters:["silla gaming","reposapiés","respaldo ajustable","soporte lumbar","gaming","estudio","trabajo","gris"],
    highlights:["Reposapiés integrado","Respaldo ajustable","Formato para escritorio"],useCases:["Estudio","Trabajo","Gaming","Espacio compartido"],
    compatibilityNotes:["Revisar altura del escritorio, espacio disponible y medidas antes de elegir"],limitations:["La comodidad depende de postura y dimensiones personales","Requiere espacio para extender el reposapiés"],
    connectivity:"No aplica",usage:["gaming","estudio","trabajo","ergonomia"],usageLabel:"Estudio, trabajo y gaming",relatedSlugs:["songmics-obg079b01-negra-tinta","secretlab-titan-evo-regular","ergosolid-brazo-monitor-17-30"],affiliateUrl:"https://link.amazon/B0d8mLqWs"
  }),
  catalogProduct({
    slug:"songmics-obg079b01-negra-tinta",brand:"SONGMICS",model:"OBG079B01",productType:"Silla gaming ergonómica con reposapiés",title:"SONGMICS Silla Gaming Ergonómica Negra Tinta",category:"Setup",categorySlug:"setup-gaming",subcategory:"sillas-gaming",
    image:"/images/products/setup/songmics-obg079b01-negra-tinta.jpg",imageAlt:"Silla gaming SONGMICS OBG079B01 color negro tinta con reposapiés",
    shortDescription:"Silla gaming con reposapiés y respaldo ajustable, pensada para un escritorio versátil.",
    verifiedSpecs:["Modelo OBG079B01","Color negro tinta","Reposapiés integrado","Respaldo ajustable","Materiales indicados: contrachapada, acero, nailon, espuma y tejido de poliéster","Dimensiones mostradas de 69 × 70 × 133.1 cm","Peso mostrado de 18.5 kg"],
    filters:["silla gaming","reposapiés","respaldo ajustable","soporte lumbar","gaming","estudio","trabajo","negro"],
    highlights:["Reposapiés integrado","Respaldo ajustable","Acabado negro tinta"],useCases:["Gaming","Trabajo","Estudio","Escritorio versátil"],
    compatibilityNotes:["Comprobar dimensiones personales, altura del escritorio y espacio disponible"],limitations:["No se atribuyen beneficios médicos ni se afirma que cure molestias","La comodidad depende de postura, medidas y ajustes"],
    connectivity:"No aplica",usage:["gaming","estudio","trabajo","ergonomia"],usageLabel:"Gaming, trabajo y estudio",relatedSlugs:["songmics-obg079g01-gris-paloma","secretlab-titan-evo-regular","ergosolid-brazo-monitor-17-30"],affiliateUrl:"https://link.amazon/B04w87zWX"
  }),
  catalogProduct({
    slug:"samsung-essential-s30gd-27",brand:"Samsung",model:"Essential Monitor S3 S30GD 27 pulgadas",productType:"Monitor IPS para uso diario y gaming casual",title:"Samsung Essential Monitor S3 S30GD 27 pulgadas",category:"Monitores",categorySlug:"monitores-gaming",
    image:"/images/products/monitors/samsung-essential-s30gd-27.jpg",imageAlt:"Monitor Samsung Essential S3 S30GD de 27 pulgadas",
    shortDescription:"Un monitor amplio para estudiar, trabajar y jugar de forma casual, con panel IPS y una frecuencia de 100 Hz que aporta una experiencia más fluida que una pantalla convencional.",
    verifiedSpecs:["Pantalla de 27 pulgadas","Resolución Full HD 1920 × 1080","Panel IPS","Frecuencia de actualización de 100 Hz","Relación de aspecto 16:9","Acabado mate","Diseño sin bordes en tres lados según la ficha"],
    filters:["27 pulgadas","full hd","ips","100 hz","plano","productividad","gaming casual"],highlights:["Panel IPS versátil","Frecuencia de 100 Hz","Formato de 27 pulgadas"],useCases:["Estudio","Productividad","Gaming casual","Escritorio"],
    compatibilityNotes:["Confirmar las conexiones exactas de la variante antes de futuros enlaces comerciales"],limitations:["No está planteado como monitor competitivo de eSports","Las conexiones exactas deben confirmarse"],
    connectivity:"Por confirmar",usage:["estudio","productividad","gaming-ligero"],usageLabel:"Estudio, productividad y gaming casual",relatedSlugs:["msi-mag-27c6f","msi-g255f","ergosolid-brazo-monitor-17-30"],affiliateUrl:"https://link.amazon/B0b9lTuYF"
  }),
  catalogProduct({
    slug:"msi-mag-27c6f",brand:"MSI",model:"MAG 27C6F",productType:"Monitor gaming curvo",title:"MSI MAG 27C6F",category:"Monitores",categorySlug:"monitores-gaming",
    image:"/images/products/monitors/msi-mag-27c6f.jpg",imageAlt:"Monitor gaming curvo MSI MAG 27C6F de 27 pulgadas",
    shortDescription:"Monitor curvo orientado a juegos rápidos, con 180 Hz y sincronización adaptativa para quienes priorizan una sensación de movimiento más fluida.",
    verifiedSpecs:["Pantalla curva de 27 pulgadas","Curvatura 1500R","Resolución Full HD 1920 × 1080","Panel VA rápido","Frecuencia de actualización de 180 Hz","Tiempo de respuesta de hasta 0.5 ms GtG indicado por la ficha","Sincronización adaptativa","DisplayPort 1.2a","HDMI","Acabado mate"],
    filters:["27 pulgadas","full hd","va","180 hz","curvo","gaming"],highlights:["Frecuencia de 180 Hz","Curvatura 1500R","Sincronización adaptativa"],useCases:["Gaming","Juegos rápidos","Setup gaming","Pantalla curva"],
    compatibilityNotes:["Comprobar que la tarjeta gráfica y el cable permiten la frecuencia prevista"],limitations:["La resolución es Full HD, no QHD ni 4K","El color y los ángulos pueden variar frente a un panel IPS"],
    connectivity:"DisplayPort y HDMI",usage:["gaming","rendimiento"],usageLabel:"Gaming, juegos rápidos y setup curvo",relatedSlugs:["msi-g255f","samsung-essential-s30gd-27","ergosolid-brazo-monitor-17-30"],affiliateUrl:"https://link.amazon/B0a0eM9TM"
  }),
  catalogProduct({
    slug:"msi-g255f",brand:"MSI",model:"G255F",productType:"Monitor gaming Rapid IPS",title:"MSI G255F",category:"Monitores",categorySlug:"monitores-gaming",
    image:"/images/products/monitors/msi-g255f.jpg",imageAlt:"Monitor gaming MSI G255F Rapid IPS de 24.5 pulgadas",
    shortDescription:"Una opción enfocada en ritmo rápido y respuesta visual, con tamaño compacto, panel Rapid IPS y 180 Hz para jugar en PC.",
    verifiedSpecs:["Pantalla de 24.5 pulgadas","Resolución Full HD 1920 × 1080","Panel Rapid IPS","Frecuencia de actualización de 180 Hz","Tiempo de respuesta de 1 ms indicado por la ficha","Adaptive-Sync","DisplayPort 1.2a","HDMI 2.0b","Relación de aspecto 16:9"],
    filters:["24-25 pulgadas","full hd","rapid ips","180 hz","plano","gaming competitivo"],highlights:["Panel Rapid IPS","Frecuencia de 180 Hz","Formato compacto de 24.5 pulgadas"],useCases:["Gaming competitivo","FPS","PC gaming","Escritorio compacto"],
    compatibilityNotes:["Comprobar puertos, cable y configuración del equipo para usar la frecuencia prevista"],limitations:["No se afirma compatibilidad con consolas a 120 Hz","No se promete rendimiento competitivo universal"],
    connectivity:"DisplayPort y HDMI",usage:["gaming","competitivo","escritorio-compacto"],usageLabel:"Gaming competitivo, FPS y escritorios compactos",relatedSlugs:["msi-mag-27c6f","samsung-essential-s30gd-27","ergosolid-brazo-monitor-17-30"],affiliateUrl:"https://link.amazon/B01zgoc6i"
  }),
  catalogProduct({
    slug:"logitech-g-pro-x-se",brand:"Logitech G",model:"PRO X SE",productType:"Auriculares gaming con cable",title:"Logitech G PRO X SE",category:"Audio",categorySlug:"audio-gaming",subcategory:"auriculares-gaming",
    image:"/images/products/audio/headsets/logitech-g-pro-x-se.jpg",imageAlt:"Auriculares gaming Logitech G PRO X SE con micrófono desmontable",
    shortDescription:"Auriculares con cable orientados a quienes priorizan una conexión directa, micrófono desmontable y compatibilidad con varias plataformas.",
    verifiedSpecs:["Conexión por cable","Micrófono desmontable","DTS Headphone:X 7.1","DAC USB incluido","Compatible con PC, Xbox One, Xbox Series X|S, PS5 y PS4 según la ficha","Diseño circumaural","Color negro"],
    filters:["cable","micrófono desmontable","dts 7.1","dac usb","usb","pc","consolas","multiplataforma","gaming competitivo","chat de voz"],
    highlights:["Micrófono desmontable","DAC USB incluido","Compatibilidad multiplataforma indicada"],useCases:["Gaming competitivo","PC","Consolas","Chat de voz"],
    compatibilityNotes:["Confirmar las funciones avanzadas disponibles en cada plataforma"],limitations:["Su conexión principal es por cable","Las funciones avanzadas dependen de la plataforma"],
    connectivity:"Cable",usage:["gaming","competitivo","chat-voz"],usageLabel:"Gaming competitivo, PC, consolas y chat",relatedSlugs:["logitech-g522-lightspeed","logitech-g-pro-x-2-lightspeed","maono-dgm20"],affiliateUrl:"https://link.amazon/B05FZkh0O"
  }),
  catalogProduct({
    slug:"logitech-g522-lightspeed",brand:"Logitech G",model:"G522 LIGHTSPEED",productType:"Auriculares gaming inalámbricos",title:"Logitech G G522 LIGHTSPEED",category:"Audio",categorySlug:"audio-gaming",subcategory:"auriculares-gaming",
    image:"/images/products/audio/headsets/logitech-g522-lightspeed.jpg",imageAlt:"Auriculares inalámbricos Logitech G G522 LIGHTSPEED con iluminación RGB",
    shortDescription:"Una opción inalámbrica para quienes alternan entre juego, escritorio y dispositivos compatibles, con conectividad múltiple e iluminación personalizable.",
    verifiedSpecs:["Conectividad inalámbrica LIGHTSPEED","Bluetooth","Conexión USB-A a USB-C indicada por la ficha","Micrófono integrado","Iluminación LIGHTSYNC RGB","Ocho zonas de iluminación personalizables indicadas por la ficha","Diseño circumaural","Color negro"],
    filters:["inalámbrico","bluetooth","usb","micrófono integrado","pc","rgb","gaming","movilidad"],
    highlights:["Conectividad LIGHTSPEED","Bluetooth","Iluminación LIGHTSYNC RGB"],useCases:["Gaming","Uso híbrido","PC","Movilidad"],
    compatibilityNotes:["Comprobar compatibilidad de LIGHTSPEED, Bluetooth y USB con cada dispositivo"],limitations:["La autonomía depende de la conexión y la iluminación","No se muestra una duración exacta de batería"],
    connectivity:"Inalámbrico",usage:["gaming","uso-hibrido","movilidad"],usageLabel:"Gaming, uso híbrido y movilidad",relatedSlugs:["logitech-g-pro-x-se","logitech-g-pro-x-2-lightspeed","trust-gxt-236-yami"],affiliateUrl:"https://link.amazon/B09YlqUPE"
  }),
  catalogProduct({
    slug:"logitech-g-pro-x-2-lightspeed",brand:"Logitech G",model:"PRO X 2 LIGHTSPEED",productType:"Auriculares gaming inalámbricos profesionales",title:"Logitech G PRO X 2 LIGHTSPEED",category:"Audio",categorySlug:"audio-gaming",subcategory:"auriculares-gaming",
    image:"/images/products/audio/headsets/logitech-g-pro-x-2-lightspeed.jpg",imageAlt:"Auriculares Logitech G PRO X 2 LIGHTSPEED con micrófono desmontable",
    shortDescription:"Auriculares de conectividad flexible para usuarios que quieren alternar entre conexión inalámbrica, USB y auxiliar sin renunciar a un micrófono desmontable.",
    verifiedSpecs:["Conectividad inalámbrica LIGHTSPEED","Bluetooth","Conexión USB","Entrada auxiliar de 3.5 mm","Micrófono de brazo desmontable","Transductores de grafeno de 50 mm","DTS Headphone:X 2.0 y sonido envolvente 7.1 indicados por la ficha","Compatible con PC, PS5, PS4 y Nintendo Switch según la ficha","Diseño circumaural"],
    filters:["inalámbrico","bluetooth","usb","3.5 mm","micrófono desmontable","50 mm","pc","consolas","multiplataforma","gaming competitivo"],
    highlights:["Conectividad flexible","Transductores de grafeno de 50 mm","Micrófono desmontable"],useCases:["Gaming competitivo","PC","Consolas","Uso multiplataforma"],
    compatibilityNotes:["Verificar las funciones concretas disponibles en cada plataforma y conexión"],limitations:["Algunas funciones dependen de la conexión elegida","La compatibilidad debe confirmarse por plataforma"],
    connectivity:"Inalámbrico",usage:["gaming","competitivo","multiplataforma"],usageLabel:"Gaming competitivo y multiplataforma",relatedSlugs:["logitech-g-pro-x-se","logitech-g522-lightspeed","maono-pd100x-kit"],affiliateUrl:"https://link.amazon/B02mUyQuh"
  }),
  catalogProduct({
    slug:"maono-pd100x-kit",brand:"MAONO",model:"PD100X con brazo",productType:"Micrófono dinámico USB/XLR con brazo",title:"MAONO PD100X con brazo",category:"Audio",categorySlug:"audio-gaming",subcategory:"microfonos-streaming",
    image:"/images/products/audio/microphones/maono-pd100x-kit.jpg",imageAlt:"Kit de micrófono dinámico MAONO PD100X con brazo articulado",
    shortDescription:"Micrófono dinámico con conexiones USB y XLR para quien quiere empezar con un montaje sencillo y conservar opciones de expansión.",
    verifiedSpecs:["Micrófono dinámico","Conexión USB y XLR","Iluminación RGB controlable por software según la ficha","Brazo articulado incluido en la variante mostrada","Orientado a streaming, podcast y estudio doméstico","Color negro"],
    filters:["dinámico","usb","xlr","rgb","brazo incluido","streaming","podcast","gaming"],
    highlights:["Conexión USB o XLR","Brazo incluido en la variante mostrada","RGB configurable según la ficha"],useCases:["Streaming","Podcast","Gaming","Voz"],
    compatibilityNotes:["Confirmar que la variante exacta incluye el brazo","Verificar requisitos de la conexión XLR"],limitations:["El brazo debe confirmarse antes de futuros enlaces externos","No se afirma compatibilidad con software no confirmado"],
    connectivity:"USB y XLR",usage:["streaming","podcast","gaming","voz"],usageLabel:"Streaming, podcast, gaming y voz",relatedSlugs:["maono-dgm20","trust-gxt-236-yami","logitech-g-pro-x-2-lightspeed"],affiliateUrl:"https://link.amazon/B067sMp9O"
  }),
  catalogProduct({
    slug:"maono-dgm20",brand:"MAONO",model:"DGM20",productType:"Micrófono USB de condensador",title:"MAONO DGM20",category:"Audio",categorySlug:"audio-gaming",subcategory:"microfonos-streaming",
    image:"/images/products/audio/microphones/maono-dgm20.jpg",imageAlt:"Micrófono USB de condensador MAONO DGM20 con iluminación RGB",
    shortDescription:"Micrófono USB pensado para un escritorio de creación de contenido, con controles accesibles y una instalación directa.",
    verifiedSpecs:["Micrófono USB de condensador","Cancelación de ruido indicada por la ficha","Iluminación RGB controlable","Botón de silencio","Control de ganancia","Compatible con PS5, PS4 y Mac según la ficha","Uso orientado a streaming, podcast y estudio doméstico","Conexión USB o USB Tipo-C indicada por la ficha"],
    filters:["condensador","usb","rgb","botón de silencio","control de ganancia","streaming","podcast","gaming","videollamadas"],
    highlights:["Botón de silencio","Control de ganancia","Iluminación RGB configurable"],useCases:["Streaming","Podcast","Gaming","Videollamadas"],
    compatibilityNotes:["Confirmar los cables y adaptadores incluidos en cada variante"],limitations:["No sustituye el tratamiento acústico del espacio","La cancelación indicada depende de la configuración"],
    connectivity:"USB",usage:["streaming","podcast","gaming","videollamadas"],usageLabel:"Streaming, podcast, gaming y videollamadas",relatedSlugs:["maono-pd100x-kit","trust-gxt-236-yami","logitech-g522-lightspeed"],affiliateUrl:"https://link.amazon/B0aCoEpBE"
  }),
  catalogProduct({
    slug:"trust-gxt-236-yami",brand:"Trust",model:"GXT 236 Yami",productType:"Micrófono USB de condensador cardioide",title:"Trust GXT 236 Yami",category:"Audio",categorySlug:"audio-gaming",subcategory:"microfonos-streaming",
    image:"/images/products/audio/microphones/trust-gxt-236-yami.jpg",imageAlt:"Micrófono USB Trust GXT 236 Yami con iluminación RGB",
    shortDescription:"Micrófono USB compacto para iniciarse en streaming, llamadas o contenido de voz con controles simples desde el escritorio.",
    verifiedSpecs:["Modelo GXT 236 Yami","Conexión USB Tipo-A","Patrón de grabación cardioide indicado por la ficha","Iluminación LED RGB","Botón de silencio","Orientado a creación de contenido, podcast, streaming, videollamadas y gaming","Color negro"],
    filters:["condensador","usb","cardioide","rgb","botón de silencio","streaming","podcast","gaming","videollamadas"],
    highlights:["Patrón cardioide","Botón de silencio","RGB y conexión USB directa"],useCases:["Podcast","Streaming","Videollamadas","Gaming"],
    compatibilityNotes:["Comprobar disponibilidad de puerto USB Tipo-A"],limitations:["El resultado depende del ruido y la acústica","No se promete calidad profesional ni aislamiento total"],
    connectivity:"USB",usage:["podcast","streaming","videollamadas","gaming"],usageLabel:"Podcast, streaming, videollamadas y gaming",relatedSlugs:["maono-dgm20","maono-pd100x-kit","logitech-g-pro-x-se"],affiliateUrl:"https://link.amazon/B0ddPAdXo"
  }),
  catalogProduct({
    slug:"asus-tuf-gaming-k1",brand:"ASUS",model:"TUF Gaming K1",productType:"Teclado gaming de tamaño completo",title:"ASUS TUF Gaming K1",category:"Teclados",categorySlug:"teclados-mecanicos",
    image:"/images/products/keyboards/asus-tuf-gaming-k1.jpg",imageAlt:"Teclado ASUS TUF Gaming K1 de tamaño completo con iluminación RGB",
    shortDescription:"Teclado completo pensado para quien quiere controles rápidos, iluminación configurable y una distribución española para jugar o trabajar.",
    verifiedSpecs:["Distribución QWERTY española","Iluminación RGB","Control de volumen dedicado","Barra de luz lateral","Resistencia a salpicaduras","Conexión USB","Compatible con Armoury Crate","Teclas programables y macros según configuración compatible"],
    filters:["completo","español","usb","rgb"],highlights:["Formato completo con bloque numérico","Control de volumen accesible","Iluminación RGB personalizable"],useCases:["Gaming","Escritura","Uso diario"],
    compatibilityNotes:["Verificar compatibilidad de Armoury Crate con el sistema operativo"],limitations:["Ocupa más espacio que un teclado compacto","La programación depende de una configuración compatible"],
    connectivity:"USB",usage:["gaming","escritura","uso-diario"],usageLabel:"Gaming, escritura y uso diario",relatedSlugs:["krom-kasic-tkl","mars-gaming-mk60","mars-gaming-mmw3"],affiliateUrl:"https://link.amazon/B07YCJYGd"
  }),
  catalogProduct({
    slug:"krom-kasic-tkl",brand:"KROM",model:"KASIC TKL",productType:"Teclado mecánico TKL",title:"KROM KASIC TKL",category:"Teclados",categorySlug:"teclados-mecanicos",
    image:"/images/products/keyboards/krom-kasic-tkl.jpg",imageAlt:"Teclado mecánico KROM KASIC TKL con iluminación Rainbow",
    shortDescription:"Una alternativa compacta para liberar espacio en el escritorio sin renunciar a las teclas esenciales para jugar y escribir.",
    verifiedSpecs:["Formato tenkeyless sin bloque numérico","Layout español","Switches rojos","Iluminación Rainbow","25 teclas anti-ghosting","12 funciones multimedia","Modo juego","Conexión USB"],
    filters:["tkl","español","usb","switch rojo","rainbow"],highlights:["Formato TKL compacto","Switches rojos lineales","Funciones multimedia y modo juego"],useCases:["Gaming","Escritorio compacto","Estudio"],
    compatibilityNotes:["Confirmar que el formato sin bloque numérico encaja con el uso previsto"],limitations:["No incluye bloque numérico","La iluminación Rainbow no equivale a RGB individual configurable"],
    connectivity:"USB",usage:["gaming","estudio","escritorio-compacto"],usageLabel:"Gaming, estudio y escritorios compactos",relatedSlugs:["asus-tuf-gaming-k1","mars-gaming-mk60","mars-gaming-mm024"],affiliateUrl:"https://link.amazon/B031lfW45"
  }),
  catalogProduct({
    slug:"mars-gaming-mk60",brand:"Mars Gaming",model:"MK60",productType:"Teclado mecánico compacto 60%",title:"Mars Gaming MK60",category:"Teclados",categorySlug:"teclados-mecanicos",
    image:"/images/products/keyboards/mars-gaming-mk60.jpg",imageAlt:"Teclado mecánico compacto Mars Gaming MK60 con distribución italiana",
    shortDescription:"Teclado ultracompacto para quien prioriza espacio libre y portabilidad, con una advertencia importante sobre su distribución.",
    verifiedSpecs:["Formato ultracompacto 60%","Switches rojos","Iluminación Rainbow RGB","Teclas de doble inyección","Anti-ghosting","Modo juego","Conexión USB 2.0","Distribución italiana según la ficha consultada"],
    filters:["60%","italiano","usb","switch rojo","rainbow","rgb"],highlights:["Formato 60%","Teclas de doble inyección","Iluminación Rainbow"],useCases:["Gaming","Movilidad","Escritorio pequeño"],
    compatibilityNotes:["Esta versión utiliza distribución italiana; confirma que encaja con tu forma de escribir antes de elegirla."],limitations:["No es la primera opción para quien necesita teclado español","No incluye bloque numérico"],
    connectivity:"USB",usage:["gaming","movilidad","escritorio-compacto"],usageLabel:"Gaming, movilidad y escritorios pequeños",relatedSlugs:["krom-kasic-tkl","asus-tuf-gaming-k1","mars-gaming-mmw3"],affiliateUrl:"https://link.amazon/B0ck6JlLv"
  }),
  catalogProduct({
    slug:"mars-gaming-mmw3",brand:"Mars Gaming",model:"MMW3",productType:"Ratón gaming inalámbrico ultraligero",title:"Mars Gaming MMW3",category:"Ratones",categorySlug:"ratones-gaming",
    image:"/images/products/mice/mars-gaming-mmw3.jpg",imageAlt:"Ratón inalámbrico Mars Gaming MMW3 con diseño perforado e iluminación",
    shortDescription:"Ratón inalámbrico ligero para quienes prefieren libertad de movimiento y un diseño perforado con iluminación.",
    verifiedSpecs:["Conectividad inalámbrica de 2.4 GHz mediante receptor USB","Diseño tipo Hive con perforaciones","Iluminación RGB Flow","Sensor de hasta 3200 DPI","Switches mecánicos HUANO","Batería recargable"],
    filters:["inalámbrico","hasta 3200 dpi","rgb","gaming","movilidad"],highlights:["Receptor USB de 2.4 GHz","Hasta 3200 DPI","Diseño ligero tipo Hive"],useCases:["Gaming","Movilidad","Escritorio limpio"],
    compatibilityNotes:["Confirmar disponibilidad de un puerto USB para el receptor"],limitations:["Requiere gestionar la carga de batería","No se confirma conectividad Bluetooth"],
    connectivity:"Inalámbrico",usage:["gaming","movilidad"],usageLabel:"Gaming, movilidad y escritorio limpio",relatedSlugs:["mars-gaming-mm024","redragon-m810-pro","mars-gaming-mk60"],affiliateUrl:"https://link.amazon/B0gzLVBxc"
  }),
  catalogProduct({
    slug:"mars-gaming-mm024",brand:"Mars Gaming",model:"MM024",productType:"Ratón gaming con cable",title:"Mars Gaming MM024",category:"Ratones",categorySlug:"ratones-gaming",
    image:"/images/products/mice/mars-gaming-mm024.jpg",imageAlt:"Ratón gaming con cable Mars Gaming MM024 con iluminación RGB",
    shortDescription:"Una opción con cable para quien prioriza conexión directa, varios niveles de sensibilidad y no quiere preocuparse por cargar batería.",
    verifiedSpecs:["Conexión USB","Sensor óptico de hasta 4000 DPI","Niveles DPI de 1200, 2400, 3200 y 4000","Switches mecánicos HUANO","Iluminación RGB Flow","Diseño ergonómico"],
    filters:["cable","hasta 4000 dpi","rgb","gaming","precisión"],highlights:["Cuatro niveles de DPI","Conexión USB directa","Iluminación RGB Flow"],useCases:["Gaming","Precisión","Uso de escritorio"],
    compatibilityNotes:["Comprobar que el cable encaja con la distribución del escritorio"],limitations:["El cable limita la libertad de movimiento","El peso no está confirmado"],
    connectivity:"USB",usage:["gaming","precision","uso-escritorio"],usageLabel:"Gaming, precisión y uso de escritorio",relatedSlugs:["mars-gaming-mmw3","redragon-m810-pro","krom-kasic-tkl"],affiliateUrl:"https://link.amazon/B03UgZd4t"
  }),
  catalogProduct({
    slug:"redragon-m810-pro",brand:"Redragon",model:"M810 Pro",productType:"Ratón gaming inalámbrico de modo dual",title:"Redragon M810 Pro",category:"Ratones",categorySlug:"ratones-gaming",
    image:"/images/products/mice/redragon-m810-pro.jpg",imageAlt:"Ratón gaming Redragon M810 Pro con modo cableado e inalámbrico",
    shortDescription:"Ratón de modo dual para quien busca más controles, sensibilidad ajustable y la opción de utilizarlo con o sin cable.",
    verifiedSpecs:["Conectividad inalámbrica de 2.4 GHz","Uso con cable e inalámbrico","Sensor óptico de hasta 10 000 DPI","8 botones","Iluminación RGB","Hasta 45 horas de uso continuo indicado por la ficha"],
    filters:["modo dual","inalámbrico","cable","hasta 10000 dpi","rgb","gaming"],highlights:["Uso cableado o inalámbrico","Hasta 10 000 DPI","Ocho botones"],useCases:["Gaming","Accesos rápidos","Alternar cable e inalámbrico"],
    compatibilityNotes:["Comprobar puertos y compatibilidad del receptor USB"],limitations:["La autonomía cambia según iluminación, uso y configuración","Las 45 horas son una referencia de la ficha, no una duración garantizada"],
    connectivity:"Inalámbrico",usage:["gaming","precision","accesos-rapidos"],usageLabel:"Gaming y alternancia entre cable e inalámbrico",relatedSlugs:["mars-gaming-mmw3","mars-gaming-mm024","asus-tuf-gaming-k1"],affiliateUrl:"https://link.amazon/A08lSrm2F"
  }),
  realLaptop({
    slug:"asus-vivobook-15-f1504va-bq253w",brand:"ASUS",model:"Vivobook 15 F1504VA-BQ253W",title:"ASUS Vivobook 15 F1504VA-BQ253W",
    productType:"Portátil Full HD de 15.6 pulgadas para multitarea",image:"/images/imagenes/laptop-1.jpg",imageAlt:"Laptop ASUS Vivobook 15 F1504VA-BQ253W con pantalla Full HD de 15.6 pulgadas",
    verifiedSpecs:["Pantalla de 15.6 pulgadas Full HD","Intel Core 7 150U","16 GB de RAM","SSD de 1 TB","Windows 11 Home","Teclado QWERTY español"],
    tags:["Intel Core 7 150U","16 GB de RAM","SSD de 1 TB"],recommendedUse:["Estudio","Productividad","Multitarea","Uso diario exigente"],
    shortDescription:"Combina memoria amplia y almacenamiento de 1 TB para estudiar, trabajar y gestionar varias tareas cotidianas.",
    longDescription:"Una opción orientada a quienes necesitan una pantalla Full HD, capacidad para multitarea y espacio de almacenamiento para documentos y aplicaciones.",
    editorialVerdict:"Encaja con estudio y productividad exigente; antes de elegir, confirma que la variante mantenga el teclado español y la configuración indicada.",
    affiliateUrl:"https://link.amazon/B07XHQGGx",connectivity:"Por confirmar",
    relatedProductIds:["asus-vivobook-15-m1502naq-bq045w","lenovo-ideapad-slim-3-gen-10","acer-aspire-go-15-ag15-72p-52up"],featured:true
  }),
  realLaptop({
    slug:"asus-vivobook-15-m1502naq-bq045w",brand:"ASUS",model:"Vivobook 15 M1502NAQ-BQ045W",title:"ASUS Vivobook 15 M1502NAQ-BQ045W",
    productType:"Equipo Full HD con gráficos Radeon 660M",image:"/images/imagenes/laptop-2.jpg",imageAlt:"Laptop ASUS Vivobook 15 M1502NAQ-BQ045W con pantalla Full HD y gráficos Radeon 660M",
    verifiedSpecs:["Pantalla de 15.6 pulgadas Full HD","AMD Ryzen 5 150","16 GB de RAM","SSD de 512 GB","Gráficos Radeon 660M","Windows 11 Home","Teclado QWERTY español"],
    tags:["AMD Ryzen 5 150","Radeon 660M","SSD de 512 GB"],recommendedUse:["Productividad","Estudio","Navegación","Tareas creativas ligeras"],
    shortDescription:"Ofrece una configuración equilibrada para productividad, navegación y trabajos creativos ligeros en una pantalla Full HD.",
    longDescription:"Pensada para estudio y trabajo diario, combina 16 GB de memoria con almacenamiento SSD y gráficos integrados Radeon 660M.",
    editorialVerdict:"Puede encajar en productividad y creación ligera; comprueba que las aplicaciones previstas se ajusten a sus gráficos integrados.",
    affiliateUrl:"https://link.amazon/B08Rxjmi2",connectivity:"Por confirmar",
    relatedProductIds:["asus-vivobook-15-f1504va-bq253w","lenovo-ideapad-slim-3-gen-10","acer-aspire-go-15-ag15-72p-52up"]
  }),
  realLaptop({
    slug:"lenovo-ideapad-slim-3-gen-10",brand:"Lenovo",model:"IdeaPad Slim 3 Gen 10",title:"Lenovo IdeaPad Slim 3 Gen 10",
    productType:"Portátil WUXGA con Wi-Fi 6 y USB-C",image:"/images/imagenes/laptop-3.jpg",imageAlt:"Laptop Lenovo IdeaPad Slim 3 Gen 10 con pantalla WUXGA de 15.3 pulgadas",
    verifiedSpecs:["Pantalla de 15.3 pulgadas WUXGA","Intel Core i5-13420H","16 GB de RAM","SSD de 512 GB","Wi-Fi 6","USB-C","Windows 11 Home","Teclado QWERTY español"],
    tags:["Pantalla WUXGA","Intel Core i5-13420H","Wi-Fi 6 y USB-C"],recommendedUse:["Productividad","Estudios","Multitarea","Creación de contenido ligera"],
    shortDescription:"Su pantalla WUXGA y conectividad moderna están pensadas para estudiar, trabajar y crear contenido ligero.",
    longDescription:"Una alternativa para usuarios que valoran multitarea, formato panorámico y conexiones Wi-Fi 6 y USB-C en el trabajo cotidiano.",
    editorialVerdict:"Resulta adecuada para productividad y creación ligera; revisa puertos y requisitos de tus aplicaciones antes de elegir.",
    affiliateUrl:"https://link.amazon/B06HEAAOK",connectivity:"Wi-Fi 6 y USB-C",
    relatedProductIds:["asus-vivobook-15-f1504va-bq253w","asus-vivobook-15-m1502naq-bq045w","acer-aspire-go-15-ag15-72p-52up"]
  }),
  realLaptop({
    slug:"hp-laptop-14-intel-n4120",brand:"HP",model:"Laptop 14 con Intel N4120",title:"HP Laptop 14 con Intel N4120",
    productType:"Equipo compacto para estudio y tareas básicas",image:"/images/imagenes/laptop-4.jpg",imageAlt:"Laptop HP de 14 pulgadas con procesador Intel N4120 para estudio y tareas básicas",
    verifiedSpecs:["Pantalla HD de 14 pulgadas","Intel Quad-Core N4120","16 GB DDR4 de RAM","64 GB eMMC","Wi-Fi","HDMI","Windows 11 Home","Office 365 incluido según la ficha del producto"],
    tags:["Pantalla HD de 14 pulgadas","16 GB DDR4","64 GB eMMC"],recommendedUse:["Navegación","Estudio","Documentos","Tareas básicas"],
    shortDescription:"Una alternativa compacta para navegación, documentos y actividades académicas que no requieren procesamiento intensivo.",
    longDescription:"Está orientada a tareas básicas y movilidad cotidiana; su almacenamiento eMMC debe valorarse según la cantidad de archivos y aplicaciones necesarias.",
    editorialVerdict:"Encaja mejor con estudio y ofimática básica; no está planteada para gaming ni edición pesada.",
    affiliateUrl:"https://link.amazon/B0bSMnew2",connectivity:"Wi-Fi y HDMI",
    relatedProductIds:["acer-aspire-go-15-ag15-72p-52up","asus-vivobook-15-m1502naq-bq045w","lenovo-ideapad-slim-3-gen-10"]
  }),
  realLaptop({
    slug:"acer-aspire-go-15-ag15-72p-52up",brand:"Acer",model:"Aspire Go 15 AG15-72P-52UP",title:"Acer Aspire Go 15 AG15-72P-52UP",
    productType:"Portátil IPS para productividad y oficina",image:"/images/imagenes/laptop-5.jpg",imageAlt:"Laptop Acer Aspire Go 15 AG15-72P-52UP con pantalla IPS Full HD de 15.6 pulgadas",
    verifiedSpecs:["Pantalla de 15.6 pulgadas Full HD IPS","Intel Core 5 120U","16 GB de RAM","SSD de 512 GB","Gráficos Intel","Windows 11 Home","Teclado QWERTY español"],
    tags:["Pantalla Full HD IPS","Intel Core 5 120U","16 GB de RAM"],recommendedUse:["Estudiantes","Productividad","Oficina","Uso doméstico avanzado"],
    shortDescription:"Una configuración versátil para estudio, oficina y uso doméstico avanzado con pantalla IPS Full HD.",
    longDescription:"Combina memoria de 16 GB y almacenamiento SSD para usuarios que buscan fluidez cotidiana en documentos, navegación y productividad.",
    editorialVerdict:"Es una opción equilibrada para estudiantes y oficina; confirma la conectividad concreta de la variante antes de comprar.",
    affiliateUrl:"https://link.amazon/B0hiDOTf2",connectivity:"Por confirmar",
    relatedProductIds:["lenovo-ideapad-slim-3-gen-10","asus-vivobook-15-f1504va-bq253w","hp-laptop-14-intel-n4120"]
  }),
  {
    ...shared,
    status: "hidden",
    id: "uowamou-btc501-15-6", slug: "uowamou-btc501-15-6", brand: "UOWAMOU", model: "BTC501",
    productType: "Laptop para estudio y productividad", verificationStatus: "verified",
    title: "UOWAMOU BTC501 15.6 pulgadas",
    analysisTitle: "UOWAMOU BTC501: pantalla amplia para estudio y productividad",
    shortDescription: "Laptop amplia para estudiar, navegar y trabajar con documentos; conviene revisar soporte, garantía y configuración final antes de elegirla.",
    orientationText: "Pensada para estudio, documentos, navegación y productividad cotidiana.",
    category: "Laptops", categorySlug: "laptops-gaming",
    image: "/images/laptop1_.jpg", imageAlt: "Laptop UOWAMOU BTC501 de 15.6 pulgadas",
    verifiedSpecs: ["Pantalla IPS Full HD de 15.6 pulgadas, 1920 × 1080", "Intel N5095 de cuatro núcleos", "16 GB de RAM", "SSD de 512 GB", "Gráficos Intel UHD integrados", "Windows 11 Pro", "Teclado retroiluminado", "USB, HDMI, microSD y conector de auriculares declarados"],
    features: ["Pantalla IPS Full HD", "16 GB de RAM", "SSD de 512 GB"],
    recommendedFor: ["Estudio y elaboración de documentos", "Navegación y gestión cotidiana", "Productividad de oficina"],
    advantages: ["Pantalla de 15.6 pulgadas para trabajar con comodidad", "Memoria y almacenamiento declarados para multitarea cotidiana", "Conectividad física variada según el listado"],
    limitations: ["Confirmar el tipo exacto de memoria", "No se confirma lector de huellas, cámara ni autonomía", "Conviene revisar soporte, garantía y configuración final"],
    purchaseCriteria: ["Confirmar la configuración exacta", "Revisar soporte y garantía", "Comprobar puertos y compatibilidad", "Valorar el procesador según las aplicaciones previstas"],
    commonMistakes: ["Asumir funciones no documentadas", "Confundir capacidad declarada con rendimiento garantizado", "No comprobar la variante final"],
    nexbyteCriteria: ["Especificaciones principales identificables", "Formato adecuado para estudio y productividad", "Puertos declarados para uso cotidiano"],
    neutralRecommendation: "Puede encajar en estudio, navegación y documentos. Confirma el tipo de memoria, el soporte y la configuración final antes de elegirla.",
    analysisUrl: "/analisis/uowamou-btc501-15-6", guideUrl: "/guias/elegir-laptop-gaming",
    connectivity: "Wi‑Fi", usage: ["estudio", "productividad", "pantalla-amplia"], usageLabel:"Estudio, documentos y navegación", featured: false,
    relatedSlugs: ["lenovo-ideapad-5-16-2-in-1-8845hs", "hillsusu-ny-12-15-6", "dunhoo-y-10-pro-16"],
  },
  {
    ...shared,
    status: "hidden",
    id:"hillsusu-ny-12-15-6",slug:"hillsusu-ny-12-15-6",brand:"HILLSUSU",model:"NY-12",productType:"Laptop para negocio, estudio y productividad",verificationStatus:"needsVariantVerification",
    configurationNotice:"La captura muestra configuraciones distintas de almacenamiento; confirmar la variante exacta antes de publicarla como especificación definitiva.",
    title:"HILLSUSU NY-12 15.6 pulgadas",analysisTitle:"HILLSUSU NY-12: una opción para oficina y estudio",
    shortDescription:"Una opción centrada en tareas de oficina, estudio y gestión diaria; la configuración exacta debe revisarse antes de compararla.",orientationText:"Orientada a productividad, estudio y multitarea ligera.",
    category:"Laptops",categorySlug:"laptops-gaming",image:"/images/laptop2.jpg",imageAlt:"Laptop HILLSUSU NY-12 de 15.6 pulgadas",
    verifiedSpecs:["Pantalla de 15.6 pulgadas","Intel Core i5-7Y54","Windows 11 Pro","Refrigeración por ventilador declarada","Garantía de dos años declarada en el listado"],
    features:["Pantalla de 15.6 pulgadas","Intel Core i5-7Y54","Configuración por confirmar"],
    recommendedFor:["Productividad de oficina","Estudio","Multitarea ligera"],advantages:["Pantalla amplia para documentos","Windows 11 Pro declarado","Refrigeración activa declarada"],
    limitations:["Configuración de almacenamiento por confirmar","No se debe asumir RAM o capacidad final","La garantía declarada debe comprobarse con el proveedor"],
    purchaseCriteria:["Confirmar RAM y almacenamiento de la variante","Revisar condiciones de garantía","Comprobar conectividad y puertos","Valorar el procesador para las aplicaciones previstas"],
    commonMistakes:["Mezclar datos de variantes distintas","Publicar una capacidad no confirmada","Asumir rendimiento por la familia del procesador"],
    nexbyteCriteria:["Uso de oficina claramente planteado","Pantalla amplia","Necesidad de verificar la variante antes de comparar"],
    neutralRecommendation:"Puede considerarse para estudio y gestión diaria, pero la variante exacta de memoria y almacenamiento debe confirmarse primero.",
    analysisUrl:"/analisis/hillsusu-ny-12-15-6",guideUrl:"/guias/elegir-laptop-gaming",connectivity:"Por confirmar",usage:["estudio","productividad","multitarea","pantalla-amplia"],usageLabel:"Negocio, estudio y productividad",featured:false,
    relatedSlugs:["uowamou-btc501-15-6","dunhoo-y-10-pro-16","funyet-ny-03-16"],
  },
  {
    ...shared,
    status: "hidden",
    id:"dunhoo-y-10-pro-16",slug:"dunhoo-y-10-pro-16",brand:"DUNHOO",model:"Y-10 PRO",productType:"Laptop para productividad y estudio",verificationStatus:"verified",
    title:"DUNHOO Y-10 PRO 16 pulgadas",analysisTitle:"DUNHOO Y-10 PRO: pantalla de 16 pulgadas para productividad",
    shortDescription:"Equipo de pantalla amplia pensado para productividad y estudio; sus especificaciones deben evaluarse por rendimiento real, soporte y compatibilidad.",orientationText:"Pensada para productividad, estudio, navegación y tareas diarias.",
    category:"Laptops",categorySlug:"laptops-gaming",image:"/images/laptop3.jpg",imageAlt:"Laptop DUNHOO Y-10 PRO de 16 pulgadas",
    verifiedSpecs:["Pantalla IPS Full HD de 16 pulgadas","Intel Core i5-8210Y","Hasta 3.6 GHz según el listado","16 GB de RAM","SSD de 512 GB","Wi‑Fi y Bluetooth declarados","USB-C, USB, HDMI, lector TF y conector de auriculares declarados"],
    features:["Pantalla IPS de 16 pulgadas","16 GB de RAM","SSD de 512 GB"],recommendedFor:["Productividad y documentos","Estudio","Navegación y tareas diarias"],
    advantages:["Área de visualización amplia","Memoria y SSD declarados para multitarea cotidiana","Variedad de puertos declarada"],
    limitations:["No debe presentarse como laptop gaming","Conviene evaluar el rendimiento real del procesador","Soporte y compatibilidad deben confirmarse"],
    purchaseCriteria:["Comprobar soporte y garantía","Revisar compatibilidad de puertos","Valorar rendimiento para las aplicaciones previstas","Confirmar la configuración final"],
    commonMistakes:["Usar la etiqueta gaming del listado","Asumir rendimiento solo por la frecuencia máxima","No comprobar soporte posterior"],
    nexbyteCriteria:["Pantalla amplia","Conectividad declarada","Configuración útil para productividad cotidiana"],
    neutralRecommendation:"Su formato puede encajar con productividad y estudio. Revisa rendimiento real, soporte y compatibilidad antes de elegirla.",
    analysisUrl:"/analisis/dunhoo-y-10-pro-16",guideUrl:"/guias/elegir-laptop-gaming",connectivity:"Wi‑Fi",usage:["estudio","productividad","multitarea","pantalla-amplia"],usageLabel:"Productividad, estudio y tareas diarias",featured:false,
    relatedSlugs:["funyet-ny-03-16","uowamou-btc501-15-6","lenovo-ideapad-5-16-2-in-1-8845hs"],
  },
  {
    ...shared,
    status: "hidden",
    id:"funyet-ny-03-16",slug:"funyet-ny-03-16",brand:"FUNYET",model:"NY-03",productType:"Laptop para estudio y productividad",verificationStatus:"verified",
    title:"FUNYET NY-03 16 pulgadas",analysisTitle:"FUNYET NY-03: formato amplio para el trabajo cotidiano",
    shortDescription:"Una laptop para tareas de oficina, estudio y navegación, con pantalla amplia y almacenamiento SSD para el trabajo cotidiano.",orientationText:"Orientada a estudio, ofimática, productividad y navegación.",
    category:"Laptops",categorySlug:"laptops-gaming",image:"/images/laptop4.jpg",imageAlt:"Laptop FUNYET NY-03 de 16 pulgadas",
    verifiedSpecs:["Pantalla IPS Full HD de 16 pulgadas","Intel Celeron N100","Hasta 3.4 GHz según el listado","16 GB de RAM","SSD de 512 GB","Windows 11 Pro","Teclado retroiluminado declarado","Lector de huellas declarado"],
    features:["Pantalla IPS de 16 pulgadas","16 GB de RAM","SSD de 512 GB"],recommendedFor:["Estudio y ofimática","Productividad cotidiana","Navegación"],
    advantages:["Pantalla amplia para documentos","SSD y memoria declarados para tareas cotidianas","Teclado retroiluminado y lector de huellas declarados"],
    limitations:["No está planteada para gaming exigente","La frecuencia máxima no representa rendimiento sostenido","Conviene confirmar soporte y configuración final"],
    purchaseCriteria:["Valorar el procesador según el uso","Confirmar configuración y soporte","Revisar pantalla y puertos","Comprobar condiciones de garantía"],
    commonMistakes:["Esperar rendimiento de una laptop gaming","Elegir solo por RAM y SSD","No revisar soporte y garantía"],
    nexbyteCriteria:["Formato amplio","Configuración declarada para productividad","Funciones de acceso y teclado declaradas"],
    neutralRecommendation:"Puede servir para ofimática, estudio y navegación. Evalúa el procesador según tus aplicaciones y confirma la configuración final.",
    analysisUrl:"/analisis/funyet-ny-03-16",guideUrl:"/guias/elegir-laptop-gaming",connectivity:"Wi‑Fi",usage:["estudio","productividad","pantalla-amplia"],usageLabel:"Estudio, ofimática y navegación",featured:false,
    relatedSlugs:["dunhoo-y-10-pro-16","hillsusu-ny-12-15-6","lenovo-ideapad-5-16-2-in-1-8845hs"],
  },
  {
    ...shared,
    status: "hidden",
    id:"lenovo-ideapad-5-16-2-in-1-8845hs",slug:"lenovo-ideapad-5-16-2-in-1-8845hs",brand:"Lenovo",model:"IdeaPad 5 16 2-in-1",productType:"Laptop convertible para productividad y creación",verificationStatus:"verified",
    title:"Lenovo IdeaPad 5 16 2-in-1 con Ryzen 7 8845HS",analysisTitle:"Lenovo IdeaPad 5 16 2-in-1: flexibilidad para crear y trabajar",
    shortDescription:"Convertible de formato amplio para quien prioriza pantalla táctil, multitarea, creación y flexibilidad de uso.",orientationText:"Pensada para productividad avanzada, creación, estudio y multitarea.",
    category:"Laptops",categorySlug:"laptops-gaming",image:"/images/laptop5.jpg",imageAlt:"Lenovo IdeaPad 5 16 2-in-1 con procesador Ryzen 7",
    verifiedSpecs:["Diseño convertible 2 en 1","Pantalla táctil WUXGA de 16 pulgadas","Resolución 1920 × 1200 declarada","AMD Ryzen 7 8845HS","16 GB de RAM","SSD de 1 TB","Gráficos AMD Radeon 780M integrados","Windows 11","Cámara web de 1080p declarada","Lector de huellas y teclado retroiluminado declarados"],
    features:["Convertible 2 en 1","Ryzen 7 8845HS","Pantalla táctil de 16 pulgadas"],recommendedFor:["Productividad avanzada y multitarea","Creación y estudio","Uso híbrido entre portátil y tableta"],
    advantages:["Formato convertible flexible","Pantalla táctil amplia","Radeon 780M integrada para aceleración gráfica y juegos ligeros"],
    limitations:["No debe presentarse como laptop gaming dedicada","El rendimiento en juegos depende del título y la configuración","Conviene confirmar la variante final antes de elegir"],
    purchaseCriteria:["Confirmar la variante exacta","Valorar peso y ergonomía en modo tableta","Revisar puertos y compatibilidad","Evaluar los gráficos integrados según el uso"],
    commonMistakes:["Confundir gráficos integrados con una GPU dedicada","Asumir alto rendimiento gaming","No valorar el formato de 16 pulgadas para movilidad"],
    nexbyteCriteria:["Procesador y gráficos integrados versátiles","Pantalla táctil y formato convertible","Memoria y almacenamiento declarados para multitarea"],
    neutralRecommendation:"Encaja mejor con productividad, creación y uso híbrido. Sus Radeon 780M pueden servir para juegos ligeros, pero no sustituyen una GPU dedicada.",
    analysisUrl:"/analisis/lenovo-ideapad-5-16-2-in-1-8845hs",guideUrl:"/guias/elegir-laptop-gaming",connectivity:"Wi‑Fi",usage:["productividad","multitarea","pantalla-amplia","creacion","uso-hibrido","gaming-ligero"],usageLabel:"Productividad, creación y uso híbrido",featured:true,
    relatedSlugs:["dunhoo-y-10-pro-16","samsung-essential-s30gd-27","asus-tuf-gaming-k1"],
  },
  catalogProduct({
    slug:"asus-tuf-gaming-b850-plus-wifi",brand:"ASUS",model:"TUF Gaming B850-PLUS WIFI",productType:"Placa base ATX",
    title:"ASUS TUF Gaming B850-PLUS WIFI",category:"Componentes",categorySlug:"componentes",
    image:"/images/asus-tuf-gaming-b850-plus-wifi.jpg",imageAlt:"Placa base ASUS TUF Gaming B850-PLUS WIFI",
    shortDescription:"Placa base ATX para montar o actualizar un PC AMD con memoria DDR5, expansión PCIe 5.0 y conectividad inalámbrica integrada.",
    verifiedSpecs:["Chipset AMD B850","Formato ATX","Memoria DDR5","PCIe 5.0","Tres ranuras M.2 declaradas","Wi‑Fi 7","Red Realtek de 2.5 Gb","DisplayPort y HDMI","USB-C de hasta 20 Gbps declarado","Aura Sync"],
    filters:["placa base","atx","amd","ddr5","wi-fi","pcie 5.0","montaje de pc","rendimiento","actualización"],
    highlights:["Formato ATX y DDR5","Wi‑Fi 7 y red de 2.5 Gb","PCIe 5.0 y tres M.2"],useCases:["Montaje de PC gaming","Creación de contenido","Actualización de plataforma"],
    compatibilityNotes:["Comprobar socket y procesador compatibles","Revisar versión de BIOS","Usar memoria DDR5 compatible","Confirmar espacio ATX en el gabinete"],
    limitations:["La compatibilidad depende del procesador y BIOS","Las velocidades dependen del resto de componentes"],connectivity:"Wi‑Fi",usage:["gaming","creacion","montaje-pc","rendimiento","actualizacion"],usageLabel:"Gaming, creación y actualización",relatedSlugs:["asus-prime-b850-plus-wifi","corsair-rm850e-2025","crucial-t710-1tb"],affiliateUrl:"https://link.amazon/B0cIiSle0"
  }),
  catalogProduct({
    slug:"asus-prime-b850-plus-wifi",brand:"ASUS",model:"PRIME B850-PLUS WIFI",productType:"Placa base ATX",
    title:"ASUS PRIME B850-PLUS WIFI",category:"Componentes",categorySlug:"componentes",
    image:"/images/asus-prime-b850-plus-wifi.jpg",imageAlt:"Placa base ASUS PRIME B850-PLUS WIFI",
    shortDescription:"Placa base ATX versátil para productividad, creación y actualizaciones AMD con DDR5, PCIe 5.0 y Wi‑Fi integrado.",
    verifiedSpecs:["Chipset AMD B850","Formato ATX","Memoria DDR5","PCIe 5.0","Tres ranuras M.2 declaradas","Wi‑Fi 6E","Red Realtek de 2.5 Gb","DisplayPort y HDMI","USB-A y USB-C de 10 Gbps declarados","BIOS FlashBack","Aura Sync"],
    filters:["placa base","atx","amd","ddr5","wi-fi","pcie 5.0","montaje de pc","actualización"],
    highlights:["Plataforma ATX con DDR5","Wi‑Fi 6E y red de 2.5 Gb","BIOS FlashBack"],useCases:["Productividad","Creación de contenido","PC versátil","Actualización de plataforma"],
    compatibilityNotes:["Comprobar socket y procesador compatibles","Revisar BIOS y memoria DDR5","Confirmar formato ATX y conectores del gabinete"],
    limitations:["La compatibilidad final depende del procesador y BIOS","Los puertos disponibles pueden variar por configuración"],connectivity:"Wi‑Fi",usage:["productividad","creacion","montaje-pc","actualizacion"],usageLabel:"Productividad, creación y actualización",relatedSlugs:["asus-tuf-gaming-b850-plus-wifi","msi-mag-a650bn","lexar-eq790-1tb"],affiliateUrl:"https://link.amazon/B07xby4kq"
  }),
  catalogProduct({
    slug:"mars-gaming-mcv4",brand:"Mars Gaming",model:"MCV4",productType:"Gabinete XXL",
    title:"Mars Gaming MCV4",category:"Componentes",categorySlug:"componentes",
    image:"/images/mars-gaming-mcv4.jpg",imageAlt:"Gabinete Mars Gaming MCV4 de doble cámara",
    shortDescription:"Gabinete XXL de doble cámara para montajes amplios y personalizados, con paneles frontal y lateral de cristal templado.",
    verifiedSpecs:["Formato XXL","Compatibilidad E-ATX declarada","Cristal templado frontal y lateral","Diseño modular de doble cámara","Acabado negro"],
    filters:["gabinete","e-atx","cristal templado","doble cámara","montaje de pc","actualización"],
    highlights:["Formato XXL","Doble cámara modular","Cristal templado frontal y lateral"],useCases:["Montaje gaming","Sistemas de gran tamaño","Personalización"],
    compatibilityNotes:["Confirmar dimensiones de tarjeta gráfica y radiadores","Revisar formato de placa base","Comprobar cantidad y tamaño de ventiladores"],
    limitations:["Requiere más espacio que un gabinete convencional","Los componentes y ventiladores se adquieren por separado"],connectivity:"No aplica",usage:["gaming","montaje-pc","actualizacion"],usageLabel:"Montaje amplio y personalización",relatedSlugs:["mars-gaming-mc-3tlite","corsair-rm850e-2025","asus-tuf-gaming-b850-plus-wifi"],affiliateUrl:"https://link.amazon/B03ZbGWi9"
  }),
  catalogProduct({
    slug:"mars-gaming-mc-3tlite",brand:"Mars Gaming",model:"MC-3TLITE",productType:"Torre MicroATX con doble cámara y ventilación RGB",
    title:"Mars Gaming MC-3TLITE",category:"Componentes",categorySlug:"componentes",
    image:"/images/mars-gaming-mc-3tlite.jpg",imageAlt:"Gabinete compacto Mars Gaming MC-3TLITE",
    shortDescription:"Pensada para configuraciones MicroATX en espacios reducidos; antes de elegir conviene revisar dimensiones, flujo de aire y compatibilidad con los componentes.",
    verifiedSpecs:["Compatibilidad MicroATX y Mini-ITX declarada","Triple cristal templado continuo","Ventilador FRGB de 120 mm declarado","Diseño de doble cámara","Acabado negro"],
    filters:["gabinete","microatx","mini-itx","compacto","cristal templado","montaje de pc","actualización"],
    highlights:["Compatible con MicroATX y Mini-ITX","Formato compacto","Ventilador FRGB declarado"],useCases:["Setups compactos","Gaming compacto","Escritorios pequeños"],
    compatibilityNotes:["Confirmar longitud de GPU y altura del disipador","Revisar dimensiones de fuente y radiador","Comprobar formato de placa base"],
    limitations:["El espacio interno limita algunos componentes","La refrigeración final depende de la configuración"],connectivity:"No aplica",usage:["gaming","montaje-pc","actualizacion"],usageLabel:"Setups compactos y gaming",relatedSlugs:["mars-gaming-mcv4","msi-mag-a650bn","arctic-mx-4-4g"],affiliateUrl:"https://link.amazon/B02404kb3"
  }),
  catalogProduct({
    slug:"msi-mag-a650bn",brand:"MSI",model:"MAG A650BN",productType:"Fuente de alimentación",
    title:"MSI MAG A650BN",category:"Componentes",categorySlug:"componentes",
    image:"/images/msi-mag-a650bn.jpg",imageAlt:"Fuente de alimentación MSI MAG A650BN",
    shortDescription:"Fuente de 650 W orientada a equipos de gama media y actualizaciones que requieren una entrega estable y formato ATX convencional.",
    verifiedSpecs:["Potencia declarada de 650 W","Certificación 80 Plus Bronze","Riel único de 12 V","Conversión DC a DC","Ventilador de 120 mm"],
    filters:["fuente de alimentación","650 w","80 plus bronze","atx","montaje de pc","actualización"],
    highlights:["650 W declarados","80 Plus Bronze","Diseño DC a DC"],useCases:["PC gaming de gama media","Actualización de fuente","Montaje de PC"],
    compatibilityNotes:["Calcular el consumo total del equipo","Comprobar conectores de la tarjeta gráfica","Confirmar dimensiones y formato ATX"],
    limitations:["No es modular","La potencia necesaria depende de la configuración completa"],connectivity:"No aplica",usage:["gaming","montaje-pc","actualizacion"],usageLabel:"Equipos de gama media y actualización",relatedSlugs:["corsair-rm850e-2025","mars-gaming-mc-3tlite","asus-prime-b850-plus-wifi"],affiliateUrl:"https://link.amazon/B0hgduyZj"
  }),
  catalogProduct({
    slug:"corsair-rm850e-2025",brand:"Corsair",model:"RM850e (2025)",productType:"Fuente de alimentación modular",
    title:"Corsair RM850e (2025)",category:"Componentes",categorySlug:"componentes",
    image:"/images/corsair-rm850e-2025.jpg",imageAlt:"Fuente de alimentación Corsair RM850e 2025",
    shortDescription:"Fuente modular de 850 W para equipos exigentes, preparada para estándares ATX 3.1 y PCIe 5.1 con conector 12V-2x6.",
    verifiedSpecs:["Potencia declarada de 850 W","Cableado completamente modular","ATX 3.1","PCIe 5.1","Conector 12V-2x6","Certificación Cybenetics Gold","Condensadores de 105 °C declarados","Ventilador de 120 mm"],
    filters:["fuente de alimentación","850 w","modular","atx","atx 3.1","pcie 5.1","gold","montaje de pc","rendimiento","actualización"],
    highlights:["850 W y cableado modular","ATX 3.1 y PCIe 5.1","Conector 12V-2x6"],useCases:["PC de alto rendimiento","Creación de contenido","Actualización para GPU exigente"],
    compatibilityNotes:["Calcular potencia y picos de consumo","Comprobar conectores de GPU","Confirmar dimensiones y espacio del gabinete"],
    limitations:["No garantiza compatibilidad con cualquier configuración","Puede ser innecesaria para equipos de bajo consumo"],connectivity:"No aplica",usage:["gaming","creacion","montaje-pc","rendimiento","actualizacion"],usageLabel:"Alto rendimiento y creación",relatedSlugs:["msi-mag-a650bn","asus-tuf-gaming-b850-plus-wifi","crucial-t710-1tb"],affiliateUrl:"https://link.amazon/B07qRX9lC"
  }),
  catalogProduct({
    slug:"crucial-t710-1tb",brand:"Crucial",model:"T710 1 TB",productType:"SSD NVMe M.2",
    title:"Crucial T710 1 TB",category:"Componentes",categorySlug:"componentes",
    image:"/images/crucial-t710-1tb.jpg",imageAlt:"Unidad SSD NVMe Crucial T710 de 1 TB",
    shortDescription:"SSD NVMe Gen5 para cargas intensivas y equipos de alto rendimiento, con velocidades máximas declaradas que dependen de la plataforma y refrigeración.",
    verifiedSpecs:["Capacidad de 1 TB","Formato M.2 NVMe","Interfaz PCIe 5.0 x4 Gen5","Lectura de hasta 14,900 MB/s declarada","Escritura de hasta 13,700 MB/s declarada","Memoria TLC"],
    filters:["ssd","nvme","m.2","pcie 5.0","1 tb","gen5","rendimiento","actualización"],
    highlights:["PCIe 5.0 x4","1 TB de capacidad","Lectura de hasta 14,900 MB/s declarada"],useCases:["Edición y creación","Cargas pesadas","PC de alto rendimiento"],
    compatibilityNotes:["Confirmar ranura M.2 NVMe y generación PCIe","Revisar refrigeración disponible","Comprobar compatibilidad de la placa base"],
    limitations:["Las velocidades son máximos declarados","Requiere plataforma compatible para aprovechar PCIe 5.0"],connectivity:"No aplica",usage:["creacion","productividad","rendimiento","actualizacion"],usageLabel:"Edición y alto rendimiento",relatedSlugs:["lexar-eq790-1tb","asus-tuf-gaming-b850-plus-wifi","corsair-rm850e-2025"],affiliateUrl:"https://link.amazon/B05FLR4SA"
  }),
  catalogProduct({
    slug:"lexar-eq790-1tb",brand:"Lexar",model:"EQ790 1 TB",productType:"SSD NVMe M.2",
    title:"Lexar EQ790 1 TB",category:"Componentes",categorySlug:"componentes",
    image:"/images/lexar-eq790-1tb.jpg",imageAlt:"Unidad SSD NVMe Lexar EQ790 de 1 TB",
    shortDescription:"SSD M.2 2280 PCIe 4.0 para ampliar almacenamiento en gaming, productividad y uso cotidiano.",
    verifiedSpecs:["Capacidad de 1 TB","Formato M.2 2280","Interfaz NVMe PCIe Gen4","Lectura de hasta 7,000 MB/s declarada"],
    filters:["ssd","nvme","m.2","m.2 2280","pcie 4.0","1 tb","rendimiento","actualización"],
    highlights:["M.2 2280 NVMe","PCIe 4.0","1 TB de capacidad"],useCases:["Actualización de almacenamiento","Gaming","Productividad"],
    compatibilityNotes:["Confirmar ranura M.2 2280 NVMe","Revisar generación PCIe compatible","Comprobar espacio y disipación"],
    limitations:["El rendimiento depende del equipo anfitrión","La velocidad indicada es un máximo declarado"],connectivity:"No aplica",usage:["gaming","productividad","rendimiento","actualizacion"],usageLabel:"Gaming, productividad y almacenamiento",relatedSlugs:["crucial-t710-1tb","asus-prime-b850-plus-wifi","msi-mag-a650bn"],affiliateUrl:"https://link.amazon/B0fc5mtss"
  }),
  catalogProduct({
    slug:"ergosolid-brazo-monitor-17-30",brand:"Ergosolid",model:"Brazo para monitor 17–30 pulgadas",productType:"Brazo para monitor",
    title:"Ergosolid brazo para monitor de 17 a 30 pulgadas",category:"Accesorios",categorySlug:"accesorios-gaming",
    image:"/images/ergosolid-brazo-monitor-17-30.jpg",imageAlt:"Brazo Ergosolid ajustable para monitor de 17 a 30 pulgadas",
    shortDescription:"Brazo ajustable para liberar espacio y mejorar la posición de monitores compatibles con montaje VESA.",
    verifiedSpecs:["Monitores de 17 a 30 pulgadas declarados","VESA 75 × 75 y 100 × 100","Resorte de gas","Rotación de 360° declarada","Montaje en escritorio","Construcción de aluminio y metal declarada"],
    filters:["accesorios","setup","monitor","ergonomía","vesa","escritorio"],
    highlights:["Compatibilidad VESA 75 y 100","Resorte de gas","Rotación de 360° declarada"],useCases:["Ergonomía de escritorio","Liberar superficie","Ajustar la posición del monitor"],
    compatibilityNotes:["Confirmar peso del monitor","Revisar patrón VESA","Comprobar grosor y resistencia del escritorio"],
    limitations:["La compatibilidad no depende solo del tamaño de pantalla","Requiere una superficie de montaje adecuada"],connectivity:"No aplica",usage:["productividad","ergonomia","setup"],usageLabel:"Ergonomía y organización del escritorio",relatedSlugs:["samsung-essential-s30gd-27","secretlab-titan-evo-regular","mars-gaming-mc-3tlite"],affiliateUrl:"https://link.amazon/B043b6Y7w"
  }),
  catalogProduct({
    slug:"arctic-mx-4-4g",brand:"ARCTIC",model:"MX-4 4 g",productType:"Pasta térmica",
    title:"ARCTIC MX-4 4 g",category:"Componentes",categorySlug:"componentes",
    image:"/images/arctic-mx-4-4g.jpg",imageAlt:"Jeringa de pasta térmica ARCTIC MX-4 de 4 gramos",
    shortDescription:"Compuesto térmico para mantenimiento y montaje de sistemas de refrigeración, pensado para CPU y GPU compatibles.",
    verifiedSpecs:["Presentación de 4 g","Micropartículas de carbono según el listado","Sin metal según el listado"],
    filters:["refrigeración","pasta térmica","mantenimiento","cpu","gpu","montaje de pc","actualización"],
    highlights:["Presentación de 4 g","Uso en CPU y GPU compatibles","Compuesto sin metal según el listado"],useCases:["Mantenimiento del equipo","Montaje de refrigeración","Renovación de compuesto térmico"],
    compatibilityNotes:["Seguir el manual del fabricante del equipo","Comprobar el procedimiento apropiado para cada dispositivo","Evitar aplicar una cantidad excesiva"],
    limitations:["La aplicación incorrecta puede reducir el rendimiento térmico","No sustituye una solución de refrigeración adecuada"],connectivity:"No aplica",usage:["montaje-pc","mantenimiento","actualizacion"],usageLabel:"Mantenimiento y refrigeración",relatedSlugs:["mars-gaming-mc-3tlite","corsair-rm850e-2025","msi-mag-a650bn"]
  }),
  {
    ...shared,
    slug: "teclado-mecanico-tkl",
    status: "hidden",
    title: "Teclado mecánico compacto TKL",
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
    relatedSlugs: ["raton-gaming-inalambrico", "monitor-gaming", "lenovo-ideapad-5-16-2-in-1-8845hs"],
  },
  {
    ...shared,
    slug: "raton-gaming-inalambrico",
    status: "hidden",
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
    relatedSlugs: ["teclado-mecanico-tkl", "lenovo-ideapad-5-16-2-in-1-8845hs", "monitor-gaming"],
  },
  {
    ...shared,
    slug: "auriculares-gaming",
    status: "hidden",
    title: "Auriculares gaming con micrófono",
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
    relatedSlugs: ["microfono-usb-streaming", "mando-inalambrico-pc", "lenovo-ideapad-5-16-2-in-1-8845hs"],
  },
  {
    ...shared,
    slug: "monitor-gaming",
    status: "hidden",
    title: "Monitor gaming de alta frecuencia",
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
    relatedSlugs: ["lenovo-ideapad-5-16-2-in-1-8845hs", "raton-gaming-inalambrico", "teclado-mecanico-tkl"],
  },
  {
    ...shared,
    slug: "microfono-usb-streaming",
    status: "hidden",
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
    relatedSlugs: ["auriculares-gaming", "lenovo-ideapad-5-16-2-in-1-8845hs", "silla-ergonomica"],
  },
  {
    ...shared,
    slug: "silla-ergonomica",
    status: "hidden",
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
    status: "hidden",
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
    relatedSlugs: ["auriculares-gaming", "lenovo-ideapad-5-16-2-in-1-8845hs", "monitor-gaming"],
  },
];

export const approvedProducts = products.filter((product) => product.status === "published");
export const productBySlug = (slug: string) => approvedProducts.find((product) => product.slug === slug);
