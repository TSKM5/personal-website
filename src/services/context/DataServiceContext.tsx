import React, { createContext, useState } from 'react';
import { AbstractCmsService } from '../cms-service/AbstractCmsService';
import { CmsApiService } from '../cms-service/CmsApiService';
import { AboutMePageContent, HomePageContent, LandingPageContent, ProjectDetails, ProjectPageContents, ContactPageContent } from '../../utils/types/CoreTypesMapping';

export interface DataSegment<T> {
    isLoading: boolean,
    data: T | null,
    isError: boolean,
}

interface DataContent {
    getProjectDetails: () => DataSegment<ProjectDetails[]>,
    getAboutPageData: () => DataSegment<AboutMePageContent>,
    getLandingPageData: () => DataSegment<LandingPageContent>,
    getHomePageData: () => DataSegment<HomePageContent>,
    getContactPageData: () => DataSegment<ContactPageContent>,
    getProjectPageContent: (_id: string) => DataSegment<ProjectPageContents[]>,
}

export const CmsDataContext = createContext<DataContent | undefined>(undefined);

export const CmsDataProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [serviceWorker,] = useState<AbstractCmsService>(new CmsApiService());
    const [projectsDetails, setProjectsDetails] = useState<DataSegment<ProjectDetails[]>>({ isLoading: false, data: null, isError: false });
    const [aboutPage, setAboutPage] = useState<DataSegment<AboutMePageContent>>({ isLoading: false, data: null, isError: false });
    const [landingPage, setLandingPage] = useState<DataSegment<LandingPageContent>>({ isLoading: false, data: null, isError: false });
    const [homePage, setHomePage] = useState<DataSegment<HomePageContent>>({ isLoading: false, data: null, isError: false });
    const [contactPage, setContactPage] = useState<DataSegment<ContactPageContent>>({ isLoading: false, data: null, isError: false });
    const [projectPageContentMap, setProjectPageContentMap] = useState<Map<string, DataSegment<ProjectPageContents[]>>>(new Map<string, DataSegment<ProjectPageContents[]>>());

    //dataSegment accessor functions
    const getProjectDetails = (): DataSegment<ProjectDetails[]> => {
        if (!projectsDetails.isLoading && projectsDetails.data === null) {
            fetchData(serviceWorker.getProjectDetails, setProjectsDetails);
        }
        return projectsDetails;
    };
    const getAboutPage = (): DataSegment<AboutMePageContent> => {
        if (!aboutPage.isLoading && aboutPage.data === null) {
            fetchData(serviceWorker.getAbout, setAboutPage);
        }
        return aboutPage;
    };
    const getLandingPage = (): DataSegment<LandingPageContent> => {
        if (!landingPage.isLoading && landingPage.data === null) {
            fetchData(serviceWorker.getLanding, setLandingPage);
        }
        return landingPage;
    };
    const getHomePage = (): DataSegment<HomePageContent> => {
        if (!homePage.isLoading && homePage.data === null) {
            fetchData(serviceWorker.getHome, setHomePage);
        }
        return homePage;
    };
    const getContactPage = (): DataSegment<ContactPageContent> => {
        if (!contactPage.isLoading && contactPage.data === null) {
            fetchData(serviceWorker.getContact, setContactPage);
        }
        return contactPage;
    };
    const getProjectPageContent = (_id: string): DataSegment<ProjectPageContents[]> => {
        let contentSegment = projectPageContentMap.get(_id);
    
        if (!contentSegment) {
            fetchData(() => serviceWorker.getProject(_id), data => {
                setProjectPageContentMap(prev => new Map(prev).set(_id, data));
            });
            return { isLoading: true, data: null, isError: false };
        } else {
            return contentSegment;
        }
    };



    return (
        <CmsDataContext.Provider value={{
            getProjectDetails: getProjectDetails,
            getAboutPageData: getAboutPage,
            getLandingPageData: getLandingPage,
            getHomePageData: getHomePage,
            getContactPageData: getContactPage,
            getProjectPageContent: getProjectPageContent
        }}>
            {children}
        </CmsDataContext.Provider>
    );
};

async function fetchData<T>(fetchFunction: () => Promise<T>, setData: (data: DataSegment<T>) => void) {
    setData({ isLoading: true, data:null, isError: false });
    try {
        const callApi = async () => {
            const data = await fetchFunction();
            setData({ isLoading: false, data, isError: false });
        }
        callApi();
    } catch (error) {
        setData({ isLoading: false, data: null, isError: true });
    }
}