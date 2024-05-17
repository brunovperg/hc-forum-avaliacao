import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			components: new URL('./src/components', import.meta.url)
				.pathname,
			interfaces: new URL('./src/interfaces', import.meta.url)
				.pathname,
			context: new URL('./src/context', import.meta.url).pathname,
			assets: new URL('./src/assets', import.meta.url).pathname,
			pages: new URL('./src/pages', import.meta.url).pathname,
			styles: new URL('./src/styles', import.meta.url).pathname,
			data: new URL('./src/data', import.meta.url).pathname,
		},
	},
});
