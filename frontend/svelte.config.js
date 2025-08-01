import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: { 
		csrf: {
			checkOrigin: false // 🔥 Allow cross-origin POSTs
		},
		adapter: adapter(),
		alias: {
			"$generated": "src/generated",
			"@/*": "./path/to/lib/*",
		}
	}
};

export default config;
