import type { Product, Products } from '../entities/products.entity';

export interface ProductsPort {
  readProducts(): Promise<Products | undefined>;
  readProduct(id: UniqueId): Promise<Products>;
  createProduct(product: Product): Promise<Product>;
  updateProduct(id: UniqueId): Promise<Products>;
}
