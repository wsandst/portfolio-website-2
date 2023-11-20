import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getProjects } from '../lib/content-api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/project'
import { serialize } from 'next-mdx-remote/serialize'

type Props = {
  allPosts: Post[]
}

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
      <Layout>
        <Head>
          <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              cover={heroPost.cover}
              date={heroPost.date}
              author={heroPost.authors.length == 0 ? "Me" : heroPost.authors[0]}
              slug={heroPost.slug}
              description={heroPost.description}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = await getProjects([
    'title',
    'date',
    'slug',
    'authors',
    'cover',
    'description',
  ])

  for (const post of allPosts) {
    post['description'] = await serialize(post['description']);
  }

  return {
    props: { allPosts },
  }
}
