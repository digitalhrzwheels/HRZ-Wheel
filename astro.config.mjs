// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
    site: 'https://hrzwheel.com',
    output: 'server',
    adapter: cloudflare({ imageService: 'compile' }),
    csp: true,
    integrations: [
        sitemap(),
        robotsTxt(),
    ],
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },
    trailingSlash: 'never',
    build: {
        inlineStylesheets: 'auto',
        target: 'es2022',
    },
    compressHTML: true,
    image: {
        service: {
            entrypoint: 'astro/assets/services/sharp',
            config: {
                limitInputPixels: 268402689,
            }
        },
        formats: ['avif', 'webp'],
        quality: {
            avif: 60,
            webp: 70,
            jpg: 80,
            png: 80,
        },
        densities: [1, 1.5, 2],
    },
});
