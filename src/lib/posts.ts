import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export function postDate(post: Post): Date {
  const dateMatch = post.id.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (dateMatch) {
    return new Date(
      Date.UTC(Number(dateMatch[1]), Number(dateMatch[2]) - 1, Number(dateMatch[3])),
    );
  }

  return post.data.date ?? new Date(0);
}

export function postTitle(post: Post): string {
  if (post.data.title) return post.data.title;

  const filename = post.id.split('/').at(-1)?.replace(/\.md$/, '') ?? post.id;
  return filename
    .replace(/^\d{4}-\d{2}-\d{2}-?/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function postPath(post: Post): string {
  if (post.data.permalink) {
    const path = post.data.permalink;
    const absolutePath = path.startsWith('/') ? path : `/${path}`;
    if (absolutePath.endsWith('.html')) return absolutePath;
    return `${absolutePath.replace(/\/+$/, '')}.html`;
  }

  const filename = post.id.split('/').at(-1)?.replace(/\.md$/, '') ?? '';
  const filenameSlug = filename.replace(/^\d{4}-\d{2}-\d{2}-?/, '');
  const date = postDate(post);
  const slug = post.data.slug ?? filenameSlug;
  const segments = [
    String(date.getUTCFullYear()),
    String(date.getUTCMonth() + 1).padStart(2, '0'),
    String(date.getUTCDate()).padStart(2, '0'),
    `${slug}.html`,
  ];

  return `/${segments.join('/')}`;
}

export function sortedPosts(posts: Post[]): Post[] {
  return posts.sort((left, right) => postDate(right).getTime() - postDate(left).getTime());
}
