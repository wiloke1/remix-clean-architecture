import { useNavigation } from '@remix-run/react';
import type { FC } from 'react';

function useIsLoading() {
  const navigation = useNavigation();

  return navigation.state === 'loading';
}

export const AppLoading: FC = () => {
  const isLoading = useIsLoading();

  if (!isLoading) {
    return null;
  }

  return <div className="app-loading" />;
};
