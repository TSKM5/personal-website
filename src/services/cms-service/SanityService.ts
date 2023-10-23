import { SanityClient, createClient } from "@sanity/client";
import { AnimationLibComponent, CodeSandbox, CustomWsDemo, DownloadAssetButton, Heading, ImageCarousel, Project, ProjectPageContents, TextContent, UrlDisplay, mobileIFrame } from "../../utils/types/page-types/ProjectTypes";
import { AbstractCmsService } from "./AbstractCmsService";
import { AboutMePageContent } from "../../utils/types/page-types/AboutPageTypes";
import { LandingPageTypes } from "../../utils/types/page-types/LandingPageTypes";
import { HomePageTypes } from "../../utils/types/page-types/HomePageTypes";
import { ContactPageTypes } from "../../utils/types/page-types/ContactPageTypes";
import imageUrlBuilder from '@sanity/image-url';
import { AboutPageReturn } from "../../utils/types/sanity-types/AboutPageReturn";
import { ProjectReturn } from "../../utils/types/sanity-types/ProjectReturnType";
import { DATASET, PROJECT_ID } from "../../config/SanityConfig";


export class SanityService extends AbstractCmsService {
    private client: null | SanityClient = null; 
    
    constructor() {
        super(); 
        this.setClient(); 
    }
    
    getProjects = async (): Promise<Project[]> => {
        if (this.client) {
            const projectsReturn: ProjectReturn[] = await this.client.fetch('*[_type == "project"]');
    
            const projects: Project[] = projectsReturn.map((projectReturn) => {
                const landingImage = projectReturn.landingImage ? sanityImageBuilder.image(projectReturn.landingImage).url(): '';

                const projectPageContents:ProjectPageContents[] = projectReturn.projectPageContents.map((projectPageContent) => {
                    
                    let content: ProjectPageContents; 
                    if (projectPageContent.type === 'imageCarousel' && projectPageContent.imagePaths) {
                        content = {
                            type: 'imageCarousel',
                            imagePaths: [...projectPageContent.imagePaths.map((imagePath) => {
                               return imagePath ? sanityImageBuilder.image(imagePath).url() : '';
                            })],
                        } as ImageCarousel;
                    } else {
                        content = projectPageContent as Heading | TextContent | mobileIFrame | DownloadAssetButton | CodeSandbox | CustomWsDemo | UrlDisplay | AnimationLibComponent;
                    }
                    return content;
                });
                return {
                    ...projectReturn,
                    landingImage,
                    projectPageContents
                };
            });
            return projects;
        }
    
        return [];
    }
    
    getAbout = async (): Promise<AboutMePageContent | null> => {
        if(this.client) {
            const aboutContentReturn: AboutPageReturn = (await this.client.fetch('*[_type == "aboutMePageContent"]'))[0];
            const aboutContent: AboutMePageContent = {
                aboutMeText: aboutContentReturn.aboutMeText,
                aboutMyInterestsText: aboutContentReturn.aboutMyInterestsText,
                aboutMySkills: aboutContentReturn.aboutMySkills,
                aboutThisWebsite: {
                    ...aboutContentReturn.aboutThisWebsite, 
                    imgLinks: [...aboutContentReturn.aboutThisWebsite.imgLinks.map((imgLink) => {
                        return sanityImageBuilder.image(imgLink).url() || ''
                    })]
                }
            }
            return aboutContent;
        }
        return null; 
    }

    getLanding = async (): Promise<LandingPageTypes | null> => {
        if(this.client) {
            const landingContent: LandingPageTypes = (await this.client.fetch('*[_type == "landingPageContent"]'))[0];
            return landingContent;
        }
        return null; 
    }

    getHome = async (): Promise<HomePageTypes | null> => {
        if(this.client) {
            const homeContent: HomePageTypes = (await this.client.fetch('*[_type == "homePageContent"]'))[0];
            return homeContent;
        }
        return null; 
    }

    getContact = async (): Promise<ContactPageTypes | null> => {
        if(this.client) {
            const homeContent: ContactPageTypes = (await this.client.fetch('*[_type == "contactPageContent"]'))[0];
            return homeContent;
        }
        return null; 
    }
    
    private setClient() {
        this.client = createClient({
            projectId: PROJECT_ID,
            dataset: DATASET,
            useCdn: false, 
        });
    }
}

export const sanityImageBuilder = imageUrlBuilder({
    projectId: PROJECT_ID,
    dataset: DATASET,
});

