import Layout from '../layout/layout'
import { getProjects, getPageContent } from '../lib/content-api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/project'
import IndexPageContent from '../interfaces/pages/index-content'
import { serialize } from 'next-mdx-remote/serialize'
import ProjectCard from '../components/project-card'
import ProjectType from '../interfaces/project'
import profileIcon from "../../public/assets/profile.svg";
import Image from 'next/image';


type Props = {
  pinnedProjects: ProjectType[],
  content: IndexPageContent
}

export default function Index({ pinnedProjects, content }: Props) {
  return (
    <>
      <Layout>
        <Head>
          <title>{`WSANDST Portfolio`}</title>
        </Head>
        <div id="index-content">
          <div id="about-short">
            <div id="about-short-profile">
              <Image id="about-short-profile-icon" 
                     src={profileIcon} 
                     width={250} 
                     height={250} 
                     priority
                     alt="Test"/>
            </div>
            <div id="about-short-text"> 
              <h2> {content.aboutHeading} </h2> 
              <p> {content.aboutText} </p> 
            </div>
          </div>
          <div id="index-lower-section">
            <div className="projects-container">
              {pinnedProjects.map(project => (
                  <ProjectCard key={project.slug} project={project}/>
              ))}
            </div>
            <h3> More projects </h3>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allProjects = await getProjects([
    'title',
    'date',
    'slug',
    'authors',
    'cover',
    'description',
    'tags',
    'subsite'
  ])

  const pinnedProjects = allProjects.filter((post) => post.tags.includes("pinned"));

  for (const project of pinnedProjects) {
    project['description'] = await serialize(project['description']);
  }

  const content = await getPageContent("index");

  return {
    props: { pinnedProjects, content },
  }
}
