import { Skeleton } from '~/libs/components/skeleton';
import { ProductsConsumer, productsLoader } from '~/store/products.store';

export { ErrorBoundary } from '~/libs/components/error-boundary';

export const loader = productsLoader;

export default function About() {
  return (
    <div>
      <h1>About</h1>
      <ProductsConsumer fallback={<Skeleton />}>
        {products => {
          return (
            <>
              {/* {products.params.id} */}
              <textarea cols={80} rows={40} value={JSON.stringify(products, null, 2)} />
            </>
          );
        }}
      </ProductsConsumer>
    </div>
  );
}
