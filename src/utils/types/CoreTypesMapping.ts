import { Constants, PageTypes } from 'folio-types-core';

export type ProjectDetails = PageTypes.ProjectTypes.ProjectDetails;
export type AboutMePageContent = PageTypes.AboutPageTypes.AboutMePageContent; 
export type AboutMySkillsContent = PageTypes.AboutPageTypes.AboutMySkillsType;
export type AboutThisWebsiteContent = PageTypes.AboutPageTypes.AboutThisWebsiteType;
export type HomePageContent = PageTypes.HomePageTypes.HomePageTypes; 
export type LandingPageContent = PageTypes.LandingPageTypes.LandingPageTypes;
export type ProjectPageContents = PageTypes.ProjectTypes.ProjectPageContents;
export type ContactPageContent = PageTypes.ContactPageTypes.ContactPageTypes;


export const ProjectTypeConstants = {
    imageCarousel: Constants.ProjectPageComponentConstants.IMAGE_CAROUSEL_TYPE_VALUE,
    mobileIFrame: Constants.ProjectPageComponentConstants.MOBILE_IFRAME_TYPE_VALUE, 
    markdownBlock: Constants.ProjectPageComponentConstants.MARKDOWN_BLOCK_TYPE_VALUE, 
    downloadAssetButton: Constants.ProjectPageComponentConstants.DOWNLOAD_ASSET_BUTTON_TYPE_VALUE, 
    codeSandbox: Constants.ProjectPageComponentConstants.CODE_SANDBOX_TYPE_VALUE, 
    customWsDemo: Constants.ProjectPageComponentConstants.CUSTOM_WS_DEMO_TYPE_VALUE, 
    urlDisplay: Constants.ProjectPageComponentConstants.URL_DISPLAY_TYPE_VALUE, 
    animationLibComponent: Constants.ProjectPageComponentConstants.ANIMATION_LIB_COMPONENT_TYPE_VALUE
} as const; 