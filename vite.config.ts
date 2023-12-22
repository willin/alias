import path from 'node:path';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $components: path.resolve('/src/components')
    }
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
