import { Project } from '../../utils/types/page-types/ProjectTypes';
import './../../css/components/projects-view/projects-grid.css'
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid(props:{projects:Project[]}) {
    const {projects} = props; 
    
    return (
        <div className="projects-grid-container">
            {projects.map((project:Project, index) => 
                <ProjectCard key={index} project={project}/>
            )}
        </div>
    )
}



