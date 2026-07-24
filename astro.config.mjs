// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://nexbyte-gaming.netlify.app',
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ['**/.codex-temp/**', '**/public/images/**']
      }
    }
  }
});
