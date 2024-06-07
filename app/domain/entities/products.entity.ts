export interface Product {
  id: UniqueId;
  title: string;
  description: string;
  price: number;
}

export type Products = {
  products: Product[];
};
