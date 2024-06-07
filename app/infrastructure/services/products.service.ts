import { ProductsError } from '~/domain/errors/products.error';
import type { ProductsPort } from '~/domain/ports/products.port';
import { delay } from '~/libs/utils/delay';

function createProductService(): ProductsPort {
  return {
    async readProducts() {
      try {
        const rest = await fetch('https://impact-theme-sound.myshopify.com/products.json');
        // Thêm delay để test
        await delay(500);
        return rest.json();
      } catch (error) {
        if (error instanceof Error) {
          throw new ProductsError(error);
        }
        throw new Error('An unknown error has occurred.');
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
