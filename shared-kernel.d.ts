type UniqueId = string;
type Name = string;

// web component in react

namespace JSX {
  interface IntrinsicElements {
    'xo-grid': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}
