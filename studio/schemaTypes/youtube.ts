import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'youtube',
    type: 'object',
    title: 'YouTube',
    fields: [
        defineField({
            name: 'url',
            type: 'url',
            title: 'YouTube Video URL',
        }),
    ],
    preview: {
        select: {
            title: 'url',
        },
    },
})
