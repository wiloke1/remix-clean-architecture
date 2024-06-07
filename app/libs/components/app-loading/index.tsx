import { useNavigation } from '@remix-run/react';
import type { FC } from 'react';
import { deferredPaths } from '~/route-config';

function useIsLoading() {
  const navigation = useNavigation();
  const pathName = navigation.location?.pathname ?? '';

  return navigation.state === 'loading' && deferredPaths.some(path => pathName.startsWith(path));
}

export const AppLoading: FC = () => {
  const isLoading = useIsLoading();

  if (!isLoading) {
    return null;
  }

  return <div className="app-loading" />;
};
