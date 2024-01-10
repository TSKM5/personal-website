import { AboutMePageContent, ContactPageContent, HomePageContent, LandingPageContent, ProjectDetails, ProjectPageContents } from "../../utils/types/CoreTypesMapping";


export abstract class AbstractCmsService {
    constructor(){
    }

    abstract getProjectDetails(): Promise<ProjectDetails[]>;
    abstract getProject(_id:string): Promise<ProjectPageContents[]>;
    abstract getAbout(): Promise<AboutMePageContent>;
    abstract getLanding(): Promise<LandingPageContent>
    abstract getHome(): Promise<HomePageContent>
    abstract getContact(): Promise<ContactPageContent>
}