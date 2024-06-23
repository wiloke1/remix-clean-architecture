import type { MetaFunction } from '@remix-run/node';
import { Skeleton } from '~/libs/components/skeleton';
import { useCounter } from '~/store/counter.store';
import { ProductsConsumer, productsLoader } from '~/store/products.store';

export { ErrorBoundary } from '~/libs/components/error-boundary';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export const loader = productsLoader;

export default function Index() {
  const countStore = useCounter();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <ProductsConsumer fallback={<Skeleton />}>
        {products => {
          return <textarea cols={40} rows={30} value={JSON.stringify(products, null, 2)} />;
        }}
      </ProductsConsumer>
      <button onClick={() => countStore.increment()}>Count {countStore.count}</button>
      <ul>
        <li>
          <a target="_blank" href="https://remix.run/tutorials/blog" rel="noreferrer">
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/tutorials/jokes" rel="noreferrer">
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
