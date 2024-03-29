import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import FilterManager from "../components/projects-view/FilterManager";
import ProjectsGrid from "../components/projects-view/ProjectsGrid";
import InlineMessage, { CONTENT_NOT_FOUND_ERROR_TEXT } from "../components/InlineMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import { Helmet } from "react-helmet";
import { CmsDataContext, DataSegment } from "../services/context/DataServiceContext";
import { ProjectDetails } from "../utils/types/CoreTypesMapping";

export default function Projects() {
    const cmsContext = useContext(CmsDataContext);
    const projectsReturn:DataSegment<ProjectDetails[]> = cmsContext?.getProjectDetails() ?? { isLoading: true, data: null, isError: false };
    const [allProjects, setAllProjects] = useState<ProjectDetails[]>(projectsReturn.data ? [...projectsReturn.data]: []);
    const [projectsShown, setProjectsShown] = useState<ProjectDetails[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [filteredTags, setFilteredTags] = useState<string[]>([]);

    useEffect(() => {
        if(!projectsReturn.isLoading && !projectsReturn.isError && projectsReturn.data) {
            setAllProjects(projectsReturn.data); 
        }
    }, [projectsReturn])
    useEffect(() => {
        setProjectsShown(allProjects);
    }, [allProjects])

    useEffect(() => {
        setTags([...new Set(allProjects.flatMap(project => project.tags))]); 
    }, [projectsShown])

    useEffect(() => {
        if(filteredTags.length > 0) {
            setProjectsShown(allProjects.filter(p => 
                !filteredTags.some(tag => !p.tags.includes(tag))
            ));
        } else {
            setProjectsShown(allProjects); 
        }
    }, [filteredTags, allProjects])

    return (
        <>
            <Helmet>
                <title>My Work</title>
                <meta name="description" content="See some proof of concepts and code I have made." />
            </Helmet>
            <Title text="My Work" />
            <FilterManager filters={tags} setFilteredTags={setFilteredTags} />
            {projectsReturn.isLoading && <LoadingSpinner />}
            {projectsReturn.isError && <InlineMessage text={CONTENT_NOT_FOUND_ERROR_TEXT}/>}
            {!projectsReturn.isLoading && !projectsReturn.isError && projectsReturn.data && (
                <ProjectsGrid projects={projectsShown} />
            )}
        </>
    )
}