import { AboutMySkillsType } from "../page-types/AboutPageTypes";
import { ImageItem } from "./SanityImageTypes";

export type AboutPageReturn = {
    aboutMeText:string,
    aboutMyInterestsText:string,
    aboutMySkills:AboutMySkillsType,
    aboutThisWebsite:AboutThisWebsiteType,
}

export type AboutThisWebsiteType = {
    aboutThisWebsiteText:string, 
    websiteResourcesText:string, 
    imgLinks:ImageItem[]
}