import { StarryBackground } from 'react-animated-background-lib';
import './../css/pages/landing.css';
import Button from '../components/action-components/Button';
import { useNavigate } from "react-router-dom";
import { DataSegment, useLandingPageContext } from '../utils/context/DataServiceContext';
import { LandingPageTypes } from '../utils/types/page-types/LandingPageTypes';
import { Helmet } from 'react-helmet';

export function Landing() {
    const navigate = useNavigate(); 
    const landingContentReturn: DataSegment<LandingPageTypes | null> = useLandingPageContext();

    return (
        <main className="landing-main">
            <Helmet>
                <title>Trent Mizzi - Portfolio</title>
                <meta name="description" content="" />
            </Helmet>
            <div className='landing-bg'>
                <StarryBackground numberOfStars={100} />
            </div>
            {
                landingContentReturn.data && (
                    <div className='landing-text-container'>
                        <p className='body-text landing-text'>{landingContentReturn.data?.text}</p>
                        <Button classOverride='landing-button' text={'See More'} callback={() => navigate('/app/home')} />
                    </div>
                )

            }
            <div className='landing-bg-col-feat'/> 
        </main>
    )
}