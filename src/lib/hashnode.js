// Cliente para Hashnode GraphQL API

const HASHNODE_API = 'https://gql.hashnode.com';

/**
 * Helper function to fetch with retry logic
 * @param {string} url 
 * @param {object} options 
 * @param {number} retries 
 * @param {number} backoff 
 */
async function fetchWithRetry(url, options, retries = 3, backoff = 300) {
    try {
        const response = await fetch(url, options);

        // If 429 (Too Many Requests) or 5xx (Server Error), throw to trigger retry
        if (response.status === 429 || response.status >= 500) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return response;
    } catch (error) {
        if (retries > 0) {
            console.warn(`⚠️ Retrying fetch... (${retries} attempts left) - Error: ${error.message}`);
            await new Promise(resolve => setTimeout(resolve, backoff));
            return fetchWithRetry(url, options, retries - 1, backoff * 2);
        }
        throw error;
    }
}

/**
 * Obtener publicaciones del blog de Hashnode
 * @param {string} host - Tu dominio de Hashnode (ej: 'hrzwheels.hashnode.dev')
 * @param {number} first - Número de posts a obtener
 */
export async function getHashnodePosts(host, first = 10) {
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
        const response = await fetchWithRetry(HASHNODE_API, {
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
export async function getHashnodePost(host, slug) {
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
        const response = await fetchWithRetry(HASHNODE_API, {
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
