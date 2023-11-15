export interface Product {
  id: UniqueId;
  title: string;
  description: string;
  price: number;
}

export type Products = Product[];

export class ProductsError extends Error {
  constructor(public cause?: Error) {
    super();
    this.name = 'ProductsError';
    this.message = 'Failed to read product';
  }
}
