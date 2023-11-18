import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import { staticRequest } from 'tinacms'

type Props = {
  posts: {
    data: any;
    query: string;
    variables: {}
  };
}

export default function Index({ posts }: Props) {
  const {data} = posts;
  const heroPost = data.projectConnection.edges[0].node;
  const morePosts = data.projectConnection.edges.slice(1).map(edge => edge.node);

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
              author={heroPost.author}
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
  //const result = await client.queries.project;
  const query = `
    query {
      projectConnection {
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

  const projectsListData : any = await staticRequest({
    query,
    variables: {}
    },
  );

  return {
    props: {
      posts: {
        data: projectsListData,
        query: query,
        variables: {}
      }
    },
  }
}
