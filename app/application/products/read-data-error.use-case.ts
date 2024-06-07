import type { DataErrorPort } from '~/domain/ports/data-error.port';

export async function readDataErrorUseCase(dataErrorService: DataErrorPort) {
  const data = await dataErrorService.readDataError();
  return data;
}
