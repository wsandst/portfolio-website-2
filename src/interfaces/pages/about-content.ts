import { MDXRemoteSerializeResult } from 'next-mdx-remote';

type AboutPageContent = {
    sections: AboutPageSectionContent[]
}

type AboutPageSectionContent = {
    title: string,
    image: string,
    text: MDXRemoteSerializeResult
}
  
export default AboutPageContent