import { StarryBackground } from 'react-animated-background-lib';
import './../css/pages/landing.css';
import Button from '../components/action-components/Button';
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { useContext } from 'react';
import { CmsDataContext, DataSegment } from '../services/context/DataServiceContext';
import { LandingPageContent } from '../utils/types/CoreTypesMapping';

export function Landing() {
    const navigate = useNavigate(); 
    const cmsContext = useContext(CmsDataContext);
    const landingContentReturn: DataSegment<LandingPageContent> = cmsContext?.getLandingPageData() ?? { isLoading: true, data: null, isError: false };

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