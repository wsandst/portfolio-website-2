import { MDXRemoteSerializeResult } from 'next-mdx-remote';

type IndexPageContent = {
    aboutHeading: string,
    aboutText: MDXRemoteSerializeResult,
    aboutImage: string
}

export default IndexPageContent