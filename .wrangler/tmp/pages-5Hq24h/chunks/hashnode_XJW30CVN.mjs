globalThis.process ??= {}; globalThis.process.env ??= {};
// Cliente para Hashnode GraphQL API

const HASHNODE_API = 'https://gql.hashnode.com';

/**
 * Obtener publicaciones del blog de Hashnode
 * @param {string} host - Tu dominio de Hashnode (ej: 'hrzwheels.hashnode.dev')
 * @param {number} first - Número de posts a obtener
 */
async function getHashnodePosts(host, first = 10) {
    const query = `
        query Publication($host: String!, $first: Int!) {
            publication(host: $host) {
                id
                title
                posts(first: $first) {
                    edges {
                        node {
                            id
                            title
                            brief
                            slug
                            publishedAt
                            coverImage {
                                url
                            }
                            content {
                                html
                            }
                            author {
                                name
                                profilePicture
                            }
                            tags {
                                name
                                slug
                            }
                            seo {
                                title
                                description
                            }
                            url
                            readTimeInMinutes
                        }
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch(HASHNODE_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: { host, first }
            })
        });

        const result = await response.json();
        
        if (result.errors) {
            console.error('Hashnode API errors:', result.errors);
            return [];
        }

        return result.data?.publication?.posts?.edges?.map(edge => edge.node) || [];
    } catch (error) {
        console.error('Error fetching Hashnode posts:', error);
        return [];
    }
}

/**
 * Obtener un post específico por slug
 * @param {string} host - Tu dominio de Hashnode
 * @param {string} slug - Slug del post
 */
async function getHashnodePost(host, slug) {
    const query = `
        query Publication($host: String!, $slug: String!) {
            publication(host: $host) {
                post(slug: $slug) {
                    id
                    title
                    brief
                    slug
                    publishedAt
                    updatedAt
                    coverImage {
                        url
                    }
                    content {
                        html
                        markdown
                    }
                    author {
                        name
                        profilePicture
                        bio {
                            text
                        }
                    }
                    tags {
                        name
                        slug
                    }
                    url
                    readTimeInMinutes
                    seo {
                        title
                        description
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch(HASHNODE_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: { host, slug }
            })
        });

        const result = await response.json();
        
        if (result.errors) {
            console.error('Hashnode API errors:', result.errors);
            return null;
        }

        return result.data?.publication?.post || null;
    } catch (error) {
        console.error('Error fetching Hashnode post:', error);
        return null;
    }
}

export { getHashnodePosts as a, getHashnodePost as g };
