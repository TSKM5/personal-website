import { ProjectDetails } from '../../utils/types/CoreTypesMapping';
import './../../css/components/projects-view/projects-grid.css'
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid(props:{projects:ProjectDetails[]}) {
    const {projects} = props; 
    
    return (
        <div className="projects-grid-container">
            {projects.map((project:ProjectDetails, index) => 
                <ProjectCard key={index} project={project}/>
            )}
        </div>
    )
}



