/* eslint-disable node/prefer-global/process */

// This script is used to perform various actions to properly prepare everything for the production build
import { $ } from 'bun';

const ASTRO_DEV_URL = 'http://localhost:4321';
const ASTRO_CONFIG = 'astro.config.mjs';
const ZCLI_MANIFEST = 'app/manifest.json';
const ZCLI_CONFIG = 'app/zcli.apps.config.json';

async function setupDevEnvironment() {
	console.log('🚀 Setting up for Production Build...\n');

	try {
		// Get the App ID from the ZCLI Config
		const zcli_config = Bun.file(ZCLI_CONFIG, { type: 'application/json' });
		const configJSON = await zcli_config.json();
		const configAppId = configJSON.app_id;

		// Update App ID in the Astro Config
		const astro_config = Bun.file(ASTRO_CONFIG);
		const configContents = await astro_config.text();

		const updatedContents = configContents.replace(/const APP_ID = \d+;/, `const APP_ID = ${configAppId};`);

		await Bun.write(ASTRO_CONFIG, updatedContents);

		// Update the App Manifest URLs
		const manifest = Bun.file(ZCLI_MANIFEST, { type: 'application/json' });
		const manifestJSON = await manifest.json();

		for (const p in manifestJSON.location) {
			const product = manifestJSON.location[p];

			for (const l in product) {
				const location = product[l];

				if (location.url.includes(ASTRO_DEV_URL)) {
					location.url = location.url.replaceAll(ASTRO_DEV_URL, 'assets');
				}
			}
		}

		await Bun.write(ZCLI_MANIFEST, JSON.stringify(manifestJSON));

		// Run all the commands
		await Promise.all([$`bun run build`]);
		await Promise.all([$`cd app && zcli apps:update`]);

		console.log('✅ Production Build Complete... Enjoy!\n');
	}
	catch (error) {
		console.error('❌ Error setting up for Production Build: ', error);
		console.error('Make sure you have run zcli login and zcli apps:create');
		process.exit(1);
	}
}

await setupDevEnvironment();
