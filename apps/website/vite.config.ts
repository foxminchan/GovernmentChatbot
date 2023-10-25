import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

const manifestForPlugIn: Partial<VitePWAOptions> = {
  registerType: 'prompt' as const,
  includeAssets: [
    'favicon.ico',
    'icon-192x192.png',
    'icon-256x256.png',
    'icon-384x384.png',
    'icon-512x512.png',
  ],
  manifest: {
    theme_color: '#b97a58',
    background_color: '#b97a58',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    name: 'Goverment Chatbot',
    short_name: 'Goverment App',
    orientation: 'portrait',
    description:
      'Smart chatbot for streamlined administrative procedures, powered by advanced language models',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: '/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  injectRegister: null,
  minify: true,
  workbox: {
    clientsClaim: true,
    skipWaiting: true,
  },
  includeManifestIcons: false,
  disable: false,
};

export default defineConfig({
  cacheDir: '../../node_modules/.vite/website',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths(), VitePWA(manifestForPlugIn)],

  test: {
    globals: true,
    cache: { dir: '../../node_modules/.vitest' },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
