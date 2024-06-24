import { productsJsonLoader, useProductsCacheJson, useProductsJson } from '~/store/products-json.store';

export { ErrorBoundary } from '~/libs/components/error-boundary';

export const loader = productsJsonLoader;

export default function About() {
  const { products, params } = useProductsJson();
  const cache = useProductsCacheJson();

  return (
    <div>
      <h1>About {params.id}</h1>
      <h2>{cache?.params.id}</h2>
      <textarea cols={80} rows={40} value={JSON.stringify(products, null, 2)} />
    </div>
  );
}
