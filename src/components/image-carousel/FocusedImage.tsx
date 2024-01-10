import { useEffect, useState } from 'react';
import './../../css/components/image-carousel/focused-image.css'

export default function FocusedImage(props: { classOverride?: string, src: string, onClick?: () => void }) {
    const { classOverride, src, onClick } = props;
    const [scale, setScale] = useState(1);
    const [startDist, setStartDist] = useState(0);

    const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY ? -e.deltaY : e.detail;
        const newScale = scale + delta * -0.01;
        setScale(Math.min(Math.max(.125, newScale), 4));
    };

    const getDistanceBetweenTouches = (e: TouchEvent) => {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        return Math.hypot(touch2.pageX - touch1.pageX, touch2.pageY - touch1.pageY);
    };

    const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 2) {
            const dist = getDistanceBetweenTouches(e);
            setStartDist(dist);
        }
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            const dist = getDistanceBetweenTouches(e);
            const scaleChange = dist / startDist;
            setScale(scale * scaleChange);
            setStartDist(dist);
        }
    };

    useEffect(() => {
        document.body.classList.add('no-scroll');
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            document.body.classList.remove('no-scroll');
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [scale]);

    return (
        <div className={`focused-image-container ${classOverride}`} onClick={onClick}>
            <img className='focused-image' src={src} style={{ transform: `scale(${scale})` }} />
        </div>
    );
}
