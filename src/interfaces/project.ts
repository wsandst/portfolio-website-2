import { MDXRemoteSerializeResult } from 'next-mdx-remote';

type ProjectType = {
  title: string
  slug: string
  cover: string
  date: string
  tags: string[]
  authors: string[]
  github: string
  subsite: string
  description: MDXRemoteSerializeResult
  aim: MDXRemoteSerializeResult
  body: MDXRemoteSerializeResult
}

export default ProjectType