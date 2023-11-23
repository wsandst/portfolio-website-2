import { MDXRemoteSerializeResult } from 'next-mdx-remote';

type AboutPageSectionContent = {
    title: string,
    image: string,
    text: MDXRemoteSerializeResult
}
  

export default AboutPageSectionContent;