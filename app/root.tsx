import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from '@remix-run/react';
import { Nav } from './libs/components/nav/nav';
import './style.css';
import { AppLoading } from './libs/components/app-loading';

export const links: LinksFunction = () => [...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : [])];

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        {/* @ts-ignore */}
        <h1>{error.message}</h1>
        {/* add the UI you want your users to see */}
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <link rel="stylesheet" href="https://theme-docs.awe7.com/html/style.css?v=1717654195" />
      </head>
      <body>
        <div style={{ maxWidth: 1200, margin: '50px auto' }}>
          <AppLoading />
          <Nav />
          <Outlet />
          <ScrollRestoration />
        </div>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
