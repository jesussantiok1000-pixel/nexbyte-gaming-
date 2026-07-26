// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://nexbytegaming.netlify.app',
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname.replace(/\/$/, '') || '/';
        return pathname !== '/404'
          && pathname !== '/buscar'
          && pathname !== '/favoritos'
          && !pathname.startsWith('/producto/');
      },
    }),
  ],
  redirects: {
    '/analisis/teclado-mecanico-tkl': '/analisis/krom-kasic-tkl',
    '/analisis/raton-gaming-inalambrico': '/analisis/mars-gaming-mmw3',
    '/analisis/auriculares-gaming': '/analisis/logitech-g-pro-x-se',
    '/analisis/microfono-usb-streaming': '/analisis/maono-dgm20',
    '/analisis/logitech-g-g522-lightspeed': '/analisis/logitech-g522-lightspeed',
    '/analisis/monitor-gaming': '/analisis/samsung-essential-s30gd-27',
    '/analisis/silla-ergonomica': '/analisis/secretlab-titan-evo-regular',
    '/analisis/mando-inalambrico-pc': '/analisis/mando-inalambrico-xbox-usb-c',
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ['**/.codex-temp/**', '**/public/images/**']
      }
    }
  }
});
