import { AboutMePageContent } from "../../utils/types/page-types/AboutPageTypes";
import { ContactPageTypes } from "../../utils/types/page-types/ContactPageTypes";
import { HomePageTypes } from "../../utils/types/page-types/HomePageTypes";
import { LandingPageTypes } from "../../utils/types/page-types/LandingPageTypes";
import { Project } from "../../utils/types/page-types/ProjectTypes";

export abstract class AbstractCmsService {
    constructor(){
    }

    abstract getProjects(): Promise<Project[]>;
    abstract getAbout(): Promise<AboutMePageContent | null>;
    abstract getLanding(): Promise<LandingPageTypes | null>
    abstract getHome(): Promise<HomePageTypes | null>
    abstract getContact(): Promise<ContactPageTypes | null>
}