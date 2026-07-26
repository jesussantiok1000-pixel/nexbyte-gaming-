import type { Product } from "../data/products";

type SeoProfile = {
  intent: string;
  priorities: string[];
  guideLabel: string;
};

const profiles: Record<string, SeoProfile> = {
  Teclados: { intent:"formato, mecanismo, distribución, conectividad y compatibilidad", priorities:["formato","mecanismo","distribución","conectividad"], guideLabel:"Guía para elegir teclado" },
  Ratones: { intent:"sensor, agarre, botones, conectividad y tipo de uso", priorities:["sensor","DPI","peso","conectividad"], guideLabel:"Guía para elegir ratón" },
  Laptops: { intent:"procesador, memoria, pantalla, conectividad y uso recomendado", priorities:["procesador","memoria","pantalla","conectividad"], guideLabel:"Guía para elegir laptop" },
  Componentes: { intent:"compatibilidad, formato, interfaz, capacidad y requisitos", priorities:["compatibilidad","formato","interfaz","capacidad"], guideLabel:"Guías para actualizar tu equipo" },
  Audio: { intent:"conexión, micrófono, controles, comodidad y plataformas compatibles", priorities:["conexión","micrófono","compatibilidad","controles"], guideLabel:"Guía para elegir audio gaming" },
  Monitores: { intent:"tamaño, resolución, panel, frecuencia, puertos y ergonomía", priorities:["tamaño","resolución","panel","frecuencia"], guideLabel:"Guía para elegir monitor" },
  Setup: { intent:"ajustes, dimensiones, soporte y espacio requerido", priorities:["ajustes","dimensiones","soporte","espacio"], guideLabel:"Guía para organizar tu setup" },
  Accesorios: { intent:"función, compatibilidad, conexión y espacio necesario", priorities:["función","compatibilidad","conexión","espacio"], guideLabel:"Guías de accesorios y setup" },
};

const fallbackProfile: SeoProfile = {
  intent:"características, compatibilidad y uso recomendado",
  priorities:["características","compatibilidad","uso"],
  guideLabel:"Guía relacionada",
};

export const getSeoProfile = (product: Product) => profiles[product.category] ?? fallbackProfile;

export const getProductH1 = (product: Product) => {
  if (product.seoTitle) return product.seoTitle.replace(/\s*\|\s*NEXBYTE\s*$/i, "");
  const technical = ["Componentes", "Laptops", "Monitores"].includes(product.category);
  return technical
    ? `${product.title}: especificaciones, compatibilidad y análisis`
    : `${product.title}: análisis, características, ventajas y desventajas`;
};

export const getProductSeoTitle = (product: Product) => {
  if (product.seoTitle) return product.seoTitle;
  const suffix = ["Componentes", "Laptops", "Monitores"].includes(product.category)
    ? "características y análisis"
    : "análisis, pros y contras";
  const title = `${product.title}: ${suffix} | NEXBYTE`;
  return title.length <= 68 ? title : `${product.title}: análisis | NEXBYTE`;
};

export const getProductSeoDescription = (product: Product) => {
  if (product.seoDescription) return product.seoDescription;
  const profile = getSeoProfile(product);
  const base = `Análisis de ${product.title}: ${profile.intent}, ventajas, limitaciones y alternativas para elegir con información verificable.`;
  return base.length <= 160 ? base : `Analiza ${product.title}: características verificadas, compatibilidad, ventajas, limitaciones y alternativas antes de elegir.`;
};

export const getQuickVerdict = (product: Product) =>
  product.editorialSummary ??
  product.editorialVerdict ??
  product.neutralRecommendation;

export const getFaq = (product: Product) => {
  if (product.frequentlyAskedQuestions?.length) return product.frequentlyAskedQuestions;
  const type = product.productType ?? product.category;
  const mainFeature = product.features[0] ?? product.verifiedSpecs?.[0] ?? "sus características verificables";
  const limitation = product.limitations[0] ?? "conviene comprobar la variante exacta antes de elegir";
  return [
    {
      question:`¿Para quién puede encajar ${product.title}?`,
      answer:`Puede encajar especialmente en ${product.usageLabel.toLowerCase()}. La decisión final depende del equipo, el espacio y las necesidades concretas.`,
    },
    {
      question:`¿Qué característica conviene revisar primero?`,
      answer:`En este ${type.toLowerCase()} destaca ${mainFeature.toLowerCase()}. También es importante revisar la compatibilidad y la configuración exacta publicada.`,
    },
    {
      question:`¿Qué limitación debe considerarse antes de comprar?`,
      answer:`${limitation.charAt(0).toUpperCase()}${limitation.slice(1)}.`,
    },
  ];
};

export const analysisMethodology =
  "Este análisis se basa en especificaciones verificables, documentación del fabricante y comparación con productos de la misma categoría.";
