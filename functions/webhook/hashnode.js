// Cloudflare Function para recibir webhooks de Hashnode
// Endpoint: /webhook/hashnode

export async function onRequestPost(context) {
    try {
        const data = await context.request.json();
        
        // Verificar que sea un webhook válido de Hashnode
        const signature = context.request.headers.get('x-hashnode-signature');
        
        // Log del evento recibido
        console.log('Hashnode webhook received:', {
            event: data.eventType,
            postId: data.data?.post?.id,
            title: data.data?.post?.title,
            timestamp: new Date().toISOString()
        });

        // Verificar el tipo de evento
        if (data.eventType === 'post_published' || data.eventType === 'post_updated') {
            // Aquí puedes:
            // 1. Invalidar cache de Cloudflare
            // 2. Trigger rebuild (si usas build)
            // 3. Actualizar KV storage con el nuevo post
            
            // Ejemplo: Guardar en KV (necesitas configurar KV namespace)
            if (context.env.BLOG_CACHE) {
                const postData = {
                    id: data.data.post.id,
                    title: data.data.post.title,
                    slug: data.data.post.slug,
                    brief: data.data.post.brief,
                    publishedAt: data.data.post.publishedAt,
                    coverImage: data.data.post.coverImageURL,
                    url: data.data.post.url,
                    lastUpdated: new Date().toISOString()
                };
                
                await context.env.BLOG_CACHE.put(
                    `post:${data.data.post.id}`,
                    JSON.stringify(postData),
                    { expirationTtl: 3600 } // Cache por 1 hora
                );
                
                // Invalidar lista de posts
                await context.env.BLOG_CACHE.delete('posts:list');
            }

            return new Response(
                JSON.stringify({ 
                    message: 'Webhook processed successfully',
                    event: data.eventType,
                    postId: data.data?.post?.id
                }),
                { 
                    status: 200, 
                    headers: { 'Content-Type': 'application/json' } 
                }
            );
        }

        return new Response(
            JSON.stringify({ message: 'Event received but not processed', event: data.eventType }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Error processing Hashnode webhook:', error);
        return new Response(
            JSON.stringify({ message: 'Webhook processing failed', error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

// GET endpoint para verificar que la función está activa
export async function onRequestGet(context) {
    return new Response(
        JSON.stringify({ 
            message: 'Hashnode webhook endpoint is active',
            endpoint: '/webhook/hashnode',
            methods: ['POST']
        }),
        { 
            status: 200, 
            headers: { 'Content-Type': 'application/json' } 
        }
    );
}
