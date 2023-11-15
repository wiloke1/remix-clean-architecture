import { ProductsContainer } from '~/containers/products/products.container';
import { productsLoader } from '~/store/products.store';

export const loader = async () => {
  return productsLoader();
};

export default function Products() {
  return (
    <div>
      <h1>Products</h1>
      <p>This is the products page.</p>
      <ProductsContainer />
    </div>
  );
}
