import { readProductsUseCase } from '~/application/products/read-products.use-case';
import { productsService } from '~/infrastructure/services/products.service';
import { createJsonLoader } from '~/libs/utils/create-loader';

export const { loader: productsJsonLoader, useData: useProductsJson } = createJsonLoader(async ({ params }) => {
  const products = await readProductsUseCase(productsService);
  return { products, params };
});

// export const {
//   loader: productsJsonLoader,
//   useData: useProductsJson,
//   useCacheData: useProductsCacheJson,
// } = createJsonLoader(async ({ params }) => {
//   // const products = await readProductsUseCase(productsService);
//   await delay(1000);
//   count = { ...count, [params.id]: (count[params.id] || 0) + 1 };
//   return { products: count, params };
// });

// DƯỚI ĐÂY LÀ VIẾT KIỂU KHÔNG CÓ createJsonLoader

// export async function productsJsonLoader({ params }: LoaderFunctionArgs) {
//   const products = await readProductsUseCase(productsService);
//   return json(
//     { products, params },
//     {
//       // headers: {
//       //   'Cache-Control': 'public, max-age=3600',
//       // },
//     },
//   );
// }

// export function useProductsJson() {
//   const data = useLoaderData<typeof productsJsonLoader>();
//   return data;
// }
