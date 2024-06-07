import { type FC } from 'react';
import { Link } from '@remix-run/react';
import { path } from '~/route-config';

export const Nav: FC = () => {
  return (
    <div>
      <nav className="nav">
        <Link to={path.home}>Home</Link>
        <Link to={path.products.content.sidebar}>Defer Skeleton</Link>
        <Link to={`${path.about}/id_success`}>Json success</Link>
        <Link to={`${path.about}/id_success2`}>Json success 2</Link>
      </nav>
      <br />
      <hr />
    </div>
  );
};
