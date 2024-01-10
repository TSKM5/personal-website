export const WS_ENDPOINT:string = process.env.REACT_APP_WS_ENDPOINT as string;
export const FOLIO_ENDPOINT:string = process.env.REACT_APP_FOLIO_ENDPOINT as string;
export const GITHUB_URL:string = 'https://github.com/TSKM5';
export const LINKEDIN_URL:string = 'https://www.linkedin.com/in/trentmizzi';

//Project API EPs
export const GET_PROJECT_PAGE_CONTENTS:string = FOLIO_ENDPOINT + 'cms/getProjectPageData';
export const GET_PROJECT_DETAILS:string = FOLIO_ENDPOINT + 'cms/getProjectDetails';
export const GET_ABOUT:string = FOLIO_ENDPOINT + 'cms/getAbout';
export const GET_LANDING:string = FOLIO_ENDPOINT + 'cms/getLanding';
export const GET_HOME:string = FOLIO_ENDPOINT + 'cms/getHome';
export const GET_CONTACT:string = FOLIO_ENDPOINT + 'cms/getContact';
export const CONTACT_FORM:string = FOLIO_ENDPOINT + 'folio/contactForm';
export const EXE_DOWNLOAD:string = FOLIO_ENDPOINT + 'folio/asset';