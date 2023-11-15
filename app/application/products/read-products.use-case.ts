import type { ProductsPort } from '~/domain/ports/products.port';

export async function readProductsUseCase(productsService: ProductsPort) {
  const data = await productsService.readProducts();
  return data;
}
