import type { Category } from "../data/categories";

type CategoryEditorial = {
  criteria: string[];
  faq: Array<{ question: string; answer: string }>;
};

const criteriaBySlug: Record<string,string[]> = {
  "laptops-gaming":["Compara procesador, memoria y almacenamiento con las aplicaciones que utilizarás.","Revisa pantalla, puertos, conectividad y posibilidad de ampliación.","Confirma la variante exacta, el sistema operativo y la distribución del teclado."],
  "teclados-mecanicos":["Elige el formato según el espacio y las teclas que necesitas.","Comprueba mecanismo, distribución, conexión y compatibilidad de software.","Valora controles, iluminación y accesorios solo cuando estén documentados."],
  "ratones-gaming":["Relaciona forma, tamaño y peso con tu tipo de agarre.","Comprueba sensor, botones, conexión y compatibilidad.","En modelos inalámbricos, revisa el método de carga y los requisitos declarados."],
  "audio-gaming":["Comprueba conexión, plataformas y funciones del micrófono.","Valora formato, controles y materiales según el tiempo de uso previsto.","No confundas sonido envolvente declarado con una medición independiente."],
  "monitores-gaming":["Relaciona tamaño y resolución con la distancia y el espacio disponible.","Comprueba panel, frecuencia, puertos y soporte ajustable.","Verifica que equipo, cable y puerto permitan aprovechar la configuración elegida."],
  componentes:["Confirma socket, interfaz, formato y dimensiones antes de combinar piezas.","Calcula los requisitos del equipo completo, incluida potencia y refrigeración.","Comprueba documentación, BIOS y espacio físico cuando corresponda."],
  "setup-gaming":["Mide el espacio antes de elegir mobiliario o soportes.","Comprueba ajustes, dimensiones, montaje y peso admitido documentado.","Prioriza una configuración adaptable al uso real del escritorio."],
  "accesorios-gaming":["Identifica el problema concreto que debe resolver el accesorio.","Comprueba conexión, plataforma, dimensiones y equipo compatible.","Revisa si requiere una base, adaptador o elemento adicional."],
};

export const getCategoryEditorial = (category: Category): CategoryEditorial => {
  const criteria = criteriaBySlug[category.slug] ?? [
    "Compara las especificaciones con el uso que necesitas.",
    "Comprueba compatibilidad, dimensiones y conexiones antes de elegir.",
    "Confirma la variante exacta y la información vigente del producto.",
  ];
  return {
    criteria,
    faq:[
      {question:`¿Cómo elegir dentro de ${category.shortName.toLowerCase()}?`,answer:`Empieza por el uso previsto y compara ${criteria[0].charAt(0).toLowerCase()}${criteria[0].slice(1)}`},
      {question:"¿Qué datos conviene verificar antes de comprar?",answer:`${criteria[1]} Revisa siempre la ficha de la variante concreta antes de tomar una decisión.`},
      {question:"¿Las recomendaciones sustituyen las especificaciones del producto?",answer:"No. Sirven como orientación editorial; la compatibilidad y las características finales deben confirmarse en la documentación y en la variante disponible."},
    ],
  };
};
