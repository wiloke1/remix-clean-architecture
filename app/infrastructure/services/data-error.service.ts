import { DataError } from '~/domain/errors/data-error.error';
import type { DataErrorPort } from '~/domain/ports/data-error.port';

function createDataErrorService(): DataErrorPort {
  return {
    async readDataError() {
      try {
        const rest = await fetch('/error');
        // const rest = await fetch('https://impact-theme-sound.myshopify.com/products.json');
        return rest.json();
      } catch (error) {
        if (error instanceof Error) {
          throw new DataError(error);
        }
        throw new Error('An unknown error has occurred.');
      }
    },
  };
}

export const dataErrorService = createDataErrorService();
