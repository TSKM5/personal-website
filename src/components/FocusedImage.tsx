import { useEffect } from 'react';
import './../css/components/focused-image.css'

export default function FocusedImage(props: { classOverride?: string, src: string, onClick?: () => void }) {
    const { classOverride, src, onClick } = props;
    
    const preventScroll = (e: WheelEvent | TouchEvent) => e.preventDefault();

    useEffect(() => {
        document.body.classList.add('no-scroll');
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    useEffect(() => {
        window.addEventListener('wheel', preventScroll, { passive: false });

        return () => {
            window.removeEventListener('wheel', preventScroll);
        };
    }, []);

    useEffect(() => {
        window.addEventListener('touchmove', preventScroll, { passive: false });
    
        return () => {
            window.removeEventListener('touchmove', preventScroll);
        };
    }, []);

    return (
        <div className={`focused-image-container ${classOverride}`} onClick={onClick}>
            <img className='focused-image' src={src}/>
        </div>
    )
}