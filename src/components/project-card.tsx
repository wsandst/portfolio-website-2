import ProjectType from '../interfaces/project'
import Image from 'next/image';
import globeIcon from "../../public/assets/globe.svg";

type Props = {
  project: ProjectType
}

function ProjectCard({ project }: Props) : JSX.Element {
  //  href={`project/${project.slug}`}
  return <>
    <div className="project-card">
      <div className="project-overlay"/>
      <Image className='project-image' 
             quality={90} 
             width={319}
             height={424} 
             src={project.cover} 
             alt={project.title}
      >
      </Image>
      <h3 className="project-title"> 
        {project.title}
      </h3>
      {
        project.subsite != null && 
          <a href={project.subsite}>
            <Image className="project-available-online-icon" 
                  width={40} 
                  height={30} 
                  src={globeIcon} 
                  title="Click here to try the project online"
                  alt="Project available online icon"/>
          </a>
      }
    </div>
  </>
}

export default ProjectCard;
