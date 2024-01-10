import {GET_ABOUT, GET_CONTACT, GET_HOME, GET_LANDING, GET_PROJECT_DETAILS, GET_PROJECT_PAGE_CONTENTS } from "../../utils/constants/Endpoints";
import { AboutMePageContent, ContactPageContent, HomePageContent, LandingPageContent, ProjectDetails, ProjectPageContents } from "../../utils/types/CoreTypesMapping";
import { AbstractCmsService } from "./AbstractCmsService";

export class CmsApiService extends AbstractCmsService {
    getProjectDetails = async (): Promise<ProjectDetails[]> => {
        const res:Response = (await fetch(GET_PROJECT_DETAILS));

        if (res.ok) {
            const projectDetails = await res.json() as ProjectDetails[];
            return projectDetails;
        } else {
            throw new Error('Error fetching project details');
        }
    }

    getProject = async (_id:string): Promise<ProjectPageContents[]> => {
        const res:Response = (await fetch(GET_PROJECT_PAGE_CONTENTS + '/' + _id));

        if (res.ok) {
            const project = await res.json() as ProjectPageContents[];
            return project;
        } else {
            throw new Error('Error fetching project');
        }
    }
    getAbout = async (): Promise<AboutMePageContent> => {
        const res:Response = (await fetch(GET_ABOUT));

        if (res.ok) {
            const aboutPage = await res.json() as AboutMePageContent;
            return aboutPage;
        } else {
            throw new Error('Error fetching about page');
        }
    }
    getLanding = async (): Promise<LandingPageContent> => {
        const res:Response = (await fetch(GET_LANDING));

        if (res.ok) {
            const landingPage = await res.json() as LandingPageContent;
            return landingPage;
        } else {
            throw new Error('Error fetching landing page');
        }
    }
    getHome = async (): Promise<HomePageContent> =>  {
        const res:Response = (await fetch(GET_HOME));

        if (res.ok) {
            const homePage = await res.json() as HomePageContent;
            return homePage;
        } else {
            throw new Error('Error fetching home page');
        }
    }
    getContact = async (): Promise<ContactPageContent> => {
        const res:Response = (await fetch(GET_CONTACT));

        if (res.ok) {
            const contactPage = await res.json() as ContactPageContent;
            return contactPage;
        } else {
            throw new Error('Error fetching contact page');
        }
    }

}






