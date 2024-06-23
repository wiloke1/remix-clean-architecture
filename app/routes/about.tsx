import { Link, Outlet } from '@remix-run/react';
import { path } from '~/route-config';

export { ErrorBoundary } from '~/libs/components/error-boundary';

export default function About() {
  return (
    <div>
      <br />
      <nav className="nav" style={{ fontSize: 16 }}>
        <Link to={`${path.about}/id_success`}>Success</Link>
        <Link to={`${path.about}/id_success2`}>Success 2</Link>
      </nav>
      <Outlet />
    </div>
  );
}
