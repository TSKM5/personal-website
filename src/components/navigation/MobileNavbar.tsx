import './../../css/components/navigation/mobile-navbar.css';
import IconButton from "../action-components/IconButton";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { externalNavigate, useNavigationHelper } from '../../utils/navigation';
import { LINKEDIN_URL, GITHUB_URL } from '../../utils/constants/Endpoints';

export default function MobileNavbar() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false); 
    const [centerLogo, setCenterLogo] = useState<boolean>(false)
    const [menuIconVisible, setMenuIconVisible] = useState<boolean>(true);
    const location = useLocation();
    const { navigateTo } = useNavigationHelper();
    const isActive = (path: string) => location.pathname.includes(path) ? 'mobile-active-menu-option' : '';

    const handleMenuToggle = () => {
        if(menuOpen) {
            setMenuIconVisible(true);
            setCenterLogo(false);
        } else {
            setMenuIconVisible(false);
            setCenterLogo(true);
        }
        setTimeout(() => {
            setMenuOpen(!menuOpen);
        }, 300);  
    }
    
    return (
        <>
            <div className="mobile-navbar-container">
                <div className="mobile-navbar-content-container"> 
                    <IconButton 
                        classOverride={`mobile-navbar-content-logo ${centerLogo ? 'sliding-in' : ''} ${!centerLogo ? 'sliding-out' : ''}`} 
                        asset={require('./../../assets/logo.svg')} 
                        callback={() => navigateTo(`/app/home`)}
                    /> 
                    {
                        (!menuOpen) && (
                            <IconButton 
                                classOverride={`mobile-navbar-menu-icon ${!menuIconVisible ? 'sliding-out' : ''} ${menuIconVisible ? 'sliding-in' : ''}`} 
                                asset={require('./../../assets/menu-icon.svg')} 
                                callback={handleMenuToggle}
                            /> 
                        )
                    }
                </div>
                <div className='navbar-base-feat'/>
            </div>
            {
                (menuOpen) && (
                    <div className={`mobile-navbar-menu-container ${!menuIconVisible ? 'sliding-in' : ''} ${menuIconVisible ? 'sliding-out' : ''}`}>
                        <div className="navbar-mobile-menu-option-text-container">
                            <a href="/app/about" className={`navbar-mobile-menu-option-text ${isActive('/app/about')}`}>.about</a>
                        </div>
                        <div className="navbar-mobile-menu-option-text-container">
                            <a href="/app/projects" className={`navbar-mobile-menu-option-text ${isActive('/app/projects')}`}>.my-work</a>
                        </div>
                        <div className="navbar-mobile-menu-option-text-container">
                            <a href="/app/contact" className={`navbar-mobile-menu-option-text ${isActive('/app/contact')}`}>.contact-me</a>
                        </div>
                        <div className="navbar-mobile-menu-option-icons-container">
                            <IconButton asset={{default:'/icons/linkedin/In-white.png'}} callback={() => externalNavigate(LINKEDIN_URL)}/> 
                            <IconButton asset={{default:'/icons/github/github-white.png'}} callback={() => externalNavigate(GITHUB_URL)}/>
                        </div>
                        <IconButton
                            classOverride={`mobile-navbar-menu-icon menu-modal-icon`}
                            asset={require('./../../assets/close-arrow.svg')}
                            callback={handleMenuToggle}
                        />
                    </div>
                )
            }
        </>
    );
}