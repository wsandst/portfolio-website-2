import markdownStyles from './markdown-styles.module.css'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

type Props = {
  content: MDXRemoteSerializeResult
}

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className={markdownStyles['markdown']}>
        <MDXRemote {...content} />
      </div>
    </div>
  )
}

export default PostBody
