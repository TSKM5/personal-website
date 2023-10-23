import './css/page-manager.css'
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/navigation/Navbar';

export default function PageManager() {
    return (
        <div className='base-container'>
            <Navbar /> 
            <main className='base-main'>
                <Outlet /> 
            </main>
        </div>
    );
}
