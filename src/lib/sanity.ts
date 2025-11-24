import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
    projectId: '3tzhjdo3',
    dataset: 'production',
    apiVersion: '2024-03-01',
    useCdn: false, // false to ensure webhook updates are reflected immediately
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
    return builder.image(source);
}
