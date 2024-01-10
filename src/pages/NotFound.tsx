import InlineMessage from "../components/InlineMessage";
import { Navbar } from "../components/navigation/Navbar";
import './../css/pages/page-manager.css'

export function NotFound() {
    return (
        <div className='base-container'>
            <Navbar /> 
            <main className='base-main'>
                <InlineMessage text='404 - Page not found.' />
            </main>
        </div>
    );
}