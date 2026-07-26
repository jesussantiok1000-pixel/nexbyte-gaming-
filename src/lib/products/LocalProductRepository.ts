import { approvedProducts, type Product } from "../../data/products";
import type { ProductFilters, ProductRepository, ProductResult } from "./ProductRepository";

const normalize = (value: string) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export class LocalProductRepository implements ProductRepository {
  async search(filters: ProductFilters = {}): Promise<ProductResult> {
    let items = approvedProducts.filter((product) => {
      const searchable = normalize([product.brand, product.model, product.productType, product.title, product.shortDescription, product.category, product.connectivity, ...product.features, ...(product.verifiedSpecs ?? []), ...(product.filters ?? []), ...product.usage].filter(Boolean).join(" "));
      return (!filters.category || product.categorySlug === filters.category || product.subcategory === filters.category)
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
  async getFeatured(limit = 12) {
    const selected = approvedProducts.filter((item) => item.featured).slice(0, limit);
    const selectedSlugs = new Set(selected.map((item) => item.slug));
    const selectedCategories = new Set(selected.map((item) => item.category));

    for (const product of approvedProducts) {
      if (selected.length >= limit) break;
      if (selectedSlugs.has(product.slug) || selectedCategories.has(product.category)) continue;
      selected.push(product);
      selectedSlugs.add(product.slug);
      selectedCategories.add(product.category);
    }

    for (const product of approvedProducts) {
      if (selected.length >= limit) break;
      if (selectedSlugs.has(product.slug)) continue;
      selected.push(product);
      selectedSlugs.add(product.slug);
    }

    return selected;
  }
}

export const productRepository = new LocalProductRepository();
