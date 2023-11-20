import { MDXRemoteSerializeResult } from 'next-mdx-remote';

type BlogPostType = {
    title: string
    slug: string
    cover: string
    date: string
    tags: string[]
    body: MDXRemoteSerializeResult
  }
  
export default BlogPostType
  