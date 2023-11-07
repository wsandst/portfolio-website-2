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
    else if (field == 'cover' && data['cover'].startsWith("./")) {
      items[field] = `/assets/projects/${slug}/${data['cover']}`;
    }
    else if (field == 'date') {
      items[field] = JSON.stringify(data[field]);
    }
    else if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  })
  
  return items;
}

export function getAllPosts(fields: string[] = []) {
  /*const postListResponse = await client.queries.projectConnection();
  console.log(postListResponse.data.projectConnection.edges);
  var result =  {
    paths: postListResponse.data.projectConnection.edges.map((page) => ({
      params: { filename: page.node._sys.filename },
    })),
    fallback: 'blocking',
  }
  console.log(result);*/
  const slugs = getPostPaths();
  const posts = slugs
    .map((slug) => getPost(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
