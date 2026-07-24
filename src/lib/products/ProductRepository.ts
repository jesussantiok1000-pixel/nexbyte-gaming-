import type { Product } from "../../data/products";

export type ProductFilters = { category?: string; query?: string; connectivity?: string; usage?: string; limit?: number };
export type ProductResult = { items: Product[]; total: number; page: number; pageSize: number; sourceUpdatedAt: string };

export interface ProductRepository {
  search(filters?: ProductFilters): Promise<ProductResult>;
  getBySlug(slug: string): Promise<Product | null>;
  getMany(slugs: string[]): Promise<Product[]>;
  getFeatured(limit?: number): Promise<Product[]>;
}
