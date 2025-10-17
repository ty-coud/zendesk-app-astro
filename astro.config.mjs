import tailwindcss from '@tailwindcss/vite';

// @ts-check
import { defineConfig } from 'astro/config';

const APP_ID = 0;

// https://astro.build/config
export default defineConfig({
	outDir: './app/assets',
	build: {
		assetsPrefix: `/${APP_ID}/assets/`
	},
	vite: {
		build: {
			emptyOutDir: false
		},
		plugins: [tailwindcss()]
	},
	devToolbar: {
		enabled: false
	}
});
