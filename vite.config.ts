import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    remix({
      routes(defineRoutes) {
        return defineRoutes(route => {
          // route('about', 'about/route.tsx');
          // route('products', 'products/content/sidebar.tsx');
          // route("concerts", "concerts/layout.tsx", () => {
          //   route("", "concerts/home.tsx", { index: true });
          //   route("trending", "concerts/trending.tsx");
          //   route(":city", "concerts/city.tsx");
          // });
        });
      },
    }),
  ],
});
