// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import tailwindcss from '@tailwindcss/vite';
import partytown from '@astrojs/partytown';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
    site: 'https://hrzwheel.com',
    output: 'server',
    adapter: cloudflare({ imageService: 'compile' }),
    integrations: [
        sitemap(),
        robotsTxt(),
        partytown({
            config: {
                forward: ['dataLayer.push'],
            },
        }),
    ],
    build: {
        inlineStylesheets: 'auto',
        target: 'es2022',
    },
});

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
}
    compressHTML: true,
    image: {
        // Optimización agresiva de imágenes
        service: {
            entrypoint: 'astro/assets/services/sharp',
            config: {
                limitInputPixels: 268402689, // ~16384x16384
            }
        },
        // Formatos modernos primero
        formats: ['avif', 'webp'],
        // Calidad de compresión
        quality: {
            avif: 60,  // AVIF muy comprimido (excelente calidad visual)
            webp: 70,  // WebP buena compresión
            jpg: 80,   // JPG fallback
            png: 80,   // PNG fallback
        },
        // Densidades para responsive
        densities: [1, 1.5, 2],
    },
});
