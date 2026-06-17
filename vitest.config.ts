import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import path from 'path';

export default defineConfig({
  plugins: [angular()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['setup-vitest.ts'],
    include: ['src/**/*.spec.ts'],
    // Replicate original coverage collection (exclude modules)
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'src/app/**/*.module.ts',
        'src/main.ts',
        'src/polyfills.ts',
        'src/environments/**',
      ],
    },
  },
  // Help with Angular / zone.js resolution in Vite
  optimizeDeps: {
    exclude: ['@angular/compiler'],
  },
  esbuild: {
    target: 'es2020',
  },
});
