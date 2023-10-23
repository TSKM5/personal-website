import './../css/pages/home.css';
import {StarryBackground, ZigZagBackground} from "react-animated-background-lib";
import { TitleDisplayButton } from "../components/action-components/TitleDisplayButton";
import { useNavigationHelper } from '../utils/navigation';
import { HomePageTypes } from '../utils/types/page-types/HomePageTypes';
import { DataSegment, useHomePageContext } from '../utils/context/DataServiceContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { Helmet } from 'react-helmet';

export default function Home() {
    const { navigateTo } = useNavigationHelper();
    const homeContentReturn: DataSegment<HomePageTypes | null> = useHomePageContext();
    
    
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