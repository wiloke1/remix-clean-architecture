import type { ProductsPort } from '~/domain/ports/products.port';
import { readProductsUseCase } from '../read-products.use-case';
import { delay } from '~/libs/utils/delay';
import { productsData } from '~/infrastructure/data/products.data';
import { ProductsError } from '~/domain/entities/products.entity';

function createProductServiceFake(): ProductsPort {
  return {
    async readProducts() {
      try {
        await delay(200);
        return productsData;
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

const productsService = createProductServiceFake();

describe('Read Products Use Case', () => {
  it('should return products', async () => {
    const products = await readProductsUseCase(productsService);
    const expected = productsData;
    expect(products).to.deep.equal(expected);
  });
});
