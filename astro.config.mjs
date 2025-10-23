import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
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
		}
	},
	devToolbar: {
		enabled: false
	},
	integrations: [tailwind(), react()]
});
