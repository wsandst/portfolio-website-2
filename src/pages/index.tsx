import Layout from '../layout/layout'
import { getProjects } from '../lib/content-api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/project'
import { serialize } from 'next-mdx-remote/serialize'

type Props = {
  pinnedPosts: Post[]
}

export default function Index({ pinnedPosts }: Props) {
  return (
    <>
      <Layout>
        <Head>
          <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
        </Head>
        <h1> Hello there</h1>
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
