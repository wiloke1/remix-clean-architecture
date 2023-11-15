import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { readProductsUseCase } from '~/application/products/read-products.use-case';
import { productsService } from '~/infrastructure/services/products.service';

export async function productsLoader() {
  const products = await readProductsUseCase(productsService);
  return json({ products });
}

export function useProducts() {
  const { products } = useLoaderData<typeof productsLoader>();
  return products;
}
