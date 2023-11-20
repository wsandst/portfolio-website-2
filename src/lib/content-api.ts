import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const projectsDirectory = join(process.cwd(), 'content/projects');
const blogPostsDirectory = join(process.cwd(), 'content/blog');
const pageContentDirectory = join(process.cwd(), 'content/pages');

export async function getProject(slug: string, fields: string[]) {
  const projectPath = slugToMarkdownPath(slug, projectsDirectory);
  return await getMarkdown(projectPath, '/assets/projects', fields);
}

export async function getProjects(fields: string[]) {
  const slugs = fs.readdirSync(projectsDirectory);
  const posts = await Promise.all(slugs.map(async (slug) => await getProject(slug, fields)));
  // sort posts by date in descending order
  posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export async function getBlogPost(slug: string, fields: string[]) {
  const blogPostPath = slugToMarkdownPath(slug, projectsDirectory);
  return await getMarkdown(blogPostPath, '/assets/projects', fields);
}

export async function getBlogPosts(fields: string[]) {
  const slugs = fs.readdirSync(blogPostsDirectory);
  const blogPosts = await Promise.all(slugs.map(async (slug) => await getProject(slug, fields)));
  // sort posts by date in descending order
  blogPosts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return blogPosts;
}

export async function getPageContent(page: string) {
  const fullPath = join(pageContentDirectory, page + ".yml", );
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  await serializeMdxMarkdown(data);
  return data;
}

function slugToMarkdownPath(slug: string, baseDir: string): string {
  const fullPath = join(baseDir, slug);
  const mdPath = fs.readdirSync(fullPath).find(p => p.endsWith(".md"));
  return join(fullPath, mdPath);
}

async function getMarkdown(markdownPath: string, contentPath : string, fields: string[]) {
  const fileContents = fs.readFileSync(markdownPath, 'utf8');
  var { data, content } = matter(fileContents);
  //data = await serializeMdxMarkdown(data);

  type Items = {
    [key: string]: any
  }

  const items : Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field == 'cover') {
      items[field] = `${contentPath}/${items['slug']}/${data['cover']}`;
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

async function serializeMdxMarkdown(data: {[key: string]: any}) {
  const mdxFields = ["text", "about-text", "description", "aim", "body"];
  for (const field of Object.keys(data)) {
    if (mdxFields.includes(field)) {
      data[field] = await serialize(data[field]);
    }
  }
  return data;
}