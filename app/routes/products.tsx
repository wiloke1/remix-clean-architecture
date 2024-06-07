import { Outlet } from '@remix-run/react';

export { ErrorBoundary } from '~/libs/components/error-boundary';

const ProductContent = Outlet;

export default function ProductsContent() {
  return (
    <div>
      <h2>Products</h2>
      <ProductContent />
    </div>
  );
}
