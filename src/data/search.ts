import { approvedProducts } from "./products";
import { categories } from "./categories";
import { guides, comparisons } from "./editorial";

export interface SearchEntry {
  title: string;
  description: string;
  type: "Análisis" | "Categoría" | "Guía" | "Comparativa" | "Selección";
  url: string;
  keywords: string;
}

export const searchEntries: SearchEntry[] = [
  {title:"Selección NEXBYTE",description:"Una selección editorial de tecnología para distintos usos y formas de jugar.",type:"Selección",url:"/seleccion",keywords:"recomendaciones productos destacados criterios editoriales"},
  ...approvedProducts.map(product=>({title:product.title,description:product.shortDescription,type:"Análisis" as const,url:product.analysisUrl,keywords:[product.brand,product.model,product.productType,product.category,product.connectivity,...product.features,...(product.verifiedSpecs??[]),...(product.filters??[]),...product.usage].filter(Boolean).join(" ")})),
  ...categories.map(category=>({title:category.name,description:category.description,type:"Categoría" as const,url:`/categorias/${category.slug}`,keywords:category.shortName})),
  ...guides.map(guide=>({title:guide.title,description:guide.description,type:"Guía" as const,url:`/guias/${guide.slug}`,keywords:guide.category})),
  ...comparisons.map(comparison=>({title:comparison.title,description:comparison.description,type:"Comparativa" as const,url:`/comparativas/${comparison.slug}`,keywords:comparison.category})),
];
