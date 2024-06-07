export class ProductsError extends Error {
  constructor(public cause?: Error) {
    super();
    this.name = 'ProductsError';
    this.message = 'Failed to read product';
  }
}
