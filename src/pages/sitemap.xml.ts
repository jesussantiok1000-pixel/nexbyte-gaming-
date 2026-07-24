import type { APIRoute } from "astro";
import { approvedProducts } from "../data/products";
import { categories } from "../data/categories";
import { guides, comparisons } from "../data/editorial";

const staticRoutes = [
  "/", "/categorias", "/seleccion", "/guias", "/comparativas", "/sobre-nexbyte",
  "/metodologia", "/contacto", "/privacidad", "/cookies", "/terminos", "/afiliados",
];

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL("https://nexbytegaming.netlify.app");
  const routes = [
    ...staticRoutes,
    ...categories.map(({ slug }) => `/categorias/${slug}`),
    ...approvedProducts.map(({ slug }) => `/analisis/${slug}`),
    ...guides.map(({ slug }) => `/guias/${slug}`),
    ...comparisons.map(({ slug }) => `/comparativas/${slug}`),
  ];
  const urls = routes.map((route) => `<url><loc>${new URL(route, origin).href}</loc><lastmod>2026-07-23</lastmod></url>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
