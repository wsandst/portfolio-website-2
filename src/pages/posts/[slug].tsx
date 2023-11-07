import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getPost, getAllPosts } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import type PostType from '../../interfaces/post'
import client from '../../../tina/__generated__/client';
import { ProjectQuery } from '../../../tina/__generated__/types'
import { useTina } from 'tinacms/dist/react';
import { staticRequest } from 'tinacms'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

type Props = {
  post: {
      data: any;
      query: string;
      variables: {}
  };
  preview?: boolean
}

export default function Post({ post, preview}: Props) {
  const {data} = useTina(post);
  const project = data.projectConnection.edges[0].node;

  const router = useRouter()
  const title = `${project.title} | Next.js Blog Example with ${CMS_NAME}`
  if (!router.isFallback && !project.slug) {
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
                <meta property="og:image" content={project.cover} />
              </Head>
              <PostHeader
                title={project.title}
                cover={project.cover}
                date={project.date}
                author={project.authors}
              />
              <PostBody content={project.body} />
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
  console.log("Params: ", params);

  const query = `
    query {
      projectConnection(
        filter: {slug: {eq: "${params.slug}"}},
        first: 1
      ) {
        edges {
          node {
            __typename
            title
            cover
            slug
            date
            description
            aim
            authors
            github
            body
          }
        }
      }
    }
  `;

  const projectResponse : any = await staticRequest({
    query,
    variables: {}
    },
  );
  
  return {
    props: {
      post: {
        data: projectResponse,
        query: query,
        variables: {}
      }
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

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
