import './../css/pages/about.css'
import Title from "../components/Title";
import LoadingSpinner from '../components/LoadingSpinner';
import InlineMessage, { CONTENT_NOT_FOUND_ERROR_TEXT } from '../components/InlineMessage';
import MultipleChartContainer from '../components/charts/MultipleChartContainer';
import { Helmet } from 'react-helmet';
import { CmsDataContext, DataSegment } from '../services/context/DataServiceContext';
import { useContext } from 'react';
import { AboutMePageContent, AboutMySkillsContent, AboutThisWebsiteContent } from '../utils/types/CoreTypesMapping';

export default function About() {
    const cmsContext = useContext(CmsDataContext);
    const aboutContentReturn: DataSegment<AboutMePageContent> = cmsContext?.getAboutPageData() ?? { isLoading: true, data: null, isError: false };

    if (!aboutContentReturn || !aboutContentReturn.data || aboutContentReturn.isLoading) {
        return <LoadingSpinner />
    } else if(aboutContentReturn.isError){
        return <InlineMessage text={CONTENT_NOT_FOUND_ERROR_TEXT}/> 
    }
    
    return (
        <>
            <Helmet>
                <title>About Me</title>
                <meta name="description" content="Find out more about my skills and me as a person." />
            </Helmet>
            <div className='about-container'>
                <AboutMe text={aboutContentReturn.data!.aboutMeText} />
                <AboutMyInterests text={aboutContentReturn.data!.aboutMyInterestsText} />
                <AboutMySkills aboutSkills={aboutContentReturn.data!.aboutMySkills}/>
                <AboutThisWebsite aboutThisWebsite={aboutContentReturn.data!.aboutThisWebsite}/>
            </div>
        </>
    )
}

function AboutMe(props:{text:string}) {
    const {text} = props; 
    return (
        <div className="about-content-container">
            <Title text="About Me"/> 
            <p>{text}</p>
        </div>
    )
}

function AboutMyInterests(props:{text:string}) {
    const {text} = props; 
    return (
        <div className="about-content-container">
            <Title text="About My Interests"/> 
            <p>{text}</p>
        </div>
    )
}

function AboutMySkills(props:{aboutSkills:AboutMySkillsContent}) {
    const {aboutSkills} = props; 

    return (
        <div className="about-content-container">
            <Title text="About My Skills"/> 
            <p>{aboutSkills.aboutMySkillsText}</p>
            <MultipleChartContainer chartData={aboutSkills.timeSpentData} startWithBar={false} barTicks={6} matchClassForDimensions='about-container'/> 
            <p>{aboutSkills.timeSpentText}</p>
            <MultipleChartContainer chartData={aboutSkills.skillsData} startWithBar={true} matchClassForDimensions='about-container'/> 
            <p>{aboutSkills.skillsText}</p>
        </div>
    )
}

function AboutThisWebsite(props:{aboutThisWebsite:AboutThisWebsiteContent}) {
    const { aboutThisWebsite } = props;
    return (
        <div className="about-content-container">
            <Title text="About This Website"/> 
            <p>{aboutThisWebsite.aboutThisWebsiteText}</p>
            <p>{aboutThisWebsite.websiteResourcesText}</p>
            <div className='about-content-container-brand-grid'>
                {
                    aboutThisWebsite.imgLinks.map((src, index) => {
                        return (
                            <img alt='external-org-icon' key={index} className='about-content-container-brand-icon' src={src}/>
                        )
                    })
                }
            </div>
        </div>
    )
}
