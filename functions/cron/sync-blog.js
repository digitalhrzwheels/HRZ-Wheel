// Cloudflare Cron Job para sincronizar posts de Hashnode
// Se ejecuta automáticamente cada hora

const HASHNODE_API = 'https://gql.hashnode.com';
const HASHNODE_HOST = 'hrzwheels.hashnode.dev'; // Cambia por tu dominio

export async function onRequest(context) {
    try {
        // Solo permitir ejecución desde Cloudflare Cron o manualmente
        const authHeader = context.request.headers.get('X-Cloudflare-Cron');
        const manualKey = context.request.headers.get('X-Sync-Key');
        
        // Verifica autenticación (cron automático o key manual)
        if (!authHeader && manualKey !== context.env.SYNC_SECRET) {
            return new Response(
                JSON.stringify({ error: 'Unauthorized' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Obtener últimos posts de Hashnode
        const posts = await fetchHashnodePosts(HASHNODE_HOST);

        if (!posts || posts.length === 0) {
            return new Response(
                JSON.stringify({ message: 'No posts found', synced: 0 }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Si tienes KV configurado, guarda los posts
        if (context.env.BLOG_CACHE) {
            // Guardar lista de posts
            await context.env.BLOG_CACHE.put(
                'posts:list',
                JSON.stringify(posts),
                { expirationTtl: 3600 } // Cache 1 hora
            );

            // Guardar cada post individualmente para acceso rápido
            for (const post of posts) {
                await context.env.BLOG_CACHE.put(
                    `post:${post.slug}`,
                    JSON.stringify(post),
                    { expirationTtl: 3600 }
                );
            }

            console.log(`✅ Synced ${posts.length} posts to KV storage`);
        }

        return new Response(
            JSON.stringify({ 
                message: 'Blog synced successfully',
                synced: posts.length,
                timestamp: new Date().toISOString()
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Error syncing blog:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

async function fetchHashnodePosts(host, first = 20) {
    const query = `
        query Publication($host: String!, $first: Int!) {
            publication(host: $host) {
                posts(first: $first) {
                    edges {
                        node {
                            id
                            title
                            brief
                            slug
                            publishedAt
                            updatedAt
                            coverImage {
                                url
                            }
                            author {
                                name
                                profilePicture
                            }
                            tags {
                                name
                                slug
                            }
                            url
                            readTimeInMinutes
                        }
                    }
                }
            }
        }
    `;

    const response = await fetch(HASHNODE_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query,
            variables: { host, first }
        })
    });

    const result = await response.json();
    return result.data?.publication?.posts?.edges?.map(edge => edge.node) || [];
}

