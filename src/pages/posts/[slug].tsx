import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getProject, getProjects } from '../../lib/content-api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import type Project from '../../interfaces/project'
import { serialize } from 'next-mdx-remote/serialize'

type Props = {
  post: Project
  preview?: boolean
}

export default function Post({ post, preview }: Props) {
  const router = useRouter()
  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{title}</title>
                <meta property="og:image" content={post.cover} />
              </Head>
              <PostHeader
                title={post.title}
                cover={post.cover}
                date={post.date}
                author={post.authors.length == 0 ? "Me" : post.authors[0]}
              />
              <PostBody content={post.description} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = await getProject(params.slug, [
    'title',
    'date',
    'slug',
    'authors',
    'description',
    'aim',
    'body',
    'cover',
  ])

  post['description'] = await serialize(post['description']);
  post['aim'] = await serialize(post['aim']);
  post['body'] = await serialize(post['body']);

  return {
    props: {
      post: post
    },
  }
}

export async function getStaticPaths() {
  const posts = await getProjects(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
