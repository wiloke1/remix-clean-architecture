import { defer } from '@remix-run/node';
import { useLoaderData, useRouteLoaderData } from '@remix-run/react';
import { readDataErrorUseCase } from '~/application/products/read-data-error.use-case';
import { dataErrorService } from '~/infrastructure/services/data-error.service';
import { path } from '~/route-config';

export async function dataErrorLoader() {
  const dataError = readDataErrorUseCase(dataErrorService);
  return defer({ dataError });
}

export function useDataError() {
  const { dataError } = useLoaderData<typeof dataErrorLoader>();
  return dataError;
}

export function useRouteDataError() {
  const data = useRouteLoaderData<typeof dataErrorLoader>('routes' + path.products.index);

  return data?.dataError;
}
