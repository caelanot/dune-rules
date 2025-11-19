import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import ViteYaml from '@modyfi/vite-plugin-yaml';

export default defineConfig({
	plugins: [sveltekit(), ViteYaml()],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                @use '$lib/scss/_breakpoints.scss' as *;`
            }
        }
    }
});
