import './../css/pages/home.css';
import {StarryBackground, ZigZagBackground} from "react-animated-background-lib";
import { TitleDisplayButton } from "../components/action-components/TitleDisplayButton";
import { useNavigationHelper } from '../utils/navigation';
import LoadingSpinner from '../components/LoadingSpinner';
import { Helmet } from 'react-helmet';
import { useContext } from 'react';
import { CmsDataContext, DataSegment } from '../services/context/DataServiceContext';
import { HomePageContent } from '../utils/types/CoreTypesMapping';

export default function Home() {
    const { navigateTo } = useNavigationHelper();
    const cmsContext = useContext(CmsDataContext);
    const homeContentReturn: DataSegment<HomePageContent> = cmsContext?.getHomePageData() ?? { isLoading: true, data: null, isError: false };
    
    return (
        <div className='home-container'>
            <Helmet>
                <title>Home</title>
                <meta name="description" content="" />
            </Helmet>
            <div className="home-title-button-container"> 
                {
                    homeContentReturn.data && (
                        <>
                            <TitleDisplayButton text={'About Me'} infoText={homeContentReturn.data.AboutMeText} callback={() => navigateTo('/app/about')}/> 
                            <TitleDisplayButton text={'My Work'} infoText={homeContentReturn.data.MyWork} callback={() => navigateTo('/app/projects')}/> 
                            <TitleDisplayButton text={'Contact Me'} infoText={homeContentReturn.data.ContactMe} callback={() => navigateTo('/app/contact')}/> 
                        </>
                    )
                }
                {
                    !homeContentReturn.data && (
                        <LoadingSpinner /> 
                    )
                }

            </div>
            <div className='home-background-container'>
                <StarryBackground numberOfStars={100} /> 
            </div>
        </div>
    )
}