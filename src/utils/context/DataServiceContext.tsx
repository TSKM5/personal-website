import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project } from '../types/page-types/ProjectTypes';
import { AbstractCmsService } from '../../services/cms-service/AbstractCmsService';
import { SanityService } from '../../services/cms-service/SanityService';
import { AboutMePageContent } from '../types/page-types/AboutPageTypes';
import { ContactPageTypes } from '../types/page-types/ContactPageTypes';
import { HomePageTypes } from '../types/page-types/HomePageTypes';
import { LandingPageTypes } from '../types/page-types/LandingPageTypes';

export interface DataSegment<T> {
    isLoading: boolean, 
    data: T | null,
    isError: boolean,
}

interface DataContent {
    projectData: DataSegment<Project[]>,
    aboutPageData: DataSegment<AboutMePageContent | null>,
    landingPageData: DataSegment<LandingPageTypes | null>,
    homePageData: DataSegment<HomePageTypes | null>,
    contactPageData: DataSegment<ContactPageTypes | null>,
}

const CmsDataContext = createContext<DataContent | undefined>(undefined);

export const useProjectContext = ():DataSegment<Project[]> => {
    const context = useContext(CmsDataContext);
    if (!context) {
        throw new Error('Context provider not found');
    }
    return context.projectData;
};

export const useAboutPageContext = ():DataSegment<AboutMePageContent | null> => {
    const context = useContext(CmsDataContext);
    if (!context) {
        throw new Error('Context provider not found.');
    }
    return context.aboutPageData;
};

export const useLandingPageContext = ():DataSegment<LandingPageTypes | null> => {
    const context = useContext(CmsDataContext);
    if (!context) {
        throw new Error('Context provider not found.');
    }
    return context.landingPageData;
};

export const useHomePageContext = ():DataSegment<HomePageTypes | null> => {
    const context = useContext(CmsDataContext);
    if (!context) {
        throw new Error('Context provider not found.');
    }
    return context.homePageData;
};

export const useContactPageContext = ():DataSegment<ContactPageTypes | null> => {
    const context = useContext(CmsDataContext);
    if (!context) {
        throw new Error('Context provider not found.');
    }
    return context.contactPageData;
};


export const CmsDataProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [serviceWorker,] = useState<AbstractCmsService>(new SanityService())
    const [projects, setProjects] = useState<DataSegment<Project[]>>({isLoading:false, data:null, isError:false});
    const [aboutPage, setAboutPage] = useState<DataSegment<AboutMePageContent | null>>({isLoading:false, data:null, isError:false});
    const [landingPage, setLandingPage] = useState<DataSegment<LandingPageTypes | null>>({isLoading:false, data:null, isError:false});
    const [homePage, setHomePage] = useState<DataSegment<HomePageTypes | null>>({isLoading:false, data:null, isError:false});
    const [contactPage, setContactPage] = useState<DataSegment<ContactPageTypes | null>>({isLoading:false, data:null, isError:false});

    useEffect(() => {
        fetchData(serviceWorker.getProjects, setProjects);
        fetchData(serviceWorker.getAbout, setAboutPage);
        fetchData(serviceWorker.getLanding, setLandingPage);
        fetchData(serviceWorker.getHome, setHomePage);
        fetchData(serviceWorker.getContact, setContactPage);
    }, [serviceWorker]);

    return (
        <CmsDataContext.Provider value={{ 
            projectData: projects, 
            aboutPageData: aboutPage, 
            landingPageData: landingPage,
            homePageData: homePage,
            contactPageData: contactPage, 
        }}>
            {children}
        </CmsDataContext.Provider>
    );
};

async function fetchData<T>(fetchFunction: () => Promise<T>, setData: React.Dispatch<React.SetStateAction<DataSegment<T>>>) {
    setData(prev => ({ ...prev, isLoading: true }));
    try {
        const data = await fetchFunction();
        setData({ isLoading: false, data, isError: false });
    } catch (error) {
        setData(prev => ({ ...prev, isLoading: false, isError: true }));
    }
}