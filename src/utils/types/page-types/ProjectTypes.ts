export type Project = {
    title:string; 
    tags: string[]; 
    landingDesc:string; 
    landingImage:string;
    path:string; 
    projectPageContents: ProjectPageContents[];
}

export type ProjectPageContents = Heading | TextContent | ImageCarousel | mobileIFrame | DownloadAssetButton | CodeSandbox | CustomWsDemo | UrlDisplay | AnimationLibComponent; 


export type Heading = {
    type: 'heading'; 
}
export type TextContent = {
    type: 'textContent'; 
    textBlock:TextBlock[]; 
}

export type ImageCarousel = {
    type: 'imageCarousel'; 
    imagePaths: string[]; 
}

export type mobileIFrame = {
    type: 'mobileIFrame'; 
    src: string; 
}

export type DownloadAssetButton = {
    type: 'downloadAssetButton'; 
    src: string; 
}

export type CodeSandbox = {
    type: 'codeSandbox'; 
    src: string; 
}

export type CustomWsDemo = {
    type: 'customWsDemo';
    src: string;
}

export type TextBlock = Paragraph | BulletList | NumberedList; 

export type Paragraph = {
    type: 'paragraph'
    value: string; 
}

export type BulletList = {
    type: 'bulletList'
    value: string[]; 
}

export type NumberedList = {
    type: 'numberedList'
    value: string[]; 
}

export type UrlDisplay = {
    type: 'urlDisplay'; 
    url: string; 
    display: string; 
}

export type AnimationLibComponent = {
    type: 'animationLibComponent'; 
}