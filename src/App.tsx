import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import PageManager from "./PageManager";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import { Landing } from "./pages/Landing";
import { ProjectDisplay } from "./pages/ProjectDisplay";
import Projects from "./pages/Projects";
import { Project } from "./utils/types/page-types/ProjectTypes";
import { DataSegment, useProjectContext } from "./utils/context/DataServiceContext";
import { NotFound } from "./pages/NotFound";
import LoadingSpinner from "./components/LoadingSpinner";
import InlineMessage from "./components/InlineMessage";


export default function App() {
    const projectsReturn: DataSegment<Project[]> | null = useProjectContext();
    const [allProjects, setAllProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true); 


    useEffect(() => {
        if (!projectsReturn.isLoading && !projectsReturn.isError && projectsReturn.data) {
            setAllProjects(projectsReturn.data);
            setLoading(false); 
        }
        else if (projectsReturn.isError) {
            <InlineMessage text="Error loading content." />
        }
    }, [projectsReturn]);

    return (
        loading ? (
            <LoadingSpinner />
        ) : (
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/app" element={<PageManager />}>
                    <Route path="/app/home" element={<Home />} />
                    <Route path="/app/about" element={<About />} />
                    <Route path="/app/projects" element={<Projects />} />
                    <Route path="/app/contact" element={<Contact />} />
                </Route>
                <Route path="/projects" element={<PageManager />}>
                    {
                        allProjects.map((p, index) => (
                            <Route key={index} path={`/projects/${p.path}`} element={<ProjectDisplay project={p} />} />
                        ))
                    }
                </Route>
                <Route path="*" element={<NotFound/>} />
            </Routes>
        )
    );
}
