import { useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import PageManager from "./pages/PageManager";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import { Landing } from "./pages/Landing";
import { ProjectPage } from "./pages/ProjectPage";
import Projects from "./pages/Projects";
import { NotFound } from "./pages/NotFound";
import LoadingSpinner from "./components/LoadingSpinner";
import InlineMessage from "./components/InlineMessage";
import { CmsDataContext } from "./services/context/DataServiceContext";
import { ProjectDetails } from "./utils/types/CoreTypesMapping";
import { ABOUT_ROUTE, APP_ROUTE, CONTACT_ROUTE, HOME_ROUTE, PROJECTS_ROUTE } from "./utils/constants/Routes";


export default function App() {
    const cmsContext = useContext(CmsDataContext);
    const [allProjects, setAllProjects] = useState<ProjectDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchProjects() {
            const projectsReturn = cmsContext?.getProjectDetails();
            if (projectsReturn) {
                if (!projectsReturn.isLoading && !projectsReturn.isError && projectsReturn.data) {
                    setAllProjects(projectsReturn.data);
                    setLoading(false);
                } else if (projectsReturn.isError) {
                    setError(true);
                }
            }
        }

        if(cmsContext)fetchProjects();
    }, [cmsContext]);

    if (error) {
        return <InlineMessage text="Error loading content." />;
    }

    if (loading) {
        return <LoadingSpinner />;
    }


    return (
        loading ? (
            <LoadingSpinner />
        ) : (
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path={APP_ROUTE} element={<PageManager />}>
                    <Route path={APP_ROUTE + HOME_ROUTE} element={<Home />} />
                    <Route path={APP_ROUTE + ABOUT_ROUTE} element={<About />} />
                    <Route path={APP_ROUTE + PROJECTS_ROUTE} element={<Projects />} />
                    <Route path={APP_ROUTE + CONTACT_ROUTE}element={<Contact />} />
                </Route>
                <Route path={PROJECTS_ROUTE} element={<PageManager />}>
                    {
                        allProjects.map((p, index) => (
                            <Route key={index} path={`${PROJECTS_ROUTE}/${p.path}`} element={<ProjectPage project={p} />} />
                        ))
                    }
                </Route>
                <Route path="*" element={<NotFound/>} />
            </Routes>
        )
    );
}
