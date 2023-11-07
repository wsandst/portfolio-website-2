import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text'
import markdownStyles from './markdown-styles.module.css'

type Props = {
  content: TinaMarkdownContent
}

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <TinaMarkdown content={content} />
    </div>
  )
}

export default PostBody
