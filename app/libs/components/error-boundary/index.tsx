import { isRouteErrorResponse, useRouteError } from '@remix-run/react';
import type { FC } from 'react';

export const ErrorBoundary: FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div style={{ border: '1px solid red', background: '#ffd9d9' }}>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div style={{ border: '1px solid red', background: '#ffd9d9' }}>
        <h1>Error</h1>
        <p>{error.message}</p>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
};
