import { readProductsUseCase } from '~/application/products/read-products.use-case';
import { productsService } from '~/infrastructure/services/products.service';
import { createJsonLoader } from '~/libs/utils/create-loader';

export const {
  loader: productsJsonLoader,
  useData: useProductsJson,
  useRouteData: useRouteJsonProducts,
} = createJsonLoader(async ({ params }) => {
  const products = await readProductsUseCase(productsService);
  return { products, params };
});

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
