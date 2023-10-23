import { Heading, TextContent, mobileIFrame, DownloadAssetButton, CodeSandbox, CustomWsDemo, AnimationLibComponent } from "../page-types/ProjectTypes";
import { ImageItem } from "../sanity-types/SanityImageTypes";

export type ProjectReturn = {
    title:string; 
    tags: string[]; 
    landingDesc:string; 
    landingImage:ImageItem; 
    path:string;
    projectPageContents: ProjectPageContents[];
}

export type ProjectPageContents = Heading | TextContent | ImageCarousel | mobileIFrame | DownloadAssetButton | CodeSandbox | CustomWsDemo | AnimationLibComponent;; 



export type ImageCarousel = {
    type: 'imageCarousel'; 
    imagePaths: ImageItem[]; 
}

