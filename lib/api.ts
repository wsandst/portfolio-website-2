import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import lodash from 'lodash';

const postsDirectory = join(process.cwd(), 'content/project')

export function getPostPaths() {
  return fs.readdirSync(postsDirectory);
}

export function getPost(path: string, fields: string[] = []) {
  const fullPath = join(postsDirectory, path);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = lodash.kebabCase(data['title']);
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostPaths();
  const posts = slugs
    .map((path) => getPost(path, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
