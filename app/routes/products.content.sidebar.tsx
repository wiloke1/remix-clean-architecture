import { Await } from '@remix-run/react';
import { Suspense } from 'react';
import { Skeleton } from '~/libs/components/skeleton';
import { dataErrorLoader, useDataError } from '~/store/data-error.store';

export { ErrorBoundary } from '~/libs/components/error-boundary';

export const loader = dataErrorLoader;

export default function ProductsSidebar() {
  const dataError = useDataError();

  return (
    <div>
      <h1>Sidebar</h1>
      <Suspense fallback={<Skeleton />}>
        <Await resolve={dataError}>
          {products => {
            return <textarea cols={40} rows={30} defaultValue={JSON.stringify(products, null, 2)} />;
          }}
        </Await>
      </Suspense>
    </div>
  );
}
