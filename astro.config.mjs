import tailwindcss from '@tailwindcss/vite';

// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	outDir: './app/assets',
	build: {
		assetsPrefix: `./`
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
