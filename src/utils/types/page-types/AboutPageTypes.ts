import { ChartData } from "../ChartData"
import { ImageItem } from "../sanity-types/SanityImageTypes"

export type AboutMePageContent = {
    aboutMeText:string,
    aboutMyInterestsText:string,
    aboutMySkills:AboutMySkillsType,
    aboutThisWebsite:AboutThisWebsiteType,
}

export type AboutMySkillsType = {
    aboutMySkillsText:string,
    timeSpentData:ChartData[],
    timeSpentText:string,
    skillsData: ChartData[],
    skillsText:string,
}

export type AboutThisWebsiteType = {
    aboutThisWebsiteText:string, 
    websiteResourcesText:string, 
    imgLinks:string[]
}
