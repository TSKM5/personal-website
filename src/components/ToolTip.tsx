import { useEffect, useState } from 'react';
import './../css/components/tool-tip.css'

export default function ToolTip(props:{text:string, classOverride?:string}) {
    const { text, classOverride } = props;
    const [coords, setCoords] = useState<{x:number, y:number}>({x:0, y:0});
    const [isVisible, setIsVisible] = useState(false);
    const delay = 250;

    const updateCoords = (e:MouseEvent) => {
        const tooltip = document.querySelector('.tool-tip-container'); 
        const tooltipRect = tooltip?.getBoundingClientRect();
        const cursorX:number = e.clientX;
        const cursorY:number = e.clientY;
        const buffer:number = 20;
        let x:number; 
        let y:number; 

        if(tooltipRect) {
            const tooltipWidth = tooltipRect.width;
            const tooltipHeight = tooltipRect.height;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            if(cursorX + tooltipWidth + buffer> windowWidth) {
                x = cursorX - tooltipWidth - buffer;
            } else {
                x = cursorX + buffer;
            }

            if(cursorY + tooltipHeight + buffer > windowHeight) {
                y = cursorY - tooltipHeight - buffer;
            } else {
                y = cursorY + buffer;
            }

            setCoords({x, y});
        }
    }


    useEffect(() => {
        window.addEventListener('mousemove', updateCoords);
        const timeoutId = setTimeout(() => setIsVisible(true), delay);

        return () => {
            window.removeEventListener('mousemove', updateCoords);
            clearTimeout(timeoutId);
        }
    }, []); 

    return isVisible ? (
        <div className={`tool-tip-container ${classOverride}`} style={{ left: `${coords.x}px`, top: `${coords.y}px` }}>
            <p>{text}</p>
        </div>
    ) : <></>;
}