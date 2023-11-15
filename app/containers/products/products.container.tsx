import type { FC } from 'react';
import { useProducts } from '~/store/products.store';

export const ProductsContainer: FC = () => {
  const products = useProducts();
  return <textarea cols={80} rows={40} defaultValue={JSON.stringify(products, null, 2)} />;
};
