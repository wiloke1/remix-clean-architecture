import { ProductsError } from '~/domain/entities/products.entity';
import type { ProductsPort } from '~/domain/ports/products.port';
import { delay } from '~/libs/utils/delay';
import { productsData } from '../data/products.data';

function createProductService(): ProductsPort {
  return {
    async readProducts() {
      try {
        await delay(200);
        return productsData;
      } catch (error) {
        if (error instanceof Error) {
          throw new ProductsError(error);
        }
      }
    },
    createProduct(product) {
      throw new Error('createProduct');
    },
    readProduct(id) {
      throw new Error('readProduct');
    },
    updateProduct(id) {
      throw new Error('updateProduct');
    },
  };
}

export const productsService = createProductService();
