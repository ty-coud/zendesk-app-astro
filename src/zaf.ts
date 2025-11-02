declare global {
	interface Window {
		ZAFClient?: {
			init: () => any;
		};
	}
}

let client: any = null;

export function getClient() {
	if (client)
		return client;

	client = window.ZAFClient?.init();
	return client;
}
