import { Await } from '@remix-run/react';
import { Suspense } from 'react';
import { Skeleton } from '~/libs/components/skeleton';
import { path } from '~/route-config';
import { useMatchProducts } from '~/store/products.store';

export { ErrorBoundary } from '~/libs/components/error-boundary';

// export const loader = dataErrorLoader;

export default function ProductsSidebar() {
  // const dataError = useDataError();
  const products = useMatchProducts(path.products.content.index);
  // Sử dụng thử với useRouteProducts
  // const products = useRouteProducts(path.products.content.index);

  return (
    <div>
      <h1>Sidebar</h1>
      <Suspense fallback={<Skeleton />}>
        <Await resolve={products}>
          {products => {
            return <textarea cols={40} rows={30} defaultValue={JSON.stringify(products, null, 2)} />;
          }}
        </Await>
      </Suspense>
    </div>
  );
}
