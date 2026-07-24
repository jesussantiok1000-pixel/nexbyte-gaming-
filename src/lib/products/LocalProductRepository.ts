import { approvedProducts, type Product } from "../../data/products";
import type { ProductFilters, ProductRepository, ProductResult } from "./ProductRepository";

const normalize = (value: string) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export class LocalProductRepository implements ProductRepository {
  async search(filters: ProductFilters = {}): Promise<ProductResult> {
    let items = approvedProducts.filter((product) => {
      const searchable = normalize([product.title, product.shortDescription, product.category, product.connectivity, ...product.features, ...product.usage].join(" "));
      return (!filters.category || product.categorySlug === filters.category)
        && (!filters.query || searchable.includes(normalize(filters.query)))
        && (!filters.connectivity || product.connectivity === filters.connectivity)
        && (!filters.usage || product.usage.includes(filters.usage));
    });
    const total = items.length;
    items = items.slice(0, filters.limit ?? items.length);
    return { items, total, page:1, pageSize:items.length, sourceUpdatedAt:"2026-07-23" };
  }
  async getBySlug(slug: string) { return approvedProducts.find((item) => item.slug === slug) ?? null; }
  async getMany(slugs: string[]) { return slugs.map((slug) => approvedProducts.find((item) => item.slug === slug)).filter(Boolean) as Product[]; }
  async getFeatured(limit = 12) { return approvedProducts.filter((item) => item.featured).slice(0, limit); }
}

export const productRepository = new LocalProductRepository();
