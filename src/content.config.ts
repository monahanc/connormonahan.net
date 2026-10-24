import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/posts',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z
    .object({
      title: z.string().optional(),
      date: z.coerce.date().optional(),
      permalink: z.string().optional(),
      slug: z.string().optional(),
      summary: z.string().optional(),
      status: z.string().optional(),
      category: z.string().optional(),
      categories: z.union([z.string(), z.array(z.string())]).optional(),
    })
    .passthrough(),
});

export const collections = { posts };
