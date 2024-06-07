import { readProductsUseCase } from '~/application/products/read-products.use-case';
import { productsService } from '~/infrastructure/services/products.service';
import { createDeferLoader } from '~/libs/utils/create-loader';

export const {
  loader: productsLoader,
  useData: useProducts,
  useRouteData: useRouteProducts,
  useMatchData: useMatchProducts,
  Consumer: ProductsConsumer,
} = createDeferLoader(() => {
  const products = readProductsUseCase(productsService);
  return products;
});

// DƯỚI ĐÂY LÀ VIẾT KIỂU KHÔNG CÓ createDeferLoader

// export function productsLoader() {
//   const products = readProductsUseCase(productsService);
//   return defer({ products });
// }

// export function useProducts() {
//   const products = useLoaderData<typeof productsLoader>();
//   return products;
// }

// export function useRouteProducts() {
//   const data = useRouteLoaderData<typeof productsLoader>('routes' + path.products.content.index);

//   return data;
// }
