import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

type Props = {
  title: string
  cover: string
  date: string
  description: MDXRemoteSerializeResult
  author: string
  slug: string
}

const PostPreview = ({
  title,
  cover,
  date,
  description,
  author,
  slug,
}: Props) => {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={cover} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          as={`/posts/${slug}`}
          href="/posts/[slug]"
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <div className="text-lg leading-relaxed mb-4">
          <MDXRemote {...description} />
      </div>
      <p>{author} </p>
    </div>
  )
}

export default PostPreview
