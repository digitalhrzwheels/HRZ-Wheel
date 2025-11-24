import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
    projectId: '3tzhjdo3',
    dataset: 'production',
    apiVersion: '2024-03-01',
    useCdn: true, // true for SSG (faster build), false for fresh data
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
    return builder.image(source);
}
