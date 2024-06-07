import { Await, Outlet } from '@remix-run/react';
import type { CSSProperties } from 'react';
import { Suspense } from 'react';
import { Skeleton } from '~/libs/components/skeleton';
import { productsLoader, useProducts } from '~/store/products.store';

export { ErrorBoundary } from '~/libs/components/error-boundary';

export const loader = productsLoader;

const ProductContentSidebar = Outlet;

export default function ProductsContent() {
  const products = useProducts();

  return (
    <xo-grid>
      <div style={{ '--xs': 4 } as CSSProperties}>
        <ProductContentSidebar />
      </div>
      <div style={{ '--xs': 8 } as CSSProperties}>
        <Suspense fallback={<Skeleton />}>
          <Await resolve={products}>
            {products => (
              <div>
                <textarea cols={80} rows={40} defaultValue={JSON.stringify(products.products, null, 2)} />
              </div>
            )}
          </Await>
        </Suspense>
      </div>
    </xo-grid>
  );
}
