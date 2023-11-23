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

const HeroPost = ({
  title,
  cover,
  date,
  description,
  author,
  slug,
}: Props) => {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={cover} slug={slug} priority={true} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link
              as={`/posts/${slug}`}
              href="/posts/[slug]"
              className="hover:underline"
            >
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <div className="text-lg leading-relaxed mb-4">
            <MDXRemote {...description} />
          </div>
          <p> {author} </p>
        </div>
      </div>
    </section>
  )
}

export default HeroPost
