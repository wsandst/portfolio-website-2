import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import lodash from 'lodash';

const postsDirectory = join(process.cwd(), 'content/project')

export function getPostPaths() {
  return fs.readdirSync(postsDirectory);
}

export function getPost(slug: string, fields: string[] = []) {
  const fullPath = join(postsDirectory, slug);
  const mdPath = fs.readdirSync(fullPath).find(p => p.endsWith(".md"));
  const mdFullPath =  join(fullPath, mdPath);

  const fileContents = fs.readFileSync(mdFullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string
  }

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug;
    }
    else if (field === 'content') {
      items[field] = content;
    }
    else if (field == 'cover') {
      items[field] = `/assets/projects/${slug}/${data['cover']}`;
    }
    else if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  })
  
  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostPaths();
  const posts = slugs
    .map((slug) => getPost(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
