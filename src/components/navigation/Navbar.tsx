import './../../css/components/navigation/navbar.css'
import { useWindowWidth } from '../../utils/hooks';
import HorizontalNavbar from './HorizontalNavbar';
import MobileNavbar from './MobileNavbar';

export function Navbar() {
    const windowWidth = useWindowWidth();

    if(windowWidth <= 800){
        return <MobileNavbar /> 
    }
    return <HorizontalNavbar /> 
}