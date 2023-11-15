import { type FC } from 'react';
import { Link } from '@remix-run/react';

export const Nav: FC = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/about">About</Link>
    </nav>
  );
};
