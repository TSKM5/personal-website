import './../../css/components/navigation/navbar.css'
import IconButton from "../action-components/IconButton";
import { externalNavigate, useNavigationHelper } from '../../utils/navigation';
import { DISCORD_URL, GITHUB_URL } from '../../config/Endpoints';

export default function HorizontalNavbar(){
    const { navigateTo } = useNavigationHelper();

    return (
        <div className="navbar-base">
            <div className='navbar-base-content'>
                <IconButton classOverride='navbar-base-content-logo' asset={require('./../../assets/logo.svg')} callback={() => navigateTo('/app/home')}/> 
                <div className='navbar-base-content-menu-options'>
                    <a href="/app/about" className="navbar-base-content-menu-options-text">.about</a> 
                    <a href="/app/projects" className="navbar-base-content-menu-options-text">.my-work</a> 
                    <a href="/app/contact" className="navbar-base-content-menu-options-text">.contact-me</a> 
                </div>
                <div className='navbar-base-content-icons'>
                    <IconButton asset={require('./../../assets/branding/discord/discord-white.svg')} callback={() => externalNavigate(DISCORD_URL)}/> 
                    <IconButton asset={require('./../../assets/branding/github/github-white.svg')} callback={() => externalNavigate(GITHUB_URL)}/> 
                </div>
            </div>
            <div className='navbar-base-feat'/>
        </div>
    )
}