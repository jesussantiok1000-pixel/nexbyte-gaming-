export type SocialNetwork = "youtube"|"instagram"|"tiktok"|"pinterest"|"facebook"|"x";

export const siteConfig = {
  name: "NEXBYTE",
  alternateName: "NEXBYTE Gaming",
  description: "Tecnología seleccionada para gaming, estudio, productividad y setup.",
  url: "https://nexbytegaming.netlify.app",
  locale: "es_PE",
  language: "es",
  logo: "/images/nexbyte-logo-poster.webp",
  squareLogo: "/favicon.svg",
  ogImage: "/images/image-2.png",
  themeColor: "#6d3ae8",
  contact: {
    email: "",
    whatsapp: "+51904481656",
  },
  author: {
    name: "Jesús Manuel",
    role: "Responsable editorial de NEXBYTE",
    url: "/autor/jesus-manuel",
    social: {},
  },
  social: {
    youtube: "",
    instagram: "",
    tiktok: "",
    pinterest: "",
    facebook: "https://www.facebook.com/profile.php?id=61589851584813",
    x: "",
  } as Record<SocialNetwork,string>,
  affiliateDisclosure: "NEXBYTE puede recibir una comisión por compras que cumplan los requisitos mediante enlaces identificados.",
} as const;

export const isSafeExternalUrl = (value: string) => {
  if (!value) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};

export const configuredSocialProfiles = Object.entries(siteConfig.social)
  .filter(([,url]) => isSafeExternalUrl(url)) as Array<[SocialNetwork,string]>;
