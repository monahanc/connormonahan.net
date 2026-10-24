import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { postDate, postPath, postTitle, sortedPosts } from '../lib/posts';

export async function GET(context) {
  const posts = sortedPosts(await getCollection('posts')).filter(
    (post) => post.data.status !== 'hidden',
  );

  return rss({
    title: 'Connor Monahan',
    description: 'The research, projects, and other notes from Connor.',
    site: context.site,
    items: posts.map((post) => ({
      title: postTitle(post),
      pubDate: post.data.date ?? postDate(post),
      description: post.data.summary,
      link: postPath(post),
    })),
  });
}
