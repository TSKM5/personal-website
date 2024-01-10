import './../../css/components/projects-view/project-card.css';
import TextDisplay from "../TextDisplay";
import { useNavigationHelper } from '../../utils/navigation';
import { useState } from 'react';
import ToolTip from '../ToolTip';
import { ProjectDetails } from '../../utils/types/CoreTypesMapping';

export default function ProjectCard(props:{project:ProjectDetails}) {
    const { project } = props; 
    const { navigateTo } = useNavigationHelper();
    const [mouseHover, setMouseHover] = useState<boolean>(false);

    return (
        <div className='project-card' onClick={() => navigateTo(`/projects/${project.path}`)} onMouseEnter={() => setMouseHover(true)}  onMouseLeave={() => setMouseHover(false)}>
            <TextDisplay overrideClass='project-card-text' text={project.title} /> 
            <img className='project-card-image' src={project.landingImage} />
            {
                mouseHover && (
                    <ToolTip text={project.landingDesc}/> 
                )
            }
        </div>
    )
}