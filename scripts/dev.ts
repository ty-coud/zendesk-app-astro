/* eslint-disable node/prefer-global/process */

// This script is used to perform various actions to properly setup the dev environment
import { $ } from 'bun';

const ASTRO_DEV_URL = 'http://localhost:4321';
const ZCLI_MANIFEST = 'app/manifest.json';

async function setupDevEnvironment() {
	console.log('🚀 Setting up Dev Environment...\n');

	try {
		const manifest = Bun.file(ZCLI_MANIFEST, { type: 'application/json' });

		const manifestJSON = await manifest.json();

		for (const p in manifestJSON.location) {
			const product = manifestJSON.location[p];

			for (const l in product) {
				const location = product[l];

				if (!location.url.includes(ASTRO_DEV_URL)) {
					location.url = location.url.replaceAll('assets', ASTRO_DEV_URL);
				}
			}
		}

		await Bun.write(ZCLI_MANIFEST, JSON.stringify(manifestJSON));

		console.log('✅ Dev Environment Setup Complete... Enjoy!\n');

		await Promise.all([$`bun dev`, $`cd app && zcli apps:server`]);
	}
	catch (error) {
		console.error('❌ Error in Dev Environment: ', error);
		process.exit(1);
	}
}

await setupDevEnvironment();
