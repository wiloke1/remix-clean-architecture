import { Outlet } from '@remix-run/react';
import type { CSSProperties } from 'react';
import { Skeleton } from '~/libs/components/skeleton';
import { ProductsConsumer, productsLoader } from '~/store/products.store';

export { ErrorBoundary } from '~/libs/components/error-boundary';

export const loader = productsLoader;

const ProductContentSidebar = Outlet;

export default function ProductsContent() {
  return (
    <xo-grid>
      <div style={{ '--xs': 4 } as CSSProperties}>
        <ProductContentSidebar />
      </div>
      <div style={{ '--xs': 8 } as CSSProperties}>
        <ProductsConsumer fallback={<Skeleton />}>
          {products => {
            return <textarea cols={40} rows={30} value={JSON.stringify(products, null, 2)} />;
          }}
        </ProductsConsumer>
      </div>
    </xo-grid>
  );
}
